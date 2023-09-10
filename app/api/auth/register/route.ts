import {NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/users.model";
import bcryt from "bcrypt";


export async function POST(req: Request){
await dbConnect();
const userData = await req.json();
const {name,email,password} = userData;

const checkUser = await UserModel.findOne({email:email});

if(checkUser){
   return NextResponse.json({error:'Existing User'}, {status:200})
}

const hashedPassword = await bcryt.hash(password,10);

const user = new UserModel({
    email:email,
    password:hashedPassword,
    name:name,
})

const saveUser = await user.save();
console.log('saved user,', saveUser)
return  NextResponse.json({sucess:'Sucessfully Created'})

}