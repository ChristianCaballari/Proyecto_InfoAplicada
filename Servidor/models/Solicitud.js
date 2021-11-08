class Solicitud{ 
    constructor(fechaHora,idUsuarioAplicativo,idResponsableTI,fechaInicio,fechaFin,idResponsableUsuarioFinal,documentoActaConstitutiva){
       
        this.fechaHora= fechaHora;
        this.idUsuarioAplicativo= idUsuarioAplicativo;
        this.idResponsableTI= idResponsableTI;
        this.fechaInicio= fechaInicio;
        this.fechaFin= fechaFin;
        this.idResponsableUsuarioFinal= idResponsableUsuarioFinal;
        this.documentoActaConstitutiva= documentoActaConstitutiva
    }

}

module.exports= Solicitud; 