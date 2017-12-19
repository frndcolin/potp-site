const formJs = require('./potp-form');

$(document).ready(function(){
    var whiteLogo = 'public/img/logo/logo-white.svg';
    var blueLogo = 'public/img/logo/potp-logo.svg';
    
    function toggleSlide(e){
        e.preventDefault();
        var $btn  = $(".nav-header button");
        var $nav  = $("#potp-nav");
        var $list = $(".nav-list");
        
        $nav.toggleClass("slide");
        
        if($nav.hasClass("slide")){
            $btn.css("animation-name", "roll-in");
            $list.animate({right: '-20px'}, 800);
        } else {
            $btn.css("animation-name", "roll-out");
            $list.animate({right: '-300px'}, 800);
        }
    }
    
    //smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = this.hash;
        var $target = $(target);
            
        $('html, body').stop().animate({'scrollTop': $target.offset().top}, 900, 'swing', function () {
            window.location.hash = target;
        });
    }
    
    //----------------------------------------------------------------
    //==============Vanilla Script====================================
    //----------------------------------------------------------------
    
    var navBtn = document.querySelector('.nav-header button');
    var anchors = document.querySelectorAll('a[href*="#"]');
    
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


