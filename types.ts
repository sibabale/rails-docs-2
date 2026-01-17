
export interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestSchema?: string;
  responseSchema: string;
  exampleResponse: any;
  createdAt: number;
}

export interface ProjectState {
  endpoints: ApiEndpoint[];
  selectedEndpointId: string | null;
}

export enum ViewMode {
  DESIGN = 'DESIGN',
  DOCS = 'DOCS',
  TEST = 'TEST',
  CODE = 'CODE'
}
