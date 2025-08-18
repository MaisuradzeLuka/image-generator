import express from "express";
import { Client } from "@gradio/client";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the DALL-E API",
  });
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const client = await Client.connect("black-forest-labs/FLUX.1-schnell");
    const result = await client.predict("/infer", {
      prompt,
      seed: 0,
      randomize_seed: true,
      width: 1024,
      height: 1024,
      num_inference_steps: 4,
    });

    if (!result.data || result.data.length === 0) {
      return res.status(500).json({ message: "Failed to generate image" });
    }

    res.status(201).json({
      image: result.data[0].url,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
