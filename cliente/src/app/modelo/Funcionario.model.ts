export interface Funcionario{
     id?:string;
     idDepartamento?:string;
     idSexo?:string;
     nombre?:string;
     apelliidos?:string;
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