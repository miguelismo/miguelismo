$(document).ready(function () {

	$("#boton_ingresar").click(function () {
		
		var patente = $.trim($("#impPatente").val());
		if ( patente.length == 0 || patente.length < 5) { 
	    	$("#impPatente").parent().addClass('errorImp'); 
	    	$("#impPatente").focus();return false;};				
		imprimirPoliza(patente);
	});
	
	$( "#impPatente" ).keydown(function() {
    	$('#impPatente').parent().removeClass('errorImp'); 
    });
	
	if ($('.generarPoliza').length){	
		 //Ejecutar si existe el elemento
		$(".generarPoliza").each(function () {	
			var id = $(this).attr("id");
			$("#"+id).text("Generando Póliza");
			$.ajaxSetup({async:false});
			$.ajax({
				cache: false,
				type: "POST",
				url : "getPoliza.do",
				data: ({ patente: id }),
				dataType : "html",
				error : function (html, textStatus, xhr) {
					$("#"+id).html("ERROR GENERANDO PÓLIZA");
					//alert("IMPRIMIR" + html);
				},
				success : function(html, textStatus, xhr) {
					$("#"+id).html("<b>"+html+"</b>");
				}
			});
		});
	}
	
});

function imprimirPoliza(patente) {
	$(".cargando").fadeIn();
	if($("#mensaje").length > 0 ){
		$("#mensaje").remove();
	}
	var response = null;
//	var cap= grecaptcha.getResponse();
	var cap=$.trim($("#g-recaptcha-response").val());
	$.ajaxSetup({async:false});
	$.ajax({
		cache: false,
		type: "GET", 
		dataType: "xml", 
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		url : "imprimir.do", 
		data: ({
			action : "action",
			patente : patente,
			recaptcha: cap
		}),
		error : function () {
			var HTML_FILE_SOAP = "<div id=\"mensaje\"><strong>";
			HTML_FILE_SOAP += "<p id=\"mensaje\" style=\"color: #ff0000;\">Error interno en obtencion de Póliza.</p>";
			HTML_FILE_SOAP += "</strong></div>";
			$("#mensaje_container").append(HTML_FILE_SOAP);	
			$(".cargando").fadeOut();
			return false;
		},
		success : function (xml) {
			$(xml).find("Error").each(function () {
				var message = $(this).find("Message").text();
				var HTML_FILE_SOAP = "<div id=\"mensaje\"><strong><p style=\"color: #ff0000;\">"+message+"</p></strong></div>";
				$("#mensaje_container").append(HTML_FILE_SOAP);	
				$(".cargando").fadeOut();
				return false;
			});
			
			//alert('success');
			$(xml).find("Poliza").each(function () {								
				response = $(this).find("Url").text();
				response=decodeURIComponent((response+'').replace(/\+/g, '%20'));
				var HTML_FILE_SOAP = "<div id=\"mensaje\"><strong>" +
						"<p>Abriendo Póliza de patente "+patente.toUpperCase()+"</p></strong>" +
								"<p>También puede descargarla en el siguiente link: <a href=\""+response+"\" target=\"_blank\">Descarga</a></p></div>";
				$("#mensaje_container").append(HTML_FILE_SOAP);	
				$(".cargando").fadeOut();
				window.open(response, '_blank');
			});
			
			$(xml).find("PolizaPenta").each(function () {								
				response = $(this).find("Url").text();
				response=decodeURIComponent((response+'').replace(/\+/g, '%20'));
				var HTML_FILE_SOAP = "<div id=\"mensaje\"><strong>" +
						"<p>Direccionado a PENTA.</p></strong>" +
						"<p>Si no direcciona click en el siguiente link: <a href=\""+response+"\" target=\"_blank\">IR A PENTA</a></p></div>";
				$("#mensaje_container").append(HTML_FILE_SOAP);	
				$(".cargando").fadeOut();
				window.open(response, '_blank');
			});
		}
	});
	
}