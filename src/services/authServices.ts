import "../config/setup";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function encryptPassword(password : string){
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
}

export async function validatePassword(password: string , hashPassword: string){
    return bcrypt.compareSync(password , hashPassword);
}

export async function generateToken(userId: number){
    const data: string = userId.toString();
    const config = { expiresIn: 60 * 60 };

    if(!process.env.JWT_KEY) return("Missing key");
    return jwt.sign({userId: data} , process.env.JWT_KEY , config);
}

export async function validadeToken(token: string){
    if(!process.env.JWT_KEY) return("Missing key");
         
    return jwt.sign( token , process.env.JWT_KEY);
    
}

//service de geração de token
//service de validação do token