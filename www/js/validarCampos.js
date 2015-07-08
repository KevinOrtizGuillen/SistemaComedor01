/////////////////
function hola(){
var opcion=$("#idPerfil").val();
   //  alert(opcion);
    //$('#idCodigo').attr("id","8"); //cambia el valor del campo value por el codigo
    if(opcion==='ESTUDIANTE'){
    var cambiartext=document.getElementById('labelCodigo');
    cambiartext.innerHTML="Codigo";
    var cajaTexto=document.getElementById('idCodigo');
    cajaTexto.value='1002620122';
    }else{    
     var cambiartext=document.getElementById('labelCodigo');
    cambiartext.innerHTML="DNI";
     var cajaTexto=document.getElementById('idCodigo');
    cajaTexto.value='71861477';
    }
   
}
/////////////////