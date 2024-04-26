
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET() {
  mongoose.connect(process.env.DATABASE_URL );
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}

export async function DELETE(req) {
  mongoose.connect(process.env.DATABASE_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await User.deleteOne({_id});
  }
  return Response.json(true);
}