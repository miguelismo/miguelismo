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

});
