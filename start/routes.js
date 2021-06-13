"use strict";

const Route = use("Route");

Route.post("register", "Authcontroller.register");
Route.post("authenticate", "AuthController.authenticate");

Route.get("/app", "AppController.index").middleware(["auth"]);

Route.get("/categorias", "CategoriaController.index");
Route.post("/categorias", "CategoriaController.store");
Route.put("/categorias", "CategoriaController.update");
Route.delete("/categorias", "CategoriaController.delete");

Route.get("/produtos_categoria/:id", "ProdutoController.buscaPorCategoria");
Route.get("/produtos", "ProdutoController.buscaPorNome");

Route.post("/carrinho", "CarrinhoController.store");
Route.get("/carrinho", "CarrinhoController.show");

Route.get("/venda", "Vendacontroller.venda");
