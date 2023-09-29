import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import FavoritesModel from "@/app/models/favorite.model";
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
  const { type, name } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingFavorites = await FavoritesModel.findOne({ user_id: user._id });

  try {
    if (!existingFavorites) {
      const favorite = new FavoritesModel({
        user_id: user._id,
        favorites: [{ name, type }],
      });
      await favorite.save();
      return NextResponse.json({
        success: "Successfully new Favorites created &  added",
      });
    } else {
      const preExisting = existingFavorites.favorites.find(
        (fav: { name: string; type: string }) => {
          return fav.name === name && fav.type === "label";
        }
      );

      if (!preExisting) {
        existingFavorites.favorites.push({ name, type });
        await existingFavorites.save();
        return NextResponse.json({ success: "Successfully Favorites updated" });
      } else {
        return NextResponse.json({ success: " Favorites already exist" });
      }
    }
  } catch (error) {
    console.error("Error saving favorite:", error);
    return NextResponse.json(
      { error: "Failed to save favorite" },
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
  const { name, type } = await req.json();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingFavorites = await FavoritesModel.findOne({ user_id: user._id });

  try {
    if (!existingFavorites) {
      return NextResponse.json({
        success: "No Favorites to Delete",
      });
    } else {
      existingFavorites.favorites = existingFavorites.favorites.filter(
        (favorite: { name: string; type: string }) =>
          !(favorite?.type === type && favorite.name === name)
      );

      await existingFavorites.save();
      return NextResponse.json({
        success: "Successfully deleted Favorites ",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Favorites" },
      { status: 500 }
    );
  }
}
