var NUTRICIONISTA=(function(){
   var my={};
    ///////////
    my.crearEnlace=function(){
    $("body").append('<a id="irNLlenarMenu" href="#idPageMenuPreparar"></a>');
    $("body").append('<a id="irNVerRegistro" href="#idPageRegistroEstudiantes"></a>');
    $("body").append('<a id="irNVerEstudiante" href="#idPageVerEstudiantes"></a>');
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
        }
    };
    my.llenarMenu=function(param){       
        $.ajax({
            type:"POST",
            url:"http://192.168.195.1:9095/getllenarmenu",
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