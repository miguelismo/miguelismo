/*
 * JQuery FormFlex 1.0
 * Autor: Esteban Avendaño
 * Objetivo: Validar campos de formulario flexible
 */
 
(function($) {

	$.fn.keytext = function(options) {
	
		var opts = $.extend($.fn.keytext.defaults, options);
		
		return this.each(function () {
			if ($(this) == null || $(this) == 'undefined') return null;
			
			$(this).keytext.options = opts;
			
			var letters = 'abcdefghijklmnñopqrstuvwxyz ';
			var letters2 = 'abcdefghijklmnñopqrstuvwxyz';
			var numbers = '0123456789';
			var caracter = '-';
			var emailChars = '_-@.abcdefghijklmnopqrstuvwxyz' + numbers;
			var digitoVerif = numbers += 'k';
			
			if (opts.disableKeys && opts.type != 'email') {
				$(this).keydown(function (event) { return disableKeys(event); });
			}
			
			if (opts.type == 'alphanumeric') {
				var chars = letters + numbers;
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, chars); });
			}

			if (opts.type == 'alphanumeric2') {
				var chars = letters2 + numbers;
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, chars); });
			}
			
			if (opts.type == 'alphanumeric3') {
				var chars = letters2 + caracter + numbers;
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, chars); });
			}			
		
			
			if (opts.type == 'numeric') {
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, numbers); });
			}
			
			if (opts.type == 'alpha') {
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, letters); });
			}
			
			if (opts.type == 'dv') {
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, digitoVerif); });
			}
			
			if (opts.type == 'email') {
				var chars = letters + numbers;
				// Redefine función para permitir ingreso de _@ 
				$(this).unbind('keydown');
				$(this).keydown(function (event) {
					var e = event;
					if (e.altKey) { return true; }
					if (e.shiftKey) { return true; }
					if (opts.disableKeys == true) { 
						if (e.ctrlKey) { return false; }
					}
				});
				$(this).unbind('keypress');
				$(this).keypress(function (event) { return validateKeyChar(event, emailChars); });
			}
		});
	};
	
	// Tipos válidos de formflex
	// alphanumeric = Permite ingresar letras y numeros
	// alpha 		= Permite ingresar letras
	// numeric		= Permite ingresar numeros
	// email		= Permite ingresar caracteres del email (incluye validación)
	// dv			= Permite ingresar caracteres de Digito Verificador RUT.
	
	// disableKeys	= Deshabilita las teclas como CTRL, SHIFT, ALT
	$.fn.keytext.defaults = {
		type: 'alphanumeric',
		disableKeys: true
	};
	
})(jQuery);

function disableKeys(e) {
	if (e.altKey || e.ctrlKey) {
		return false;
	}
	return true;
}

function validateKeyChar(e, chars) {
	var key;
	var sKey;
	var char;
	if (window.event) {
		key = window.event.keyCode;
	} else {
		key = (e.which ? e.which : e.keyCode);
	}
	if (key == 8 || key == 9) { return true; } // 8 = TAB, 9 = RET
	
	sKey = String.fromCharCode(key).toLowerCase();
	if (chars.indexOf(sKey) >= 0) {
		return true;
	}
	return false;
}
