/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const formJs = __webpack_require__(1);

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




/***/ }),
/* 1 */
/***/ (function(module, exports) {

var submitForm = document.querySelector('button[type="submit"]');

function sendForm(emailValues){
    emailjs.send("cfeiend4835","part_of_the_pack", emailValues).then(function(response) {
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-success').innerHTML = '<h2>Message sent successfuly</h2>';
    }, function(err) {
        console.log("FAILED. error=", err);
    });
}

function checkValues(e){
    //prevent page refresh
    e.preventDefault();
    
    //assign form values to object to send via emailjs
    var formValues = {
        name    : document.querySelector('input#name').value,
        email   : document.querySelector('input#email').value,
        msg     : document.querySelector('textarea#message').value,
        interest : document.querySelector('select#interest').value   
    }
    
    //Test form for valid inputs
    if(formValues.name != '' && formValues.email != '' && formValues.msg != ''){
        
        //if form is valid hide form, show spinner, and send email
        document.querySelector('form').style.display = 'none';
        document.getElementById('form-success').innerHTML = '<h2><i class="fa fa-paw"></i></h2>';
        sendForm(formValues);
    } else {
        document.getElementById('form-success').style.display = 'block';
        document.getElementById('form-success').innerHTML = '<h2>empty field</h2>';
        return false;
    }
}

//listen for click on the submit and check values before sending form
submitForm.addEventListener('click', checkValues);

/***/ })
/******/ ]);