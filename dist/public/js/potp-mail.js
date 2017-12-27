(function(w, d){
    var form            = d.querySelector('form');
    var formMsg     = d.getElementById('form-success');

    var sendMail = function(e, values){
        e.preventDefault();
        console.log('sending');
        
        emailjs.send("sendgrid","new_customer", values)
            .then(function(response) {
            
                form.style.display = 'none';
                formMsg.style.display = 'block';
                formMsg.innerHTML = '<h2>Message sent successfuly</h2>';
            }, function(err) {
                console.log("FAILED. error=", err);
            }
        );
    }
    w.sendMail = sendMail;
    //listen for click on the submit and check values before sending form
//    form.addEventListener('validated', sendMail);
}(window, document));

if (typeof module !== 'undefined' && module.exports) {
    module.exports = sendMail;
}