$(document).ready(function(){

    let winWidth = $(window).width();
    if(winWidth < 760){
        mo();
    }else{
        pc();
    }


   

    
    function mo(){
        var swiper = new Swiper(".mySwiper", {
            lazy: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }

    function pc(){
    $(".menu>li>a").on("mouseover",function(){
        $(this).siblings(".sub").stop().slideToggle();
        $(this).parent().siblings().find(".sub").slideUp()
    })
    
    $(".button")
    }
    
    
    
    
    var cachedWidth = $(window).width();
    $(window).resize(function(){
        var newWidth = $(window).width();
        if(newWidth !== cachedWidth){
        var delay = 300;
        var re_timer = null;
        $(window).on('resize', function(){
            clearTimeout(re_timer);
            re_timer = setTimeout(function(){
            document.location.reload();
            }, delay);
        });
    
            cachedWidth = newWidth;
        }
    });
    
    
    
    
    
    })