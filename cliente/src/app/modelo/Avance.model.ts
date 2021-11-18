export interface Avance{
     idAvance?:string;
     idTrimestre?:string;
     idUsuarioAplicativo?:string;
     idSolicitud?:string;
     documento?:string;
     fechaHora?:string;
 }

 export interface AvanceDetetalle{
    idAvance?:string;
    idSolicitud?:string;
    fechaHora?:string;
    descripcion?:string;
    nombre?:string;
    apellidos?:string;
    nombreSolicitud?:string;

 }
