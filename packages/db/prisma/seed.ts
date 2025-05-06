import db from "@repo/db/client";



// const prisma = new PrismaClient();

async function main () {

    await db.user.upsert({
        where: { email: 'admin@gmail.com'},
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin',
            role: 'Admin'
        }
    })

    await db.user.upsert({
        where: { email: 'user@gmail.com'},
        update: {},
        create: {
            name: 'User',
            email: 'user@gmail.com',
            password: 'user',
            role: 'User'
        }
    })

    await db.article.upsert({
        where: { title: 'Title 1'},
        update: {},
        create: {
            title: 'Title 1',
            content: 'This is the content of the first article.',
            authorId: 1,
        }
    })

}



main()
 .then(async ()=> {
    await db.$disconnect()
 })
 .catch(async (e)=> {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
 })