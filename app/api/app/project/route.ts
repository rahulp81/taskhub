import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import ProjectsModel from "@/app/models/project.model";
import TasksModel from "@/app/models/task.models";
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
  const newProject = await req.text();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingProjects = await ProjectsModel.findOne({ user_id: user._id });

  try {
    if (!existingProjects) {
      const project = new ProjectsModel({
        user_id: user._id,
        projects: [newProject],
      });
      await project.save();
      return NextResponse.json({
        success: "Successfully new Project created &  Saved",
      });
    } else {
      existingProjects.projects.push(newProject);
      await existingProjects.save();
      return NextResponse.json({ success: "Successfully Task Saved" });
    }
  } catch (error) {
    console.error("Error saving task:", error);
    return NextResponse.json(
      { error: "Failed to save project" },
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
  const { projectName } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingProjects = await ProjectsModel.findOne({ user_id: user._id });

  try {
    if (!existingProjects) {
      return NextResponse.json({
        success: "No Projects to Delete",
      });
    } else {
      existingProjects.projects = existingProjects.projects.filter(
        (project: string) => project !== projectName
      );
      await existingProjects.save();
      await TasksModel.deleteMany({ user_id: user._id, project: projectName });
      return NextResponse.json({ success: "Successfully deleted project and associated " });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project / tasks" },
      { status: 500 }
    );
  }
}
