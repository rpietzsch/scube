export type Stage = 'cross' | 'f2lIntuitive' | 'f2lAdvanced' | 'oll2look' | 'ollFull' | 'pll2look' | 'pllFull';

export interface AlgAlternate {
  notation: string;
  notesKey?: string;
  ergonomicsKeys?: string[];
  attribution?: string;
}

export interface CaseData {
  id: string;
  stage: Stage;
  /**
   * Optional subcategory slug within the stage (e.g. `"basicInsert"`,
   * `"repositionEdge"` for F2L). Library uses this to group thumbnails into
   * labelled sections. Cases with no `group` render in a single flat list.
   */
  group?: string;
  /** Human-readable case name (proper-noun or label key). */
  name: string;
  /** Translation key for a longer description. */
  descriptionKey?: string;
  /** Tag keys for recognition hints. */
  recognitionTagKeys?: string[];
  /** The canonical solving algorithm. The case's state is derived by applying its inverse to a solved cube. */
  solve: string;
  /**
   * Optional alternative algorithms for the same case (mirror, OH-friendly,
   * wide-turn, etc.). Surface in a collapsible "Alternatives" section on the
   * Case Detail page.
   */
  alternates?: AlgAlternate[];
  /**
   * Optional context applied to the solved cube *before* the setup. Used to
   * keep the visualisation honest: F2L examples need an unsolved last layer in
   * the "after" view, otherwise the diagram looks like a single algorithm
   * solved the whole cube. Defaults to none (cube remains solved as baseline).
   */
  context?: string;
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
  /** Optional list of case IDs to illustrate this lesson with cube nets. */
  examples?: string[];
}
