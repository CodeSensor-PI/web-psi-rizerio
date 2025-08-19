import Swal from "sweetalert2";
import "../App.css";

export function errorMessage(mensagem, size = "small") {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
    customClass: {
      popup: `swal-${size}`,
    },
  });
}

export function responseMessage(mensagem, size = "small") {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
    customClass: {
      popup: `swal-${size}`,
    },
  });
}

export function confirmEdit(titulo, message, size = "small") {
  return Swal.fire({
    title: titulo,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Salvar",
    cancelButtonText: "Continuar editando",
    customClass: {
      popup: `swal-${size}`,
      confirmButton: "btn_primario",
      cancelButton: "btn_secundario",
    },
    backdrop: false,
  });
}


