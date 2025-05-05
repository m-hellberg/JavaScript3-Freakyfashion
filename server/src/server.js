import express from 'express';
import Database from "better-sqlite3";

const port = 8000;
const db = new Database("./db/freakyfashion.db", { verbose: console.log });
const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products WHERE isPopular = 1");
    const products = stmt.all();
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av produkter:", error);
    res.status(500).json({ error: "Serverfel vid hämtning av produkter" });
  }
});

app.get("/api/products/:slug", (req, res) => {
  const slug = req.params.slug;
  const stmt = db.prepare("SELECT * FROM products WHERE slug = ?");
  const product = stmt.get(slug);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.get("/api/related-products/:slug", (req, res) => {
  const slug = req.params.slug;
  try {
    const stmt = db.prepare(`
      SELECT * FROM products 
      WHERE slug != ? 
      ORDER BY RANDOM() 
      LIMIT 9
    `);
    const relatedProducts = stmt.all(slug);
    res.json(relatedProducts);
  } catch (error) {
    console.error("Fel vid hämtning av relaterade produkter:", error);
    res.status(500).json({ error: "Serverfel vid hämtning av relaterade produkter" });
  }
});

app.get("/api/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Sökterm saknas" });
  }

  try {
    const stmt = db.prepare("SELECT * FROM products WHERE name LIKE ?");
    const products = stmt.all(`%${query}%`);
    res.json(products);
  } catch (error) {
    console.error("Fel vid sökning:", error);
    res.status(500).json({ error: "Serverfel vid sökning" });
  }
});

app.get("/api/admin/products", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    res.json(products);
  } catch (error) {
    console.error("Fel vid hämtning av alla produkter:", error);
    res.status(500).json({ error: "Serverfel vid hämtning av alla produkter" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Produkt hittades inte" });
    }
    res.json({ message: "Produkt raderad" });
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ error: "Serverfel vid radering" });
  }
});

app.post("/api/products", (req, res) => {
  const { name, image, sku, slug } = req.body;

  if (!name || !image || !sku || !slug) {
    return res.status(400).json({ message: "Obligatoriska fält saknas" });
  }

  const { description, brand, price, publicationDate } = req.body;

  // Skapa ett slumpmässigt värde för purchasesThisMonth mellan 50 och 500
  const purchasesThisMonth = Math.floor(Math.random() * (500 - 50 + 1)) + 50;

  // Lägg till i databasen
  const stmt = db.prepare(`
    INSERT INTO products (name, description, image, brand, sku, price, publicationDate, slug, purchasesThisMonth, isPopular)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Använd purchasesThisMonth och isPopular kommer att sättas av din trigger
  const result = stmt.run(name, description, image, brand, sku, price, publicationDate, slug, purchasesThisMonth, 0);

  res.status(201).json({
    message: "Produkt tillagd",
    id: result.lastInsertRowid
  });
});

//app.get('/api/products', (req, res) => {

  //const { query? } = req.query;

  //if (name) {
      //const filteredProducts = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
      //return res.json(filteredProducts);
  //}

  //res.json(products);
//});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
