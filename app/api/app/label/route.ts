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
  console.log(name, isFavorite);

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const existingTags = await TagsModel.findOne({
      user_id: user._id,
    });

    if (!existingTags) {
      const tag = new TagsModel({
        user_id: user._id,
        tags: [name],
      });
      await tag.save();
    } else {
      if (!existingTags.tags.includes(name)) {
        existingTags.tags.push(name);
        await existingTags.save();
      }
    }

    if (isFavorite) {
      console.log("it is a favourite");
      const existingFavorites = await FavoritesModel.findOne({
        user_id: user._id,
      });

      if (existingFavorites) {
        const preExisting = await existingFavorites.favorites.find(
          (fav: { name: string; type: string }) => {
            return fav.name === name && fav.type === "label";
          }
        );

        if (!preExisting) {
          console.log("no same named favs");

          existingFavorites.favorites.push({
            name: name,
            type: "label",
          });
          await existingFavorites.save();
        } else {
          return NextResponse.json({
            success: `Fav Exists`,
          });
        }
      } else {
        const newFav = new FavoritesModel({
          user_id: user._id,
          favorites: [
            {
              name: name,
              type: "label",
            },
          ],
        });
        await newFav.save();
      }
    }
    return NextResponse.json({
      success: `Saved Label ${isFavorite ? "& favorite" : ""}`,
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
            !(fav.type == "label" && fav.name == name)
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
      { error: `Failed to delete tag ${error}` },
      { status: 500 }
    );
  }
}
