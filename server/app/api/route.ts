import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({message: "Welcome to my NextJS test database using typescript"})
}