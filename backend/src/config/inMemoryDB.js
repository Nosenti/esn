import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;
export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "testingDb" });
  console.log(`InMemory MongoDB Successfully connected to ${mongoUri}`);
  return;
};

export const disconnect = async () => {
  await mongoose.disconnect();
  mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
  console.log(`Current MongoDB Successfully disconnected`);
  return;
};

export const dropCollections = async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
};
