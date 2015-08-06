(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    LOGUEAR.crearEnlace();   
    ESTUDIANTE.crearEnlace();
    ADMINISTRADOR.crearEnlaces();
    NUTRICIONISTA.crearEnlace();        
     /* button  #idAceptar */
    $(document).on("click", "#idAceptar", function(evt)
    {
        /* your code goes here */ 
        
       var perfil=$("#idPerfil").val();
       var codigo=$("#idCodigo").val();
       var contra=$("#idPass").val();
       	    var param={};
       	         param.perfil=perfil;
       	         param.codigo=codigo;
       	         param.contrasena=contra;        
       	         LOGUEAR.loguearUsuario(param);
        
    });
    
        /* button  #idAceptarEstudiante */
    $(document).on("click", "#idAceptarEstudiante", function(evt)
    {
        /* your code goes here */        
        var fecha=Date();
        var param={};
          param.estado=1;
          param.date=fecha;        
          ESTUDIANTE.irServicios(param);
    });
  
    
        /* button  #idAAceptar */
    $(document).on("click", "#idAAceptar", function(evt)
    {
        /* your code goes here */ 
        var param={};
        ADMINISTRADOR.irServicios();
        $("#idMCBALista").empty();
    });
    
        /* button  #idNAceptar */
    $(document).on("click", "#idNAceptar", function(evt)
    {
        /* your code goes here */ 
         NUTRICIONISTA.irServicios();
    });
    
        /* button  #idMCBuscar */
    $(document).on("click", "#idMCBuscar", function(evt)
    {
        /* your code goes here */ 
        var codigo=$("#idMCCodigo").val();
        var fecha='2014-05-01';
        var hora=9;
           var param={};
            param.codigo=codigo;
            param.fecha=fecha;
            param.hora=hora;
        $("#idMCBALista").empty();        
        ESTUDIANTE.buscarEstudiante(param);
        
        
    });
    
        /* button  #idMCDesayuno */
    $(document).on("click", "#idMCDesayuno", function(evt)
    {
        /* your code goes here */ 
        var date=new Date();
        var fecha=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();        
        var hora=date.getHours()+':'+date.getMinutes();        
        var codigo=$("#idMCCodigo").val();
        var param={};            
            param.fecha=fecha;
             param.codigo=codigo;
            param.hora=hora;
        param.turno="Desayuno";
        ADMINISTRADOR.marcarConsumo(param);
        
    });
         /* button  #idMCAlmuerzo */
    $(document).on("click", "#idMCAlmuerzo", function(evt)
    {
        /* your code goes here */ 
        var date=new Date();
        var fecha=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();        
        var hora=date.getHours()+':'+date.getMinutes();     
        var codigo=$("#idMCCodigo").val();
        var param={};            
            param.fecha=fecha;
            param.codigo=codigo;
            param.hora=hora;
            param.turno='Almuerzo';
        ADMINISTRADOR.marcarConsumo(param);
    });    
       
        /* button  #idMPAgregar */
    $(document).on("click", "#idMPAgregar", function(evt)
    {
        /* your code goes here */ 
        var fecha=$("#idMPFecha").val();
        var desayuno=$("#idMPDesayuno").val();
        var almuerzo=$("#idMPAlmuerzo").val();
        var param={};
          param.fecha=fecha;
          param.desayuno=desayuno;
          param.almuerzo=almuerzo;
        NUTRICIONISTA.llenarMenu(param);
    });
    
        /* button  #idMenviar */
    $(document).on("click", "#idMenviar", function(evt)
    {
        /* your code goes here */ 
        enviarPosicion();
    });
  
    
        /* button  #idAceptarCCuenta */
    $(document).on("click", "#idAceptarCCuenta", function(evt)
    {
        /* your code goes here */ 
        var perfil=$("#idPerfCCuenta").val();
        var dni=$("#iddniCCuenta").val();
        var nombres=$("#idNomCCuenta").val();
        var apellidos=$("#idApelCCuenta").val();
        var contrasena=$("#idPassCCuenta").val();
        var codigo=$("#idCodCCuenta").val();
        var carrera=$("#idCarrCCuenta").val();
        var param={};
          param.perfil=perfil;
          param.dni=dni;
          param.nombres=nombres;
          param.apellidos=apellidos;
          param.contrasena=contrasena;
          param.codigo=codigo;
          param.carrera=carrera;
        NUEVO_USUARIO.crearCuenta(param);
    });   
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
