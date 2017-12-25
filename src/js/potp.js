$(document).ready(function(){
    var whiteLogo = 'public/img/logo/logo-white.svg';
    var blueLogo = 'public/img/logo/potp-logo.svg';
    var navBtn = document.querySelector('.nav-header button');
    var anchors = document.querySelectorAll('a[href*="#"]');
    
    function toggleSlide(e){
        e.preventDefault();
        var nav  = document.querySelector("#potp-nav");
        var list = document.querySelector(".nav-list");
        
        nav..classList.toggle("slide");
        
        if(nav.classList.contains("slide")){
            navBtn.style.animationName = "roll-in";
            list.style.right = "-20px";
        } else {
            navBtn.style.animationName = "roll-out";
            list.style.right = "-300px";
        }
    }
    
    function watchScroll(e){
        var pagePosY = window.scrollY;  
        var navbar = document.querySelector('.navbar');
        var navList = document.querySelector('.nav-group')
        var logo = document.querySelector('.potp-logo');
        
        if(pagePosY < 200) {
            navbar.classList.remove('navbar-solid');
            logo.setAttribute('src', whiteLogo);
            navBtn.style.border = '2px solid #FFF';
        }else {
            navbar.classList.add('navbar-solid');
            logo.setAttribute('src', blueLogo);
            navBtn.style.border = '2px solid #2A57CC';
        }
        
        if(navList.classList.contains('slide')){
            toggleSlide(e);
        }
    }
    
    document.addEventListener('scroll', watchScroll);
    navBtn.addEventListener('click', toggleSlide);
    anchors.forEach(function(a){a.addEventListener('click', smoothScroll)});
});



