const puppeteer = require('puppeteer')

async function getExperianScore({ login, pass, word }) {
  let userReport

  const browser = await puppeteer.launch({ args: ['--no-sandbox']})
  const page = await browser.newPage()

  page.on('response', (response) => {
    if (response.url() === 'https://home.experian.co.uk/api/free-service/proxy/scores') {
      response.json().then((report) => {
        userReport = report
      })
    }
  })

  await page.goto('https://www.experianidentityservice.co.uk/Account/Login/Username', {
    waitUntil: 'networkidle2',
  })

  await page.waitForSelector('#ensCloseBanner')

  await page.click('#ensCloseBanner')
  await page.click('#btnback')

  await page.waitForSelector('#CspUsernameAuthuserNameusername')

  await page.type('#CspUsernameAuthuserNameusername', login)
  await page.type('#CspUsernameAuthuserNamepwd', pass)
  await page.click('input[type=submit]')

  await page.waitForSelector('label[for="CspMemorableWordAuthECSmwc1"]')

  const wIndex1 = await page.evaluate(element => element.textContent.slice(-1), await page.$('label[for="CspMemorableWordAuthECSmwc1"]'));
  const wIndex2 = await page.evaluate(element => element.textContent.slice(-1), await page.$('label[for="CspMemorableWordAuthECSmwc2"]'));
  const wIndex3 = await page.evaluate(element => element.textContent.slice(-1), await page.$('label[for="CspMemorableWordAuthECSmwc3"]'));

  await page.type('#CspMemorableWordAuthECSmwc1', word[+wIndex1 - 1])
  await page.type('#CspMemorableWordAuthECSmwc2', word[+wIndex2 - 1])
  await page.type('#CspMemorableWordAuthECSmwc3', word[+wIndex3 - 1])
  await page.click('#continueButton')

  await page.waitForTimeout(3000)

  const output = {
    report_date: userReport.data[0].date,
    updated_date: userReport.metadata.nextScoreAvailable,
    score: userReport.data[0].score,
    report: userReport
  }

  await browser.close()

  return output
}

module.exports = getExperianScore
