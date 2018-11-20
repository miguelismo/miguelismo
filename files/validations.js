var inicio=true;
var inicial = false;
function validaTipo(){
	var rutPatente = $("#ddlTipoConsulta").val();
	if(rutPatente=='1'){
		$("#rutPatente").attr("placeholder","Patente");
		$("#rut").val("");
		$("#rut").css("display","none");
		$("#rutPatente").css("display","block");
		$("#rutPatente").removeAttr("disabled");
		$("#rut").attr("disabled","disabled");
		$("#rutPatente").attr("maxlength","6");
	}else{
		$("#rut").attr("placeholder","RUT");
		$('.bootstrap-select').fadeOut();
		$("#rutPatente").val("");
		$("#rutPatente").css("display","none");
		$("#rut").css("display","block");
		$("#rut").removeAttr("disabled");
		$("#rutPatente").attr("disabled","disabled");
		$("#rut").attr("maxlength","12");
	}
}

$('#rut').keyup(function() {
    this.value = this.value.toUpperCase();
});

$(window).load(function(){
	
	$('button[data-id="tipoVehiculoSel"]').addClass('form-control');
	
	$('#imprime').on('show.bs.modal', function () {
		 $('.login').removeClass('error');
		});
	$('#imprime').on('hidden.bs.modal', function () {
		 $('#impPatente').val('');
		 $('#poliza_form').removeClass('errorImp');
		 $("#mensaje").remove();
		 grecaptcha.reset();
		});
//	$("#rutPatente").keytext({
//		type: 'alphanumeric2'
//	});
	
//	$("#boton_ingresar").click(function () {
//		
//		var patente = $.trim($("#impPatente").val());
//		if ( patente.length == 0 || patente.length < 5) { 
//	    	$("#impPatente").addClass('error'); 
//	    	$("#impPatente").focus();return false;};				
////		imprimirPoliza(patente);
//	});
	
//	 jQuery('#rutPatente').keypress(function(tecla) {//para validar letra ingresada
//	        if(tecla.charCode >= 48 && tecla.charCode <= 57) return false;
////	        var patente =$("#rutPatente").val().trim();
////			var largo = patente.length;
////			var ultimo = patente.substring(largo-1,largo);
//	    });
	
	$("#rutPatente").mask('SSAA00');

	
	$(document).on('keyup','#rutPatente', function() {
		/*
//		alert();
//	$("#rutPatente").keyup(function(){
		if(inicio){			
			var patente =$("#rutPatente").val().trim();
			var largo = patente.length;
			var ultimo = patente.substring(largo-1,largo);
			//alert(ultimo);
			if(largo==1){
				$("#rutPatente").mask('SSAA00');
			}
			if(largo == 3){
				if(/\d/.test(ultimo)){
					$("#rutPatente").mask('SSA000');
				}else if(/\D/.test(ultimo)){
					$("#rutPatente").mask('SSAA00');
				}
			}
			
			if(largo>4){
				var cuerpo = patente.substring(2,4);
				if(/\d\D/.test(cuerpo)){
					var patente1=patente.substring(0,2);
					var patente2=patente.substring(3,largo);
					$("#rutPatente").val(patente1+patente2);
//					$("#rutPatente").mask('SS0000');
//				}else if(/\D\D/.test(ultimo)){
//					$("#rutPatente").mask('SSSS00');
				}
			}
		}
			*/
	});

     $("html, body").animate({ scrollTop: 0 }, "slow");

        //seteo variables
        var num = 1;
        var paso = 1;
        
        //Validacion patente
        $( "#rutPatente" ).change(function() {             
            $('.login').removeClass('error'); 
            $('.login').removeClass('errorPatentePagada');
            $('.selectpicker').prop('disabled', false);
            var patente = $('#rutPatente').val();
            
            $('#tipoVehiculoSel').val(getTipoVehiculo(patente.toUpperCase()));
    		$('.selectpicker').selectpicker('refresh');
    		
            if(patenteExistente()){
            	$("#login").addClass('errorDuplicada');
            	$('.bootstrap-select').fadeOut();
            	return false;
           }
            if(!estadoPatente(patenteMoto(patente))){
//            	$("#modalMensaje").modal("show");         	
            	$('#login').addClass('errorPatentePagada');
            	 $('.bootstrap-select').fadeOut();
            	return false;
            }
            if(patente.length==6){          	
           
	            if ( patente.match(/^[a-z]{2}[\.\- ]?[0-9]{2}[\.\- ]?[0-9]{2}|[b-d,f-h,j-l,p,r-t,v-z]{2}[\-\. ]?[b-d,f-h,j-l,p,r-t,v-z]{2}[\.\- ]?[0-9]{2}$/i) ){
	            	
		               $('.login').removeClass('error');   
		               
		               $('.bootstrap-select').fadeIn();
		               if ($(window).width() < 992) {
		                   $( ".lista-vehiculos" ).animate({  marginTop: "80px"  }, 100 );
		                } 
		              num = 0;
	               
	             }else{	            	 
	                 num = 0;
	                 $('.login').removeClass('error');  
		               $('.bootstrap-select').fadeIn();
		               if ($(window).width() < 992) {
		                   $( ".lista-vehiculos" ).animate({  marginTop: "80px"  }, 100 );
		                } 
		               
	                 if ( $.Rut.validar(patente) ) {
	                    $('.login').removeClass('error'); 
	                    $('.bootstrap-select').fadeIn(); 
	                    if ($(window).width() < 992) {
	                       $( ".lista-vehiculos" ).animate({  marginTop: "80px"  }, 100 );
	                    }
	                   // num = 0;
	                 }else{	                
	                   // $('.login').addClass('error');  
//	                    num = 1;	                  
	 	            }
//	                 var element = patente.toUpperCase();
//	                 var cuerpo=element.substring(2,4);
//		 	         if(/\D\d/.test(cuerpo)){
//		 	        	 if(cuerpo.substring(1,2)!='0' && $("#tipoVehiculoSel").val()!= 19){
//		 	        		 num = 0;
//		 	        		 $('.login').removeClass('error');
//		 	        	 }else{
//		 	        		 num = 1;
//		 	        	 }
//			            $('.bootstrap-select').fadeIn();
//			               if ($(window).width() < 992) {
//			                   $( ".lista-vehiculos" ).animate({  marginTop: "80px"  }, 100 );
//			                } 
//		 	         }
	             } 
             }

        });

       
        $("#tipoVehiculoSel").change(function() {  
        	
        	inicio=false;
        	var patente = $('#rutPatente').val();
        	var cod = $("#tipoVehiculoSel").val();
        	patente=patente.trim();
        	patente=patente.toUpperCase();

         		 //para cuando cambia el combobox
         	if(cod == "1" || cod == "4" || cod == "5" || cod == "2" || cod == "6"){ //si es auto,jeep,station, camioneta o furgoneta
         		
         		$("#rutPatente").mask('SSAA00');
         	}else if(cod == "32"){
         		
         		$("#rutPatente").mask('SSA000');
         	}else{//carro arrastre ( cod 19 )
         		
         		$("#rutPatente").mask('SSS000');
         	}
         	 //limpiar error
        	$('.login').removeClass('error');      	     	
          });
        
        //submit formulario home
        $("#toPaso1").submit(function(e){  

        	var rutPatente = $("#ddlTipoConsulta").val();
        	//Validacion PATENTE
        	if(rutPatente=='1'){
        	var patente = $("#rutPatente").val().trim();
        	patente=patente.toUpperCase();
        	$("#rutPatente").val(patente);
//            console.log(num);
            $('.login').removeClass('error'); 
            $('.login').removeClass('errorPatentePagada');
            $("#rutPatente").parent().removeClass('errorDuplicada');
           if(patenteExistente()){
        	   $('#login').addClass('errorDuplicada');
        	   $('.bootstrap-select').fadeOut();
            	return false;
           }
           if(!estadoPatente(patenteMoto(patente))){
            	$('#login').addClass('errorPatentePagada');
            	$('.bootstrap-select').fadeOut();
            	return false;
            }
            var dvp=buscaDigitoVerificador(patente);
            if(patente==""||dvp===''||patente.length<5){
            	$('#login').addClass('error');
                incompleto = true;
                $('.bootstrap-select').fadeOut();
                return false;
             }
            
            $('.bootstrap-select').fadeIn();
            if ($(window).width() < 992) {
                $( ".lista-vehiculos" ).animate({  marginTop: "80px"  }, 100 );
             } 
         // if(inicial){
          if(true){
            if( num == 1 ){
//            	if(!validarPatenteTipo()){
//            		$('#login').addClass('error');
//                    incompleto = true;
//                    return false;
//               	}else{
//               		inicial=false;
//               		return true;               		
//               	}
            	return true;   
            }else{
            	if(!validarPatenteTipo()){
            		$('#login').addClass('error');
                    incompleto = true;
                    return false;
            	}else{
            		inicial=false;
            		 return true;
            	}
            }
          }
          inicial=true;
          return false;
        }else{
        	var rutCompleto = $('#rut').val();
        	rutCompleto = rutCompleto.replace(".","");
        	rutCompleto = rutCompleto.replace(".","");
        	rutCompleto = rutCompleto.replace("-","");
        	rutInput = rutCompleto.substring(0,rutCompleto.length-1);
        	dvInput = rutCompleto.substring(rutCompleto.length-1,rutCompleto.length);
        	
        	dvValido = entregaDigito(rutInput);
        	
        	var rut = $("#rut").val().trim();
        	if(dvValido != dvInput){
        		$('#login').addClass('errorValidaRut');
        		$('.bootstrap-select').fadeOut();
        		return false;
        	}
        }
        });
    	
        //funcion no numeros
        function noNumber(){ 
            var regex = /^[0-9]+$/;
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (regex.test(key)) { 
               event.preventDefault();
               incompleto = true;
            }
        }

        //funcion solo numeros
        function siNumber(){ 
            var regex = /^[0-9.]+$/;
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) { 
               event.preventDefault();
               incompleto = true;
            }
        }
        
       
        
        //format rut
        $('#rut').Rut({
          validation: false,
          format_on: 'keyup', 
        });

        $(".item select").change(function () {
        	   	$(this).parent().removeClass("error");
	        	$(this).parent().removeClass("errorDuplicada");
	        	$(".login").removeClass("error");
	        	if($("#mensajePatente").length > 0 ){
	        		$("#mensajePatente").remove();
	        	}
        });
        
        $(".item input").keydown(function () {
    	   	$(this).parent().removeClass("error"); 
    	   	$(this).removeClass("errorDuplicada");
    });
        
        $(".item input").change(function () {
    	   	$(this).parent().removeClass("error"); 
    		$(this).removeClass("errorDuplicada");
    });
        
//        $(".item input, #rutPatente").focusin(function () {
        $("#rutPatente").focusin(function () {
        	$(this).parent().removeClass("error");
        	$(this).parent().removeClass("errorDuplicada");
        	$(".login").removeClass("error");
        	$('.login').removeClass('errorPatentePagada');
        	$('.login').removeClass('errorDuplicada');
        	$(".login").removeClass("errorValidaRut");
        	$(".login").removeClass("errorSinPatentes");
//        	if($("#mensajePatente").length > 0 ){
//        		$("#mensajePatente").remove();
//        	}
        });
        
        $("#rut").focusin(function () {
        	$(this).parent().removeClass("error");
        	$(this).parent().removeClass("errorDuplicada");
        	$(".login").removeClass("error");
        	$('.login').removeClass('errorPatentePagada');
        	$('.login').removeClass('errorDuplicada');
        	$(".login").removeClass("errorValidaRut");
        	$(".login").removeClass("errorSinPatentes");
        });
        
        
        //funcion validar movil
        function validar() {  
            //variables
            num == 1;
            paso == 1;
            //removemos clase error
            $(".item").removeClass('error');
            //seteo validacion email
            var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
            regex=/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;  
            /*seteo variables*/
            var rut = $.trim($("#rut").val() ); 
            var nombre = $.trim($("#nombre").val());
            var razon = $.trim($("#razonSocial").val());
            var materno = $.trim($("#apellidoMaterno").val());
            var paterno = $.trim($("#apellidoPaterno").val());
            var celular = $.trim($("#telefonoMovil_posfijo").val());
            var region = $("#region").val();
            var comuna = $("#comuna").val();
            var ciudad = $("#ciudad").val(); 
            /**/
            var marca = $("#marca").val();
            var modelo = $("#modelo").val();
            var color = $("#color").val();
            var fabricacion = $("#anioFabricacion").val();
            var motor = $.trim($("#numeroMotor").val()); 
            /**/
            var email1 = $.trim($("#email").val());
            var email2 = $.trim($("#email2").val());
            $("#email").val(email1);
            
            var incompleto=false;
            var incompleto2=false;
            var focused = true;

            if (limpiarRut(rut) <= 100) {  $("#rut").parent().addClass('error'); incompleto = true; 
            	if(focused){$("#rut").focus();focused=false;}};
            if ( !$.Rut.validar(rut) ) { $("#rut").parent().addClass('error'); incompleto = true; 
            	if(focused){$("#rut").focus();focused=false;}}
            if ($("#usoVehiculo option:selected").val() == 1) {
                if ( nombre.length == 0) {  $("#nombre").parent().addClass('error'); incompleto = true; 
            		if(focused){$("#nombre").focus();focused=false;}};
                if ( paterno.length == 0) {  $("#apellidoPaterno").parent().addClass('error'); incompleto = true; 
            		if(focused){$("#apellidoPaterno").focus();focused=false;}};
                if ( materno.length == 0) {  $("#apellidoMaterno").parent().addClass('error'); incompleto = true; 
            		if(focused){$("#apellidoMaterno").focus();focused=false;}}; 
            }else{
                if ( razon.length == 0) {  $("#razonSocial").parent().addClass('error'); incompleto = true; 
            		if(focused){$("#razonSocial").focus();focused=false;}
            		}else{
            			$("#nombre").val($("#razonSocial").val());
            			$("#apellidoPaterno").val("...");
            			$("#apellidoMaterno").val("...");
            		}
            } 
            if ( celular.length < 8 || celular.length > 9 ) {  $("#telefonoMovil_posfijo").parent().addClass('error'); incompleto = true; 
        		if(focused){$("#telefonoMovil_posfijo").focus();focused=false;}};
            if ( region == 0) {  $("#region").parent().addClass('error'); incompleto = true; 
        		if(focused){$("#region").focus();focused=false;}};
            if ( comuna == 0) {  $("#comuna").parent().addClass('error'); incompleto = true; 
        		if(focused){$("#comuna").focus();focused=false;}};
            if ( ciudad == 0) {  $("#ciudad").parent().addClass('error'); incompleto = true; 
        		if(focused){$("#ciudad").focus();focused=false;}};
            if ( email1.length == 0) {  $("#email").parent().addClass('error'); incompleto = true; 
        		if(focused){$("#email").focus();focused=false;}};
            if (!regex.test(email1)) { $("#email").parent().addClass('error'); incompleto = true;
        		if(focused){$("#email").focus();focused=false;}}
            paso = 0;

            if ( marca == 0 ) {  $("#marca").parent().addClass('error'); incompleto2 = true; 
        		if(focused){$("#marca").focus();focused=false;}};
            if ( modelo == 0) {  $("#modelo").parent().addClass('error'); incompleto2 = true; 
        		if(focused){$("#modelo").focus();focused=false;}};
            if ( color == 0) {  $("#color").parent().addClass('error'); incompleto2 = true; 
        		if(focused){$("#color").focus();focused=false;}};
            if ( fabricacion == 0) {  $("#anioFabricacion").parent().addClass('error'); incompleto2 = true; 
        		if(focused){$("#anioFabricacion").focus();focused=false;}};
            if ( motor.length == 0) {  $("#numeroMotor").parent().addClass('error'); incompleto2 = true; 
        		if(focused){$("#numeroMotor").focus();focused=false;}};
        	$("#rut").val($("#rut").val().toUpperCase());
        		
            if(incompleto){
            	return 1;
            }
            if(incompleto2){
            	return 2;
            }
             
            num = 0;
            return 0;
        }

        //bloqueo teclas
        $('#nombre, #apellidoMaterno, #apellidoPaterno').bind('keypress', function (event) {
            noNumber();
        }); 
        
        //cambio campos uso vehiculo
        $( "#usoVehiculo" ).change(function() { 

            if ( $(this).val() == 1 ) {
                 $("#razonSocial").hide();
                $("#nombre, #apellidoPaterno, #apellidoMaterno").show(); 
            }else{
                $("#razonSocial").show();
                $("#nombre, #apellidoPaterno, #apellidoMaterno").hide(); 
            };
        });
       
        //$("#data").submit(function(e){
       // $("#continuar").click(function() {
        	//valida form2
        //	validar();
         //   if( num == 1 ){
         //   	incompleto = true;
         //   }           
        //});

        //estilo selecionar
        $( "input[name='pago']" ).change(function() { 
            $('#tabla-pago tr').removeClass('active');
            $(this).parent().parent().addClass('active'); 
        });
        
        //Desabilitar botones si patente esta pagada o tiene poliza
        if($("#patentePagada").html() != null || $("#patenteConPoliza").html() != null){
        	$("#btn-continuar").prop('disabled', true);
        	$("#continuar").prop('disabled', true);
        	$(".item ").prop('disabled', true);
        }
        
        
        $("#btn-continuar").attr('value','Continuar');
        //validacion formulario en celular
        $( "#btn-continuar" ).click(function() { 

            var itemsIncompletos = validar();

            if( paso == 1 ){ 

            }else{ 
            	if(itemsIncompletos == 2||itemsIncompletos == 0){
	                $("html, body").animate({ scrollTop: 100 }, "slow");
	                $('#pasoDos .col-left, #pasoDos .col-correo, #pasoDos .col-email, #pasoDos .col-uso').slideUp();
	                $('#pasoDos .col-right').slideDown(); 
            	}
                if( num == 1 ){ 
                    incompleto = true;
                }else{ 
                	if(submitMovil==1){
//                		$( "#data" ).submit();
                		$(".cargando").fadeIn();
                		if($("#patente").val()!=""){
                			var nuevoDigito = buscaDigitoVerificador($("#patente").val());
                			$("#dvPatente").val(nuevoDigito);
                			
                			if(!patenteExistente()){
                				if(validarPaso2()){
                			        if(validarForm(true)){
//                			        	$("#btn-continuar").prop('disabled', true);
                			        	if(submitMovil=1){
	                			        	if(!checkCarroCompra()){
	                			        		$(".cargando").fadeOut();  
	                			    			//return false;  CBM 
	                			    		}  
	                			        }       		
                			        }else{	
                			        	$(".cargando").fadeOut();  
                			        	return false; 
                			        }
                				}else{
                					$(".cargando").fadeOut();  
                					return false; 
                				}
                			}else{
                				$(".cargando").fadeOut();  
                				return false;
                			}
                		}
                		$(".cargando").fadeOut();                		
                	}
                	if(itemsIncompletos == 0){
                		$("#btn-continuar").attr('value','Pagar');
				if(submitMovil==1){//CBM
				$("#data").submit(); //CBM
				}
				submitMovil=1;
                	}
                	
                }
            }

            
             incompleto = true;
        });
        
        var submitMovil=0;
      //funcion validar
        function validarDespacho() {  
             
            //removemos clase error
            $(".item").removeClass('error');
            //seteo validacion email
            var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

            /*seteo variables*/  
            var direccion = $.trim($("#Ddireccion").val());
            var postal = $.trim($("#Dcodigopostal").val());
            var telefono1 = $.trim($("#Dtelefono1").val()); 
            var emaildespacho = $.trim($("#Demail").val()); 
            var regionD = $.trim($("#region").val()); 
            var comunaD = $.trim($("#comuna").val()); 
            var ciudadD = $.trim($("#ciudad").val()); 
            /**/  

            
            var Dincompleto=false;
            var focused = true;
          	
            if ( direccion.length == 0) {  $("#Ddireccion").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#Ddireccion").focus();focused=false;}};
            if ( postal.length == 0) {  $("#Dcodigopostal").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#Dcodigopostal").focus();focused=false;}};
            if ( telefono1.length == 0) {  $("#Dtelefono1").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#Dtelefono1").focus();focused=false;}};
            if ( emaildespacho.length == 0) {  $("#Demail").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#Demail").focus();focused=false;}};
            if (!regex.test(emaildespacho)) { $("#Demail").parent().addClass('error'); Dincompleto = true;
            	if(focused){$("#Demail").focus();focused=false;}} 
            if ( regionD == 0) {  $("#region").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#region").focus();focused=false;}};
            if ( comunaD == 0) {  $("#comuna").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#comuna").focus();focused=false;}};
            if ( ciudadD == 0) {  $("#ciudad").parent().addClass('error'); Dincompleto = true; 
            	if(focused){$("#ciudad").focus();focused=false;}};
           
            if(Dincompleto)
            	return false;
            return true;
        }
        $(' #Dcodigopostal ,#Dtelefono1, #Dtelefono2, #telefonoMovil_posfijo').bind('keypress', function (event) {
            siNumber();
        });
        
        $( "#btn-despacho" ).click(function() { 
             
             result = validarDespacho(); 
             incompleto = true;
            if ( result == true) {
            	$('#despacho').submit();
                $('#modalDespachoF').modal('hide');
            }else{
                return false;
            };
            
        });
        

    });

function patenteMoto(patente){
	if(patente.length==5){//patente moto
		var cuerpoPatente = patente.substring(1,3);
		if(/\D\D/.test(cuerpoPatente)){//moto nuava
			patente=patente.substring(0,3)+'0'+patente.substring(3,5);
		}else if(/\D\d/.test(cuerpoPatente)){//moto antigua
			patente=patente.substring(0,2)+'0'+patente.substring(2,5);
		}
		$('#rutPatente').val(patente);
		$('#tipoVehiculoSel').val(32);
		$('.selectpicker').selectpicker('refresh');
	}
	//alert(patente);
	return patente;
}


//function validaTipoPatente(patente){
//	var element = patente.toUpperCase();
//	element = element.trim();
//	if(patente.length==5){//patente moto
//		var cuerpoPatente = element.substring(1,3);
//		if(/\D\D/.test(cuerpoPatente)){//moto nuava
//			patente=patente.substring(0,3)+'0'+patente.substring(3,5);
//			alert(patente); 
//		}else if(/\D\d/.test(cuerpoPatente)){//moto antigua
//			patente=patente.substring(0,2)+'0'+patente.substring(2,5);
//			alert(patente);
//		}
//	}
//	if (patente.length == 6) {		
//		var cuerpoPatente = element.substring(2,4);
//
//		if (/\d\d/.test(cuerpoPatente)){ //auto y moto antiguo
//		   
//		}else if (/\D\D/.test(cuerpoPatente)){ //auto nuevos
//		  		  
//		}else if(/\D\d/.test(cuerpoPatente)){ //motos nuevas y carros
//			return 1; 
//		}
//		return 2;
//	}else{		
//		return 0;	
//	}
//}

function validaPatenteIni(patente){
//	var element = patente.toUpperCase();
//	element = element.trim();
////	if(patente.length==5){//patente moto
////		var cuerpoPatente = element.substring(1,3);
////		if(/\D\D/.test(cuerpoPatente)){//moto nuava
////			patente=patente.substring(0,3)+'0'+patente.substring(3,5);
////			alert(patente); 
////		}else if(/\D\d/.test(cuerpoPatente)){//moto antigua
////			patente=patente.substring(0,2)+'0'+patente.substring(2,5);
////			alert(patente);
////		}
////	}
//	if (patente.length == 6) {
//		var element = patente.toUpperCase();
//		var cuerpoPatente = element.substring(2,4);
//
//		if (/\d\d/.test(cuerpoPatente)){ //auto y moto antiguo
//		   
//		}else if (/\D\D/.test(cuerpoPatente)){ //auto nuevos
//		  		  
//		}else if(/\D\d/.test(cuerpoPatente)){ //motos nuevas y carros
//			return 1; 
//		}
//		return 2;
//	}else{
//		return 0;
//	}
}







function validarPaso2() {  
    //removemos clase error
    $(".item").removeClass('error');
    $(".item").removeClass('errorDuplicada');
    //seteo validacion email
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    regex=/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    /*seteo variables*/
    var rut = $.trim($("#rut").val() ); 
    var nombre = $.trim($("#nombre").val());
    var razon = $.trim($("#razonSocial").val());
    var materno = $.trim($("#apellidoMaterno").val());
    var paterno = $.trim($("#apellidoPaterno").val());
    var celular = $.trim($("#telefonoMovil_posfijo").val());
    var region = $("#region").val();
    var comuna = $("#comuna").val();
    var ciudad = $("#ciudad").val(); 
    /**/
    var marca = $("#marca").val();
    var modelo = $("#modelo").val();
    var color = $("#color").val();
    var fabricacion = $("#anioFabricacion").val();
    var motor = $.trim($("#numeroMotor").val()); 
    /**/
    var email1 = $.trim($("#email").val());
    var email2 = $.trim($("#email2").val());
    $("#email").val(email1);
    var incompleto = false;
    var focused = true;

    if ( limpiarRut(rut) <= 100 ) {  
    	$("#rut").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#rut").focus();focused=false;}};
    if ( !$.Rut.validar(rut) ) {
    	$("#rut").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#rut").focus();focused=false;}}
    if ($("#usoVehiculo option:selected").val() == 1) {
        if ( nombre.length == 0) { 
        	$("#nombre").parent().addClass('error'); incompleto = true; 
        	if(focused){$("#nombre").focus();focused=false;}};
        if ( paterno.length == 0) {  
        	$("#apellidoPaterno").parent().addClass('error'); incompleto = true; 
        	if(focused){$("#apellidoPaterno").focus();focused=false;}};
        if ( materno.length == 0) {  
        	$("#apellidoMaterno").parent().addClass('error'); incompleto = true; 
        	if(focused){$("#apellidoMaterno").focus();focused=false;}}; 
    }else{
        if ( razon.length == 0) {  
        	$("#razonSocial").parent().addClass('error'); incompleto = true; 
        	if(focused){$("#razonSocial").focus();focused=false;}
	    }else{
			$("#nombre").val($("#razonSocial").val());
			$("#apellidoPaterno").val("...");
			$("#apellidoMaterno").val("...");
		}
    } 
    if ( celular.length < 8 || celular.length > 9 ) { 
    	$("#telefonoMovil_posfijo").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#telefonoMovil_posfijo").focus();focused=false;}};
    if ( region == 0) {  
    	$("#region").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#region").focus();focused=false;}};
    if ( comuna == 0) {  
    	$("#comuna").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#comuna").focus();focused=false;}};
    if ( ciudad == 0) {  
    	$("#ciudad").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#ciudad").focus();focused=false;}};
    if ( email1.length == 0) {  
    	$("#email").parent().addClass('error'); incompleto = true;
    	if(focused){$("#email").focus();focused=false;}};
    if (!regex.test(email1)) { 
    	$("#email").parent().addClass('error'); incompleto = true;
    	if(focused){$("#email").focus();focused=false;}}
    if ( marca == 0 ) {  
    	$("#marca").parent().addClass('error'); incompleto = true; 
    	if(focused){$("#marca").focus();focused=false;}};
    if ( modelo == 0) {  
    	$("#modelo").parent().addClass('error'); incompleto = true;
    	if(focused){$("#modelo").focus();focused=false;}};
    if ( color == 0) {  
    	$("#color").parent().addClass('error'); incompleto = true;
    	if(focused){$("#color").focus();focused=false;}};
    if ( fabricacion == 0) {  
    	$("#anioFabricacion").parent().addClass('error'); incompleto = true;
    	if(focused){$("#anioFabricacion").focus();focused=false;}};
    if ( motor.length == 0) {  
    	$("#numeroMotor").parent().addClass('error'); incompleto = true;
    	if(focused){$("#numeroMotor").focus();focused=false;}};
    $("#rut").val($("#rut").val().toUpperCase());	
    if(incompleto){
    	return false;
    }
    return true;
}

function limpiarRut(rut){
	while(rut.indexOf(".")>=0){
		rut  = rut.replace(".","");
    }
	while(rut.indexOf("-")>=0){
		rut  = rut.replace("-","");
	    }
    return rut.trim();
}

function validarPatenteTipo(){  	
	var patente = $('#rutPatente').val();
	var cod = $("#tipoVehiculoSel").val();
	patente = patente.trim();
	patente = patente.toUpperCase();
	patente = patenteMoto(patente);//agrego 0 a patente moto
	
	var cuerpoPatente = patente.substring(2,4);	
	var tipoPatente = -1;
	
	if (/\d\d/.test(cuerpoPatente)){ //auto y moto antiguo
		if(cuerpoPatente.substring(0, 1)=="0"){
			tipoPatente=32;//moto
		}else{
			tipoPatente=1;//auto
		}		
	}else if (/\D\D/.test(cuerpoPatente)){ //auto nuevos
		tipoPatente=1; //auto
	}else if(/\D\d/.test(cuerpoPatente)){ //motos nuevas y carros
		if(cuerpoPatente.substring(1, 2)=="0"){
			tipoPatente=32;//moto
		}else{
			tipoPatente=19;//carro
		} 
	}
	if(tipoPatente==-1){
		return false;
	}
	//para cuando cambia el combobox
 	if(cod == "1" || cod == "4" || cod == "5" || cod == "2" || cod == "6"){ //si es auto,jeep,station, camioneta o furgoneta
 		if(tipoPatente!=1){
 			return false;
 		}
 	}else if(cod == "32"){
 		if(tipoPatente!=32){
 			return false;
 		}
 	}else{//carro arrastre ( cod 19 )
 		if(tipoPatente!=19){
 			return false;
 		}
 	}
	return true;	 	       	     	
}

//function subs(texto,inicio, fin){
//	var charTexto= texto.split('');
//	var salida='';
//	for(var x=inicio-1;x<fin;x++)
//		salida+=charTexto[x];
//	return salida;
//	}
function buscaDigitoVerificador(patente) {
	element = patente;
	var parInicioPatente =element.substring(0, 2);
	var cuerpoPatente =element.substring(2, 4);
	var parFinalPatente = element.substring(4, 6);
	var cuartetoInicioPatente =element.substring(0, 4); // para vehiculos nuevos
	var trioInicioPatente =element.substring(0, 3); // para motos nuevas y carros
	var trioFinalPatente =element.substring(3, 6); // para motos nuevas y carros
	var patenteNumero = "";

	if (/\d\d/.test(cuerpoPatente)) { // auto y moto antiguo
		patenteNumero = getDigitoPatente(parInicioPatente);
		if (patenteNumero.length > 0) {
			patenteNumero = patenteNumero + cuerpoPatente + parFinalPatente;
		}
	} else if (/\D\D/.test(cuerpoPatente)) { // auto nuevos
		for ( var i = 0; i < cuartetoInicioPatente.length; i++) {
			switch (i) {
			case 0:
				patenteNumero = getDigitoPatente(cuartetoInicioPatente
						.charAt(i));
				break;
			default:
				patenteNumero = patenteNumero+
						+ getDigitoPatente(cuartetoInicioPatente.charAt(i));
				break;
			}
		}
		patenteNumero = patenteNumero + parFinalPatente;
	} else if (/\D\d/.test(cuerpoPatente)) { // motos nuevas y carros
		for ( var i = 0; i < trioInicioPatente.length; i++) {
			switch (i) {
			case 0:
				patenteNumero = getDigitoPatente(trioInicioPatente
						.charAt(i));
				break;
			default:
				patenteNumero = patenteNumero
						+ getDigitoPatente(trioInicioPatente.charAt(i));
				break;
			}
		}
		patenteNumero = patenteNumero + trioFinalPatente;
	}
	if (!isNaN(patenteNumero)) {
		return entregaDigito(patenteNumero);
	} else {// si es distinto, es porque se obitne una valor nulo de la
			// letra de la patente, por ejemplo patente que tengan AAA,
			// EEE,O , etc. inclusive solo 1 letra en el trio
		return "";
	}
	
}
function entregaDigito(fElRut){
	var ElRut  = fElRut;
	var largo_rut = ElRut.length;
	var suma=0;
	var mult=2;
	for (var i=largo_rut-1;i>=0;i--){
		c=ElRut.charAt(i);
		suma+=parseInt(c,10)*mult;
		mult++;
		if (mult>7) mult=2;
	}
	var rest=11-suma%11;
	return rest === 11 ? 0 : rest === 10 ? "K" : rest;
}

//Patente existente en carro
function patenteExistente(){
	var selector = "#PAT"+$("#rutPatente").val();
	selector=selector.toUpperCase();
	if ($(selector).html() != null) {
		return true;
	}
 return false;
}