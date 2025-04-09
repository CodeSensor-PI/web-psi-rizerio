import { errorMessage } from "./alert.js";

export function autenticateUser(email, password) {
  
  // Verifica se os campos estão vazios
  if (email.trim() === "" || password.trim() === "") {
    errorMessage(`Você não pode ter campos vazios!`);
    return false;
  }

  // Verifica se o email está em um formato válido
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage(`Email inválido!`);
    return false;
  }

  // Validação de senha que NÃO vai precisar ser UTILIZADA

  // if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   errorMessage(
  //     `A senha precisa ter ao menos 8 caracteres e 1 caractere especial`
  //   );
  //   return false;
  // }


  // Se todas as validações passarem, retorna true
  return true;
}