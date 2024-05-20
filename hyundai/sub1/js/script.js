$(document).ready(function(){
//.shoesColor>li클릭했을때  
//.content_wrap안에 있는 자식요소인 img가 보여야 함(show())
//다른 형제 요소는 보이지 않아야 함(hide())

// let i=$(this).index().
$('.shoesColor>li').on("click",function(e){
    e.preventDefault();//a링크를 막을 수 있음
  let i = $(this).index()
  console.log(i)
 $('.content_wrap').children('img').eq(i).show()
 .siblings().hide()
//.btn_wrap안에 있는 자식요소인 div가 보여야 함 
//다른 형제 요소는 보이지 않아야 함

$('.btn_wrap').children('div').eq(i).show()
.siblings().hide()

//left의 배경색이 변경되어야 함

if(i == 0){
    $('.left').css({'backgroundColor' : '#4882d2'})//파란색
}else{
    $('.left').css({'backgroundColor' : '#305e44'})//그린
}

//addClass를 이용하여 on클래스가 클릭한 li는 on을 달고 
//형제요소들은 removeClass 이용하여 on이 사라지게 한다

$(this).addclass('on').siblings().removeClass('on')




})//클릭이벤트


})//document