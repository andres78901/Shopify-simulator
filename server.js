const express = require("express");
const { Liquid } = require("liquidjs");
const path = require("path");
const fs = require("fs");

const app = express();

const engine = new Liquid({
  root: [
    path.resolve(__dirname, "templates"),
    path.resolve(__dirname, "sections"),
    path.resolve(__dirname, "snippets"),
  ],
  extname: ".liquid",
});

app.engine("liquid", engine.express());
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "liquid");

app.use(express.static("public"));
app.use("/assets", express.static(path.join(__dirname, "assets")));

const products = require("./data/products.json");
const collections = require("./data/collections.json");
const settings = JSON.parse(
  fs.readFileSync("./config/settings_data.json", "utf-8")
);

app.get("/", (req, res) => {
  // Filtrar colecciones creadas después del 1 de enero de 2025
  const filteredCollections = collections.filter((col) => {
    return new Date(col.created_at) > new Date("2025-01-01");
  });
  res.render("index", {
    products,
    collections: filteredCollections,
    settings: settings.sections,
  });
});

// Catch-all para rutas no definidas: responde con página de 'Under Construction' en inglés y temporizador de 6 segundos
app.get("*", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Under Construction</title>
        <style>
          body { background: #232936; color: #fff; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .modal { background: #fff; color: #232936; border-radius: 12px; padding: 2.5rem 2rem; box-shadow: 0 4px 32px rgba(0,0,0,0.18); text-align: center; max-width: 350px; }
          .modal h2 { margin: 0 0 1rem 0; font-size: 2rem; }
          .modal p { font-size: 1.1rem; }
          .modal button { margin-top: 1.5rem; background: #232936; color: #fff; border: none; border-radius: 6px; padding: 0.7rem 1.5rem; font-size: 1rem; cursor: pointer; font-family: inherit; }
          .modal .timer { display: block; margin-top: 1rem; font-size: 1.1rem; color: #ff5a5f; }
        </style>
      </head>
      <body>
        <div class="modal">
          <h2>Under Construction 🚧</h2>
          <p>This section will be available soon.</p>
          <span class="timer" id="timer">Returning in 6 seconds...</span>
          <button onclick="window.history.length > 1 ? window.history.back() : window.location.href='/'">Go back</button>
        </div>
        <script>
          let seconds = 6;
          const timer = document.getElementById('timer');
          const interval = setInterval(() => {
            seconds--;
            if (seconds > 0) {
              timer.textContent = \`Returning in \${seconds} second\${seconds === 1 ? '' : 's'}...\`;
            } else {
              clearInterval(interval);
              window.history.length > 1 ? window.history.back() : window.location.href = '/';
            }
          }, 1000);
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
