import { Injectable } from '@angular/core';
import clienteAxios from '../componentes/ClienteAxios/Axios';
@Injectable()
export class LoginService {
  loginName: string = '';

  constructor() {}

  async login(email: string, password: string) {
    let funcionario;
    let fun = {};

    try {
      let rest = await clienteAxios.get(
        `funcionario/consultar/${email}/${password}`
      );
      let obj = rest.data[0]['loginName'];
      let pas = rest.data[0]['password'];
      this.loginName = obj;

      console.log("Login Name : "+obj);

      funcionario = rest.data[0];
      fun = funcionario;
    } catch (error) {
      console.log(error);
    }
    return fun;
  }
  getAutenicacion() {
    console.log(this.loginName);
    return this.loginName;
  }
  logout(){
    this.loginName = '';
  }
}
