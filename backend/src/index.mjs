import cors from "cors";
import express, { request, response } from "express";

import productRoutes from "./routes/product.router.mjs";

const PORT = process.env.PORT || 9000;

const server = express();

server.use(cors());
server.use(express.json());
server.use(productRoutes);
server.use("*", (request, response) => {
  response.status(404).send({ message: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Estou rodando na porta ${PORT}`);
});
