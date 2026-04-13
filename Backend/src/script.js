import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import adminRoute from "./routes/adminRoutes.js";
import planRoute from "./routes/planRoutes.js"
import subscriptionRoute from "./routes/subscriptionRoutes.js"
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
connectDB()

// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-store");
//   next();
// });

app.use("/api",userRouter);
app.use("/api",subscriptionRoute);
app.use("/api",planRoute)
app.use("/api/admin",adminRoute);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Success" });
});

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Express app running in port : ${port}`)
})