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

export async function DELETE(_: any, response: any){
    const { id } = await response.params;
    const initialLength : number = usersArray.length;
    const newUsersList : User[] = usersArray.filter(user => user.id != id);
    if(newUsersList.length < initialLength){
        fs.writeFileSync(dataPath, JSON.stringify(newUsersList, null, 2), 'utf8');
        return NextResponse.json({message: 'User deleted with ID:' + id})
    }else{
        return NextResponse.json({ message : `User not found for deletion with ID: ${id}`}, {status: 404})

    }
}

export async function PUT(request: any, response: any){
    const { id } = await response.params;
    const foundUser: User[] = usersArray.filter(user => user.id == id);
    const {username, age, email, isActive } = await request.json();
    const data : User = {
        username: !username? "" : username,
        age: !age? 0 : age,
        isActive :isActive == undefined? true : !isActive? false : true,
        email: !email? "" : email
    }
    if(foundUser.length > 0){
        const updatedUser: User = {...foundUser[0], ...data}
        const newUsersList = usersArray.map((user)=>{
            if(user.id == updatedUser.id){
                return updatedUser;
            }else{
                return user;
            }              
        })
        fs.writeFileSync(dataPath, JSON.stringify(newUsersList, null, 2), 'utf8');
        return NextResponse.json(updatedUser, {status: 200})

    }else{
       return NextResponse.json({ message : `User not found for replace with ID: ${id}`}, {status: 404})
    }
}

export async function PATCH(request: any, response: any){
    const { id } = await response.params;
    const foundUser : User[] = usersArray.filter(user => user.id == id);
    const {username, age, email, isActive } = await request.json();

    let data : any = {username, age, email, isActive }
    for (const key in data) {
        if (data[key] === undefined) {
            delete data[key];
        }
    }

    if(foundUser.length > 0){
        const updatedUser : User = {...foundUser[0], ...data}
        const newUsersList: User[] = usersArray.map((user)=>{
            if(user.id == updatedUser.id){
                return updatedUser;
            }else{
                return user;
            }              
        })
        fs.writeFileSync(dataPath, JSON.stringify(newUsersList, null, 2), 'utf8');
        return NextResponse.json(updatedUser, {status: 200})

    }else{
       return NextResponse.json({ message : `User not found for update with ID: ${id}`}, {status: 404})
    }
}

