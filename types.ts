
export interface Project {
  id: string;
  title: string;
  year: number;
  role: string;
  summary: string;
  description: string;
  tools: string[];
  tags: string[];
  cover: string;
  images: string[];
  model?: string; // Optional path to a 3D model file (.glb)
  links: {
    video: string | null;
    github: string | null;
    doc: string | null;
  };
}
