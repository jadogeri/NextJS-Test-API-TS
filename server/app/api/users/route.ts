import { fileURLToPath } from 'url';
import { dirname } from 'path';
import users from "@/app/database/users.json"
import { NextResponse } from "next/server";
import fs from "fs"
import { User } from '@/types/User';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = __dirname + "\\..\\..\\database\\users.json"


export function GET(_: any, response : any){
  try {
    return NextResponse.json(users, {status : 200})
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
  
}

export function DELETE(request : any, response : any){
  try {
    console.log(users)
    const noUsers : User[] = [];
    fs.writeFileSync(dataPath, JSON.stringify(noUsers), 'utf8');
    return NextResponse.json(noUsers)
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
}