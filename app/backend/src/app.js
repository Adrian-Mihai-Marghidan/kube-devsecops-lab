const express = require("express");
require("dotenv").config();

const app = express();

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

app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "ready",
    service: APP_NAME,
    version: APP_VERSION,
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
