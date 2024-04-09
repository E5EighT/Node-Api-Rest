import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");
    return res.json(products);
  } catch (e) {
    return res.status(500).json({ message: "Fatal Error." });
  }
};

export const getProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    const [product] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      Id
    );
    if (product.length <= 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product[0]);
  } catch (error) {
    return res.status(500).json({ message: "Fatal Error." });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [createdProduct] = await pool.query(
      "INSERT INTO products (title,description) VALUES (?,?)",
      [title, description]
    );
    return res.json({ id: createdProduct.insertId, title, description });
  } catch (error) {
    return res.status(500).json({ message: "Fatal Error." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    const { title, description } = req.body;
    const [updatedProduct] = await pool.query(
      "UPDATE products SET title = ?, description = ? WHERE id = ?",
      [title, description, Id]
    );
    if (updatedProduct.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [
      Id,
    ]);
    return res.json(products[0]);
  } catch (error) {
    return res.status(500).json({ message: "Fatal Error." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const Id = req.params.id;
    const [deletedProduct] = await pool.query(
      "DELETE FROM products WHERE id = ?",
      Id
    );
    if (deletedProduct.affectedRows <= 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ message: "Fatal Error." });
  }
};
