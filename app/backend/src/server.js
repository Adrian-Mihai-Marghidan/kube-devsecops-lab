const app = require("./app");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "kube-devsecops-lab-backend";

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}`);
});
