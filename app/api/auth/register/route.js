import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/dbConnect";
import { errorResponse } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    // validate the request body
    const validationSchema = zSchema.pick({
      name: true,
      password: true,
      email: true,
    });
    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing credentials",
        validatedData.error,
      );
    }
    const { name, email, password } = validatedData.data;

    // check if user already exists
    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(true, 409, "User with this email already exists", null);
    }

    // create new user
    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: newUser._id })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(secret);

    await sendMail(
      "Email Verification request from Developer Mubtasim",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`,
      ),
    );
    return response(true, 201, "User created successfully", { token });
  } catch (error) {
    return errorResponse(error, "Failed to register user");
  }
}
