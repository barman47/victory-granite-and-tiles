$(document).ready(function () {
    $(".dropdown-trigger").dropdown({ hover: false });
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {'height' : 500, 'indicators' : true});
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('.parallax').parallax();
    $('.sidenav').sidenav();

    var form = document.messageForm;
    var name = form.customerName;
    var email = form.email;
    var phone = form.phone;
    var message = form.message;
    var ajaxLinks = document.querySelectorAll('.ajaxLink');

    var phoneRegExp = /^\d{11}$/;
    var emailRegExp =  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    function isEmpty (element) {
        if (element.value === '' || element.value.trim() === '') {
            return true;
        } else {
            return false;
        }
    }

    function checkInputs () {
        if (isEmpty(name)) {
            M.toast({ html: 'Please enter your name' });
            name.focus();
            return false;
        } else if (isEmpty(phone)) {
            M.toast({ html: 'Please provide your phone number' });
            phone.classList.add('invalid');
            phone.focus();
            return false;
        } else if (isEmpty(message)) {
            M.toast({ html: 'Please fill out the product description' });
            message.classList.add('invalid');
            message.focus();
            return false;
        }
        return true
    }

    function sendEmail () {
        $('#messageButton').html('SENDING MESSAGE . . .');
        form.disabled = true;
        let payload = {
            name: $('#customerName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val()
        };

        const url = '/email';
        
        $.ajax({
            type: 'POST',
            url,
            data: payload
        }).done (function () {
            M.toast({
                html: 'Message Sent. You will be contacted Shortly.',
                classes: 'rounded',
            });
            $('#messageButton').html('SEND MESSAGE');
            form.reset();
        }).fail(function (jqXHR, status) {
            M.toast({
                html: 'Message not Sent. Please make sure you have an active internet connection.',
                classes: 'rounded'
            });
            $('#messageButton').html('SEND MESSAGE');
            form.disabled = false;
        });   
    }

    function sendMessage (event) {
        event.preventDefault();
        if (isEmpty(name) || isEmpty(phone) || isEmpty(message)) {
            checkInputs();
        } else {
            sendEmail();
        }
    }

    $('#top').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('top').style.display = 'block';
        } else {
            document.getElementById('top').style.display = 'none';	
        }
    };

    function fetchContent (event) {
        var url = event.target.dataset.href;
        $('#target').empty();
        $( "#target" ).load(url, function() {
            $('.materialboxed').materialbox();
            $('#products-showcase').remove();
            $('.scrollspy').scrollSpy();
        });
    }

    email.addEventListener('keyup', function () {
        if (emailRegExp.test(email.value)) {
            email.classList.add('valid');
            email.classList.remove('invalid');
        } else {
            email.classList.add('invalid');
            email.classList.remove('valid');
        }
    });
    phone.addEventListener('keyup', function () {
        if (phoneRegExp.test(phone.value)) {
            phone.classList.add('valid');
            phone.classList.remove('invalid');
        } else {
            phone.classList.add('invalid');
            phone.classList.remove('valid');
        }
    });

    ajaxLinks.forEach(function(link) {
        link.addEventListener('click', fetchContent);
    });

    form.addEventListener('submit', sendMessage);
});