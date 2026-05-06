import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // This is where you would connect to your online database perfectly.
    // Example: const user = await db.user.findUnique({ where: { email } });
    
    // For demonstration, we use a hardcoded check.
    if (email === "admin" && password === "Oceanadmin123") {
      return NextResponse.json(
        { message: "Login successful", user: { username: "admin" } },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
