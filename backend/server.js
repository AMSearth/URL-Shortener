import express from "express";
import crypto from "crypto";
import cors from "cors";
const app = express();
const PORT = 3000;
const urls = {};

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.post("/api/submit-form", (req, res) => {
  const inputValue = req.body.urlInput;
  const randomKey = `url_${crypto.randomBytes(3).toString("hex")}`;
  urls[randomKey] = inputValue;
  res.status(200).json({
    success: true,
    message: `http://localhost:3000/${randomKey}`,
  });
});

app.get("/:slug", (req, res) => {
  const reqSlug = req.params.slug;
  const extLink = urls[reqSlug];
  if (extLink) {
    res.redirect(extLink);
  } else {
    res.status(404).send("Link not found or expired.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
