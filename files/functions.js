$(window).load(function(){

      //Plugin diseño select
      $('.selectpicker').selectpicker();

      //plugin slider
      $('.bxslider').bxSlider({
        mode: 'fade',
        auto: false,
        pause: 6500,
        touchEnabled: false,
        controls: false,

        onSlideBefore: function(){ 
         //  $('.login').fadeOut('fast');
        },
        onSlideAfter: function(){ 
         // $('.login').fadeIn('fast');
        }
      });

      //plugin placeholder
      $('input, textarea').placeholder();

       
       $( ".btn-carro" ).click(function() { 
            $('.col-resumen').slideDown();
             return false;
        });

      $( "#btn-cerrar" ).click(function() { 
          $('.col-resumen').slideUp();
           return false;
      });




      //acordeon faq
      $('.respuesta').hide();
        /*$('.trigger:first')
            .addClass('current')
            .next()
            .show();*/
          
        $('.trigger').click(function(){
            if( $(this).next().is(':hidden') ) {
                $('.trigger')
                    .removeClass('current')
                    .next()
                    .slideUp();
                $('.trigger').find('i').addClass('icon-icon-expand'); 
                $('.trigger').find('i').removeClass('icon-icon-collapse'); 
                $(this).find('i').removeClass('icon-icon-expand'); 
                $(this).toggleClass('current')
                    .next()
                    .slideDown();
                $(this).find('i').addClass('icon-icon-collapse');
            }
            return false;
        });



      // Waypoints menu 
      if ($('a.smoothScroll').length > 0) { 
        $(function(){
            $('a.smoothScroll').smoothScroll({
                offset: -30,      
                scrollTarget: $(this).val()
            });
       
       // Waypoints
        $('.article').waypoint( 

            function(direction) {

                if (direction ==='down') {            
                    var wayID = $(this).attr('id'); 
                            
                } else {
                    var previous = $(this).prev();
                    var wayID = $(previous).attr('id');    
                                      
                }

                $('.active').removeClass('active');
                $('#sidebar a[href=#'+wayID+']').addClass('active');

            }, { offset: '30%' });
        
            var stickyNavTop = $('.nav').offset().top;  
  
                var stickyNav = function(){  
                var scrollTop = $(window).scrollTop();  
               
                if (scrollTop > stickyNavTop) {   
                    $('.nav').addClass('isStuck');  
                } else {  
                    $('.nav').removeClass('isStuck');   
                }  
            };  
       
       
                  

        });
        
        //animacion menu lateral
        $(function() {
          var offset = $("#sidebar").offset(); 
          var topPadding = 125;

          $(window).scroll(function() {
          if ( $("#sidebar").height() < $(window).height() && $(window).scrollTop()+125 > offset.top && $(window).scrollTop() < $(".central").height() ) { 
            $("#sidebar").stop().animate({
              marginTop: $(window).scrollTop() - offset.top + topPadding  
            });
             
          } else {
            $("#sidebar").stop().animate({
            marginTop: 0
          });
          };
          });
        });    
        }

    //eliminar item de Carro
     //$('.btn-eliminar').click(function(){
    	//  $(this).parent().parent().parent().remove();
    	 // return false;
      //});
    
    });