import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import connectCloudinary from "./config/cloudinary.js";
import productModel from "./models/productModel.js";

const ASSETS_JS = path.resolve("../frontend/src/assets/assets.js");
const IMG_DIR = path.resolve("../frontend/src/assets");

await mongoose.connect(process.env.MONGODB_URI);
connectCloudinary();

// read products array from assets.js, swap image identifiers for strings
const src = fs.readFileSync(ASSETS_JS, "utf8");
const body = src
  .slice(src.indexOf("export const products"))
  .replace("export const products =", "return")
  .replace(
    /image:\s*\[([^\]]*)\]/g,
    (_, ids) =>
      `images: [${ids
        .split(",")
        .map((s) => `"${s.trim()}"`)
        .join(",")}]`,
  );
const products = new Function(body)();

const cache = {};
const upload = async (id) => {
  if (!cache[id]) {
    const result = await cloudinary.uploader.upload(
      path.join(IMG_DIR, `${id}.png`),
      { resource_type: "image" },
    );
    cache[id] = result.secure_url;
  }
  return cache[id];
};

let added = 0;
for (const p of products) {
  if (await productModel.findOne({ date: p.date, name: p.name })) continue;

  const images = await Promise.all(p.images.map(upload));
  const { _id, ...rest } = p;
  await productModel.create({ ...rest, images });
  added++;
  console.log(`added: ${p.name}`);
}

console.log(`done. ${added} added.`);
await mongoose.disconnect();
