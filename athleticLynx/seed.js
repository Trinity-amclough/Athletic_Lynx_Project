import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
  await prisma.history.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data.");

  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      phone: "512-555-5555",
      name: "Aidan Johnson",
      age: 34,
      city: "Austin",
      position: "Center Fielder",
    },
  });
  console.log(`Seeded user: ${alice.name} (${alice.email})`);

  //how to alleviate current prisma error: "Error: P2002: Unique constraint failed on the fields: (`userId`)" when trying to seed history entries for the same user multiple times?
  const history = await prisma.history.createMany({
    data: [
      { description: "I left a team", userId: alice.id}, 
      { description: "I joined a new team", userId: alice.id},
    ]
  });
  console.log(`Seeded ${alice.name}'s history: ${history.count} entries`);


  const count = await prisma.user.count();
  console.log(`Database seeded with ${count} user(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
