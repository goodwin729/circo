$( window ).resize(function() {
});

(function($){

    //carousel
    $(window).load(function(){
        $('.portfolio--masonry').masonry({
            // options
            gutter: 0,
            percentPosition: true,
            itemSelector: '.portfolio-item'
        });
        $(window).resize(function() {
            if(window.innerWidth > 1900) {
                $('.portfolio--masonry').masonry({
                    // options
                    fitWidth: true
                });
            } else {
                $('.portfolio--masonry').masonry({
                    // options
                    fitWidth: false
                });
            }
        });
    });

})(jQuery);

$(document).ready(function(){

    $(".carousel-list").owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass: true,
        lazyLoad:true,
        nav: false,
        responsive:{
            0:{
                items: 1,
                loop: true
            },
            600:{
                items: 3,
                loop: true
            },
            1000:{
                items: 6,
                loop: false
            }
        }
    });
    var owl = $('.owl-carousel');
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY>0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    //sledge hover
    $(".portfolio-item, .carousel-item").each( function() { $(this).hoverdir(); } );

    //sticky sidebar
    $('.project-sidebar, .sidebar').parent().stick_in_parent()
        .on('sticky_kit:bottom', function(e) {
            $(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function(e) {
            $(this).parent().css('position', 'relative');
        });

    // blog btn-more
    $( ".blog-btn-more" ).click(function(event) {
        $(this).closest(".blog-item").addClass("is-active");
    });


    //select-dropdown
    $( ".select" ).click(function(event) {
        $(this).toggleClass( "is-active" );
    });
    $(document).click( function(event){
        if( $(event.target).closest( ".select" ).length )
            return;
        $( ".select" ).removeClass( "is-active" );
        event.stopPropagation();
    });


    //mobile-menu
    $( ".btn-mobile-trigger" ).click(function(event) {
        $( ".nav-mobile" ).toggleClass( "is-active" );
        $( "body" ).toggleClass( "is-hidden" );
    });
    $(document).click( function(event){
        if( $(event.target).closest( ".nav-mobile" ).length )
            return;
        $( ".nav-mobile" ).removeClass( "is-active" );
        $( "body" ).removeClass( "is-hidden" );
        event.stopPropagation();
    });

    //external links attribute
    $("body").on('click',
        "a[href^='http']:not([href*='" + document.domain + "']), " +
        "a[href^='https']:not([href*='" + document.domain + "']), " +
        "a[href$='.pdf']:not([href*='" + document.domain + "']), " +
        "a[href$='.pdf']" +
        "a.external", function() {
        $(this).attr('target', '_blank');
    });

    $("a[href^='#']").attr('href', 'javascript:;');

});


