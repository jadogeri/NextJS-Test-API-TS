import { fileURLToPath } from 'url';
import { dirname } from 'path';
import users from "@/repo/users.json"
import { NextResponse } from "next/server";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = __dirname + "\\..\\..\\..\\database\\users.json"


export async function POST(request : any, _ : any){
  try {

    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
    return NextResponse.json(users, {status: 201})
   
  } catch (err) {
    console.error('Error reading users:', err);
    return NextResponse.json({message:"something went wrong with request"},{status: 500})  
  }
}

