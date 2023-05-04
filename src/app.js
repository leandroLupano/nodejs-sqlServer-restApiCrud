import express from "express";
import config from "./config";
import productsRoutes from "./routes/products.routes";

const app = express();

// settings:
app.set("port", config.port);

// Configurar para que el servidor utilice Json:
// middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);

export default app;
