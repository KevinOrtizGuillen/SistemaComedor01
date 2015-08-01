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
	     console.log(msn);
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
		   console.log(msn);
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
		   console.log(msn);
	       res.json(msn);
			});	
		}

	});
}
module.exports.getMenuDelDia=function(app){
	app.post('/getMenuDelDia',function(req,res){
		var dato=req.param('data');
		dato=JSON.parse(dato);
		 var msn={};
					 if(dato.estado===1)
			    {
			   		COMEDOR_DAO.getVerMenuD(function(respuesta,mensage){
			   			msn.menu=respuesta;
			   			msn.dato='MENU PARA EL ALUMNO'; 
			   			if(respuesta<0){
			   				msn.mensage={codigo:respuesta,message:mensage};
			   			}
			   			res.json(msn);
			   		});
			    	           
			         
			    }
			    else if(dato.estado===2){
			    	COMEDOR_DAO.getVerMenuD(function(respuesta,mensage){
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