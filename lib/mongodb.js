// MongoDB Atlas connection — dev এ hot reload এ বারবার নতুন connection না খোলার জন্য global এ cache করা হয়।
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazardor";

let client = globalThis._mongoClient;
if (!client) {
  client = new MongoClient(uri);
  globalThis._mongoClient = client;
}

export const db = client.db();
