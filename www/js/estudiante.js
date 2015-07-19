var ESTUDIANTE=(function(){
   var my={};
   //////////////
    my.crearEnlace=function(){
    $("body").append('<a id="irVERmenu" href="#idPageMenu"></a>');
    $("body").append('<a id="irVERmapa" href="#idPageVerEstudiantes"></a>');
    };
    /////////////
    my.irServicios=function(param){
        var opciones=$("#idPageEstudiante_GrupoOpciones :checked")[0].id;
          if(opciones=="idVerMenu"){
            $("#irVERmenu").click(); 
               $.ajax({
                 type:"POST",
                 url:"http://192.168.195.1:9095/getMenuDelDia",
                 data:"data="+JSON.stringify(param),
                 dataType:'text',
                 //
                 success:function(data){
                 ///aqui todas
                 var dato=JSON.parse(data);
                 $("#idMPLista").empty();    
                 navigator.notification.alert(''+dato.dato,function(){},'MENSAGE','ACEPTAR');
                 $("#idMPLista").append('<li>Desayuno: '+dato.menu.desayuno+'</li>');
                 $("#idMPLista").append('<li>Almuerzo: '+dato.menu.almuerzo+'</li>');
          },
          error:function(data){
          console.log("ERROR "+data);
          }
      });
            }else{
            $("#irVERmapa").click();
             
            }     
    };  
   //////////////
    my.verRegistroDeEstudiantes=function(){
    $.ajax({
        type:"POST",
        url:"http://192.168.195.1:9095/getRegistroEstudiantes",
        data:"data="+JSON.stringify(null),
        success:function(data){
            var dato=JSON.parse(data);
            //
                $("#idNREstudiantes").empty();
            for(var i=0;i<dato.data.length;i++){
                $("#idNREstudiantes").append('<li><a>'+dato.data[i]+'</a></li>');
            };
        },
        error:function(data){
        }        
      }); 
    };
    /////////////
    my.buscarEstudiante=function(param){
      $.ajax({
        type:"POST",
        url:"http://192.168.195.1:9095/getBuscarEstudiante",
        data:"data="+JSON.stringify(param),
        success:function(data){
            var dato=JSON.parse(data);
            //              
               if(dato.estado===1){                
               navigator.notification.alert('Asistencia Registrada  '+dato.dato,function(){},'MENSAJE','ACEPTAR');
               $("#idMCBALista").append('<li><a>'+dato.dato+'</a></li>');
               }else{
               navigator.notification.alert('El alumno no existe  '+dato.dato,function(){},'MENSAJE','ACEPTAR');
               }
        },
        error:function(data){
        }        
      }); 
    }; 
   //////////////
   return my;
}());