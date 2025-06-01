import type { ManualHead } from "./ManualHead";
import type { ManualSection } from "./ManualSection";

export interface Manual {
  head: ManualHead;
  sections: ManualSection[];
}