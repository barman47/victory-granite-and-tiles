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
    var ajaxLinks = document.querySelectorAll('.ajaxLink');

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

    ajaxLinks.forEach(function(link) {
        link.addEventListener('click', fetchContent);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });
});