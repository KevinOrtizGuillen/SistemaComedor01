var ComedorDB=require('./Modelos/comedor.js');
module.exports.getLoginA=function(dni,contrasena,callback){
	ComedorDB.find({codigo:'STOT'},function(err,data){
        if(err){
                console.log(err);
                callback(-1,err);
        }
        else{
                if(data.length===0){
                        callback(-2,"USUARIO NO AUTENTICADO");
                }
                else{
                        datos=data[0];
                        var usuario={};
                        var n=datos.administrador.length;
                        for(var i=0;i<n;i++){
                console.log('dniABD:'+datos.administrador[i].dni+' dniE: '+dni+'  contbd: '+datos.administrador[i].contrasena+' contE'+contrasena);
                           if(datos.administrador[i].dni===dni && datos.administrador[i].contrasena===contrasena){
                                usuario.estado=2;
                                usuario.data=datos.administrador[i];
                                console.log(datos.administrador[i]);
                                break;
                           }else{
                                usuario.estado=0;
                           }
                        }
                        
                        //console.log(data);
                  callback(usuario,null);
                }
        }
    });
};

module.exports.getLoginN=function(dni,contrasena,callback){
	ComedorDB.find({codigo:'STOT'},function(err,data){
                if(err){
                        console.log(err);
                        callback(-1,err);
                }
                else{
                        if(data.length===0){
                                callback(-2,"USUARIO NO AUTENTICADO");
                        }
                        else{
                                datos=data[0];
                                var usuario={};
                                var n=datos.nutricionista.length;
                                for(var i=0;i<n;i++){
                                    if(datos.nutricionista[i].dni===dni && datos.nutricionista[i].contrasena===contrasena){
                                        usuario.estado=3;
                                        usuario.data=datos.nutricionista[i];
                                        console.log(datos.nutricionista[i]);
                                        break;
                                    }else{
                                        usuario.estado=0;
                                    }
                                }
                        
                        //console.log(data);
                  callback(usuario,null);
                        }
                }
        });
};

module.exports.getLoginE=function(codigo,contrasena,callback){
	ComedorDB.find({codigo:'STOT'},function(err, data){                
                if(err){
                        console.log(err);
                        callback(-1,err);
                }
                else{
                        if(data.length===0){                                
                                callback(-2,"USUARIO NO AUTENTICADO");
                        }
                        else{
                                datos=data[0];
                                //console.log(datos);
                                var usuario={};
                                var n=datos.estudiantes.length;
                                for(var i=0;i<n;i++){
                                    //    console.log('codigo base; '+datos.estudiantes[i].codigo+'  codigo con: '+codigo+' contra Base: '+datos.estudiantes[i].contrasena+ ' contrasena: '+contrasena);
                                   if(datos.estudiantes[i].codigo===codigo && datos.estudiantes[i].contrasena===contrasena){
                                        usuario.estado=1;
                                        usuario.data=datos.estudiantes[i];  
                                        break;
                                   }else{
                                        usuario.estado=0;
                                   }
                                }
                  callback(usuario,null);
                        }
                }
        });
};

module.exports.getVerMenuD=function(callback){
       ComedorDB.find({codigo:'STOT'}, function(err, data){
          if(err){
                console.log(err);
                callback(-1,err);
          }
          else{
                if(data.length===0){
                        callback(-2,"nohay desayuno");
                }else{
                   menu=data[0].menu;
                   //en este caso ya no realizamos busquedas sino le devolvemos toda la lista del munu que existe
                }
           callback(menu,null);
          }
       });
}