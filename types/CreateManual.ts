import type { CreateManualSection } from "./CreateManualSection";

export interface CreateManual {
  title: string;
  description: string;
  sections: CreateManualSection[]
}