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
    const noUsers : User[] = [];
    fs.writeFileSync(dataPath, JSON.stringify(noUsers), 'utf8');
    return NextResponse.json(noUsers)
  } catch (err) {
    console.error('Error reading users:', err);
    return [];
  }
}

export async function POST(request: any, _: any){
  try {
    const {username, age, email, isActive } : User = await request.json();
    console.log(username, age, isActive, email)
let usersArray: User[] = users

    if(!username){
      return NextResponse.json({message: "username field is required"},{status: 400})
    }
    if(!age){
      return NextResponse.json({message: "age field is required"},{status: 400})
    }
    if(!email){
      return NextResponse.json({message: "email field is required"},{status: 400})
    }
    const activeState = isActive == undefined? true : !isActive? false : true;
    if(users.length == 0){
      const newUser  = {username, email, age, isActive: activeState,id : 1 }
      usersArray.push(newUser) 
      fs.writeFileSync(dataPath, JSON.stringify(usersArray, null, 2), 'utf8');
      return NextResponse.json({...newUser})
    }else{
      let foundUsers : User[] =
       usersArray.filter((user : User  )=>{ 
        if(user){
        return user.username?.toUpperCase().trim() == username.toUpperCase().trim() ||
                             user.email?.toUpperCase().trim() == email.toUpperCase().trim()} });
      if(foundUsers.length > 0){
        return NextResponse.json({message: "username or email is already registered"},{status: 400})
      }
      const objectWithLargestId : User = usersArray.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current;
      })
      let maxID : number = objectWithLargestId.id + 1;
      const newUser: User = {username, email, age, isActive: activeState,id : maxID}
      usersArray.push(newUser)
      fs.writeFileSync(dataPath, JSON.stringify(usersArray, null, 2), 'utf8');  
          return NextResponse.json({...newUser},{status: 201})  
    }
  } catch (err) {
    console.error('Error reading users:', err);
    return NextResponse.json({message:"something went wrong with request"},{status: 500})  
  }
}

