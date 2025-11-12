import express from "express";
const router = express.Router();

const users = [
  { id: 1, name: "Paulo", email: "paulo@workdesk.com" },
  { id: 2, name: "Jane", email: "jane@workdesk.com" },
];

router.get("/", (req, res) => {
  res.json(users);
});

export default router;
