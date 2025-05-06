import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {

    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Username", type: "email", placeholder: "jsmith@gmail.com" },
              password: { label: "Password", type: "password" }
            },

            async authorize (credentials : any) {
                               
                const existingUser = await db.user.findFirst({
                    where: {email: credentials.email},
                });

                if (existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password);
                    if (passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                            role: existingUser.role
                        }
                    }
                    return null;
                }

                try {
                    const hashedPassword = await bcrypt.hash(credentials?.password , 10)
                    const user = await db.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword,
                            role: 'User'
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }

                catch (e){
                    console.error(e);
                }
                
                return null
            },

        })

    ],

    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            session.user.role = token.role
            return session
        }
    }

}