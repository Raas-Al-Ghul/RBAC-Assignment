# installing packages in /web
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

# initializing database
- npm init -y
- npx tsc --init
- npx prisma init

# docker
- docker pull postgres
- docker volume create rbac
- docker run --name assignment -e POSTGRES_PASSWORD=adarsh -d -p 5432:5432 -v rbac:/var/lib/postgresql/data postgres

# prisma migrations/client
- npx prisma migrate dev --name init
- npx prisma generate
- npm install @prisma/client

# seed data
- npx prisma db seed
- npx prisma studio

# authentication
- npm install next-auth
- npm install bcrypt
- npm install --save-dev @types/bcrypt
