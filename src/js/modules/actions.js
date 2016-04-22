$( window ).resize(function() {
});

(function($){

    //masonry
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

//==carousel-group==//
    //carousel-auto
    $(".carousel--auto .carousel-list").owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        lazyLoad: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 2
            },
            768:{
                items: 4
            },
            1025:{
                items: 4
            }
        }
    });

    //carousel-scroll
    $(".carousel--scroll .carousel-list").owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass: true,
        lazyLoad:true,
        nav: false,
        responsive:{
            0:{
                items: 3,
                loop: true
            },
            768:{
                items: 4,
                loop: true
            },
            1025:{
                items: 6,
                loop: false
            }
        }
    });
    var owl = $('.carousel--scroll .owl-carousel');
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY>0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    //sticky sidebar
    $(".project-sidebar, .sidebar").parent().stick_in_parent()
        .on('sticky_kit:bottom', function(e) {
            $(this).parent().css('position', 'static');
        })
        .on('sticky_kit:unbottom', function(e) {
            $(this).parent().css('position', 'relative');
        });

    //sledge hover
    $(".portfolio-item, .carousel-item").each( function() { $(this).hoverdir(); } );

    // blog btn-more
    $( ".blog-btn-more" ).click(function(event) {
        $(this).closest(".blog-item").addClass("is-active");
        var el = $(this).prev(".blog-content-wrapper").find(".blog-content");
        var contentHeight = el.outerHeight();
        $(this).closest(".blog-item").find(".blog-content-wrapper").css("height", contentHeight);
    });
    $( ".blog-btn-close" ).click(function(event) {
        $(this).closest(".blog-item").removeClass("is-active");
        var contentHeight = 690;
        $(this).closest(".blog-item").find(".blog-content-wrapper").css("height", contentHeight);
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
    $( ".nav-btn" ).click(function(event) {
        $( ".nav" ).addClass( "is-active" );
        $( "body" ).addClass( "is-hidden" );
    });
    $( ".nav-close" ).click(function(event) {
        $( ".nav" ).removeClass( "is-active" );
        $( "body" ).removeClass( "is-hidden" );
    });

    //side-menu
    $( ".nav--side .nav-btn" ).click(function(event) {
        $( ".nav--side" ).addClass( "is-active" );
    });
    $( ".nav--side .nav-close" ).click(function(event) {
        $( ".nav--side" ).removeClass( "is-active" );
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


    /*$(window).resize(function() {
        if ($(this).width() < 767) {
            $(".project-sidebar, .sidebar").parent().stick_in_parent(function(event){
                $(this).css("background", "red");
                event.stopPropagation();
            })
        }
    });*/

});


