/////////////////estea parte es para loguerse
function hola(){
var opcion=$("#idPerfil").val();
   //  alert(opcion);
    //$('#idCodigo').attr("id","8"); //cambia el valor del campo value por el codigo
    if(opcion==='ESTUDIANTE'){
    var cambiartext=document.getElementById('labelCodigo');
    cambiartext.innerHTML="Codigo";
    var cajaTexto=document.getElementById('idCodigo');
    cajaTexto.value='';
    }else{    
     var cambiartext=document.getElementById('labelCodigo');
    cambiartext.innerHTML="DNI";
    var cajaTexto=document.getElementById('idCodigo');
    cajaTexto.value='';
    }
   
}
/////////////////fin de loguerse//////
////////////////esta parte es para poder registrarse//////
/*function Camporegistrarse(){
  var opcion=$('#idPerfCuenta').val();    
    var ocultarCodigo=document.getElementById('idCodigoCuenta');
    var ocultarCarrera=document.getElementById('idCarreraCuenta');
  if(opcion==='ESTUDIANTE'){
      ocultarCarrera.style.display='block';
      ocultarCodigo.style.display='block';
  }else{
      ocultarCarrera.style.display='none';
      ocultarCodigo.style.display='none';
  }
}*/