import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import ProjectsModel from "@/app/models/project.model";
import TasksModel from "@/app/models/task.models";
import UserModel from "@/app/models/users.model";
import favoriteModel from "@/app/models/favorite.model";
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
  const { name, isFavorite } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingProjects = await ProjectsModel.findOne({ user_id: user._id });

  try {
    if (!existingProjects) {
      const project = new ProjectsModel({
        user_id: user._id,
        projects: [name],
      });
      await project.save();
      return NextResponse.json({
        success: `Successfully new Project ${name} created &  Saved`,
      });
    } else {
      existingProjects.projects.push(name);
      await existingProjects.save();
    }

    if (isFavorite) {
      console.log("it is a favourite");
      const existingFavorites = await favoriteModel.findOne({
        user_id: user._id,
      });

      if (existingFavorites) {
        const preExisting = await existingFavorites.favorites.find(
          (fav: { name: string; type: string }) => {
            return fav.name === name && fav.type === "project";
          }
        );

        if (!preExisting) {
          existingFavorites.favorites.push({
            name: name,
            type: "project",
          });
          await existingFavorites.save();
        } else {
          return NextResponse.json({
            success: `Fav Exists`,
          });
        }
      } else {
        const newFav = new favoriteModel({
          user_id: user._id,
          favorites: [
            {
              name: name,
              type: "project",
            },
          ],
        });
        await newFav.save();
      }
    }
    return NextResponse.json({
      success: `Saved Project : ${name} ${
        isFavorite ? "& added to favorite" : ""
      }`,
    });
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
  const { name } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingProjects = await ProjectsModel.findOne({ user_id: user._id });
  const existingFavorites = await favoriteModel.findOne({ user_id: user._id });
  const existingTasks = await TasksModel.findOne({ user_id: user._id });

  try {
    if (!existingProjects) {
      return NextResponse.json({
        success: "No Projects to Delete",
      });
    } else {
      existingProjects.projects = existingProjects.projects.filter(
        (project: string) => project !== name
      );
      await existingProjects.save();

      if (existingTasks) {
        await TasksModel.deleteMany({ user_id: user._id, project: name });
      }

      if (existingFavorites) {
        existingFavorites.favorites = existingFavorites.favorites.filter(
          (fav: { name: string; type: string }) =>
            !(fav.type == "project" && fav.name == name)
        );
        await existingFavorites.save();
      }

      return NextResponse.json({
        success: "Successfully deleted project and associated ",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project / tasks" },
      { status: 500 }
    );
  }
}
