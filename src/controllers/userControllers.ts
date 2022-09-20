import { Request , Response } from "express";
import { encryptPassword, generateToken } from "../services/authServices";
import { sinUpRepository } from "../repositories/userRepository";
import { searchUserService } from "../services/userServices";

export async function createUser(req: Request , res: Response){
    const {email , username , password , repeatedPassword} = req.body;
    if (!(password === repeatedPassword)) res.sendStatus(400);
    const hashPassword = await encryptPassword(password);
    const user = await searchUserService(email);
 
    if(!user){
        try{
            await sinUpRepository({email , username , password: hashPassword});
            res.sendStatus(201)
        }catch(e){
            res.sendStatus(500);
        } 
    }else{
        res.sendStatus(403)
    }
}

export async function signIn(req: Request , res: Response){
    const { userId} = res.locals;
    try {
        res.status(200).send(await generateToken(userId));

    }catch(e){
        res.status(500).send(e);
    }
    
}