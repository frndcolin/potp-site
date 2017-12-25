(function(){
    var formBtn         = document.querySelector('button[type="submit"]');
    var formSuccess     = document.getElementById('form-success');
    var formName        = document.querySelector('input#name');
    var formEmail       = document.querySelector('input#email');
    var formMsg         = document.querySelector('textarea#message');
    var formInterest    = document.querySelector('select#interest');
    
    function sendForm(values){
        emailjs.send("sendgrid","new_customer", values)
            .then(function(response) {
                formMsg.style.display = 'block';
                formMsg.innerHTML = '<h2>Message sent successfuly</h2>';
            }, function(err) {
                console.log("FAILED. error=", err);
            }
        );
    }
    
    function validateForm(e){
        e.preventDefault();
        let abc = /[a-z]/;
        //assign form values to object to send via emailjs
        var formValues = {
            name     : validName(),
            email    : validEmail(),
            msg      : validMsg(),
            service : formInterest.value
        }
        
        //validate name
        function validName(){
            let name = formName.value;
            if(name != '' && name.length <= 25 && abc.exec(name)){
                return name;
            } else {
                alert("ERROR");
            }
            //ELSE SHOW ERR AND RESET
        }
        //validate name
        function validEmail(){
            let email = formEmail.value;
            if(email != '' && email.length <= 25){
                return email;
            }
            //ELSE SHOW ERR AND RESET
        }
        //validate name
        function validMsg(){
            let msg = formMsg.value;
            if(msg != '' && msg.length <= 25){
                return msg;
            }
            //ELSE SHOW ERR AND RESET
        }
//        
//        //Test form for valid inputs
//        if(formValues.name != '' && formValues.email != '' && formValues.msg != ''){
//            //if form is valid hide form, show spinner, and send email
//            document.querySelector('form').style.display = 'none';
//            formMsg.innerHTML = '<h2><i class="fa fa-paw"></i></h2>';
//            
//        } else {
//            formMsg.style.display = 'block';
//            formMsg.innerHTML = '<h2>empty field</h2>';
//            return false;
//        }
        
//        sendForm(formValues);
    }
    
    //listen for click on the submit and check values before sending form
    formBtn.addEventListener('click', validateForm);
}());