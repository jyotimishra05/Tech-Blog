import { Post } from "@/lib/models";
import { connectTodb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const {slug}=params
  try {
    connectTodb();

    const post = await Post.findOne({slug});
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};
export const DELETE = async (request, { params }) => {
  const { slug } = params;
  try {
    connectTodb();

    await Post.deleteOne({ slug });
    return NextResponse.json("post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};
