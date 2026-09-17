/**
 * Created by GovAI on 9/17/2026
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.post("/api/ask", async (req, res) => {
  const question = String(req.body.question || "").trim();

  if (!question) {
    return res.status(400).json({ error: "Please enter a question." });
  }

  if (question.length > 5000) {
    return res.status(400).json({ error: "Question is too long." });
  }

  try {
    // 1. Generate the answer text
    const response = await openai.responses.create({
      model: "gpt-5",
      instructions:
        "You are a helpful public-sector assistant. Respond in clear, plain English. " +
        "Be concise and avoid making unsupported claims.",
      input: question,
    });

    const answer = response.output_text;

    // 2. Convert the answer to spoken audio
    // The speech endpoint accepts up to 4,096 characters, so truncate
    // or split longer answers in a production implementation.
    const speechInput = answer.slice(0, 4096);

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "marin",
      input: speechInput,
      instructions: "Speak clearly, calmly, and professionally.",
      response_format: "mp3",
    });

    const audioBuffer = Buffer.from(await speech.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");

    res.json({
      answer,
      audioDataUrl: `data:audio/mpeg;base64,${audioBase64}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "The AI service could not complete the request.",
    });
  }
});

app.listen(3001, () => {
  console.log("API server listening at http://localhost:3001");
});
