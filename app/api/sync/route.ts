import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import TagsModel from "@/app/models/labels.model";
import UserModel from "@/app/models/users.model";
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

  const user = await UserModel.findOne({ email: session?.user?.email });
  const existingTags = await TagsModel.findOne({ user_id: user._id });
  const existingFavorites = await FavoritesModel.findOne({ user_id: user._id });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const request = await req.json();

  switch (request.command) {
    case "label_add": {
      const { name, isFavorite } = request;
      try {
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
          if (existingFavorites) {
            existingFavorites.favorites.push({
              name: name,
              type: "label",
            });
            await existingFavorites.save();
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

          const preExisting = await existingFavorites.favorites.find(
            (fav: { name: string; type: string }) =>
              fav.name === name && fav.type === "label"
          );

          if (!preExisting) {
            existingFavorites.favorites.push({
              name: name,
              type: "label",
            });

            await existingFavorites.save();
          } else {
            return NextResponse.json("Fav already exists");
          }
        }
        return NextResponse.json({ success: `Added Label : ${name}` });
      } catch (error) {
        console.error("Error adding label:", error);
        return NextResponse.json(
          { fail: `Failed to add Label` },
          { status: 500 }
        );
      }
    }

    case "label_remove": {
      const { name, isFavorite } = request;
      console.log("name ", name , isFavorite);
      console.log("existingTags ", existingTags);

      try {
        if (!existingTags) {
          return NextResponse.json(
            { fail: `Label ${name} is not there ` },
            { status: 500 }
          );
        }
        existingTags.tags = await existingTags.tags.filter(
          (tag: string) => !(tag == name)
        );
        await existingTags.save();

        if (isFavorite) {
          if (existingFavorites) {
            existingFavorites.favorites =
              await existingFavorites.favorites.filter(
                (fav: { name: string; type: string }) =>
                  !(fav.type == "label" && fav.name == name)
              );

            await existingFavorites.save();
          }
        }

        return NextResponse.json({sucess : 'Sucessfully removed labels'})

      } catch (error) {
        console.error("Error removing label:", error);
        return NextResponse.json(
          { fail: `Failed to remove Label` },
          { status: 500 }
        );
      }
    }
  }
}
