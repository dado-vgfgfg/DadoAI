
import { GoogleGenAI, Type } from "@google/genai";
import { MangaStyle, MangaGenre, CharacterProfile, CharacterCategory, MangaPanel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMangaImage = async (
  prompt: string, 
  style: MangaStyle, 
  genres: MangaGenre[],
  storyLine: string,
  characters: CharacterProfile[],
  panelsHistory: MangaPanel[],
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "3:4"
): Promise<string | null> => {
  try {
    const charContext = characters.map(c => 
      `${c.name}: ${c.appearance.base}, ${c.appearance.hair} hair, ${c.appearance.eyes} eyes, ${c.appearance.outfit}.`
    ).join(" ");

    const lastPanelDesc = panelsHistory.length > 0 
      ? `LAST ACTION RECORDED: ${panelsHistory[0].prompt}.` 
      : "BEGINNING OF THE CHAPTER.";

    const genreContext = genres.join(", ");

    const fullPrompt = `
      TASK: Professional MANGA PRODUCTION with STRICT SEQUENTIAL PACING.
      STYLE: ${style}. 
      GENRES: ${genreContext}.
      STORY SETTING: ${storyLine}.
      CAST: ${charContext}.
      
      CONTEXTUAL FLOW:
      ${lastPanelDesc}
      
      REQUESTED ACTION: ${prompt}.
      
      CRITICAL PACING RULES:
      - NO TIME SKIPS. If the character is in bed and the user says "go to school", you MUST render the character sitting up or getting out of bed. 
      - RENDERING GRANULARITY: Each page must show the tiny, mundane moments that lead to the next event. 
      - FOCUS: Show a hand on a doorknob, steam rising from coffee, the character's eyes narrowing as they think.
      - DO NOT teleport characters. Show the transition between locations or states.
      
      VISUAL STYLE:
      - Cinematic "G-pen" inking, authentic screentones.
      - Dynamic angles (Dutch angle, bird's eye view).
      - Relevant SFX onomatopoeia integrated into the art.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating anime panel:", error);
    return null;
  }
};

export const generateCharacterPortrait = async (char: Partial<CharacterProfile>, style: MangaStyle): Promise<string | null> => {
  try {
    const appearanceStr = char.appearance 
      ? `${char.appearance.base}, ${char.appearance.hair} hair, ${char.appearance.eyes} eyes, wearing ${char.appearance.outfit}. ${char.appearance.accessories}` 
      : 'Standard appearance';

    const prompt = `Professional Anime character concept art for ${char.name}. 
    Category: ${char.category}. Role: ${char.role}. 
    Physical details: ${appearanceStr}. 
    Style: ${style}. 
    ART DIRECTION:
    - Dynamic pose, high-quality cel-shading, character design sheet style.
    - Professional manga cover quality.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const generateCharacterDetails = async (name: string, category: CharacterCategory, plot: string): Promise<Partial<CharacterProfile>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Design a unique anime character for a story with this plot: "${plot}".
      Name: ${name}
      Allegiance Category: ${category}
      Provide role, physical appearance, and personality in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING, description: "Job/Function in the story, e.g. Ronin, Hacker" },
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
  } catch (error) {
    return { 
      role: 'Protagonist', 
      appearance: { 
        base: 'Modern Anime Look', hair: 'Spiky', eyes: 'Determined', outfit: 'Heroic', accessories: 'None' 
      }, 
      personality: 'Determined' 
    };
  }
};

export const refinePrompt = async (userInput: string, genres: MangaGenre[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Enhance this manga scene for SLOW PACING and MICRO-ACTIONS: "${userInput}". Genres: ${genres.join(', ')}. Focus on sensory details and transitional movements. Keep it very short.`,
    });
    return response.text || userInput;
  } catch (error) {
    return userInput;
  }
};
