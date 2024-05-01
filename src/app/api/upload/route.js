 
import { v2 as cloudinary } from "cloudinary"

export async function POST(request) {
    const body = await request.json();
    const { paramasToSign } = body;
    const signature = cloudinary.utils.api_sign_request(paramasToSign, process.env.CLOUDINARY_API_SECRET);
    //console.log(paramasToSign, signature,"paramsTosign,signature")
    return Response.json({ signature });
  }