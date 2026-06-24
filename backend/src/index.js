import express from 'express';
import "dotenv/config";
import cors from 'cors';

import {clerkMiddleware} from "@clerk/express";
import { connectDB } from './lib/db.js';


const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors({origin: FRONTEND_URL , credentials: true}));

// It is used to identify is there any issue with the server or not. 
// It is used for health check of the server. 
// It is used by load balancer to check the health of the server.
app.get("/health", (req, res) => {
  res.status(200).json({ ok:true });
})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
