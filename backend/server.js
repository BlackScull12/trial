const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const DATA_FILE = "./data.json";
const ADMIN_PASSWORD = "yourAdminPass123"; // change this

// Helper: read data.json
function readData() {
  if (!fs.existsSync(DATA_FILE)) return { items: [], dropDate: null };
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Helper: write data.json
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Admin login check
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) res.json({ success: true });
  else res.json({ success: false });
});

// Get store items
app.get("/api/store", (req, res) => {
  const data = readData();
  const now = new Date();
  const dropDate = new Date(data.dropDate);
  const showStore = now >= dropDate;
  const visibleItems = data.items.filter(item => item.show);
  res.json({ storeOpen: showStore, items: visibleItems });
});

// Admin: add new item
app.post("/api/admin/add", (req, res) => {
  const data = readData();
  const newItem = req.body; // {name, description, price, image, show}
  data.items.push(newItem);
  writeData(data);
  res.json({ success: true });
});

// Admin: toggle visibility
app.post("/api/admin/toggle", (req, res) => {
  const { index } = req.body;
  const data = readData();
  data.items[index].show = !data.items[index].show;
  writeData(data);
  res.json({ success: true });
});

// Admin: delete item
app.post("/api/admin/delete", (req, res) => {
  const { index } = req.body;
  const data = readData();
  data.items.splice(index, 1);
  writeData(data);
  res.json({ success: true });
});

// Admin: set drop date
app.post("/api/admin/dropdate", (req, res) => {
  const { dropDate } = req.body;
  const data = readData();
  data.dropDate = dropDate;
  writeData(data);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
