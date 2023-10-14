console.clear();
import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import { Express } from "express";

import * as fileUpload from "express-fileupload";
import * as bodyParser from "body-parser";

import connect from "./config/connect";
// Import routes
import adminRoutes from "./routes/admin";
import servicesRoutes from "./routes/service";
import roomsRoutes from "./routes/rooms";
import activityRoutes from "./routes/activity";
import * as cors from "cors";

// Import middleware
import { notFound, errorHandler } from "./middlewares/error.middleware";
import { checkService } from "./middlewares/service.middleware";
import { protect } from "./middlewares/admin.middleware";

const { PORT } = process.env || 5000;

const app: Express = express();

// Configure Express application
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/admins", adminRoutes);
//app routes
app.use("/api/activities", protect, activityRoutes);
app.use("/api/service", protect, servicesRoutes);
app.use("/api/service/:serviceID/rooms", protect, checkService, roomsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

connect();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
