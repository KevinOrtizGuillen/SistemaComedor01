var mongoose=require('mongoose');

var schemaConsumo=new mongoose.Schema({
	servicio:String,
	fecha:Date
	//hora:int
});

var schemaEstudiante=new mongoose.Schema({
	nombre:String,
    apellidos:String,
    codigo:String,
    carrera:String,
    contrasena:String,
    consumo:[schemaConsumo]
});


var schemaNutricionista=new mongoose.Schema({
	nombre:String,
	apellidos:String,
	dni:String,
	contrasena:String
});

var schemaAdministrador=new mongoose.Schema({
	nombre:String,
	apellidos:String,
	dni:String,
	contrasena:String
});

 var schemaMenu=new mongoose.Schema({
     fecha:String,
     desayuno:String,	
     almuerzo:String
 }); 

var schemaComedor=new mongoose.Schema({
	codigo:String,
	nombre:String,
	administrador:[schemaAdministrador],
	nutricionista:[schemaNutricionista],
	estudiantes:[schemaEstudiante],
	menu:[schemaMenu]
});

module.exports=mongoose.model('Comedor',schemaComedor);
/*
Comedor('STOT').estudiantes.findById('1002620122').exec(function(err, estudiante){
	if(err){
		console.log(err);		
	}else{
		if(estudiante.length===0){
			console.log('alumno no encontrado');
		}else{
			console.log(estudiante);
		}
	}
});*/