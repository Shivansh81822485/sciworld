const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// ✅ Serve Frontboy (main site files like index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "Frontboy")));

// ✅ Serve public folder for static PDFs
app.use("/public", express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontboy/index.html"));
});

// ✅ Dynamic Articles Page
app.get("/articles", (req, res) => {
  const pdfFolder = path.join(__dirname, "public/pdfs");

  fs.readdir(pdfFolder, (err, files) => {
    if (err) return res.send("Error reading PDF folder");

    const pdfs = files.filter(file => file.endsWith(".pdf"));

    let html = `
      <html>
      <head>
        <title>My Research Papers</title>
        <style>
          body { font-family: Arial; margin: 40px; }
          h1 { color: #2563eb; text-align: center; }
          ul { list-style: none; padding: 0; }
          li { margin: 15px 0; }
          a { text-decoration: none; color: #333; font-size: 18px; }
          a:hover { color: #2563eb; }
        </style>
      </head>
      <body>
        <h1>My Research Papers</h1>
        <ul>
    `;

    pdfs.forEach(pdf => {
      html += `<li><a href="/public/pdfs/${pdf}" target="_blank">${pdf}</a></li>`;
    });

    html += `
        </ul>
      </body>
      </html>
    `;

    res.send(html);
  });
});

// Join route
app.get("/join", (req, res) => {
  res.redirect("https://forms.gle/nWowY5rrvrSTDCws6");
});

// Community route
app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontboy/community.html"));
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
