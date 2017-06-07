const rq   = require ('electron-require');
const main = rq.remote('./main.js');
const $    = require("jquery");

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
			$("#general").html("");
			const ipc = require('electron').ipcRenderer;
	 		ipc.send('print-to-pdf');
		}else{
			//Aquí hacemos la consulta para verificar que el cubiculo en la hora 
			//seleccionada no esté ocupado.
			//Se hace consulta del cubiculo y se llenan los campos con la 
			//información requerida
			limpiaCampos();
			var parametros ="opcion=consulta"+
						    "&cubiculo="+cubiculo+
						    "&hora="+hora+
						    "&fecha="+fechaAct+
						    "&id="+Math.random();
			var consultaCubiculo=$.ajax({
				method:"POST",
				url:"C:/xampp/htdocs/php/datos.php",
				data:parametros,
				dataType: "json"
				});
			consultaCubiculo.done(function(data){
				if(data.respuesta==true){
					$("#txtNumeroControl").val(data.ncontrol);
					$("#txtNombre").val(data.nombre);
					$("#txtCarrera").val(data.carrera);
					$("#txtFecha").val(data.fechaAct);
					$("#txtHora").val(data.hora);
					$("#txtCubiculo").val(data.cubiculo);
					if(data.estado == "liberado"){
						var horaBoton 	 = (hora.substr(0,2));
						var boton="#btn"+horaBoton+cubiculo;
						$(boton).css("background","#52CFF9");
						$(boton).css("color","#FFFFFF");
					}else if(data.estado == "apartado"){
						var horaBoton 	 = (hora.substr(0,2));
						var boton="#btn"+horaBoton+cubiculo;
						$(boton).css("background","#FF0000");
						$(boton).css("color","#FFFFFF");
					}
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
		alert("Botón Reporte por alumno");
		const ipc = require('electron').ipcRenderer;
	 	ipc.send('print-to-pdf');
	}
	var liberar= function(){
		var fecha    	  =$("#txtFecha").val();
		var hora      	  =$("#txtHora").val();
		var cubiculo      =$("#txtCubiculo").val();
		if(fecha == "" | hora == "" | cubiculo == ""){
			alert("Por favor selecciona un cubiculo.");
			return;
		}else{
			var parametros="opcion=liberar"+
						   "&fecha="+fecha+
						   "&hora="+hora+
						   "&cubiculo="+cubiculo+
						   "&estado=liberado"+
						   "&id="+Math.random();
			var eliminaCubiculo=$.ajax({
				method:"POST",
				url:"C:/xampp/htdocs/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo liberado");	
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).css("background","#52CFF9");
					$(boton).css("color","#FFFFFF");			
				}else{
					alert("Cubiculo no ocupado.");
				}
			});
			eliminaCubiculo.fail(function(jqError,textStatus){
			});
			limpiaCampos();
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
						   "&ncontrol="+numeroControl+
						   "&fecha="+fecha+
						   "&hora="+hora+
						   "&cubiculo="+cubiculo+
						   "&id="+Math.random();
			var eliminaCubiculo=$.ajax({
				method:"POST",
				url:"C:/xampp/htdocs/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo eliminado");
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).css("background","#000000");
					$(boton).css("color","#FFFFFF");				
				}else{
					alert("Cubiculo no existente o no se pudo eliminar");
				}
			});
			eliminaCubiculo.fail(function(jqError,textStatus){
			});
			limpiaCampos();
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
						   	"&estado=apartado"+
						   	"&id="+Math.random();
			var altaCubiculo=$.ajax({
				method:"POST",
				url:"C:/xampp/htdocs/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			altaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("Cubiculo guardado correctamente.");
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).css("background","#FF0000");
					$(boton).css("color","#FFFFFF");			
				}else{
					alert("Cubiculo ocupado o no se guardo correctamente.");
				}
			});
			altaCubiculo.fail(function(jqError,textStatus){
			});
		}
		limpiaCampos();
	}

	//Declaración de Eventos
	$("table button").on("click",obtenInfoCubiculo);
	$("#btnReporte").on("click",hazReporte);
	$("#btnGuardar").on("click",guardar);
	$("#btnLiberar").on("click",liberar);
	$("#btnEliminar").on("click",eliminar);
}
var limpiaCampos =function () {
	$("#general").html("");
	$("#txtNumeroControl").val("");
	$("#txtNombre").val("");
	$("#txtCarrera").val("");
	$("#txtFechaInicio").val("");
	$("#txtFechaFin").val("");
	$("#txtHora").val("");
	$("#txtCubiculo").val("");
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
	var dia = d.getDate();
	var mes = d.getMonth()+1;
	if(dia < 10){
		dia = "0"+dia;
	}
	if(mes < 10){
		mes = "0"+mes;
	}
	var fecha = dia+"/"+mes+"/"+d.getFullYear();
	return fecha;
}

var checaCubiculos = function (){
	for(var i=7; i<18; i++){
		for(var j=1; j<11; j++){
			var hora ="0"+i;
			var cubiculo ="0"+j;
			if(j>9){
				cubiculo =""+j;
			}if(i>9){
				hora=""+i;
			}
			$("#btn"+hora+cubiculo).click();
		}
	}
}

$(document).ready(function(){
	iniciaApp();
	checaCubiculos();
});