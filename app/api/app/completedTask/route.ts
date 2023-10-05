import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import CompletedTaskModel from "@/app/models/completedTask.model";
import UserModel from "@/app/models/users.model";
import { getServerSession } from "next-auth";
import taskModels from "@/app/models/task.models";

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "User not autheticated" },
      { status: 403 }
    );
  }

  const user = await UserModel.findOne({ email: session?.user?.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const completedTask = await CompletedTaskModel.find({ user_id: user._id });
    if (completedTask) {
      return NextResponse.json({ completedTask: completedTask });
    }
  } catch (error) {
    console.error("Error saving task:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not autheticated" },
      { status: 403 }
    );
  }
  const { completedTaskItem, taskId } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { taskName, completedAt, status } = completedTaskItem;

  const completedTask = new CompletedTaskModel({
    user_id: user._id,
    taskName,
    completedAt,
    status,
  });

  try {
    await completedTask.save();
    await taskModels.findOneAndDelete({ id: taskId });
    return NextResponse.json({
      success: "Successfully added task to  completed",
    });
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error saving task:", error);
    return NextResponse.json(
      { error: "Failed to add task to completed" },
      { status: 500 }
    );
  }
}
