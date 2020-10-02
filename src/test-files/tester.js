const { By, Key, until } = require('selenium-webdriver');
const { clicker } = require('../helpers/clicker');
const { getDriver } = require('../helpers/getDriver');

/**
 * Description: tester() tests the following page: https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-schools.
 * @param {string} browserName - (ie: Chrome)
 */
async function tester(browserName) {
    let driver = await getDriver(browserName); //grab the driver in order to use Selenium-Webdriver
  
    try { //running the test in a try/catch block for easier error handling
        console.log('---Begin by visiting the specific AZDHS Page--- \n'); 
            await driver.get('https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-schools'); 

        console.log('---Click the Data Dashboard button once to test its click event--- \n');
            await driver.wait(until.elementLocated(By.xpath("//body/div[@id='wrapper']/section[2]/div[1]/div[1]/div[2]/div[1]/a[1]/button[1]")), 3000);
            const button = await driver.findElement(By.xpath("//body/div[@id='wrapper']/section[2]/div[1]/div[1]/div[2]/div[1]/a[1]/button[1]"));
            await clicker(driver, button); //not passing in clickAmount or ms here because it has default values provided by the clicker function

        console.log('---Enter information into the text area--- \n');
            await driver.wait(until.elementLocated(By.id('gsc-i-id1')), 8000); //waiting to locate the element (textarea)
            await driver.findElement(By.id('gsc-i-id1')).sendKeys('Health123', Key.RETURN); //this allows us to find the element once it's been located, type in `Health123`, and then press `Enter`

        console.log('---Click on the link displayed as a result of the search---');
            const result = "//body/div[@id='wrapper']/section[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[5]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]";
            await driver.wait(until.elementLocated(By.xpath(result)), 6000);
            const resultClicker = await driver.findElement(By.xpath(result));
            await clicker(driver, resultClicker);

        console.log('---Close the new PDF window and revert back to the page--- \n');
            const originalWindow = await driver.getWindowHandle(); //store ID of original window 
            await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 6000); //grabbing new tab
            const windows = await driver.getAllWindowHandles();
            
            windows.forEach(async handle => { //looping through to find the new window handle
                if (handle !== originalWindow) {
                    await driver.switchTo().window(handle);
                }
            });

            await driver.wait(until.urlContains('https://pub.azdhs.gov/health-stats/report/dhsag/dhsag99/ethnic99.pdf'), 10000); //making sure we have the right PDF 
            await driver.close(); 
            await driver.switchTo().window(originalWindow); 
            await driver.sleep(2000);

        console.log('---TEST IS COMPLETE.--- \n');
    }
    catch(err) {
        console.log('----ERROR--- \n');
        console.log(err.message);
    }
    finally {
        await driver.quit();
    }
}

module.exports = { tester };