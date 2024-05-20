$(document).ready(function(){
    $(".menu>li").on("mouseover",function(){
        $(".menu>li").children(".subMenu").stop().slideDown(500)
   })

    $(".menu>li").on("mouseout", function(){
       $(".menu>li").children(".subMenu").stop().slideUp()
    }) 
})