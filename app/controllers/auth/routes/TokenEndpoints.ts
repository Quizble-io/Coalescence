import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

import { createUser } from '../../../db/user/user'

import { loginRequst, tokenResponse, userEncodedInfo, userCreateInfo } from '../../../models/authModels'
import { validatePassword } from '../../../auth/validate'
import Token from '../../../auth/token'

const router = express.Router()

const jsonParser = bodyParser.json()


router.post("/login", async (req:Request, res:Response) => {
    const userInfo:loginRequst = req.body;
    try {
        const encodedInfo = await validatePassword(userInfo)

        if (encodedInfo[2]) {
            res.json(Token.createTokenPair(encodedInfo[0]))
        } else {
            res.json(encodedInfo[1])
        }

    } catch (err) {
        console.log(err)
        res.send('incorrect email or password')
    }
})

router.post("/refreshToken", async (req:Request, res:Response) => {
    const refreshToken:string = req.body.refreshToken

    try {
        const newToken = await Token.refreshToken(refreshToken)
        await console.log("new token", newToken)
        if (newToken) {
            res.json(newToken)
        } else {
            res.send("ivalid refresh")
        }
    } catch (err) {
        console.log(err);
        res.send(505)
    }

    
})

module.exports = router