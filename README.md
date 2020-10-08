[![Latest Stable Version](https://img.shields.io/npm/v/experian-score.svg)](https://www.npmjs.com/package/experian-score)
[![License](https://img.shields.io/npm/l/experian-score.svg)](https://www.npmjs.com/package/experian-score)
[![NPM Downloads](https://img.shields.io/npm/dt/experian-score.svg)](https://www.npmjs.com/package/experian-score)

# Collect credit score from ExperianScore
A simple way to collect your score from https://www.experian.co.uk/

### Example result of work
```
Report date: 2020-09-25T21:23:20.492
Next update: 2020-10-25T00:00:00
Score: 999
```

### Install
1. `git clone https://github.com/Toxblh/ExperianScore`
2. `cd ExperianScore`
3. `echo "module.exports = { login: 'YourL0gin', pass: 'YourPassw0rd', word: 'YourW0rd'}" > creds.js`
4. `yarn` or `npm i`
5. `node ./index.js`
6. Your score already front of you


### Lib version
1. `npm i experian-score`
2. Use
```js
const getExperianScore = require('experian-score')

getExperianScore({
  login: creds.login,
  pass: creds.pass,
  word: creds.word
}).then(score => {
  console.log('Report date:', score.report_date)
  console.log('Days until new:', score.updated_date)
  console.log('Score:', score.score)
})

```
