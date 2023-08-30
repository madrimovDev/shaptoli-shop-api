import { Router } from "express";
import { userVerify } from "../common/user-verify.middleware";
import botUserController from "./botUser.controller";

const router = Router()

router.post('/', userVerify(['admin']), botUserController.createBotUser)

export default router