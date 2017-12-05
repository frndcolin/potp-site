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