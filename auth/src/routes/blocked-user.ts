import express, { Request, Response } from "express";
import { BadRequestError } from "@manthan-practice/common";
import { User } from "../models/user";
const router = express.Router();
import { UserBlockedPublisher } from "../events/publishers/user-blocked-publisher";
import { UserUnblockedPublisher } from "../events/publishers/user-unblocked-publisher";
import { natsWrapper } from "../nats-wrapper";

router.post("/api/users/block", async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  const blockedStatus = status == "blocked";
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("Invalid user id");
  }
  if (user.blocked == blockedStatus) {
    throw new BadRequestError(`User already ${status}`);
  }
  user.blocked = blockedStatus;
  await user.save();
  if (blockedStatus) {
    new UserBlockedPublisher(natsWrapper.client).publish({
      userId,
    });
  } else {
    new UserUnblockedPublisher(natsWrapper.client).publish({
      userId,
    });
  }
  res.status(201).send({ user });
});

export { router as blockUserRouter };
