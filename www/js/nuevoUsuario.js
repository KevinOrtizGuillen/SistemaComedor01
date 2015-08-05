var NUEVO_USUARIO=(function(){
var my={};
    //////
    my.crearCuenta=function(param){
          $.ajax({
                 type:"POST",
                 url:"http://192.168.56.102:9095/getRegistrarCuenta",
                 data:"data="+JSON.stringify(param),
                 dataType:'text',
                 //
                 success:function(data){//{dato:" correctamente",param({codigo,contraseña})}
                     var dato=JSON.parse(data);
                 navigator.notification.alert(''+dato.mensage,function(){},'MENSAGE','ACEPTAR');
                     
          },
          error:function(data){
          console.log("ERROR "+data);
          }
      });
    };
    //////
return my;
}());