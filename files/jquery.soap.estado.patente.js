function estadoPatente(patente) {
	if(patente.length==6){
		var response = null;
		var salida=true;
		$.ajaxSetup({async:false});
		$.ajax({
			cache: false,
			type: "GET", 
			dataType: "xml", 
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			url : "estadoPatente.do", 
			data: ({
				patente : patente
			}),
			error : function () {
			},
			success : function (xml) {
				$(xml).find("Error").each(function () {
				});
				$(xml).find("Vehiculo").each(function () {								
					response = $(this).find("Estado").text();
					if(response=="vehiculo.Con.Poliza"){
						salida = false;
					}else if(response=="vehiculo.Con.Poliza.Pagada"){
	
						salida = false;
					}else if(response=="vehiculo.Sin.Poliza" || response=="vehiculo.No.Registrado"){
						salida = true;
					}			
				});
			}
		});
		return salida;
	}
	return true;
}

function getTipoVehiculo(patente) {
	if(patente.length==6){
		var response = 1;
		var salida = 1;
		$.ajaxSetup({async:false});
		$.ajax({
			cache: false,
			type: "GET", 
			dataType: "xml", 
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			url : "tipoVehiculo.do", 
			data: ({
				patente : patente
			}),
			error : function () {
			},
			success : function (xml) {
				$(xml).find("Error").each(function () {
				});
				$(xml).find("Vehiculo").each(function () {								
					response = $(this).find("Tipo").text();
					if(response > 0){
						salida = response;
					}else {
						salida = 1;
					}
				});
			}
		});
		return salida;
	}
	return 1;
}