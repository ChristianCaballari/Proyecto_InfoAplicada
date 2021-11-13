import Swal from 'sweetalert2';

export class Swal2 {
  constructor() {}

  exitoso(msg: string) {
    Swal.fire({
      title: `${msg}`,
      position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  }
  warning(msg: string) {
    Swal.fire({
      title: `${msg}`,
      position: 'top-end',
      icon: 'warning',
      showConfirmButton: false,
      timer: 2000,
    });
  }
  error(msg: string) {
    Swal.fire({
      title: `${msg}`,
      position: 'top-end',
      icon: 'error',
      showConfirmButton: false,
      timer: 2500,
    });
  }
  
//'Estas seguro que desea eliminar el siguiente funcionario?'
  delete(msg: string,text: string){
  Swal.fire({
    title: msg,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado',
        'Eliminado correctamente.',
        'success'
      )
    }
  })
}

}
