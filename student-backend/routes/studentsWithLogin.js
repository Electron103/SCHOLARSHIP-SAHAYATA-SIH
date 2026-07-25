// routes/studentsWithLogin.js
const express = require("express");
const router = express.Router();

// Assumes you already have a MongoDB client exported from e.g. ../db or accessible via req.app.get('db')
/*
 Expected DB collections:
  - students  (student profile docs)
  - logins    (login audit / account docs), with a common key studentId referencing students._id or students.studentId
*/

router.get("/", async (req, res) => {
  try {
    const db = req.app.get("db"); // server.js should set app.set('db', db) or adjust to how your project exposes DB
    // Adjust collection names/keys if needed:
    const studentsColl = db.collection("students");
    const loginsColl = db.collection("logins");

    // Try to match on a logical key. If your student documents use `studentId` (like STU001),
    // or `_id` (ObjectId), change the fields below.
    const pipeline = [
      {
        $lookup: {
          from: "logins",
          let: { sid: "$studentId" }, // change to "$_id" if your logins store student _id
          pipeline: [
            { $match: { $expr: { $eq: ["$studentId", "$$sid"] } } },
            { $sort: { lastLogin: -1 } }, // keep latest login first
            { $limit: 1 },
            {
              $project: {
                _id: 0,
                username: 1,
                email: 1,
                lastLogin: 1,
                ip: 1,
                roles: 1,
              },
            },
          ],
          as: "loginInfo",
        },
      },
      {
        $addFields: {
          loginInfo: { $arrayElemAt: ["$loginInfo", 0] },
        },
      },
      // OPTIONAL: remove any sensitive fields you do not want to send
      {
        $project: {
          passwordHash: 0,
          /* remove other fields if needed */
        },
      },
    ];

    const studentsWithLogin = await studentsColl.aggregate(pipeline).toArray();

    res.json({ students: studentsWithLogin });
  } catch (err) {
    console.error("students-with-login error:", err);
    res.status(500).json({ error: "Failed to fetch students with login" });
  }
});

module.exports = router;
