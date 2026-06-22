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

    console.log(`Generating costume: ${costumeId} with prompt: ${prompt.substring(0, 80)}...`);

    // Use Replicate's SDXL img2img model
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: dataUrl,
          prompt: prompt + ", photorealistic, masterpiece, best quality, detailed fur texture",
          negative_prompt:
            "blurry, low quality, deformed, ugly, bad anatomy, extra limbs, watermark, text, signature",
          prompt_strength: 0.75,
          num_inference_steps: 40,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
          num_outputs: 1,
          width: 1024,
          height: 1024,
        },
      }
    );

    // Output is an array of URLs
    const outputUrls = output as string[];
    if (!outputUrls || outputUrls.length === 0) {
      return Response.json({ error: "No output generated" }, { status: 500 });
    }

    const generatedUrl = outputUrls[0];

    // Fetch the image and convert to base64 to avoid CORS issues
    const imgResponse = await fetch(generatedUrl);
    const imgBuffer = await imgResponse.arrayBuffer();
    const imgBase64 = Buffer.from(imgBuffer).toString("base64");
    const imgDataUrl = `data:image/png;base64,${imgBase64}`;

    return Response.json({ imageUrl: imgDataUrl, success: true });
  } catch (error) {
    console.error("Generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json({ error: message }, { status: 500 });
  }
}
