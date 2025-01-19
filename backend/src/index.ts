import "dotenv/config";
import express from "express";
import AppDataSource from "./config/db.config";
import mainRouter from "./routes/mainRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
    // Start the server only after the database is connected
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server listening on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the application if the database connection fails
  });
