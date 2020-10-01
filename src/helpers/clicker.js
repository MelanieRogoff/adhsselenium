// NOTE: tester() is asynchronous because Selenium-Webdriver needs to wait to see if there is an element available that matches the element we are calling for. We will be calling for specific element searches, so to speak, in `test-files/tester.js`. 

/**
 * @param {Object} driver - Pass Selenium Webdriver object here -- necessary for the clicker function so that it can grab the driver
 * @param {Object} element - This is the element that the user interacts with (ie: button, row, field)
 */
async function clicker(driver, element, clickAmount=1, ms=1000) {
    //Setting clickAmount to 1 so that, by default, this function clicks once. 
    // Setting ms (miliseconds) to 1000, because that is the longest amount of time that the program should need in order to find the element called. 

    for (i = 0; i < clickAmount; i++) {
        await element.click(); //every async function requires an await. Think of it like this: when you run an async function, you have to WAIT for the element to be found, hence the await! Here we are waiting to see that the requested element has been clicked. 
        await driver.sleep(ms); //the driver is also an async function, as you will see in the helper file that gets the driver. We run driver.sleep(ms) so that the driver 'pauses' for 1000 miliseconds -- this will allow the program to locate the element. 
    }
}

module.exports = { clicker }