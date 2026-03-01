
import { GoogleGenAI, Type } from "@google/genai";
import { MangaStyle, MangaGenre, CharacterProfile, CharacterCategory, MangaPanel } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not configured.");
  }
  return new GoogleGenAI({ apiKey });
};

const handleApiError = (error: any) => {
  if (error?.message?.includes("Requested entity was not found.")) {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      aistudio.openSelectKey();
    }
  }
};

export const generateMangaImage = async (
  prompt: string, 
  style: MangaStyle, 
  genres: MangaGenre[],
  storyLine: string,
  characters: CharacterProfile[],
  panelsHistory: MangaPanel[],
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "3:4",
  useHighRes: boolean = false
): Promise<string | null> => {
  try {
    const ai = getAI();
    const charContext = characters.map(c => 
      `${c.name} (${c.role}): ${c.appearance.base}, ${c.appearance.hair} hair, ${c.appearance.eyes} eyes, ${c.appearance.outfit}.`
    ).join(" ");

    const lastAction = panelsHistory.length > 0 ? panelsHistory[0].prompt : "New Chapter Start.";

    const fullPrompt = `
      TASK: PROFESSIONAL MANGA PRODUCTION.
      CORE NARRATIVE LOGIC (STORY): ${storyLine}
      
      ART STYLE: ${style}. 
      GENRES: ${genres.join(", ")}.
      CAST: ${charContext}.
      CHRONOLOGY: Previous action was "${lastAction}".
      NEW SCENE REQUEST: ${prompt}.
      
      TECHNICAL REQUIREMENTS:
      - Authenticity: Professional G-pen lineart, manual screentones, cinematic depth of field.
      - Pacing: Granular focus. No time jumps. Maintain character outfits and features exactly.
      - Quality: Masterpiece level composition. High-octane manga energy.
    `;

    const modelName = useHighRes ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          ...(useHighRes ? { imageSize: "2K" } : {})
        }
      },
    });

    if (!response.candidates?.[0]?.content?.parts) return null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error: any) {
    handleApiError(error);
    console.error("Image generation error:", error);
    return null;
  }
};

export const generateCharacterPortrait = async (char: Partial<CharacterProfile>, style: MangaStyle): Promise<string | null> => {
  try {
    const ai = getAI();
    const appearanceStr = char.appearance 
      ? `${char.appearance.base}, ${char.appearance.hair} hair, ${char.appearance.eyes} eyes, wearing ${char.appearance.outfit}.` 
      : 'Standard appearance';

    const prompt = `Professional Anime character sheet for ${char.name}. Style: ${style}. Appearance: ${appearanceStr}. 
    Clean lineart, cel-shading, white background. Full consistency focus.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error: any) {
    handleApiError(error);
    return null;
  }
};

export const generateCharacterDetails = async (name: string, category: CharacterCategory, plot: string): Promise<Partial<CharacterProfile>> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Design character details for "${name}" (Role: ${category}) in the story context: "${plot}". Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            appearance: { 
              type: Type.OBJECT,
              properties: {
                base: { type: Type.STRING },
                hair: { type: Type.STRING },
                eyes: { type: Type.STRING },
                outfit: { type: Type.STRING },
                accessories: { type: Type.STRING }
              },
              required: ["base", "hair", "eyes", "outfit", "accessories"]
            },
            personality: { type: Type.STRING },
          },
          required: ["role", "appearance", "personality"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error: any) {
    handleApiError(error);
    return { role: 'Protagonist', appearance: { base: 'Modern', hair: 'Dark', eyes: 'Sharp', outfit: 'Casual', accessories: 'None' }, personality: 'Brave' };
  }
};

export const refinePrompt = async (userInput: string, genres: MangaGenre[]): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this into a detailed professional manga panel prompt: "${userInput}". Genres: ${genres.join(', ')}. Focus on cinematic camera angles and micro-expressions.`,
    });
    return response.text || userInput;
  } catch (error: any) {
    handleApiError(error);
    return userInput;
  }
};
