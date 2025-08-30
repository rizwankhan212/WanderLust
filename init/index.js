require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const db_url = process.env.ATLAS_DB_URL;

async function main() {
  await mongoose.connect(db_url);
  console.log("✅ Connected to DB");
}

main().catch((err) => console.log("❌ Connection Error:", err));

async function initDb() {
  await Listing.deleteMany({});

  // 👉 Find your user dynamically instead of hardcoding
  const user = await User.findOne({ email: "rizwanwork212@gmail.com" });
  if (!user) {
    console.log("❌ No user found, please create one first.");
    return;
  }

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,  // ✅ correctly assigns ObjectId
  }));

  await Listing.insertMany(initData.data);
  console.log("✅ Database initialized");
}

initDb();
