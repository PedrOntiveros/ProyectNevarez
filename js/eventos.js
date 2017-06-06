const rq = require ('electron-require');
const main = rq.remote('./main.js');
const $ = require("jquery");

var iniciaApp = function(){
	//función para poner en el título la fecha del día de hoy.
	var fecha = fechaHoy()
	$("#titulo").html(fecha);

	var obtenInfoCubiculo = function(){
		//Esto solo debe funcionar para los botones de cubiculos
		var cubiculo = ($(this).attr("id")).substr(-2);
		var hora 	 = ($(this).attr("id")).substr(3,2)+":00";
		if(hora == 'Re:00'){
			//Aquí llamamos a la función para generar reporte
			alert("Genera reporte de cubiculo "+cubiculo);
		}else{
			//Aquí hacemos la consulta para verificar que el cubiculo en la hora seleccionada no esté ocupado.
			//Se hace consulta del cubiculo y se llenan los campos con la información requerida
			$("#general").html("Cubiculo "+cubiculo+" hora "+hora);
			//$("#txtFechaInicio").val() =
			//$("#txtFechaFin").val() =
			$("#txtHora").val(hora);
			$("#txtCubiculo").val(cubiculo);
			$(this).css("background","#FF0000");
			$(this).css("color","#FFFFFF");
		}
	}

	var hazReporte = function(){
		//Elaborar reporte por alumno:
	}

	//Declaración de Eventos
	$("table button").on("click",obtenInfoCubiculo);
	$("#btnReporte").on("click",hazReporte)
}

var fechaHoy = function () {
	var d = new Date();
	var dias = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	var mes  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
			    "Agosto","Septiembre","Octubre","Noviembre","Dicimbre"];
	var fecha = dias[d.getDay()]+" "+d.getDate()+" de "+mes[d.getMonth()]+" de "+d.getFullYear();
	return fecha;
}

$(document).ready(iniciaApp);