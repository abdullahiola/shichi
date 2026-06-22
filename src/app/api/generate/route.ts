import Replicate from "replicate";
import { NextRequest } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const prompt = formData.get("prompt") as string;
    const costumeId = formData.get("costumeId") as string;

    if (!imageFile || !prompt) {
      return Response.json(
        { error: "Missing image or prompt" },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return Response.json(
        { error: "REPLICATE_API_TOKEN is not configured. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    // Convert file to base64 data URL
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = imageFile.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // Ultra-conservative: add ONE small accessory, change nothing else
    const photoPrompt =
      "Do not change anything in this photograph. The background, the cat's fur, body, pose, lighting, and environment must remain completely identical to the input image. " +
      "ONLY add this one small item: " + prompt + ". " +
      "Everything else in the image must be pixel-perfect identical to the original. Do not redraw, restyle, or modify any part of the existing photo."

    console.log(`Generating costume: ${costumeId} with prompt: ${prompt.substring(0, 80)}...`);

    // Use FLUX Kontext Pro — preserves the cat's identity while applying costume edits
    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input: {
          input_image: dataUrl,
          prompt: photoPrompt,
          output_format: "jpg",
          output_quality: 90,
          safety_tolerance: 6,
        },
      }
    );

    // flux-kontext-pro returns a single URL string
    const generatedUrl = output as unknown as string;
    if (!generatedUrl) {
      return Response.json({ error: "No output generated" }, { status: 500 });
    }

    // Fetch and convert to base64 to avoid CORS issues
    const imgResponse = await fetch(generatedUrl);
    const imgBuffer = await imgResponse.arrayBuffer();
    const imgBase64 = Buffer.from(imgBuffer).toString("base64");
    const imgDataUrl = `data:image/jpeg;base64,${imgBase64}`;

    return Response.json({ imageUrl: imgDataUrl, success: true });
  } catch (error) {
    console.error("Generation error:", error);
    let message = error instanceof Error ? error.message : "Unknown error occurred";
    if (message.toLowerCase().includes("nsfw")) {
      message = "Safety filter triggered. Hit \"Try Again\" — it usually works on the next attempt!";
    }
    return Response.json({ error: message }, { status: 500 });
  }
}
