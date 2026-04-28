# Athletic_Lynx_Project

```bash
npm run dev
npm run backend-dev
```


For setting up the backend, run the following:

```bash
npx prisma generate # Generating the Prisma Client
npx prisma migrate dev # Equivalent to Git commit
npx prisma migrate deploy # Equivalent to Git Push
npx prisma db seed # Adding dummy/mock data to the DB for testing
npx prisma studio
```