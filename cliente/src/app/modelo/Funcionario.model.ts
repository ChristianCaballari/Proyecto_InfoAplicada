export interface Funcionario{
     idDepartamento?:string;
     idSexo?:string;
     nombre?:string;
     apellidos?:string;
     fachaNacimiento?:string;
     foto?:string;
     loginName?:string;
     password?:string;      
}
export interface FuncionarioE{
     id?:string;
     idDepartamento?:string;
     idSexo?:string;
     nombre?:string;
     apellidos?:string;
     fachaNacimiento?:string;
     foto?:string;
     loginName?:string;
     password?:string;      
}
export interface Funcionario1{
     idFuncionario:string;
     departamento:string;
     sexo:string;
     nombre:string;
     apellidos:string;
     fechaNacimiento?:string;
}