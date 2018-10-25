$(document).ready(function () {
    $(".dropdown-trigger").dropdown({ hover: false });
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {'height' : 500, 'indicators' : true});
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('.parallax').parallax();

    var form = document.messageForm;
    var ajaxLinks = document.querySelectorAll('.ajaxLink');

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