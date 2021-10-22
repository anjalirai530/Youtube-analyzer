const puppeteer = require('puppeteer');

let cTab;
let link = 'https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq';

(async function() {
    try {
        let browserOpen = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        })
        let browserInstance = await browserOpen;
        let allTabsArr = await browserInstance.pages();
        cTab = allTabsArr[0];
        await cTab.goto(link);

        await cTab.waitForSelector('h1#title');
        let name = await cTab.evaluate(function(select) { return document.querySelector(select).innerText }, 'h1#title');

        let allData = await cTab.evaluate(getDataOfPlaylist, '#stats.ytd-playlist-sidebar-primary-info-renderer');

        console.log(name, allData.noOfVideos, allData.noOfViews);


    } catch (error) {

    }
})()

function getDataOfPlaylist(selector) {
    let allElements = document.querySelectorAll(selector);
    console.log(allElements)
    let noOfVideos = allElements[0].innerText;
    let noOfViews = allElements[1].innerText;

    return {
        noOfVideos,
        noOfViews
    }
}