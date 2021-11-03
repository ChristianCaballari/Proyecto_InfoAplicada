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
      timer: 2000,
    });
  }
}
