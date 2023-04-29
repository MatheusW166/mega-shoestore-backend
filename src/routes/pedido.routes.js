import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
} from "../controllers/pedido.controllers.js";
import validateSchema from "../middlewares/schema.middleware.js";
import pedidoSchema from "../schemas/pedido.schema.js";
import { autentica } from "../middlewares/auth.middlewares.js";

const pedidoRoutes = Router();

pedidoRoutes.use(autentica);

pedidoRoutes.get("/pedidos", listarPedidos);
pedidoRoutes.post("/pedidos", validateSchema(pedidoSchema), criarPedido);

export default pedidoRoutes;
