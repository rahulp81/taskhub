import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import TaskModel from "@/app/models/task.models";
import UserModel from "@/app/models/users.model";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not autheticated" },
      { status: 403 }
    );
  }
  const taskDetail = await req.json();
  const { name, description, id, priority, due, labels, project } = taskDetail;

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const task = new TaskModel({
    user_id: user._id,
    name,
    description,
    id,
    priority,
    due,
    labels,
    project,
  });

  try {
    const savedTask = await task.save();
    return NextResponse.json({ success: "Successfully Task Saved" });
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error saving task:", error);
    return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not autheticated" },
      { status: 403 }
    );
  }
  const taskDetail = await req.json();
  const { name, description, id, priority, due, labels, project } = taskDetail;

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const task = await TaskModel.findOneAndUpdate(
      { id: id },
      {
        user_id: user._id,
        name,
        description,
        id,
        priority,
        due,
        labels,
        project,
      }
    );
    return NextResponse.json({ success: "Successfully Task updated" });
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error saving task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not autheticated" },
      { status: 403 }
    );
  }
  const { taskId } = await req.json();
  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const task = await TaskModel.findOneAndDelete({id : taskId})
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: "Task deleted" });
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
