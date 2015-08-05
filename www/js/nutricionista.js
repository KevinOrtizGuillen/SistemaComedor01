var NUTRICIONISTA=(function(){
   var my={};
    ///////////
    my.crearEnlace=function(){
    $("body").append('<a id="irNLlenarMenu" href="#idPageMenuPreparar"></a>');
    $("body").append('<a id="irNVerRegistro" href="#idPageRegistroEstudiantes"></a>');
    $("body").append('<a id="irNVerEstudiante" href="#idPageVerEstudiantes"></a>');
    $("body").append('<a id="irVerMenuPrep" href="#idPageMenu"></a>');
    };
    ///////////
    my.irServicios=function(){
     var opciones=$("#idNutricionistaOpciones :checked")[0].id;
        if(opciones==='idNLlenarMenu'){
            //
            $("#irNLlenarMenu").click();
        }
        else if(opciones==='idNVerRegistro'){
            //
            $("#irNVerRegistro").click();
            ESTUDIANTE.verRegistroDeEstudiantes();
        }
        else if(opciones==='idNVerEstudiantes'){
            //
            $("#irNVerEstudiante").click();
            conectarse();
        }else if(opciones==='idNverMenu'){
             ///////////////////
            	$("#irVerMenuPrep").click();
           var param={};
           param.estado=3;                      
               $.ajax({
                 type:"POST",
                 url:"http://192.168.56.102:9095/getMenuDelDia",
                 data:"data="+JSON.stringify(param),
                 dataType:'text',
                 //
                 success:function(data){
                 ///aqui todas
                 var dato=JSON.parse(data);
                 $("#idMPLista").empty();    
                 navigator.notification.alert(''+dato.dato,function(){},'MENSAGE','ACEPTAR');
                     //recorremos la lista de menu
                 for(var i=0;i<dato.menu.length;i++){
                 $("#idMPLista").append('<li>Desayuno: '+dato.menu[i].desayuno+'</li>');
                 $("#idMPLista").append('<li>Almuerzo: '+dato.menu[i].almuerzo+'</li>');
                 }
                  },
                  error:function(data){
                  console.log("ERROR "+data);
                  }
               });
           ////
            ///////////////////////
        }
    };
    my.llenarMenu=function(param){       
        $.ajax({
            type:"POST",
            url:"http://192.168.56.102:9095/getllenarmenu",
            data:"data="+JSON.stringify(param),
            dataType:'text',
            success:function(data){
            var dato=JSON.parse(data);
            //
              if(dato.estado===1) {
                  navigator.notification.alert(''+dato.dato,function(){},'MENSAGE','ACEPTAR');
              } else{
                 navigator.notification.alert('no se ingreso todos los parametros correctamente',function(){},'MENSAGE','ACEPTAR');
              }
            },
            error:function(data){
            console.log("ERROR "+data);
            }
        });
    };
    ///////////
    return my;
}());