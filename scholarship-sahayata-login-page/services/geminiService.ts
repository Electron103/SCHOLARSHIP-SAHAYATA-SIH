import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    // Ideally from process.env, but handling gracefully if missing for the demo UI
    const apiKey = process.env.API_KEY || '';
    return new GoogleGenAI({ apiKey });
};

export const getDbtExplanation = async (): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Explain what Direct Benefit Transfer (DBT) is in India and why it is crucial for receiving government subsidies like LPG and scholarships. Keep it under 80 words, simple and encouraging.",
    });
    return response.text || "DBT (Direct Benefit Transfer) allows the government to transfer subsidies directly into your bank account. It ensures transparency, reduces delays, and eliminates middlemen.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "DBT (Direct Benefit Transfer) is a government mechanism to transfer subsidies directly to your bank account, ensuring you receive your full benefits on time.";
  }
};

export const getAiFormHelp = async (query: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a helpful banking assistant for Indian citizens. The user asks: "${query}". Provide a clear, step-by-step guide on how to fill the relevant bank form or perform the action. Keep it concise.`,
        });
        return response.text || "I'm sorry, I couldn't generate a response at the moment. Please try again.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Unable to connect to the AI assistant. Please check your connection.";
    }
};

export const getLoginSideImage = async (): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{
                    text: "A high-quality, inspiring digital illustration of an Indian student wearing a graduation cap, holding a smartphone that shows a 'Scholarship Received' green checkmark. The background subtly features the map of India and digital network lines representing Direct Benefit Transfer (DBT). Soft, warm lighting, professional style, 4k resolution."
                }]
            }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        // Fallback if no image data found
        return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop";
    } catch (error) {
        console.error("Gemini Image Gen Error:", error);
        // Fallback image related to students/education
        return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop";
    }
};