import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client"

export  const allUsers = async (req : NextRequest , res : NextResponse) => {

    const  id  = req.query

    if (req.method === 'PATCH'){
        try {
            const { role } = req.body
            const updatedUser = await db.user.update({
                where: { id: parseInt(id as string) },
                data: { role },
            })
        }
        catch(e){
            console.log(e)
        }
    }

} 