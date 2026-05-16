export type Stage = 'cross' | 'f2lIntuitive' | 'f2lAdvanced' | 'oll2look' | 'ollFull' | 'pll2look' | 'pllFull';

export interface CaseData {
  id: string;
  stage: Stage;
  /** Human-readable case name (proper-noun or label key). */
  name: string;
  /** Translation key for a longer description. */
  descriptionKey?: string;
  /** Tag keys for recognition hints. */
  recognitionTagKeys?: string[];
  /** The canonical solving algorithm. The case's state is derived by applying its inverse to a solved cube. */
  solve: string;
}

export interface AlgData {
  id: string;
  caseId: string;
  notation: string;
  notesKey?: string;
  ergonomicsKeys?: string[];
  attribution?: string;
  /** "primary" = the recommended alg shown first */
  primary?: boolean;
}

export interface LessonData {
  id: string;
  stage: Stage;
  /** Pure prose lessons (e.g. Cross intuitive) — no case linkage. */
  titleKey: string;
  bodyKey: string;
}
