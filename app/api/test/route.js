import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    return NextResponse.json({ message: "Database connected successfully" });
  } catch (error) {
    console.error("DB Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
