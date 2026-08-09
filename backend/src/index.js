import express from 'express';
import "dotenv/config";
import cors from 'cors';

import path from 'path';
import fs from 'fs';

import {clerkMiddleware} from "@clerk/express";
import { connectDB } from './lib/db.js';
import job from './lib/cron.js';

import clerkWebhook from "./webhooks/clerk.webhook.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(),"public");

// It is important to use express.raw() middleware before clerkMiddleware() to handle the raw request body for Clerk webhooks.
app.use("/api/webhooks/clerk" , express.raw({type:"application/json"}), clerkWebhook);

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors({origin: FRONTEND_URL , credentials: true}));

// It is used to identify is there any issue with the server or not. 
// It is used for health check of the server. 
// It is used by load balancer to check the health of the server.
app.get("/health", (req, res) => {
  res.status(200).json({ ok:true });
})

// Routes
app.use("/api/auth" , authRoutes);



if(fs.existsSync(publicDir)){
  app.use(express.static(publicDir)); 

  app.get("/{*any}",(req,res,next) => {
      res.sendFile(path.join(publicDir,"index.html") , (err) => next(err));
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);

  if(process.env.NODE_ENV === "production") job.start()
});
