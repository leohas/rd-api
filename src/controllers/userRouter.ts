import express, { Request, Response, Router } from 'express'
import { requiredEmailAndPasswordError, requiredEmailError, requiredPasswordError } from '../services/errors'
import { fbAuth } from '../services/firebase'

const userRouter = Router()

const registerUser = async (req: Request, res: Response) => {
    try {
        const { userEmail, userPassword } = req.body

        if(!userPassword && !userEmail) throw requiredEmailAndPasswordError
        if(!userEmail) throw requiredEmailError
        if(!userPassword) throw requiredPasswordError
        
        await fbAuth.createUser({ 
            email: userEmail,
            password: userPassword
        })
    } catch(error) {
        return res.send(error.toJson())
    }
    return res.status(200).send('Usuário criado.')
}

userRouter.post('/register', registerUser)

export default userRouter