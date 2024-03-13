"use server";

import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectTodb } from "./utils";
import bcrypt from "bcryptjs"


export const addPost = async (prevState,formData) => {
  //   const title = formData.get("title");
  //   const desc = formData.get("desc");
  //   const slug = formData.get("slug");

  const { title, desc, slug, userId,img } = Object.fromEntries(formData);
  // console.log(title,desc,slug)

  try {
    connectTodb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img
    });

    await newPost.save();
    // console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  let { id } = Object.fromEntries(formData);
// const id = formData.get("id")
 console.log("id",id)
  try {
    connectTodb();

    const db=await Post.findByIdAndDelete(id)
    console.log("deleted from db",db);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState,formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectTodb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectTodb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

 export const handleGithubLogin = async () => {
   "use server";
   await signIn("github");
 };
 export const handleLogout = async () => {
   "use server";
   await signOut("github");
 };

 export const register=async(previousState,formData)=>{
  const {username,email,password,img,passwordRepeat}=Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return { 
      error: "Passwords do not match" 
  }
      
    
  }
  try {
    connectTodb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      img
    });

    await newUser.save();
    console.log("saved to db");

  return {success :true}
  

 }
 catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export const login = async (previousState,formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    
  } catch (err) {
    console.log(err);
    
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
