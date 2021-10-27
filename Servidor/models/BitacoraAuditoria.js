class BitacoraAuditoria{ 
    constructor(idBitacoraAuditoria,idTransaccion,idUsuarioAplicativo,idSolicitud,descripcion,fechaHora){
        this.idBitacoraAuditoria=idBitacoraAuditoria;
        this.idTransaccion= idTransaccion;
        this.idUsuarioAplicativo= idUsuarioAplicativo;
        this.idSolicitud= idSolicitud;
        this.descripcion= descripcion;
        this.fechaHora= fechaHora;
        
    }

}

module.exports= BitacoraAuditoria; 