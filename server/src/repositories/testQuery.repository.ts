import { db } from "../db/drizzle";
import { users } from "../../drizzle/schema";

async function queryUsers() {
  const allUsers = await db.select().from(users);
  console.log("All Users: ", allUsers);
}

queryUsers();
