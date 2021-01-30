function searchToggle() {
    const width = $(document.body).width()
    if(width > 479) {
        return;
    }
    const search = $('.search');
    const searchForm = $('.form-search');
    const menuToggle = $('.menu-toggle');
    const title = $('.navbar-header-title ');

    if(!search.hasClass("mobile-search")) {
        search.addClass("mobile-search");
        menuToggle.addClass("open-search")
        title.addClass("mobile-title-hidden")
    } else {
        search.removeClass("mobile-search");
        menuToggle.removeClass("open-search")
        // title.css({visibility: 'visible'})
        title.removeClass("mobile-title-hidden")
    } 

   
}

function inputChange(e) {
    const value = e.target.value;
    const pc = $('#pc-search-input');
    const mobile = $('#mobile-search-input');
    const modalInput = $('#modal-form-input');
    // 其中一个搜索框修改要更改另外两个搜索框
    const inputArray = [pc, mobile, modalInput];
    // modalInput.val("fuck")
    for(let i = 0; i < inputArray.length; i++) {
        if(e.target === inputArray[i][0]) {
            continue;
        }
        inputArray[i].val(value);
    }
    
}

function search(searchInputEl, formEl, flag) {
    const path = "/" + "search.json";
    $(formEl).submit(function(e){
        if(e && e.preventDefault){
            e.preventDefault();
        }else{
            window.event.returnValue = false;
        }
        
        const modalInput = $('#modal-form-input');
     
        if(!flag && modalInput.val() === '') {
            return ;
        }

        $("#u-search").fadeIn(500, function() {
            $("body > .wrapper").addClass("modal-active");
            $(".form-input").focus();
            $.ajax({
                url: path,
                dataType: "json",
                beforeSend: function (xhr) {
                    const loadingBar = $('.search-loading-bar') 
                    loadingBar.css({
                        width:'100%',
                        visibility: 'visible'
                    });
                },
                success: function( datas ) {
                    const $resultPanel = $(".modal-body")[0];
                    let str = `<ul class="modal-results">`;
                    var keywords = $(".form-input").val().trim().toLowerCase().split(/[\s\-]+/);
                    $resultPanel.innerHTML = "";
                    let hasResult = false
                    let text = `<div class="no-result">找不到与关键词相关的内容....</div>`;

                    if ($(".form-input").val().trim().length <= 0) {
                        // 没有结果
                        $resultPanel.innerHTML = text;
                        return;
                    }
                    datas.forEach(function (data) {
                        var isMatch = true;
                        var data_title = data.title && data.title.trim().toLowerCase() || 'Untitled';
                        var data_content = data.content && data.content.trim().replace(/<[^>]+>/g, "").toLowerCase() || '';
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        if (data_content !== '') {
                            keywords.forEach(function (keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);

                                if (index_title < 0 && index_content < 0) {
                                    isMatch = false;
                                } else {
                                    hasResult = true
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i == 0) {
                                        first_occur = index_content;
                                    }
                                }
                            });
                        } else {
                            isMatch = false;
                        }
                        // show search results
                        if (isMatch) {
                            str += `<li class='result-item'><a href='${data_url}' class='result-item-detail'> <span class="title">${data_title}</span>`;
                            var content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (first_occur >= 0) {
                                // cut out 200 characters
                                var start = first_occur - 40;
                                var end = first_occur + 160;

                                if (start < 0) {
                                    start = 0;
                                }

                                if (start == 0) {
                                    end = 200;
                                }

                                if (end > content.length) {
                                    end = content.length;
                                }

                                var match_content = content.substring(start, end);

                                // highlight all keywords
                                keywords.forEach(function (keyword) {
                                    var regS = new RegExp(keyword, "gi");
                                    match_content = match_content.replace(regS, `<em class="search-keyword">${keyword}</em>`);
                                });

                                str += `<span class="content"> ${match_content} ...</span></a>`;
                            }
                            str += "</li>";
                        }
                    });
                    str += "</ul>";
                    if(hasResult) {
                        $resultPanel.innerHTML = str;
                    } else {
                        $resultPanel.innerHTML = text;
                    }

                },
                complete: function() {
                    setTimeout(() => {
                        const loadingBar = $('.search-loading-bar') 
                        loadingBar.css({
                            visibility: 'hidden',
                        });
                    }, 300)
                }
            });
        })
    
    });
}

$(document).ready(function() {
    $('.modal-close').click(function () { 
        $("#u-search").fadeOut();
        $("body > .wrapper").removeClass("modal-active")
    })

    $('.modal-overlay').click(function() {
        $("#u-search").fadeOut();
        $("body > .wrapper").removeClass("modal-active")
    })
    search(null, ".form-search", false)
    search("#u-search-modal-form .form-input", ".u-search-modal-form", true)
})