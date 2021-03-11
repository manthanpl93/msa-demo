import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  requireAuth,
  BadRequestError,
} from "@manthan-practice/common";

import { Task } from "../models/task";
import { BlockedUser } from "../models/blockedUsers";

const router = express.Router();

router.post(
  "/api/tasks",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is necessary"),
    body("description").not().isEmpty().withMessage("Description is necessary"),
    body("estimation").not().isEmpty().withMessage("Estimation is necessary"),
    body("estimation").isNumeric().withMessage("Estimation should be numeric"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const blockedUser = await BlockedUser.find({
      userId,
    });
    if (blockedUser.length) {
      throw new BadRequestError("Your account is blocked");
    }
    const { title, description, estimation } = req.body;
    const task = Task.build({ title, description, estimation, userId });
    await task.save();
    res.status(201).send(task);
  }
);

export { router as addTaskRouter };
