import 'bootstrap/dist/css/bootstrap.css'; // Asegúrate de importar también el CSS si lo necesitas

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default ({ app }, inject) => {
  inject('bootstrap', bootstrap);
};