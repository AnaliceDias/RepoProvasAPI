import jwt from "jsonwebtoken";
import { NextFunction, Request , Response } from "express";
import "../config/setup";

export async function authValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) {
      return res.status(401).send("Token not found");
    }
  
    try {

    if(!process.env.JWT_KEY) return("Missing key");
      jwt.verify(token, process.env.JWT_KEY);

      next();
    } catch (e) {
      res.status(401).send("Token has expired");
    }
}