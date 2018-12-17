$(document).ready(function(){

  // Acordion 1

  $(".mi_acordion_1 .boton_continuar_1_1").click(function() {
    $(".mi_acordion_1 .mi_acordion_tab_1_contenido").slideUp();
    $(".mi_acordion_1 .mi_acordion_tab_2_contenido").slideDown();
    $(".mi_acordion_1 .boton_editar_1_1").slideDown();
  });

  $(".mi_acordion_1 .boton_editar_1_1").click(function() {
    $(".mi_acordion_1 .mi_acordion_tab_1_contenido").slideDown();
    $(".mi_acordion_1 .mi_acordion_tab_2_contenido").slideUp();
    $(".mi_acordion_1 .boton_editar_1_1").slideUp();
  });

  $(".mi_acordion_1 .boton_editar_1_2").click(function() {
    $(".mi_acordion_1 .mi_acordion_tab_1_contenido").slideUp();
    $(".mi_acordion_1 .mi_acordion_tab_2_contenido").slideDown();
  });


  //Acordion 2

  $(".mi_acordion_2 .boton_continuar_1_1").click(function() {
    $(".mi_acordion_2 .mi_acordion_tab_1_contenido").slideUp();
    $(".mi_acordion_2 .mi_acordion_tab_2_contenido").slideDown();
    $(".mi_acordion_2 .boton_editar_1_1").slideDown();
  });

  $(".mi_acordion_2 .boton_editar_1_1").click(function() {
    $(".mi_acordion_2 .mi_acordion_tab_1_contenido").slideDown();
    $(".mi_acordion_2 .mi_acordion_tab_2_contenido").slideUp();
    $(".mi_acordion_2 .boton_editar_1_1").slideUp();
  });

  $(".mi_acordion_2 .boton_editar_1_2").click(function() {
    $(".mi_acordion_2 .mi_acordion_tab_1_contenido").slideUp();
    $(".mi_acordion_2 .mi_acordion_tab_2_contenido").slideDown();
  });

  // Acordion Preguntas Frecuentes

  $(".modal_pregunta span").slideUp();

  $(".modal_pregunta div").click(function() {
    $(this).find("span").slideToggle("fast");
    $(this).find("i").toggleClass("rota_ico_180");
  });
  
  // Acordion en Exito
  
  $(".contenido_acordion").delay(500).slideDown();
  
  $(".texto_inactivo, .acordion_icono").click(function() {
    
    if ($(".acordion").hasClass("acordion_inactivo")) {
      $(".contenido_acordion").slideDown();
      $(".texto_inactivo span").animate({opacity: 0}, 400, function() {});
      $(".contenido_acordion").animate({opacity: 1}, 400, function() {});
    } else {
      $(".contenido_acordion").slideUp();
      $(".texto_inactivo span").animate({opacity: 1}, 400, function() {});
      $(".contenido_acordion").animate({opacity: 0}, 400, function() {});
    }
    $(".acordion").toggleClass("acordion_inactivo");
    $(".acordion_icono").toggleClass("rota_ico_45");
    
  });
  
  // Abre acordion en paso 3
  
  $(".abre_acordion").click(function() {
    $(".acordion_paso_3").slideDown();
    
    $("html, body").animate({
      scrollTop: $('.acordion_paso_3').offset().top
    }, 400);
    
  });
  
  $(".cierra_acordion").click(function() {
    $(".acordion_paso_3").slideUp();
  });
  
  // Para que en el paso 1 con alerta de patente, funcion para que al hacer click en los botones vaya al mensaje
  $(".huincha_disable").click(function() {
    
    $("html, body").animate({
      scrollTop: $('body').offset().top
    }, 400);
    
  });
  
  // Ajuste telefono
  $( "#inputTelefono" ).focusin(function() {
    $( this ).val("+56");
  });
  $( "#inputTelefono" ).focusout(function() {
    $( this ).val("");
  });
  
  // Transforma los select para mobile
  $("*[data-style='select-with-transition']").removeClass("selectpicker").addClass("btn-group bootstrap-select");
  

});

