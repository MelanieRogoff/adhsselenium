const { By, Key, until } = require('selenium-webdriver');
const { multiClick } = require('../helpers/multiclick');
const { getDriver } = require('../helpers/getDriver');

/**
 * Description: tester() tests the following page: https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-schools.
 * @param {string} browserName - (ie: Chrome)
 */
async function tester(browserName) {

    let driver = await getDriver(browserName); //need to grab the driver in order to use Selenium-Webdriver

    try { //running the test in a try/catch block for easier error handling

        console.log('---Begin by visiting the specific AZDHS Page--- \n');
            await driver.get('https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-schools'); 

        console.log('---Click the Data Dashboard button twice to test its click event--- \n');
            await driver.wait(until.elementLocated(By.xpath("//body/div[@id='wrapper']/section[2]/div[1]/div[1]/div[2]/div[1]/a[1]/button[1]")), 3000);
            const button = await driver.findElement(By.xpath("//body/div[@id='wrapper']/section[2]/div[1]/div[1]/div[2]/div[1]/a[1]/button[1]"));
            await multiClick(driver, button);
            await driver.sleep(2000);

        console.log('---Enter information into the text area--- \n');
            const textarea = "";
            await driver.wait(until.elementLocated(By.xpath(textarea)), 8000); 
            await driver.findElement(By.xpath(textarea)).sendKeys('Health123', Key.RETURN);

        console.log('---Click on the link--- \n');
        // WILL FLESH OUT

        console.log('---Close the new PDF window and revert back to the page--- \n');
            const originalWindow = await driver.getWindowHandle(); //store ID of original window 
            await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 6000); //grabbing new tab
            const windows = await driver.getAllWindowHandles();
            
            windows.forEach(async handle => { //looping through to find the new window handle
                if (handle !== originalWindow) {
                    await driver.switchTo().window(handle);
                }
            });

            await driver.wait(until.urlContains(''), 10000); 
            await driver.close(); 
            await driver.switchTo().window(originalWindow);

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