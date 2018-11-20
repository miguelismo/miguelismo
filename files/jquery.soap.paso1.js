function submitForm1(){	
	var combo = document.getElementById("tipoVehiculoSel");
	document.getElementById("tipoVehiculoDesc").value = combo.options[combo.selectedIndex].text;	
}

