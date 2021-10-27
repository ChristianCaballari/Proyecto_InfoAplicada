class Funcionario{ 
    
    constructor(idDepartamento,idSexo,nombre,apellidos,fechaNacimiento,foto,loginName,password){
        //this.idFuncionario=idFuncionario;
        this.idDepartamento= idDepartamento;
        this.idSexo= idSexo;
        this.nombre= nombre;
        this.apellidos= apellidos;
        this.fechaNacimiento= fechaNacimiento;
        this.foto= foto;
        this.loginName= loginName;
        this.password= password;
    }

}

module.exports= Funcionario; 