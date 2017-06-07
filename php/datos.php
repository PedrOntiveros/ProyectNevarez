<?php
	require("utilerias.php");
	function guardar(){
		$respuesta=false;
		$conexion=conecta();
		$nc =GetSQLValueString($_POST["nControl"],"text");
		$nom=GetSQLValueString($_POST["nombre"],"text");
		$car=GetSQLValueString($_POST["carrera"],"text");
		$f  =GetSQLValueString($_POST["fecha"],"text");
		$h  =GetSQLValueString($_POST["hora"],"text");
		$c  =GetSQLValueString($_POST["cubiculo"],"text");
		$e  =GetSQLValueString($_POST["estado"],"text");
		//Buscar si existe el ncontrol en la bd de datos
		$buscaUsuario  = sprintf("select ncontrol from usuarios where ncontrol=%s and nombre=%s and carrera=%s",$nc,$nom,$car);
		$resultadoBusca= mysql_query($buscaUsuario);
		if(mysql_num_rows($resultadoBusca)>0){//Si hay 1 sí existe el usuario y podemos apartar el cubiculo
			$buscaApartado = sprintf("select * from apartados where cubiculo=%s and hora=%s and fecha=%s and ncontrol=%s",$c,$h,$f,$nc);
			$resultadoBus= mysql_query($buscaApartado);
			if(mysql_num_rows($resultadoBus)==0){ //Si no existe el apartado, lo hacemos
				//insertamos el registro de cubiculo apartado
				$inserta=sprintf("insert into apartados values(default,%s,%s,%s,%s,%s)",$c,$h,$f,$nc,$e);
				$resultadoInserta = mysql_query($inserta);
				if($resultadoInserta == true){ 
					$respuesta=true;
				}	
			}
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function liberar(){
		$respuesta = false;
		$conexion  = conecta();
		$f = GetSQLValueString($_POST["fecha"],"text");
		$h = GetSQLValueString($_POST["hora"],"text");
		$c = GetSQLValueString($_POST["cubiculo"],"text");
		$e  =GetSQLValueString($_POST["estado"],"text");
		$busca = sprintf("select * from apartados where cubiculo=%s and hora=%s and fecha=%s",$c,$h,$f);
		$resultadoBusca = mysql_query($busca);
		if(mysql_num_rows($resultadoBusca)>0){ //encontró el apartado
			$altera = sprintf("update apartados set estado=%s where cubiculo=%s and hora=%s and fecha=%s",$e,$c,$h,$f);
			$resultadoAltera = mysql_query($altera);
			if($resultadoAltera == true){ //Entra aquí si se cambió el valor de estado.
				$respuesta = true;
			}
		}
		$salidaJSON = array('respuesta' => $respuesta);
		print json_encode($salidaJSON);
	}
	function eliminar(){
		$respuesta=false;
		$conexion=conecta();
		$nc =GetSQLValueString($_POST["ncontrol"],"int");
		$c  =GetSQLValueString($_POST["cubiculo"],"int");
		$h  =GetSQLValueString($_POST["hora"],"int");
		$f  =GetSQLValueString($_POST["fecha"],"int");
		$busca = sprintf("select * from apartados where cubiculo=%s and hora=%s and fecha=%s and ncontrol=%s",$c,$h,$f,$nc);
		$resultadoBusca = mysql_query($busca);
		if(mysql_num_rows($resultadoBusca)>0){ //encontró el apartado
			//Eliminamos el registro de cubiculo apartado
			$elimina=sprintf("delete from apartados where cubiculo=%s and hora=%s and fecha=%s and ncontrol=%s",$c,$h,$f,$nc);
			mysql_query($elimina);
			//¿hubo datos afectados?
			if(mysql_affected_rows()>0){
				$respuesta=true; //Se realizó correctamente
			}
		}
		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}
	function consultar(){
		$respuesta=false;
		$conexion=conecta();
		$c  =GetSQLValueString($_POST["cubiculo"],"text");
		$h  =GetSQLValueString($_POST["hora"],"text");
		$f  =GetSQLValueString($_POST["fecha"],"text");
		$consulta =sprintf("select a.ncontrol, nombre, carrera, cubiculo, fecha, hora, estado
							from apartados a INNER JOIN usuarios u 
							where u.ncontrol = a.ncontrol 
							and cubiculo=%s 
							and hora=%s 
							and fecha=%s",$c,$h,$f);
		$resultado=mysql_query($consulta);
		$ncontrol ="";
		$nombre   ="";
		$carrera  ="";
		$cubiculo ="";
		$fecha    ="";
		$hora     ="";
		$estado   ="";
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			if($registro=mysql_fetch_array($resultado)){
				$ncontrol   = $registro["ncontrol"];
				$nombre     = $registro["nombre"];
				$carrera    = $registro["carrera"];
				$cubiculo	= $registro["cubiculo"];
				$hora		= $registro["hora"];
				$fecha 		= $registro["fecha"];
				$estado		= $registro["estado"];
			}
		}
		$salidaJSON = array('respuesta' => $respuesta,
							'ncontrol' 	=> $ncontrol,
							'nombre' 	=> $nombre,
							'carrera'	=> $carrera,
							'cubiculo'	=> $cubiculo,
							'hora'		=> $hora,
							'fechaAct'	=> $fecha,
							'estado'	=> $estado);
		print json_encode($salidaJSON);
	}
	function consutaAlumno(){
		$respuesta=false;
		$conexion=conecta();
		$nc =GetSQLValueString($_POST["ncontrol"],"text");
		$nom=GetSQLValueString($_POST["nombre"],"text");
		//Buscar si existe el ncontrol en la bd de datos
		$buscaUsuario  = sprintf("select ncontrol from usuarios where ncontrol=%s and nombre=%s and carrera=%s",$nc,$nom,$car);
		$resultadoBusca= mysql_query($buscaUsuario);
		if(mysql_num_rows($resultadoBusca)>0){//Si hay 1 sí existe el usuario y podemos apartar el cubiculo
			$apartados =sprintf("select cubiculo, fecha, hora, nombre, carrera
								from apartados a INNER JOIN usuarios u 
								where u.ncontrol = a.ncontrol 
								and a.ncontrol",$nc);
			$resultados=mysql_query($apartados);
			$ncontrol ="";
			$nombre   ="";
			$carrera  ="";
			$cubiculo ="";
			$fecha    ="";
			$hora     ="";
			if(mysql_num_rows($resultado)>0){
				$respuesta=true;
				if($registro=mysql_fetch_array($resultado)){
					$ncontrol   = $registro["ncontrol"];
					$nombre     = $registro["nombre"];
					$carrera    = $registro["carrera"];
					$cubiculo	= $registro["cubiculo"];
					$hora		= $registro["hora"];
					$fecha 		= $registro["fecha"];
				}
			}
			$salidaJSON = array('respuesta' => $respuesta,
								'ncontrol' 	=> $ncontrol,
								'nombre' 	=> $nombre,
								'carrera'	=> $carrera,
								'cubiculo'	=> $cubiculo,
								'hora'		=> $hora,
								'fechaAct'	=> $fecha);	
			print json_encode($salidaJSON);						
		}
	}

	function consutaCubiculo(){
		$respuesta=false;
		$conexion=conecta();
		$cub =GetSQLValueString($_POST["cubiculo"],"text");
		$buscaApartados= sprintf("select fecha, hora, a.ncontrol, nombre, carrera
								 from apartados a INNER JOIN usuarios u 
								 where u.ncontrol = a.ncontrol 
								 and cubiculo=%s",$cub);
		$resultado= mysql_query($buscaApartados);
		if(mysql_num_rows($resultadoBusca)>0){//Si sí existe el usuario y podemos apartar el cubiculo
			$resultados=mysql_query($apartados);
			$ncontrol ="";
			$nombre   ="";
			$carrera  ="";
			$cubiculo ="";
			$fecha    ="";
			$hora     ="";
			$respuesta=true;
			if($registro=mysql_fetch_array($resultado)){
				$ncontrol   = $registro["ncontrol"];
				$nombre     = $registro["nombre"];
				$carrera    = $registro["carrera"];
				$cubiculo	= $registro["cubiculo"];
				$hora		= $registro["hora"];
				$fecha 		= $registro["fecha"];
			}
		}
		$salidaJSON = array('respuesta' => $respuesta,
							'ncontrol' 	=> $ncontrol,
							'nombre' 	=> $nombre,
							'carrera'	=> $carrera,
							'cubiculo'	=> $cubiculo,
							'hora'		=> $hora,
							'fechaAct'	=> $fecha;		
		print json_encode($salidaJSON);					
	}
	

	$opcion=$_POST["opcion"];
	switch ($opcion) {
		case 'guardar':
			guardar();
			break;	
		case 'eliminar':
			eliminar();
			break;
		case 'consulta':
			consultar();
			break;
		case 'liberar':
			liberar();
			break;
		case 'consultaA':
			consutaAlumno();
			break;
		case 'consultaC':
			consutaCubiculo();
			break;
		default:
			# code...
			break;
	}
?>