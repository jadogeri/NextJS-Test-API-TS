import { fileURLToPath } from 'url';
import { dirname } from 'path';
import users from "@/app/database/users.json"
import { NextResponse } from "next/server";
import fs from "fs"
import { User } from '@/types/User';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = __dirname + "\\..\\..\\..\\database\\users.json"

const usersArray : User[] = users;

export async function GET(request: any, response: any){
    const { id } = await response.params;
    const foundUser : User[] = usersArray.filter(user => user.id == id);
    if(foundUser.length > 0){
        return NextResponse.json(foundUser[0])
    }
    return NextResponse.json({ message : 'User not found with ID : ' + id}, {status: 404})
}
