import { Request , Response } from "express";
import { encryptPassword, generateToken, validatePassword } from "../services/authServices";
import { findByEmail, sinUpRepository } from "../repositories/userRepository";

export async function createUser(req: Request , res: Response){
    const {email , username , password , repeatedPassword} = req.body;
    if (!(password === repeatedPassword)) res.sendStatus(400);
    const hashPassword = await encryptPassword(password);
 
    try{
        await sinUpRepository({email , username , password: hashPassword});
        res.sendStatus(200)
    }
    catch(e){
        res.sendStatus(500);
    } 
}

export async function signIn(req: Request , res: Response){
    const {email , password} = req.body;

    try {
        const user = await findByEmail(email);
        user === null? res.sendStatus(401) : 
        
        !(await validatePassword(password, user.password))? res.sendStatus(401) :

        res.status(200).send(await generateToken(user.id));

    }catch(e){
        res.status(500).send(e);
    }
    
}