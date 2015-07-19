var IPADDRESS="192.168.195.1";
var PORT=9095;
var express=require('express');
var bodyParser=require('body-parser');

var AllowCroosDomain=function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type,x-access-token');
    next();
}

var app=express();
app.use(bodyParser.urlencoded({extended: false }));
app.use(AllowCroosDomain);

var server=app.listen(PORT,IPADDRESS);
console.log('Escuchando en:  '+IPADDRESS+':'+PORT);
//////////////////////////////////////////////////////////////////////////////
// SOCKET IO//////////////////
var CLIENTES=[];
var io=require('socket.io').listen(server);
io.on('connection',function(socket){
    console.log('User id: '+socket.id);
    /*Servicio de loguearcliente me devuelve los valors idusuario,estado,idsocket*/
    socket.on("loginCliente", function(data,response){
    	console.log(data);
    	var index=buscar(data);
    	if(index===-1){
    		CLIENTES.push({id:data.id,estado:1,socket_id:socket.id});
    		response({id:data.id,estado:1,socket_id:socket.id});
    	}else{
    		response({id:null,estado:0,socket_id:null});
    	}
    });
    /*socket escuchar posiciones de los clientes*/
    socket.on("posicionCliente",function(data){
        console.log(data);
    	socket.broadcast.emit("monitoriarClientes",data);
    	socket.emit("monitoriarClientes",data);
    });
    /*cuando se desconecta un cliente*/
    socket.on("disconnect", function(){
    	console.log('usuario desconectado: '+socket.id);
	
    	var n=CLIENTES.length;
    	for(var i=0;i<n;i++){
            	console.log('hasta aqui');
    		if(CLIENTES[i].socket_id===socket.id){
                	console.log('hasta aqui 1');
    			socket.broadcast.emit("MonitorCDesconectado",CLIENTES[i]);    		    
                	socket.emit("MonitorCDesconectado",CLIENTES[i]);
			
			    CLIENTES.splice(i,1);
    			break;		     		
            	}
		//CLIENTES.splice(i,1);//ESTAS ELIMINANDO  CLIENTES !!!!!!
    		//break;		
    		
    	}
    });

});
function buscar(data){
	var index=-1;
	var n=CLIENTES.length;
	for(var i=0;i<n;i++){
		if(CLIENTES[i].id===data.id){
			index=i;
			break;
		}
	}
	return index;
}

/////////////////////socketio///////////////
//servicios del SistemaComedor//
app.post('/getLogin', function(req, res){
  var dato=req.param('data');
  dato=JSON.parse(dato);
  //////////////////
     var msn={};
    // console.log(dato);
      if(dato.perfil==='ADMINISTRADOR' && dato.codigo==='71861477'&& dato.contrasena==='kevin')
    {        
          msn.estado=2;        
    }
    else if(dato.perfil==='ESTUDIANTE' && dato.codigo==='1002620122'&& dato.contrasena==='kevin')
    {
           msn.estado=1;               
    }
   
   else if(dato.perfil==='NUTRICIONISTA' && dato.codigo==='71861477'&& dato.contrasena=='kevin')
    {
    		  msn.estado=3;    	
    }else{
    	 msn.estado=0;
    }
  //////////////////
  res.json(msn);
});
app.post('/getMenuDelDia',function(req, res){
    var dato=req.param('data');
    dato=JSON.parse(dato);
    /////
    var msn={};
    var menu={};
    if(dato.estado===1)
    {
    	    msn.dato='MENU PARA EL ALUMNO';            
            menu.desayuno='Agua';
            menu.almuerzo='Agua sin Pan';
    }
    else if(dato.estado===2){
    	    msn.dato='MENU PARA EL COMEDOR';
            menu.desayuno='Agua con verduras';
            menu.almuerzo='Agua con Pan';
    }
    else if(dato.estado===3){
    	    msn.dato='MENU PARA EL NUTRICIONISTA';
            menu.desayuno='caldo de gallina';
            menu.almuerzo='Agua con muchos Panes';
    }else{
    	msn.dato='NO EXISTE ESTADO '+dato.estado;
    }
    /////
         msn.menu=menu;
    res.json(msn);
});
app.post('/getMarcarConsumo',function(req, res){
    var dato=req.param('data');// {"codigo":"1002620122",{"id":"1"}}
    dato=JSON.parse(dato);
    ///////
    var date=new Date();
    var fecha=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    var hora=date.getHours();
    var minutos=date.getMinutes();
    var msn={};
    if(dato.codigo==='1002620122' && hora>6 && minutos>=30 && hora<9 && minutos<30)
    {
    	msn.dato='Desayuno Atendido';
        msn.fecha=fecha;
        msn.hora=hora+':'+minutos;
    }else if(dato.codigo==='1002620122'&&hora>=12 && hora<=14 && minutos<30)
    {
        msn.dato='Almuerzo Atendido';
        msn.fecha=fecha;
        msn.hora=hora+':'+minutos;
    }else{
    	msn.dato='Atencion Extra Hora de Caballeros';
        msn.fecha=fecha;
        msn.hora=hora+':'+minutos;
    }
    ///////
    res.json(msn);
});
app.post('/getllenarmenu',function(req, res){
	var dato=req.param('data');
	dato=JSON.parse(dato);
	/////////
	var msn={};
	if(dato.fecha!==null &&dato.Desayuno!==null &&dato.Almuerzo!==null){
       msn.dato='menu del dia '+dato.fecha+' fue llenado';
       msn.estado=1;
	}else{
        msn.estado=0;
    }
	/////////
	res.json(msn);
});
app.post('/getRegistroEstudiantes',function(req, res){
    var dato=req.param('data');
    dato=JSON.parse(dato);
    var msn={};
    /////////
    var lista=[];
    for (var i = 0; i <5; i++) {
        lista[i]='Etsun'+i;
    };
    msn.data=lista;
    /////////
    res.json(msn);
});
app.post('/getbuscarEstudiante',function(req, res){
    var dato=req.param('data');
    dato=JSON.parse(dato);  
   // console.log(dato);  
    if(dato.codigo==='1002620122'){
        var msn={};
        msn.dato='kevin';
        msn.estado=1;
    }else{
        var msn={};
        msn.estado=0;
        msn.dato='no hay';
    } 
    res.json(msn);
});

