import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const chatWithAI = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: message,
    });

    return res.status(200).json({
      success: true,
      data: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};