import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL:
    "https://openrouter.ai/api/v1",

  apiKey:
    process.env.OPENROUTER_API_KEY,
});



const app = express();

app.use(cors());

app.use(express.json());

app.post("/ai-edit", async (req, res) => {

  try {

    const {
      prompt,
      selectedElementHtml,
    } = req.body;

    const completion =
      await openai.chat.completions.create({

        model:
          "openai/gpt-4o-mini",

        max_tokens: 500,

        messages: [

          {
            role: "system",

            content: `
You are an HTML editor.

Rules:
- Modify ONLY the provided HTML element.
- Return ONLY updated HTML.
- No markdown.
- No explanations.
`,
          },

          {
            role: "user",

            content: `
User request:
${prompt}

HTML:
${selectedElementHtml}
`,
          },

        ],

      });

    let updatedElement =
      completion.choices[0]
        .message.content;

    updatedElement =
      updatedElement
        .replace(/```html/g, "")
        .replace(/```/g, "")
        .trim();

    res.json({
      updatedElement,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "AI failed",
    });

  }

});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});