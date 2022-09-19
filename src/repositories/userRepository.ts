import client from "../config/database";
import { createUserInterface } from "../interfaces/interfaces";

export function sinUpRepository (data : createUserInterface){
    return client.users.create({data})
}

export function findByEmail(email: string) {
    return client.users.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    })
  }