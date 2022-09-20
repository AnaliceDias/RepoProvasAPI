import { NextFunction, Request , Response } from "express";
import { findByEmail } from "../repositories/userRepository";
import { validatePassword } from "../services/authServices";

export async function searchUser (req: Request , res: Response , next: NextFunction){
    const {email} = req.body;

    function sucess (user) {
        res.locals.userPassword = user.password;
        res.locals.userId = user.id;
        next();
    }
    
    try{
        const user = await findByEmail(email);       

        !user ? res.sendStatus(401) : sucess(user);

    }catch(e){
        res.sendStatus(500);
    }

}

export async function passwordValidator(req: Request, res: Response, next: NextFunction){
    const password = req.body.password;
    const userPassword = res.locals.userPassword;

    try {  
      !(await validatePassword(password, userPassword))? res.sendStatus(401) : next()
  
    }catch(e){
      res.sendStatus(500);
    }
  }