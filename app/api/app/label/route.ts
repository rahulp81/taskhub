import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import TagsModel from "@/app/models/labels.model";
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
  const newTag =   await req.text();

  const user = await UserModel.findOne({ email: session?.user?.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingTags = await TagsModel.findOne({ user_id: user._id });

  try {
    if (!existingTags) {
      const tag = new TagsModel({
        user_id: user._id,
        tags: [newTag],
      });
      await tag.save();
      return NextResponse.json({ success: "Successfully new Label & Tag Saved" });
    } else {
      existingTags.tags.push(newTag);
      await existingTags.save();
      return NextResponse.json({ success: "Successfully Label Saved" });
    }
  } catch (error) {
    console.error("Error saving task:", error);
    return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
  }
}
