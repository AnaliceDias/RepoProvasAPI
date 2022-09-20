//em teste
import { findByEmail } from "../repositories/userRepository";

export async function searchUserService (email: string){
    const user = await findByEmail(email);

    if(!user) return false;
    return user
    
}