var COMEDOR_DAO=require('./comedorDAO.js');

module.exports.getLogin=function(app){

	app.post('/getLogin',function(req,res){
		var data=req.param('data');
		data=JSON.parse(data);
		//console.log(data);
		var msn={};
		if(data.perfil==='ADMINISTRADOR'){
			COMEDOR_DAO.getLoginA(data.codigo,data.contrasena,function(respuesta,mensage){			  
			  msn.data=respuesta;
			  msn.estado=respuesta.estado;////////////////esta parte se tiene que modificar para su buen funcionamiento
			  msn.message=null;
			  if(respuesta<0){
			  	msn.estado=0;
			  	msn.message={codigo:respuesta,message:mensage};
			  }	
	     //console.log(msn);
	     res.json(msn);
			});
		}else if(data.perfil==='NUTRICIONISTA'){
			COMEDOR_DAO.getLoginN(data.codigo,data.contrasena,function(respuesta,mensage){
			  msn.data=respuesta;
			  msn.estado=respuesta.estado;////////////////esta parte se tiene que modificar para su buen funcionamiento
			  msn.message=null;
			  if(respuesta<0){
			  	msn.estado=0;
			  	msn.message={codigo:respuesta,message:mensage};
			  }	
		   //console.log(msn);
	       res.json(msn);
			});
		}else if(data.perfil==='ESTUDIANTE'){
			COMEDOR_DAO.getLoginE(data.codigo,data.contrasena,function(respuesta,mensage){
				console.log(respuesta.estado+'   mens: '+mensage);
			  msn.data=respuesta;
			  msn.estado=respuesta.estado;////////////////esta parte se tiene que modificar para su buen funcionamiento
			  msn.message=null;
			  if(respuesta<0){
			  	msn.estado=0;
			  	msn.message={codigo:respuesta,message:mensage};
			  }	
		  // console.log(msn);
	       res.json(msn);
			});	
		}

	});
}
module.exports.getMenuDelDia=function(app){
	app.post('/getMenuDelDia',function(req,res){
		var dato=req.param('data');
		dato=JSON.parse(dato);
		//fecha
		var fecha=new Date();
        var fec=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
		//fecha
		 var msn={};
					 if(dato.estado===1)
			    {
			   		COMEDOR_DAO.getVerMenuDEs(fec,function(respuesta,mensage){//falta dar fecha
			   			msn.menu=respuesta;
			   			msn.dato='MENU PARA EL ALUMNO'; 
			   			if(respuesta<0){
			   				msn.mensage={codigo:respuesta,message:mensage};
			   			}
			   			res.json(msn);
			   		});
			    	           
			         
			    }
			    else if(dato.estado===2){
			    	COMEDOR_DAO.getVerMenuDEs(fec,function(respuesta,mensage){//falta dar fecha
			   			msn.menu=respuesta;
			   			msn.dato='MENU PARA EL ADMINISTRADOR'; 
			   			if(respuesta<0){
			   				msn.mensage={codigo:respuesta,message:mensage};
			   			}
			   			res.json(msn);
			   		});    		        
			    }
			    else if(dato.estado===3){
			    	 COMEDOR_DAO.getVerMenuD(function(respuesta,mensage){
			   			msn.menu=respuesta;
			   			msn.dato='MENU PARA EL NUTRICIONISTA'; 
			   			if(respuesta<0){
			   				msn.mensage={codigo:respuesta,message:mensage};
			   			}
			   			res.json(msn);
			   		});
			    }else{
			    	msn.dato='NO EXISTE ESTADO '+dato.estado;
			    }
	});
}
module.exports.getBuscarEstudiante=function(app){
	app.post('/getbuscarEstudiante',function(req,res){
		 var dato=req.param('data');
		    dato=JSON.parse(dato);  
		   // console.log(dato); 
		   var msn={};
		   COMEDOR_DAO.getBuscarEstudiantes(dato.codigo,function(respuesta,mensage){
		   	 msn=respuesta;
		   	 res.json(msn);
		   });	   
		   
	});
}
module.exports.getMarcarConsumo=function(app){	
  app.post('/getMarcarConsumo',function(req,res){
     var dato=req.param('data');// {"codigo":"1002620122",{"id":"1"}}
    dato=JSON.parse(dato);

    ///////
    //creamos una variable turno el cual varia segun la hora automaticamente
    var turno;
    var date=new Date();
    var fecha=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    var hora=date.getHours();
    var minutos=date.getMinutes();
    var msn={};
console.log('algo sucede');
    if(hora>=6 && hora<=9 )
    {
       turno='Desayuno';
       console.log("si llega");
       COMEDOR_DAO.getMarcarComsumo(dato.codigo,turno,fecha,function(respuesta,mensage){       	  
       		msn.dato=respuesta.dato;
	        msn.fecha=fecha;
	        msn.hora=hora+':'+minutos;
	         console.log("msn "+msn);
         res.json(msn);
       });
    	
    }else if(hora>=10 && hora<=24 )//para fines de prueba se cambio la hora a 11
    {
    	turno='Almuerzo';
    	console.log("si llega");
        COMEDOR_DAO.getMarcarComsumo(dato.codigo,turno,fecha,function(respuesta,mensage){       	  
       		msn.dato=respuesta.dato;
	        msn.fecha=fecha;
	        msn.hora=hora+':'+minutos;
	        console.log("msn "+msn.dato);
         res.json(msn);
       });
    }
  });
}
//desde aqui soin nuevos probr en intel xdk
module.exports.getLlenarMenu=function(app){
	app.post('/getLlenarMenu',function(req,res){
       var dato=req.param('data');
       dato=JSON.parse(dato);
       console.log("la fecha:"+dato.fecha+"el desayuno:"+dato.desayuno+"el almuerzo:"+dato.almuerzo);
       var msn={};
		if(dato.fecha!==null &&dato.desayuno!==null &&dato.almuerzo!==null){			
             COMEDOR_DAO.getLlenarMenu(dato.fecha,dato.desayuno,dato.almuerzo,function(respuesta,mensage){
                 msn.dato=respuesta.mensage;
                 msn.estado=respuesta.estado;
             	res.json(msn);
             });    	      	
		}else{

			msn.dato='NO LLENO CORRECTAMENTE LOS DATOS ';
             
            res.json(msn);
   		}
	});
}
module.exports.getRegistroEstudiantes=function(app){
	app.post('/getRegistroEstudiantes',function(req, res){
       var dato=req.param('data');
       dato=JSON.parse(dato);
       var msn={};
       COMEDOR_DAO.getRegistroDeEstudiantes(function(respuesta,mensage){
       	msn.data=respuesta.lista;
       	res.json(msn);
       });
	});
}
module.exports.getRegistrarCuenta=function(app){
	app.post('/getRegistrarCuenta', function(req,res){
       var dato=req.param('data');
       dato=JSON.parse(dato);
       var msn={};
        ///////
        /*
          param.perfil=perfil;
          param.dni=dni;
          param.nombres=nombres;
          param.apellidos=apellidos;
          param.contrasena=contrasena;
          param.codigo=codigo;
          param.carrera=carrera;*/
       	//////
		
       if(dato.perfil==='ADMINISTRADOR' ){
       	  if(dato.nombres!==""&&dato.apellidos!==""&&dato.dni!==""&&dato.contrasena!==""){
       	  	 	COMEDOR_DAO.getCrearUsuario_Administardor(dato.nombres,dato.apellidos,dato.dni,dato.contrasena,function(respuesta,mensage){
		       	msn.mensage=respuesta.mensage;
		       	if(respuesta<0){
		       		msn.mensage=mensage;
		       	}
		       	res.json(msn);
		       });
       	  	 }else{
       	  	 	msn.mensage="no lleno correctamente sus datos! por fabor llene los datos correctos."
       	  	    res.json(msn);
       	  	 }
       	      
       	} else if(dato.perfil==='NUTRICIONISTA' ){
       	  if(dato.nombres!==""&&dato.apellidos!==""&&dato.dni!==""&&dato.contrasena!==""){
       	  	 	COMEDOR_DAO.getCrearUsuario_Nutricionista(dato.nombres,dato.apellidos,dato.dni,dato.contrasena,function(respuesta,mensage){
		       	msn.mensage=respuesta.mensage;
		       	if(respuesta<0){
		       		msn.mensage=mensage;
		       	}
		       	res.json(msn);
		       });
       	  	 }else{
       	  	 	msn.mensage="no lleno correctamente sus datos! por fabor llene los datos correctos."
       	  	    res.json(msn);
       	  	 }
       	      
       	} else if(dato.perfil==='ESTUDIANTE' ){
       	  if(dato.nombres!==""&&dato.apellidos!==""&&dato.codigo!==""&&dato.carrera!==""&&dato.contrasena!==""){
       	  	 	COMEDOR_DAO.getCrearUsuario_Estudiante(dato.nombres,dato.apellidos,dato.codigo,dato.carrera,dato.contrasena,function(respuesta,mensage){
		       	msn.mensage=respuesta.mensage;
		       	if(respuesta<0){
		       		msn.mensage=mensage;
		       	}
		       	res.json(msn);
		       });
       	  	 }else{
       	  	 	msn.mensage="no lleno correctamente sus datos! por fabor llene los datos correctos."
       	  	    res.json(msn);
       	  	 }
       	      
       	} 

       	 /*else if(dato.perfil==='ESTUDIANTE'){

       	}else if(dato.perfil==='NUTRICIONISTA'){

       	}*/
      

	});
}