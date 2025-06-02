const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

require("./src/firebase"); 

const panelConfigRoutes = require("./src/routes/panelConfig");
const appConfigRoutes = require("./src/routes/appConfig");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/panel-config", panelConfigRoutes);
app.use("/config", appConfigRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
