var SOCKET=null;
var ID=null;
var REINICIO=false;
function conectarse(){
    SOCKET=io.connect("http://192.168.195.1:9095");
    SOCKET.on("connect",function(){
         document.getElementById('idEstado').innerHTML="conectado...";
        SOCKET.emit("loginEstudiante",null,function(data){
           ID=data.id;
            document.getElementById("idSocket").innerHTML=ID;
        });
    });
    SOCKET.on("disconnect",function(){
        document.getElementById("idEstado").innerHTML="desconectado";
        REINICIO=true;
    });
}
////////////////////////////
function enviarPosicion(){
    alert('funciona pe muchachin');
    if(REINICIO==true){
           alert("REINICIE LA CONNECION");
        return;
    }
    var data={};
    data.lat=document.getElementById("idLat").value;
    data.lon=document.getElementById("idLon").value;
    data.id=ID;    
     alert('si funciona');
    SOCKET.emit("posicionEstudiante",data);
    alert("Envio: lat: "+data.lat+' lon: '+data.lon+' id: '+data.id);
}