btn2 = document.getElementById('btn2');

window.onscroll = function(){

if(scrollY >=250)
   {
    btn2.style.display = 'block';
   }
   else{
    btn2.style.display = 'none';
   }
}

btn2.onclick = function(){
    scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
}
