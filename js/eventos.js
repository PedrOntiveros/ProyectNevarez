const rq = require ('electron-require');
const main = rq.remote('./main.js');
const $ = require("jquery");

var iniciaApp = function(){
	//función para poner en el título la fecha del día de hoy.
	var fechaTit = fechaTitulo();
	var fechaAct = fechaActual();
	$("#titulo").html(fechaTit);

	var obtenInfoCubiculo = function(){
		//Esto solo debe funcionar para los botones de cubiculos
		var cubiculo = ($(this).attr("id")).substr(-2);
		var hora 	 = ($(this).attr("id")).substr(3,2)+":00";
		$("#general").html("Cubiculo "+cubiculo+" hora "+hora);
		if(hora == 'Re:00'){
			//Aquí llamamos a la función para generar reporte
		}else{
			//Aquí hacemos la consulta para verificar que el cubiculo en la hora 
			//seleccionada no esté ocupado.
			//Se hace consulta del cubiculo y se llenan los campos con la información requerida
			var parametros ="opcion=consulta"+
						    "&cubiculo="+cubiculo+
						    "&hora="+hora+
						    "&fecha="+fechaAct+
						    "&id="+Math.random();
			var consultaCubiculo=$.ajax({
				method:"POST",
				url:"php/datos.php",
				data:parametros,
				dataType:"json"
			});
			consultaCubiculo.done(function(data){
				if(data.respuesta==true){
					$("#txtNumeroControl").val(data.nControl);
					$("#txtNombre").val(data.nombre);
					$("#txtCarrera").val(data.carrera);
					$("#txtFecha").val(data.fechaAct);
					$("#txtHora").val(data.hora);
					$("#txtCubiculo").val(data.cubiculo);
				}else{
					$("#txtFecha").val(fechaAct);
					$("#txtHora").val(hora);
					$("#txtCubiculo").val(cubiculo);
				}
			});
			consultaCubiculo.fail(function(jqError,textStatus){
			});
			
			
		}
	}

	var hazReporte = function(){
		//Elaborar reporte por alumno:
	}
	var liberar= function(){
	 	var numeroControl =$("#txtNumeroControl").val();
		var nombre 		  =$("#txtNombre").val(); 
		var carrera  	  =$("#txtCarrera").val();
		var fecha    	  =$("#txtFecha").val();
		var hora      	  =$("#txtHora").val();
		var cubiculo      =$("#txtCubiculo").val();
		if(nombre== "" | carrera == "" | numeroControl == ""){
			alert("Por favor llene todos los campos para poder liberar el cubiculo.");
			return;
		}
		if(fecha == "" | hora == "" | cubiculo == ""){
			alert("Por favor selecciona un cubiculo.");
			return;
		}else{
			var parametros="opcion=liberar"+
						   "&numeroControl="+numeroControl+
						   "&nombre="+nombre+
						   "&carrera="+carrera+
						   "&fecha="+fecha+
						   "&hora="+hora+
						   "&cubiculo="+cubiculo+
						   "&id="+Math.random();
			alert("Liberar datos: "+parametros);
			var eliminaCubiculo=$.ajax({
				method:"POST",
				url:"php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo liberado");				
				}else{
					alert("Cubiculo no existente o no se pudo liberar");
				}
			});
			eliminaCubiculo.fail(function(jqError,textStatus){
			});
			$("#general").html("");
			$("#txtNumeroControl").val("");
			$("#txtNombre").val("");
			$("#txtCarrera").val("");
			$("#txtFechaInicio").val("");
			$("#txtFechaFin").val("");
			$("#txtHora").val("");
			$("#txtCubiculo").val("");
		}
	}

	var eliminar= function(){
		//Esto solo debe funcionar para los botones de cubiculos
		var numeroControl =$("#txtNumeroControl").val();
		var nombre 		  =$("#txtNombre").val(); 
		var carrera 	  =$("#txtCarrera").val();
		var fecha   	  =$("#txtFecha").val();
		var hora 		  =$("#txtHora").val();
		var cubiculo  	  =$("#txtCubiculo").val();
		if(nombre== "" | carrera == "" | numeroControl == ""){
			alert("Por favor llene todos los campos para poder eliminar la reservación.");
			return;
		}
		if(fecha == "" | hora == "" | cubiculo == ""){
			alert("Por favor selecciona un cubiculo.");
			return;
		}else{
			var parametros="opcion=eliminar"+
						   "&numeroControl="+numeroControl+
						   "&nombre="+nombre+
						   "&carrera="+carrera+
						   "&fecha="+fecha+
						   "&hora="+hora+
						   "&cubiculo="+cubiculo+
						   "&id="+Math.random();
			alert("Eliminar datos: "+parametros);
			$(this).css("background","#FFFFFF");
			$(this).css("color","#000000");		   
			var eliminaCubiculo=$.ajax({
				method:"POST",
				url:"php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo eliminado");
									
				}else{
					alert("Cubiculo no existente o no se pudo eliminar");
				}
			});
			eliminaCubiculo.fail(function(jqError,textStatus){
			});
			$("#general").html("");
			$("#txtNumeroControl").val("");
			$("#txtNombre").val("");
			$("#txtCarrera").val("");
			$("#txtFechaInicio").val("");
			$("#txtFechaFin").val("");
			$("#txtHora").val("");
			$("#txtCubiculo").val("");
		}
	}

	var guardar= function(){
		var numeroControl =$("#txtNumeroControl").val();
	 	var nombre 		  =$("#txtNombre").val(); 
		var carrera 	  =$("#txtCarrera").val();
		var fechaApartado =$("#txtFecha").val();
		var hora 		  =$("#txtHora").val();
		var cubiculo      =$("#txtCubiculo").val();
		if(nombre== "" | carrera == "" | numeroControl == ""){
			alert("Por favor llene todos los campos para poder guardar la reservación.");
			return;
		}
		if(fechaApartado == "" | hora == "" | cubiculo == ""){
			alert("Por favor selecciona un cubiculo.");
			return;
		}else{
			var parametros ="opcion=guardar"+
						   	"&nControl="+numeroControl+
						  	"&nombre="+nombre+
						 	"&carrera="+carrera+
							"&fecha="+fechaApartado+
						   	"&hora="+hora+
						   	"&cubiculo="+cubiculo+
						   	"&id="+Math.random();
			alert("Guardar datos: "+parametros);
			$(this).css("background","#FF0000");
			$(this).css("color","#FFFFFF");	
			var altaCubiculo=$.ajax({
				method:"POST",
				url:"php/datos.php",
				data:parametros,
				dataType:"json"
			});
			altaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo guardado correctamente");
					$(this).css("background","#FF0000");
					$(this).css("color","#FFFFFF");			
				}else{
					alert("Cubiculo ocupado o no se guardo correctamente");
				}
			});
			altaCubiculo.fail(function(jqError,textStatus){
			});
		}
	}

	//Declaración de Eventos
	$("table button").on("click",obtenInfoCubiculo);
	$("#btnReporte").on("click",hazReporte)
	$("#btnGuardar").on("click",guardar);
	$("#btnLiberar").on("click",liberar);
	$("#btnEliminar").on("click",eliminar);
}

var fechaTitulo = function () {
	var d = new Date();
	var dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	var mes  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
			    "Agosto","Septiembre","Octubre","Noviembre","Dicimbre"];
	var fecha = dias[d.getDay()]+" "+d.getDate()+" de "+mes[d.getMonth()]+" de "+d.getFullYear();
	return fecha;
}

var fechaActual = function () {
	var d = new Date();
	var fecha = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
	return fecha;
}

$(document).ready(iniciaApp);