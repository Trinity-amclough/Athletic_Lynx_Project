const express = require("express");
const cors = require("cors")
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// ── GET /api/users ── List all registered users (already complete)
app.get('/api/users', async (req, res) => {
  try {
    const { email } = req.query;
    console.log("Received email:", email);
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });
    console.log("Found user:", user);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});
app.get("/api/history", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const history = await prisma.history.findMany({
      where: {
        user: { email: email }
      },
      orderBy: { createdAt: "asc" }
    });
    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/updateUserInfo", async (req, res) => {
  try {
    const newUserInfo = await prisma.user.update({
      where: { email: req.body.email },
      data: { 
        name: req.body.name,
        age: parseInt(req.body.age),
        city: req.body.city,
        position: req.body.position,
        phone: req.body.phone,
      },
    });
    res.json({ success: true, user: newUserInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.post("/api/updateHistory", async (req, res) => {
  try {
    const { email, histories } = req.body;
    if (!email || !histories) {
      return res.status(400).json({ error: "Email and histories are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new history entries for each description in the histories array
    // update the ones that currently exist and create new ones for the new descriptions
    const createdEntries = [];
    for (const history of histories) {
      const existingEntry = await prisma.history.findFirst({
        where: {
          id: history.id,
        }
      });
      if (!existingEntry) {
        const newEntry = await prisma.history.create({
          data: {
            description: history.description,
            userId: user.id
          }
        });
        createdEntries.push(newEntry);
      }
      else {
        const updatedEntry = await prisma.history.update({
          where: { id: existingEntry.id },
          data: { description: history.description }
        });
        createdEntries.push(updatedEntry);
      }
    }
    res.json({ success: true, histories: createdEntries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/history", async (req, res) => {
  try {
    const { email, description } = req.body;
    if (!email || !description) {
      return res.status(400).json({ error: "Email and description are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newEntry = await prisma.history.create({
      data: {
        description: description,
        userId: user.id
      }
    });
    res.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/deleteHistory", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "History ID is required" });
    }
    await prisma.history.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
