import experess from "express";
import Post from "../mongodb/models/post.js";

const route = experess.Router();

route.get("/", async (req, res) => {
  const query = req.query;

  console.log(query);

  try {
    const posts = await Post.find({
      prompt: { $regex: query.query || "", $options: "i" },
    });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

route.post("/add", async (req, res) => {
  const { name, prompt, image } = req.body;

  try {
    if (!name || !image || !prompt) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    await Post.create({
      name,
      prompt,
      image,
    });

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default route;
