import { getServerSession } from "next-auth"
import { authOptions } from "./lib/auth"
import { NextResponse } from "next/server"


export async userRoleMiddleware (req : Request) {

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if(req.url.includes('/admin') && session.user.role !== 'Admin'){
        return NextResponse({'unauthorised user'})
    }

    return NextResponse.next()

}