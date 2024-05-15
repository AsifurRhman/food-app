import mongoose from "mongoose";

import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { isAdmin } from "../auth/[...nextauth]/route";



export async function GET(req) {
  mongoose.connect(process.env.DATABASE_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();
//console.log(userEmail,"useremail=================userEmail=" )
  const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    //console.log(_id,"_id======================_id")
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }


  if (admin) {
    return Response.json( await Order.find() );
  }

  if (userEmail) {
    return Response.json( await Order.find({userEmail}) );
  }

}