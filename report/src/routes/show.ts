import express, { Request, Response } from "express";
import { requireAuth } from "@manthan-practice/common";

import { Task } from "../models/task";

const router = express.Router();

router.get("/api/report", requireAuth, async (req: Request, res: Response) => {
  const tasks = await Task.find({}).populate("user");
  res.status(201).send(tasks);
});

export { router as showReportData };
