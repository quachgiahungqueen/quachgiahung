
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    identification: {
      type: Type.STRING,
      description: "The identified type of rock (e.g., Chondrite Meteorite, Amethyst Quartz, Granite). Be specific."
    },
    analysis: {
      type: Type.STRING,
      description: "Detailed analysis of the rock's characteristics, origin, and properties. Write this as an expert geologist."
    },
    estimatedValue: {
      type: Type.STRING,
      description: "The estimated market value in USD, including reasoning (e.g., '$50 - $100 per gram based on rarity'). State if it has no commercial value."
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "A confidence score from 0 to 100 on the accuracy of the identification."
    }
  },
  required: ["identification", "analysis", "estimatedValue", "confidenceScore"]
};

export const analyzeRockImage = async (imageFile: File): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `You are a world-class expert geologist and gemologist with deep knowledge of meteorites, gemstones, and common rocks. You have access to a vast, multi-platform database of geological and market data.

Analyze the provided image of a rock. Based on its visual characteristics (color, texture, luster, shape, potential crystal structure, fusion crust, regmaglypts, etc.), perform the following:

1.  **Identify:** Determine if the object is a meteorite, a specific type of gemstone, or a common rock.
2.  **Analyze:** Provide a detailed, engaging, and professional analysis explaining your reasoning. For meteorites, discuss possible composition and origin. For gemstones, discuss quality factors. For common rocks, explain its formation.
3.  **Valuate:** Estimate a plausible market value in USD. Provide a price range and explain the factors influencing the value. For common rocks, state their typical monetary value.
4.  **Confidence:** Provide a confidence score for your identification.

Return your response in the specified JSON format.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
          parts: [
              { text: prompt },
              imagePart
          ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    // Basic validation
    if (result && typeof result.identification === 'string') {
        return result as AnalysisResult;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (e) {
    console.error("Error analyzing image:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during analysis.";
    throw new Error(`Failed to get analysis from AI. ${errorMessage}`);
  }
};
