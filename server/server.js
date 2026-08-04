import app from "./app.js";
import "dotenv/config";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
