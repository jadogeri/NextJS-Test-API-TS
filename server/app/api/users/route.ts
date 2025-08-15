import { fileURLToPath } from 'url';
import { dirname } from 'path';
import users from "@/app/database/users.json"
import { NextResponse } from "next/server";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = __dirname + "\\..\\..\\util\\users.json"


export function GET(_: any, response : any){
  try {
    return NextResponse.json(users, {status : 200})
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
  
}