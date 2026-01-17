
import { GoogleGenAI, Type } from "@google/genai";
import { ApiEndpoint } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEndpoint = async (prompt: string): Promise<Partial<ApiEndpoint>> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Design a REST API endpoint based on this requirement: "${prompt}". Return the response in strict JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          method: { type: Type.STRING, enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
          path: { type: Type.STRING },
          description: { type: Type.STRING },
          requestSchema: { type: Type.STRING, description: "JSON schema as string" },
          responseSchema: { type: Type.STRING, description: "JSON schema as string" },
          exampleResponse: { type: Type.OBJECT, description: "A realistic example JSON response" }
        },
        required: ['name', 'method', 'path', 'description', 'responseSchema', 'exampleResponse']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateClientCode = async (endpoint: ApiEndpoint, language: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a production-ready ${language} client function to call this API endpoint:
    Method: ${endpoint.method}
    Path: ${endpoint.path}
    Request Schema: ${endpoint.requestSchema || 'None'}
    Response Schema: ${endpoint.responseSchema}
    
    Include comments and type definitions if appropriate. Only return the code.`,
  });

  return response.text.replace(/```[a-z]*\n|```/g, '').trim();
};
