$(document).ready(function () {
    var whiteLogo = 'public/img/logo/logo-white.svg';
    var blueLogo = 'public/img/logo/potp-logo.svg';

    //smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    }

    //----------------------------------------------------------------
    //==============Vanilla Script====================================
    //----------------------------------------------------------------
    const PAGE = window.document;                                       //document for scroll watching
    const NAVBAR = document.querySelector('.navbar');                   //main navbar
    const ANCHORS = document.querySelectorAll('a[href*="#"]');          //all internal anchor tags
    const NAV_BTN = document.querySelector('.nav-btn');                 //navbar button for small screens
    const NAV_LIST = document.querySelector('.nav-group');              //main nav list
    const LOGO = document.querySelector('.potp-logo');                  //navbar logo
    const QUOTES = document.querySelectorAll('.quote');                 //quote node list, in welcome section
    const CHCK_US_OUT = document.querySelector('h3.animated');          //h3 tag in Welcome section
    const ANIMATIONS = document.querySelectorAll('.animated');          //all tags with 'animated' class  MAY BE REMOVED IN FUTURE (12/14)
    const COPY = document.querySelector('.copyright');                  //copy right tag in footer
    const YEAR = new Date().getFullYear();                              //get current year, to keep copyright up to date
    var quoteTimer;                                                     //used for setInterval in animations inits
    
    function toggleNavBtnAnimation(e) {
        e.preventDefault();

        if (NAV_LIST.classList.contains('slide-in')) {
            NAV_LIST.classList.replace('slide-in', 'slide-out');
            NAV_BTN.classList.replace('roll-in', 'roll-out');
        } 
        else if (NAV_LIST.classList.contains('slide-out')) {
            NAV_LIST.classList.replace('slide-out', 'slide-in');
            NAV_BTN.classList.replace('roll-out', 'roll-in');
        } 
        else {
            NAV_LIST.classList.add('slide-in');
            NAV_BTN.classList.add('roll-in');
        }
    }

    //evaluate page position to add solid bg to navbar when needed
    //takes in e(event) arg to pass to toggleNavBtn... needed to hide navigation when 
    //the page is scrolled so users dont have to click the btn
    function watchScroll(e) {
        let pagePosY = window.scrollY;

        if (pagePosY < 200) {
            NAVBAR.classList.remove('solid');
            LOGO.setAttribute('src', whiteLogo);
        } 
        else {
            NAVBAR.classList.add('solid');
            LOGO.setAttribute('src', blueLogo);
            
            if (NAV_LIST.classList.contains('slide-in')) {
                toggleNavBtnAnimation(e);
            }
        }
    }

    //evaluate each quote for stages in rotation/animation and shift accordingly
    function showQuote() {
        quotes.forEach((q) => {
            //if quote has class of active, add rollout, else moveon
            q.classList.toggle('rollout', q.classList.contains('active'));
            //if quote has class of next, replace it with active
            q.classList.replace('next', 'active');
            //if quote does not have class active or next, add next
            q.classList.toggle('next', !q.classList.contains('active', 'next'));
        });
    }
    
    //keep copyright year upto date
    COPY.innerHTML = `&copy; ${YEAR} Part of the Pack`;
    
    //========INITIALIZE EVENTs & EVENT LISTENERS=======================================================
    quoteTimer = setInterval(showQuote, 5000);                                      //time interval for quote animation
    PAGE.addEventListener('scroll', watchScroll);                                   //listener for scroll events
    ANCHORS.forEach((a) => { a.addEventListener('click', smoothScroll)});           //smooth scroll for anchor tags
    NAV_BTN.addEventListener('click', toggleNavBtnAnimation);                       //nav btn and slide animation
    
    CHCK_US_OUT.addEventListener('mouseover', function () { CHCK_US_OUT.classList.add('pulse');}); //listener for h3 tag in Welcome section

    //=====TEST listener to remove animation classes when needed=======================================
    ANIMATIONS.forEach((animation) => {
        animation.addEventListener('animationend', function () {
            console.log(this.classList);
            this.classList.remove('pulse', 'rollout', 'active');
        });
    });

});
