import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getGeminiHelp = async (query: string): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key not configured.";

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a helpful assistant for a Gram Panchayat Volunteer in India. 
      The volunteer's name is Rajesh. They are working on tasks like DBT verification, scholarship awareness, and document checks.
      Keep your answers short, encouraging, and easy to understand (simple English).
      
      User Query: ${query}`,
    });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am having trouble connecting to the server right now.";
  }
};
