// This is where we grab the Chrome driver so that Selenium-Webdriver can properly access Chrome! 

const chrome = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');
/**
 * @param {string} browserName - (ie: Chrome) 
 */
async function getDriver(browserName) { 
    const screen = { //set screen dimensions to these parameters to ensure that we get all required elements
        width: 1999,
        height: 808
    }

    const headlessVar = process.env.HEADLESS; //This grabs the HEADLESS environment mode so that we can check if the user is running the program in headless or non-headless mode. 
    let driver; 

    if (headlessVar === 'true') { //Below correlates to `selenium-webdriver` npm documentation. It  sets the browser to headless with a window size of our predefined screen IF the user is running the program in headless mode. 
        driver = await new Builder()
            .forBrowser(browserName)
            .setChromeOptions(new chrome.Options().headless().windowSize(screen)) 
            .build();
    } else { //otherwise, run the program as-is, without the headless mode
        driver = await new Builder().forBrowser(browserName).build();
    }
    return driver;
}
module.exports = { getDriver };