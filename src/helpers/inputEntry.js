
const { By, Key } = require('selenium-webdriver');
/**
 * @summary inputEntry() allows us to enter 2 different inputs and waits for the program to complete the input search.
 * @param {string} driver - Pass Selenium Webdriver object here
 */
async function inputEntry(driver) { //will place xpath URLS later
    await driver.findElement(By.xpath("")).sendKeys('coronavirus arizona', Key.RETURN);
    await driver.sleep(4000);
    await driver.findElement(By.xpath("")).sendKeys('ABC123!', Key.RETURN);
}
module.exports = { inputEntry };