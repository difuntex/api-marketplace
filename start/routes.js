"use strict";

const Route = use("Route");

Route.post("register", "Authcontroller.register");
Route.post("authenticate", "AuthController.authenticate");

Route.get("/app", "AppController.index").middleware(["auth"]);
