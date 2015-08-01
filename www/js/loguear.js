var LOGUEAR=(function(){
	var my={};
	//////////////
	my.crearEnlace=function(){
		$("body").append('<a id="irPageEstudiante"  href="#idPageEstudiante"></a>');
		$("body").append('<a id="irPageCrearCuenta"  href="#idPageCrearCuenta"></a>');
        $("body").append('<a id="irPageAdministrador"  href="#idPageAdministardor"></a>');
        $("body").append('<a id="irPageNutrici"  href="#idPageNutricionista"></a>');
        
	};
   
	my.loguearUsuario=function(param){
		$.ajax({
			type:"POST",
			url:"http://192.168.195.101:9095/getLogin",
			data:"data="+JSON.stringify(param),
			dataType:'text',
            success:function(data){
            	var dato=JSON.parse(data);
            	if(dato.estado===1)
            	{
            	  $("#irPageEstudiante").click();
                   //  var opciones=$("#idPageEstudiantes :checked")[0].id; || dato.estado===3
            	}else if(dato.estado===2)
                {
                  $("#irPageAdministrador").click();
                }else if(dato.estado===3)                    
                {
                  $("#irPageNutrici").click();
                }else{
                navigator.notification.confirm('No Autenticado',function(){
            			$("#irPageCrearCuenta").click();
            		},'MENSAGE','Aceptar');
                }
            },
            error:function(data){
            	console.log("ERROR "+data);
            }
		});
	};
	//////////////
	return my;
}());