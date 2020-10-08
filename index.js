const getExperianScore = require('./lib')
const creds = require('./creds')

getExperianScore({
  login: creds.login,
  pass: creds.pass,
  word: creds.word,
}).then(score => {
  console.log('Report date:', score.report_date)
  console.log('Next update:', score.updated_date)
  console.log('Score:', score.score)
})
