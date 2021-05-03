"use strict";
const User = use("App/Models/User");

class AuthController {
  async register({ request }) {
    const data = request.only([
      "username",
      "email",
      "password",
      "users_tipo",
      "telefone",
      "cpf",
      "data_nascimento",
      "logradouro",
      "complemento",
      "numero",
      "bairro",
    ]);
    const user = await User.create(data);
    return {success:true,user,message:"Usuario cadastrado com sucesso!"};
  }
  async authenticate({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
}

module.exports = AuthController;

