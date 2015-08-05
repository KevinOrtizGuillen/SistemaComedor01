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
                         //console.log('dniABD:'+datos.administrador[i].dni+' dniE: '+dni+'  contbd: '+datos.administrador[i].contrasena+' contE'+contrasena);
                           if(datos.administrador[i].dni===dni && datos.administrador[i].contrasena===contrasena){
                                usuario.estado=2;
                                usuario.data=datos.administrador[i];
                               // console.log(datos.administrador[i]);
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
                                        //console.log(datos.nutricionista[i]);
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
};
module.exports.getVerMenuDEs=function(fecha,callback){
        ComedorDB.find({codigo:'STOT'},function(err, data){
                if(err){
                        console.log(err);
                        callback(-1,err);
                }else{
                        if(data.length===0){
                                callback(-2,"el comedor no atiende hoy");
                        }else{
                                var datos=data[0];//{jkjhghhh}
                                var menu=[];
                                var n=datos.menu.length;
                                for(var i=0;i<n;i++){
                                        if(datos.menu[i].fecha===fecha){
                                         menu[0]=datos.menu[i];
                                         break;
                                        }else{
                                         //menu[0]="no se atiende hoy";
                                        console.log('no hay dessyuno');
                                        }
                                }
                                callback(menu,null);
                        }
                }
        });
}
module.exports.getBuscarEstudiantes=function(codigo,callback){
        ComedorDB.find({codigo:'STOT'},function(err,data){
                if(err){
                        console.log(err);
                        callback(-1,err);
                }else{
                        if(data.length===0){
                                callback(-2,"no hay alumno");
                        }else{
                           datos=data[0];
                           var estudiante={};
                           var n=datos.estudiantes.length;
                           for(var i=0;i<n;i++){
                                if(datos.estudiantes[i].codigo===codigo){
                                  estudiante.dato=datos.estudiantes[i].nombre;
                                  estudiante.estado=1;
                                  break;
                                }else{
                                  estudiante.dato="no existe";
                                  estudiante.estado=0;      
                                }
                           }
                           callback(estudiante,null);
                        }
                }
        });
}
module.exports.getMarcarComsumo=function(codigo,turno,fecha,callback){
 ComedorDB.find({codigo:'STOT'},function(err,data){
                console.log('hasta aqui');
                if(err){
                        console.log(err);
                        callback(-1,err);
                }else{
                        if(data.length===0){
                                callback(-2,"no hay alumno");
                                console.log("algo paso");
                        }else{
                                console.log("todo ok1");
                                var datos=data[0];
                                var respuesta={};
                                var n=datos.estudiantes.length;
                                for(var i=0;i<n;i++){
                                  if(datos.estudiantes[i].codigo===codigo){
                                        console.log(datos.estudiantes[i]);                                        
                                        //// 
                                          datos.estudiantes[i].consumo.push({servicio:turno,fecha:fecha});
                                             datos.save();                                        
                                        ////
                                             respuesta.estado=1;
                                             respuesta.dato="Se atendio correctamente";                                      
                                      break;
                                  }
                                }
                                callback(respuesta,null);
                        }
                }
  });
}
//desde aqui todos son nuevos se nesecita ver el resultado en el intel xdk
module.exports.getLlenarMenu=function(Fecha,Desayuno,Almuerzo,callback){
      ComedorDB.find({codigo:'STOT'},function(err,data){
        if(err){
          console.log(err);
          callback(-1,err);
        }else{
              if (data.length===0) {
                callback(-2,"no se ouede llenar menu");
              }else{
                var datos=data[0];
                var respuesta={};                            
                datos.menu.push({fecha:Fecha,desayuno:Desayuno,almuerzo:Almuerzo});
                datos.save();
                respuesta.estado=1;
                respuesta.mensage="insertado correctamente";
                callback(respuesta,null);
              }
        }
      });
}
module.exports.getRegistroDeEstudiantes=function(callback){
      ComedorDB.find({codigo:'STOT'},function(err,data){
          if(err){
            console.log(err);
            callback(+1,err);
          }else{
               if(data.length===0){
                callback(-2,"no se puede mostrar regitro de estudiante");
               }else{
                 var datos=data[0];
                 var respuesta={};
                  respuesta.lista=datos.estudiantes;
                 callback(respuesta,null);
               }
          }
      });
}
module.exports.getCrearUsuario_Administardor=function(Nombre,Apellidos,Dni,Contrasena,callback){
    ComedorDB.find({codigo:'STOT'},function(err,data){
      if(err){
        console.log(err);
        callback(-1,err);
      }else{
          if(data.length===0){
             callback(-2,"no se puede crear usuario");
          }else{
            var datos=data[0];    
            var respuesta={};        
            var n=datos.administrador.length;
            var existe=0;
            for(var i=0;i<n;i++){
              if(datos.administrador[i].dni===Dni){
                 existe=1;
                break;
              }else{
                 existe=0;
              }
            }
            ///
            if(existe===0){
              console.log('apel  '+Apellidos);
              datos.administrador.push({nombre:Nombre,apellidos:Apellidos,dni:Dni,contrasena:Contrasena});                
                datos.save();
                respuesta.mensage="Usuario creado correctamente! inicie sesion nuevamente";
              }else{
                respuesta.mensage="ya existe el usuario.";
              }
              callback(respuesta,null);
          }
      }
    });
}
module.exports.getCrearUsuario_Nutricionista=function(Nombre,Apellidos,Dni,Contrasena,callback){
    ComedorDB.find({codigo:'STOT'},function(err,data){
      if(err){
        console.log(err);
        callback(-1,err);
      }else{
          if(data.length===0){
             callback(-2,"no se puede crear usuario");
          }else{
            var datos=data[0];    
            var respuesta={};        
            var n=datos.nutricionista.length;
            var existe=0;
            for(var i=0;i<n;i++){
              if(datos.nutricionista[i].dni===Dni){
                 existe=1;
                break;
              }else{
                 existe=0;
              }
            }
            ///
            if(existe===0){
              console.log('apel  '+Apellidos);
              datos.nutricionista.push({nombre:Nombre,apellidos:Apellidos,dni:Dni,contrasena:Contrasena});                
                datos.save();
                respuesta.mensage="Usuario creado correctamente! inicie sesion nuevamente";
              }else{
                respuesta.mensage="ya existe el usuario.";
              }
              callback(respuesta,null);
          }
      }
    });
}
module.exports.getCrearUsuario_Estudiante=function(Nombre,Apellidos,Codigo,Carrera,Contrasena,callback){
    ComedorDB.find({codigo:'STOT'},function(err,data){
      if(err){
        console.log(err);
        callback(-1,err);
      }else{
          if(data.length===0){
             callback(-2,"no se puede crear usuario");
          }else{
            var datos=data[0];    
            var respuesta={};        
            var n=datos.estudiantes.length;
            var existe=0;
            for(var i=0;i<n;i++){
              if(datos.estudiantes[i].codigo===Codigo){
                 existe=1;
                break;
              }else{
                 existe=0;
              }
            }
            ///
            if(existe===0){
              console.log('apel  '+Apellidos);
              datos.estudiantes.push({nombre:Nombre,apellidos:Apellidos,codigo:Codigo,carrera:Carrera,contrasena:Contrasena});                
                datos.save();
                respuesta.mensage="Usuario creado correctamente! inicie sesion nuevamente";
              }else{
                respuesta.mensage="ya existe el usuario.";
              }
              callback(respuesta,null);
          }
      }
    });
}