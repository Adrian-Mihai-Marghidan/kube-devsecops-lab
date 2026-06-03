const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "kube-devsecops-lab-backend";
const APP_VERSION = process.env.APP_VERSION || "0.1.0";

app.get("/", (req, res) => {
  res.json({
    message: "Kubernetes DevSecOps Lab backend API",
    healthEndpoint: "/health"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: APP_NAME,
    version: APP_VERSION,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}`);
});
