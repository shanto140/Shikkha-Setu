const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/subjects", async (req, res) => {
  const [rows] = await pool.execute(`SELECT name FROM subjects ORDER BY name`);
  res.json({ success: true, data: rows.map((r) => r.name) });
});

router.get("/classes", async (req, res) => {
  const [rows] = await pool.execute(`SELECT name FROM classes ORDER BY id`);
  res.json({ success: true, data: rows.map((r) => r.name) });
});

router.get("/stats", async (req, res) => {
  try {
    const [[{ total_volunteers }]] = await pool.execute(
      `SELECT COUNT(*) as total_volunteers FROM users WHERE role = 'volunteer'`,
    );
    const [[{ total_organizers }]] = await pool.execute(
      `SELECT COUNT(*) as total_organizers FROM users WHERE role = 'organizer'`,
    );
    const [[{ total_sessions }]] = await pool.execute(
      `SELECT COUNT(*) as total_sessions FROM sessions WHERE status = 'completed'`,
    );

    res.json({
      success: true,
      data: {
        total_volunteers: Number(total_volunteers),
        total_organizers: Number(total_organizers),
        total_sessions: Number(total_sessions),
      },
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

module.exports = router;
