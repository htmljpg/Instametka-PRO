$(document).ready(function(){
    
    // carousel
    $('.video__carousel').owlCarousel({
        items: 1,
        nav: false,
        loop: false,
        margin: 0,
        center: false,
        autoWidth: false,
        dots: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
		autoplay: false,
		autoplayTimeout: 4000,
        lazyLoad: true,
    });
    $('.clients__carousel').owlCarousel({
        nav: false,
        loop: true,
        margin: 0,
        center: false,
        autoWidth: false,
        dots: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
		autoplay: false,
		autoplayTimeout: 4000,
        lazyLoad: true,
        responsive : {
            768 : {
                items: 3,
            },
            576 : {
                items: 2,
            },
            0 : {
                items: 1,
            }
        }
    });
    
    // кнопка показать еще ПРИМЕРЫ НАШИХ РАБОТ
    $('.exaple__btn').on("click", function(){
        $(this).parent('.exaple__button').addClass('exaple__button--hidden');
        $('.example__item').addClass('example__item--visible');
    });

    // Modal Window
    var open_modal = $('.open-modal');
    var close = $('.modal__close, .modal__overlay');
    var modal = $('.modal');

     open_modal.click( function(event){
         event.preventDefault();
         $('body').addClass('on');
         var div = $(this).attr('href');
         var overlay = $(div).find('.modal__overlay');
         overlay.fadeIn(100,
             function(){
                 $(div)
                     .css('display', 'block') 
                     .animate({opacity: 1, top: '0'}, 200);
         });
     });

     close.click( function(){
            $('body').removeClass('on');
            var modal = $(this).parents('.modal');
            modal
             .animate({opacity: 0, top: '0'}, 200,
                 function(){
                     $(this).css('display', 'none');
                     $(modal).find('.modal__overlay').fadeOut(400);
                 }
             );
     });

     // Form validate
    $('form').each(function() {
        $(this).validate({
            highlight: function(element) {
                $(element).addClass('form__input--error');
            },
            unhighlight: function(element) {
                $(element).removeClass('form__input--error');
            },
            errorPlacement: function(error,element) {
                return true;
            },
            errorClass: 'form__error',
            errorElement: 'div',
            rules: {
                userName: {
                    required: true,
                },
                userPhone: {
                    required: true,
                }
            },
            messages: {
                userName: {
                    required: '',
                },
                userPhone: {
                    required: '',
                }
            },
            submitHandler: function (form) {
                var formID = $(form).attr('id');
                var formNm = $('#' + formID);
                $.ajax({
                    type: "POST",
                    url: 'mail.php',
                    data: formNm.serialize(),
                    success: function (data) {
                        $(formNm).html(data);
                        setTimeout(function () {
                                $('body').removeClass('on');
                                $(".modal").css('display', 'none');
                                $(".modal__overlay").fadeOut(400);
                        }, 3000);
                    },
                    error: function (jqXHR, text, error) {
                        $(formNm).html(error);         
                    }
                });
                return false;
            }
        });
    });
    
    // mask
    $('input[type="tel"]').mask('+7 (999) 999-99-99');

    // Ajax
   
    
    /*Показываем карту только когда докрутили до нее*/
    "use strict";
    $(function() {
        $(".youtube").each(function() {
            // Based on the YouTube ID, we can easily find the thumbnail image
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Overlay the Play icon to make it look like a video player
            $(this).append($('<div/>', {'class': 'play'}));

            $(document).delegate('#'+this.id, 'click', function() {
                // Create an iFrame with autoplay set to true
                var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
                if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

                // The height and width of the iFrame should be the same as parent
                var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

                // Replace the YouTube thumbnail with YouTube HTML5 Player
                $(this).replaceWith(iframe);
            });
        });
    });
});