$(document).ready(function(){

let winWidth = $(window).width();
if(winWidth < 800){
    mo();
}else{
    pc();
}

common()

function mo(){
$(".side_menu_button").on("click",function(){
    $(this).siblings(".menu").stop().slideToggle();
    })
    
}





function pc(){
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
function common(){
$(".menu>li>a").on("mouseover",function(){
    $(this).siblings(".sub").stop().slideToggle();
    })
    
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
