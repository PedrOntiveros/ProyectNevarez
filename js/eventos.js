const rq   = require ('electron-require');
const main = rq.remote('./main.js');
const $    = require("jquery");

var iniciaApp = function(){
	//función para poner en el título la fecha del día de hoy.
	var fechaTit = fechaTitulo();
	var fechaAct = fechaActual();
	var semestre = getSemestre();
	$("#titulo").html(fechaTit);
	var obtenInfoCubiculo = function(){
		//Esto solo debe funcionar para los botones de cubiculos
		var cubiculo = ($(this).attr("id")).substr(-2);
		var hora 	 = ($(this).attr("id")).substr(3,2)+":00";
		if(hora == 'Re:00'){
			hazReporteCubiculo(cubiculo);
		}else{
			$("#general").html("Cubiculo "+cubiculo+" hora "+hora);
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
				url:"http://localhost/php/datos.php",
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
						$(boton).attr('class', 'btn btn-info');
					}else if(data.estado == "apartado"){
						var horaBoton 	 = (hora.substr(0,2));
						var boton="#btn"+horaBoton+cubiculo;
						$(boton).attr('class', 'btn btn-danger');
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

	var hazReporteCubiculo = function(cubiculo){
		//Aquí debería abrir una nueva ventana con la info.
		var parametros ="opcion=consultaC"+
						"&cubiculo="+cubiculo+
						"&id="+Math.random();
			var consultaCubiculo=$.ajax({
				method:"POST",
				url:"http://localhost/php/datos.php",
				data:parametros,
				dataType: "json"
			});
			consultaCubiculo.done(function(data){
				if(data[0].respuesta==true){
					//Si existen registros es que el usuario sí tiene apartados o liberados
					var titulo= "<h1>Reporte de cubiculo: "+cubiculo+" - Semestre: "+semestre;
					var tabla = "<table><tr><th>No.</th><th>Fecha</th><th>Hora</th><th>N° Control</th><th>Nombre</th><th>Carrera</th></tr>";
					var registros = data.length;
					for(i = 0; i< registros; i++){
						tabla = tabla+"<tr><td>"+(i+1)+"</td>";
						tabla = tabla+"<td>"+data[i].fechaAct+"</td>";
						tabla = tabla+"<td>"+data[i].hora+"</td>";
						tabla = tabla+"<td>"+data[i].ncontrol+"</td>";						
						tabla = tabla+"<td>"+data[i].nombre+"</td>";
						tabla = tabla+"<td>"+data[i].carrera+"</td></tr>";
					}
					$("#main").hide();
					$("header").hide();
					$("#reporte").show();
					$("#tituloReporte").html(titulo);
					$("#reporteTabla").html(tabla);
				}else{
					alert("No hay registros para este cubiculo.")
				}
			});
			consultaCubiculo.fail(function(jqError,textStatus){
			});
	}

	var hazReporteAlumno = function(){
		//Aquí debería abrir una nueva ventana con la info.
		var numero =$("#txtNumeroControl").val();
		var nombre =$("#txtNombre").val();
		var parametros ="opcion=consultaA"+
						"&ncontrol="+numero+
						"&nombre="+nombre+
						"&id="+Math.random();
			var consultaAlumno=$.ajax({
				method:"POST",
				url:"http://localhost/php/datos.php",
				data:parametros,
				dataType: "json"
				});
			consultaAlumno.done(function(data){
				if(data[0].respuesta==true){
					//Si existen registros es que el usuario sí tiene apartados o liberados
					var titulo= "<h1>Reporte de alumno: "+numero+" - Semestre: "+semestre;
					var tabla = "<table><tr><th>No.</th><th>Cubiculo</th><th>Fecha</th><th>Hora</th><th>Nombre</th><th>Carrera</th></tr>";
					var registros = data.length;
					for(i = 0; i< registros; i++){
						tabla = tabla+"<tr><td>"+(i+1)+"</td>";
						tabla = tabla+"<td>"+data[i].cubiculo+"</td>";
						tabla = tabla+"<td>"+data[i].fechaAct+"</td>";
						tabla = tabla+"<td>"+data[i].hora+"</td>";
						tabla = tabla+"<td>"+data[i].nombre+"</td>";
						tabla = tabla+"<td>"+data[i].carrera+"</td></tr>";
					}
					$("#main").hide();
					$("header").hide();
					$("#reporte").show();
					$("#tituloReporte").html(titulo);
					$("#reporteTabla").html(tabla);
				}else{
					alert("No existe usuario, o no hay registros del usuario.")
				}
			});
			consultaAlumno.fail(function(jqError,textStatus){
			});
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
				url:"http://localhost/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo liberado");	
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).attr('class', 'btn btn-info');			
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
				url:"http://localhost/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			eliminaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("cubiculo eliminado");
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).attr('class', 'btn btn-default');			
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
				url:"http://localhost/php/datos.php",
				data:parametros,
				dataType:"json"
			});
			altaCubiculo.done(function(data){
				if(data.respuesta==true){
					alert("Cubiculo guardado correctamente.");
					var horaBoton 	 = (hora.substr(0,2));
					var boton="#btn"+horaBoton+cubiculo;
					$(boton).attr('class', 'btn btn-danger');			
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
	$("#btnReporte").on("click",hazReporteAlumno);
	$("#btnGuardar").on("click",guardar);
	$("#btnLiberar").on("click",liberar);
	$("#btnEliminar").on("click",eliminar);
	$("#btnPDF").on("click",function(){
		$("#btnPDF").hide();
		$("#btnRegresa").hide();
		const ipc = require('electron').ipcRenderer;
 		ipc.send('print-to-pdf');
 		$("#btnPDF").show();
		$("#btnRegresa").show();
	});
	$('#btnRegresa').on('click',function(){
		$('#main').show();
		$('header').show();
		$('#reporte').hide();
		$('#reporteTabla').html('');
	});
}
var limpiaCampos =function () {
	$("#general").html("");
	$("#txtNumeroControl").val("");
	$("#txtNombre").val("");
	$("#txtCarrera").val("");
	$("#txtFecha").val("");
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
	$("#btn0701").click();
}
var getSemestre = function(){
	var d = new Date();
	var mes = d.getMonth();
	var año = ""+d.getFullYear();
	var semestre = "";
	if(mes<7){
		semestre = "ENE-JUN"+año.substring(2);
	}else{
		semestre = "AGO-DIC"+año.substring(2);
	}
	return semestre;
}

$(document).ready(function(){
	iniciaApp();
	checaCubiculos();
});