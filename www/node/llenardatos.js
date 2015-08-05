var mongoose=require('mongoose');
var async=require("async");
//aqui se inicia la conexion a la base de datos si existe una base de datos entond¿ces lo elimina y crea otro
mongoose.connect('mongodb://localhost/sistemaComedor',function(){
	mongoose.connection.db.dropDatabase(function(err,result){
		if(err)console.log(err);
		else{
			cargarData();
		}
	});
});
///////////////////////////para cargar datos////////
var ComedorDB=require('./Modelos/comedor.js');

function cargarData(){
	console.log("Iniciando Carga");
    async.series(
    	[
    	 function(callback){
    	 var comedorInsertar=new ComedorDB({codigo:"STOT",nombre:"Sede totoral san jeronimo"});
         //insertamos los menus a preparar
         comedorInsertar.menu.push({fecha:"31/7/2015",desayuno:"Pan con leche",almuerzo:"Comida Desconocida"});
         comedorInsertar.menu.push({fecha:"3/8/2015",desayuno:"Pan sin leche",almuerzo:"Comida Conocida"});
         comedorInsertar.menu.push({fecha:"2/8/2015",desayuno:"Noy hay desayuno",almuerzo:"Chaufa"});
    	 //insertamos datos entodos los campos
    	 comedorInsertar.administrador.push({nombre:"EtsunAdministrador",apellidos:"Ortiz Guillen",dni:"47508449",contrasena:"Etsun"});
    	 comedorInsertar.nutricionista.push({nombre:"EtsunNutricionista",apellidos:"Ortiz Guillen",dni:"47508449",contrasena:"Etsun"});
    	 comedorInsertar.estudiantes.push({nombre:"Etsun",apellidos:"Ortiz Guillen",codigo:"1003720122",carrera:"Ingenieria de sistemas",contrasena:"etsun"});
    	 comedorInsertar.estudiantes[0].consumo.push({servicio:"desayuno",fecha:"31/8/2015"});
    	 //insertamos mas datos en todos los campos
    	 comedorInsertar.administrador.push({nombre:"KevinAdministrador",apellidos:"Ortiz Guillen",dni:"71861477",contrasena:"kevin"});
    	 comedorInsertar.nutricionista.push({nombre:"KevinNutricionista",apellidos:"Ortiz Guillen",dni:"71861477",contrasena:"kevin"});
    	 comedorInsertar.estudiantes.push({nombre:"Kevin",apellidos:"Ortiz Guillen",codigo:"1002620122",carrera:"Ingenieria de sistemas",contrasena:"kevin"});
    	 comedorInsertar.estudiantes[1].consumo.push({servicio:"desayuno",fecha:"31/8/2015"});
         //insertar nuevo 
         comedorInsertar.administrador.push({nombre:"Gilver",apellidos:"Damiano Aparco",dni:"12345678",contrasena:"gilver"});
         comedorInsertar.nutricionista.push({nombre:"Gilver",apellidos:"Damiano Aparco",dni:"12345678",contrasena:"gilver"});
         comedorInsertar.estudiantes.push({nombre:"Gilver",apellidos:"Damiano Aparco",codigo:"1000420122",carrera:"Ingenieria de sistemas",contrasena:"gilver"});
         comedorInsertar.estudiantes[0].consumo.push({servicio:"desayuno",fecha:"31/8/2015"});
    	 comedorInsertar.save(callback);
    	 }
    	],//esta parte es opcional
    	function(err,result){
    		if(err){
    			console.log("Hubo un error");
    		}
    		else{
    			console.log("Carga Finalizada");
    		}
    	}
    	);	
}