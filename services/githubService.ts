
import { ApiEndpoint } from "../types";

// Simulated "Remote" Repository Data
const MOCK_REMOTE_ENDPOINTS: Partial<ApiEndpoint>[] = [
  {
    name: "User Authentication",
    method: "POST",
    path: "/auth/login",
    description: "Authenticates a user and returns a JWT token.",
    responseSchema: JSON.stringify({
      type: "object",
      properties: {
        token: { type: "string" },
        user: { 
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" }
          }
        }
      }
    }),
    exampleResponse: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: {
        id: "usr_123",
        email: "jane.doe@example.com"
      }
    }
  },
  {
    name: "System Health",
    method: "GET",
    path: "/health",
    description: "Returns the current status of the API services.",
    responseSchema: JSON.stringify({
      type: "object",
      properties: {
        status: { type: "string" },
        uptime: { type: "number" },
        version: { type: "string" }
      }
    }),
    exampleResponse: {
      status: "healthy",
      uptime: 86400,
      version: "2.4.1"
    }
  }
];

export const pullFromGithub = async (repoUrl: string): Promise<ApiEndpoint[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return MOCK_REMOTE_ENDPOINTS.map(ep => ({
    ...ep,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now()
  } as ApiEndpoint));
};

export const pushToGithub = async (repoUrl: string, endpoints: ApiEndpoint[]): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
};
