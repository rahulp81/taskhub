import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import TagsModel from "@/app/models/labels.model";
import UserModel from "@/app/models/users.model";
import taskModels from "@/app/models/task.models";
import FavoritesModel from "@/app/models/favorite.model";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 403 }
    );
  }
  const { name, isFavorite } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const existingFavorites = await FavoritesModel.findOne({
      user_id: user._id,
    });

    if (!existingFavorites) {
      const fav = new FavoritesModel({
        user_id: user._id,
        favorites: [],
      });
      await fav.save();
    }

    const labelIndex = existingFavorites.favorites.findIndex(
      (fav: { name: string; type: string }) =>
        fav.type === "label" && fav.name === name
    );

    if (isFavorite) {
      if (labelIndex === -1) {
        existingFavorites.favorites.push({
          name: name,
          type: "label",
        });
        await existingFavorites.save();
      }
    } else {
      if (labelIndex !== -1) {
        existingFavorites.favorites.splice(labelIndex, 1);
        await existingFavorites.save();
      }
    }

    return NextResponse.json({
      success: "Favorite status updated",
    });
  } catch (error) {
    console.error("Error updating favorite:", error);
    return NextResponse.json(
      { error: "Failed to update favorite status" },
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

  const existingTags = await TagsModel.findOne({ user_id: user._id });
  const existingFavorites = await FavoritesModel.findOne({ user_id: user._id });
  const existingTasks = await taskModels.findOne({ user_id: user._id });

  try {
    if (!existingTags) {
      return NextResponse.json({
        success: "No Tags to Delete",
      });
    } else {
      existingTags.tags = existingTags.tags.filter(
        (tag: string) => tag !== name
      );
      await existingTags.save();

      if (existingFavorites) {
        existingFavorites.favorites = existingFavorites.favorites.filter(
          (fav: { name: string; type: string }) =>
            fav.type == "label" && fav.name == name
        );
        await existingFavorites.save();
      }

      if (existingTasks) {
        await taskModels.updateMany(
          { user_id: user._id },
          { $pull: { labels: name } }
        );
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
