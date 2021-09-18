export interface HSKWordInterface {
  hanzi: string,
  meaning: string,
  pinyin?: string,
  description?: string,
  example?: string,
}

export type HSKStageName = "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5"
export type HSKStageIndex = number