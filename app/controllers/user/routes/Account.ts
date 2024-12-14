import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import { createUser, getUserFromEmail } from '../../../db/user/user'

import { loginRequst, tokenResponse, userEncodedInfo, userCreateInfo } from '../../../models/authModels'
import Token from '../../../auth/token'
import { userInfo } from '../../../models/userModels'

const router = express.Router()

const jsonParser = bodyParser.json()

// create
router.post("/signup", async (req:Request, res:Response) => {
    const userInfo:userCreateInfo = req.body;
    try {
        await createUser(userInfo);
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(409)
    }
})

// get

router.get("/userData", Token.authenticateToken,async (req:Request, res:Response) => {
    const userRequestAuth:userEncodedInfo = req.body.user; 
    console.log(userRequestAuth.email)
    const userInfo:userInfo = await getUserFromEmail(userRequestAuth.email);
    res.json(userInfo);
})

module.exports = router