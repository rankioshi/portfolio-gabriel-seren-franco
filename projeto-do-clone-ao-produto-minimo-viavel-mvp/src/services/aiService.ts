import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function optimizeQRContent(content: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a QR code content optimizer. The user provided this content: "${content}". 
      If it's a URL, suggest a cleaner version or a shortened version (if possible, or just return the original if it's already good). 
      If it's text, make it more concise and professional for a QR code. 
      Return ONLY the optimized content string, no explanations.`,
    });

    return response.text?.trim() || content;
  } catch (error) {
    console.error("AI Optimization failed:", error);
    return content;
  }
}

export async function generateQRDescription(content: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a very short (max 5 words) descriptive name for a QR code containing this: "${content}".`,
    });
    return response.text?.trim() || "My QR Code";
  } catch (error) {
    return "My QR Code";
  }
}
