const express = require("express");
const cors = require("cors")
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// ── GET /api/users ── List all registered users (already complete)
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, age: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
});

// app.get("/api/user/", async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: { email: req.body.email },
//   });
//   res.json(user);
// });

app.post("/api/updateUserInfo", async (req, res) => {
  console.log(req.body)
  const newUserInfo = await prisma.user.update({
    where: { email: "alice@example.com"}, 
    data: { name: req.body.name},
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
