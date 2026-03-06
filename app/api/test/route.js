import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  return NextResponse.json({ message: "Database connected successfully" });
}
