var ADMINISTRADOR=(function(){
	var my={};
    ///////////
    my.crearEnlaces=function(){
     $("body").append('<a id="irPageMarcarConsumo" href="#idPageMarcarConsumo"></a>');
     $("body").append('<a id="irVerMenuPrep" href="#idPageMenu"></a>');
     $("body").append('<a id="irAverEstudiante" href="#idPageVerEstudiantes"></a>');
    }
	///////////
	my.irServicios=function(){
       var opciones=$("#idOpcionesAdministrador :checked")[0].id;       
       if(opciones==='idAMarcConsumo'){
       	$("#irPageMarcarConsumo").click();
           /////
       }else if(opciones==='idAMenuPrep'){
       	$("#irVerMenuPrep").click();
           var param={};
           param.estado=2;                      
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
       }else if(opciones==='idAverEstudiante'){
        $("#irAverEstudiante").click();
        conectarse();
           ///
       }
	};
    ///////////
    my.marcarConsumo=function(param){
      $.ajax({
         type:"POST",
          url:"http://192.168.56.102:9095/getMarcarConsumo",
          data:"data="+JSON.stringify(param),
          dataType:'text',
          success:function(data){
          var dato=JSON.parse(data);
              ////
              navigator.notification.alert(''+dato.dato,function(){},'MENSAGE','ACEPTAR');
          },
          error:function(data){
          console.log("ERROR "+data);
          }
      });
    };
	///////////
	return my;
}());