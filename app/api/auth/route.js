import { connectDB } from "@/lib/dbConnect";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";

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
  } catch (error) {
    return response(false, 500, "Internal server error", null);
  }
}
