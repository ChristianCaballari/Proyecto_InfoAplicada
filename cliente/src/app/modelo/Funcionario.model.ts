export interface Funcionario{
     idFuncionario?:string;
     idDepartamento?:string;
     idSexo?:string;
     nombre?:string;
     apellidos?:string;
     fachaNacimiento?:string;
     foto?:string;
     loginName?:string;
     password?:string;      
}

export interface FuncionarioD{
     departamento?:string;
     sexo?:string;
     nombre?:string;
     apellidos?:string;
     fachaNacimiento?:string;
     foto?:string;
     loginName?:string;    
}
export interface Funcionario2{
     idFuncionario?:string;
     nombre?:string;
     apellidos?:string;
   
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
export interface FuncionarioLogin{
     loginName?:string;
     password?:string;
}