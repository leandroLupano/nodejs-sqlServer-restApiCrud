import { getConnection, sql, queries } from "../database";

export const getProducts = async (req, resp) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProducts);
    resp.json(result.recordset);
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};

export const createNewProducts = async (req, resp) => {
  const { name, description } = req.body;
  let { quantity } = req.body;

  if (!name || !description)
    return resp
      .status(400)
      .json({ msg: "Bad request. Please, fill all fields" });

  if (!quantity) quantity = 0;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(queries.addNewProduct);

    resp.json({ name, description, quantity });
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};

export const getProductById = async (req, resp) => {
  try {
    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.getProductById);

    resp.send(result.recordset[0]);
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};

export const deleteProductById = async (req, resp) => {
  try {
    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.deleteProductById);

    resp.sendStatus(204);
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};

export const getTotalProducts = async (req, resp) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(queries.getTotalProducts);

    resp.json(result.recordset[0][""]);
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};

export const updateProductById = async (req, resp) => {
  try {
    const { name, description, quantity } = req.body;
    const { id } = req.params;

    if (!name || !description || !quantity)
      return resp
        .status(400)
        .json({ msg: "Bad request. Please, fill all fields" });

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("Id", sql.Int, id)
      .query(queries.updateProductById);

    resp.json({ name, description, quantity });
  } catch (error) {
    resp.status(500);
    resp.send(error.message);
  }
};
