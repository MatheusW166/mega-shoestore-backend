import { ObjectId } from "mongodb";
import db from "../database/database.connect.js";
import {
  checarEstoqueDeProdutos,
  realizarBaixaDeProdutos,
} from "../database/database.services.js";

async function listarPedidos(_, res) {
  const { idUsuario } = res.locals.sessao;
  try {
    const pedidos = await db
      .collection("pedidos")
      .find({ _id: new ObjectId(idUsuario) })
      .toArray();
    res.send(pedidos);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function criarPedido(req, res) {
  const { produtos } = req.body;
  const { idUsuario } = res.locals.sessao;
  try {
    const disponibilidade = await checarEstoqueDeProdutos(produtos);

    if (disponibilidade?.error) {
      return res.status(401).send(disponibilidade.error);
    }

    await realizarBaixaDeProdutos(produtos);
    const { insertedId } = await db.collection("pedidos").insertOne({
      idUsuario,
      produtos,
      criadoEm: Date.now(),
    });
    res.status(201).send(insertedId);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listarPedidos, criarPedido };