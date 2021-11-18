class Solicitud{ 
    constructor(idUsuarioAplicativo,idResponsableTI,fechaInicio,fechaFin,
        idResponsableUsuarioFinal,documentoActaConstitutiva,nombre){
       
        this.idUsuarioAplicativo= idUsuarioAplicativo;
        this.idResponsableTI= idResponsableTI;
        this.fechaInicio= fechaInicio;
        this.fechaFin= fechaFin;
        this.idResponsableUsuarioFinal= idResponsableUsuarioFinal;
        this.documentoActaConstitutiva= documentoActaConstitutiva
        this.nombre=nombre;
    }

}

module.exports= Solicitud; 