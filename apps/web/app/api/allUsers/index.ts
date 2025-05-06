import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client"

export  const allUsers = async (req : NextRequest , res : NextResponse) => {

    if (req.method === 'GET'){
        try {
            const user = await db.user.findMany()
            return NextResponse.json(user)
        }
        catch(e){
            console.log(e)
        }
    }

}  