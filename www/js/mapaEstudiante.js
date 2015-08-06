var SOCKET=null;
var MAP=null;
var MARCADORES=[];
var IDSOCKET_CLIE=null;
var nombreUsuario=null;
/*funcion conectarse*/
function conectarse(){
	SOCKET=io.connect("http://192.168.56.102:9095");
	/* funcion que permite conectarse y obteber el idsocket que da node*/
	SOCKET.on("connect", function(){
		document.getElementById("idEstado").innerHTML="conectado..";
		var datos={};

		datos.id=document.getElementById("idCodigo").value;
		nombreUsuario=document.getElementById("idCodigo").value;

		SOCKET.emit("loginCliente",datos,function(data){

			document.getElementById("idUsuario").innerHTML=data.id;
			document.getElementById("idSocket").innerHTML=data.socket_id;
			IDSOCKET_CLIE=data.socket_id;
		})
	});
/* funcion que nos permite eliminar el socket desconectado*/
SOCKET.on("disconnet",function(){
	document.getElementById("idEstado").innerHTML="desconectado...";
   var index=buscar(data);
   if(index!==-1){
		removerPosicion(index);
	}	
});
iniciarMapa();
/*escuchamos las posiciones de los demas clientes al igual
que el monitor oprincipal*/
SOCKET.on("monitoriarClientes",function(data){	
	 console.log(data);
	//alert('posicion: '+data.lon);
	   var index=buscar(data);
	   if(index===-1){
	   	nuevoPosicion(data);
	   }else{
	   	actualizarPosicion(index,data);
	   }
});
/*cuando un cliente monitoreado se desconecta*/
SOCKET.on("MonitorCDesconectado",function(data){
	console.log(data);
	//alert('usuario desconectado'+data.id);
	var index=buscar(data);
	if(index!==-1){
		removerPosicion(index);
	}
});
    /*la funcion enviarposicion lo cargamos dentro de la funcion conectar*/
    setInterval(function () {
     getLocation();
	}, 3000);
}
/*creamos una funcion para capturar la geolocalizacion*/
function getLocation() {   
        navigator.geolocation.watchPosition(showPosition);   
}
function showPosition(position) {
    enviarPosicion(position.coords.latitude,position.coords.longitude);
   // alert('lat: '+position.coords.latitude+' lon: '+position.coords.longitude);
}
/*******************************************************/
/*AQUI DAMOS LOS SERVICIOS QUE NO PERMITIRA ENVIAR DATOS A TODOS LOS CLIENTES*/
function enviarPosicion(latitud,longitud){
	var data={};
		data.lat=latitud;//document.getElementById("idLat").value;//51.508742;
		data.lon=longitud;//document.getElementById("idLon").value;//-0.120850;
		data.id=nombreUsuario;
		//SOCKET.broadcast.emit("posicionCliente",data);
		SOCKET.emit("posicionCliente",data);

		//alert("ENVIADO");
}
/*mostramos la mapa*/
 function iniciarMapa(){
		var mapProp = {
		    center:new google.maps.LatLng(-13.6589,-73.3515),
		    zoom:10,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		 MAP=new google.maps.Map(document.getElementById("idGoogleMap"),mapProp);
	}
	/*funcion buscar que busca en el arreglo de marcadores*/
	function buscar(data){
		var index=-1;
		var n=MARCADORES.length;
	   for(var i=0;i<n;i++){
	   	//alert('metodo buscar marcadores:'+MARCADORES[i].getId());
	   	 if(MARCADORES[i].getId()===data.id){
	   	 	index=i;
	   	 	break;
	   	 }
	   }
	   return index;
	}
	/*nuevoPosicion******************************************/
	function nuevoPosicion(data){
		var marca=new cMarker(MAP,data.id,data.lat,data.lon);
		marca.dibujar();
		MARCADORES.push(marca);//se agrega al arreglo de marcadores
	}
	///////////////////////////////////////////////////////////////////
	function actualizarPosicion(index,data){
		var  marca=MARCADORES[index];
		marca.remover();
		marca.update(data.lat,data.lon);
		marca.dibujar();
	}
	///////////////////////////////////////////////////////////////////
	function removerPosicion(index){
		var marca=MARCADORES[index];
		marca.remover();
		MARCADORES.splice(index,1);//se elimina de la lista
	}
	///////////////////////////////////////////////////////////////////
	function eliminarMarcadores(){
		var n=MARCADORES.length;
		for(var i=0;i<n;i++){
			MARCADORES[i].remover();
		}
		MARCADORES=[];
	}