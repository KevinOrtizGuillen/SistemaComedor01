var mongoose=require('mongoose');

var ComedorDB=require('./Modelos/comedor.js');
mongoose.connect('mongodb://localhost/sistemaComedor');
ComedorDB.find({codigo:"STOT"},function(err,dato){
	//console.log(dato);
	var n=dato[0].administrador.length;
	var nameD=null;
	for(var i=0;i<n;i++){
		if(dato[0].administrador[i].nombre==="EtsunAdministrador"){
			console.log(dato[0].administrador[i]);			
			break;
		}
	}
});

