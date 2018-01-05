(function (w, d) {
    const whiteLogo = 'public/img/logo/logo-white.svg';
    const blueLogo = 'public/img/logo/potp-logo.svg'; //document for scroll watching
    const NAVBAR = d.querySelector('.navbar'); //main navbar
    const NAV_BTN = d.querySelector('.nav-btn'); //navbar button for small screens
    const NAV_LIST = d.querySelector('.nav-group'); //main nav list
    const LOGO = d.querySelector('.potp-logo'); //navbar logo
    const QUOTES = d.querySelectorAll('.quote'); //quote node list, in welcome section
    const CHCK_US_OUT = d.querySelector('h3.animated'); //h3 tag in Welcome section
    const COPY = d.querySelector('.copyright'); //copy right tag in footer
    const YEAR = new Date().getFullYear(); //get current year, to keep copyright up to date
    var quoteTimer;
    var contactForm = {
        form: d.querySelector('form'),
        successMsg: d.getElementById('form-success'),
        name: d.querySelector('input#name'),
        email: d.querySelector('input#email'),
        msg: d.querySelector('textarea#message'),
        service: d.querySelector('select#services')
    };

    var validator = new FormValidator('new_customer', [
        { name: 'name', rules: 'required|max_length[25]|alpha'}, 
        { name: 'email', rules: 'required|valid_email'}, 
        { name: 'message', rules: 'max_length[500]'}
    ], function (errors, event) {
            if (errors.length > 0) {
                var errLength = errors.length;
                var errorString = '';
                for (var i = 0; i < errLength; i++) {
                errorString += errors[i].message + '</br>';
            }
                    alert(errorString);
            } else {
                formVals = {
                    name: contactForm.name.value,
                    email: contactForm.email.value,
                    msg: contactForm.msg.value,
                    service: contactForm.service.value
                }
            sendMail(event, formVals);
        }
    });
    
    function sendMail(e, values) {
        e.preventDefault();
        
        emailjs.send("sendgrid", "new_customer", values)
            .then(function (response) {
                contactForm.form.style.display = 'none';
                contactForm.successMsg.style.display = 'block';
                contactForm.successMsg.innerHTML = '<h2>Message sent successfuly</h2>';
            }, function (err) {
                console.log("FAILED. error=", err);
            });
    };
    
    
    //Animation control for nav button when navbar is collapsed
    function toggleNavBtnAnimation(e) {
        e.preventDefault();
        
        if (NAV_LIST.classList.contains('slide-in')) {
            NAV_LIST.classList.replace('slide-in', 'slide-out');
            NAV_BTN.classList.replace('roll-in', 'roll-out');
        } else if (NAV_LIST.classList.contains('slide-out')) {
            NAV_LIST.classList.replace('slide-out', 'slide-in');
            NAV_BTN.classList.replace('roll-out', 'roll-in');
        } else {
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
        } else {
            NAVBAR.classList.add('solid');
            LOGO.setAttribute('src', blueLogo);
            if (NAV_LIST.classList.contains('slide-in')) {
                toggleNavBtnAnimation(e);
            }
        }
    }
    
    //evaluate each quote for stages in rotation/animation and shift accordingly
    function showQuote() {
        QUOTES.forEach(function(q){
            //if quote has class of active, add rollout, else moveon
            q.classList.toggle('rotateout', q.classList.contains('active'));
            //if quote has class of next, replace it with active
            q.classList.replace('next', 'active');
            //if quote does not have class active or next, add next
            q.classList.toggle('next', !q.classList.contains('active'));
            if(q.classList.contains('rotateout')){
                setTimeout(function(){
                    q.classList.remove('active');
                    q.classList.remove('rotateout');
                }, 2000);
            }
        });
    }
    
    //keep copyright year upto date
    COPY.innerHTML = `&copy; ${YEAR} Part of the Pack`;
    //========INITIALIZE EVENTs & EVENT LISTENERS=======================================================
    quoteTimer = setInterval(showQuote, 5000); //time interval for quote animation
    d.addEventListener('scroll', watchScroll); //listener for scroll events
    NAV_BTN.addEventListener('click', toggleNavBtnAnimation); //nav btn and slide animation
    CHCK_US_OUT.addEventListener('mouseover', function () {
        CHCK_US_OUT.classList.add('pulse');
    }); //listener for h3 tag in Welcome section
}(window, document));
