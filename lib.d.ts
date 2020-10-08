type ExperianOutput = {
  report_date: string
  updated_date: string
  score: number
  report: any
}

declare function getExperianScore(creds: {
  login: string
  pass: string
  word: string
}): Promise<ExperianOutput>
