const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const CUSTOM_TIMEOUT = 15 * 1000;
const parser = require('../../step_definitions/utils/poParser');
const utils = require('../../step_definitions/utils/utils');
const MemoryObject = require('../../step_definitions/memory/memory');
const outline = require("../../outline/outline");
const HomePageBlocks = require("../../test_date/homePage.json");

describe("HOME PAGE", () => {

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
    });

    describe("PAGE TITLE AND URL VERIFICATION", () => {
        it(`verify that Home Page url is equal to the ${browser.baseUrl}`, async () => {
            const url = await browser.getCurrentUrl();

            return expect(url).toEqual(browser.baseUrl);
        });

        it(`verify that Home Page title is equal to the 'Exadel | Global Enterprise Software & Tech Solutions'`, async () => {
            const pageTitle = await browser.getTitle();

            return expect(pageTitle).toEqual('Exadel | Global Enterprise Software & Tech Solutions');
        });
    });

    describe("ELEMENTS VISIBILITY", () => {
        outline(HomePageBlocks, (blocks) => {
            it(`${blocks.Block} should be in viewport with all when user is scrolling down`, async () => {
                outline(blocks.BlockElements, (elements) => {
                    utils.scrollerToTheElement(`HomePage > ${blocks.Block}`);
                    if (elements.EC === "viewport") {
                        utils.isInViewPort(`HomePage > ${elements.Element}`);
                    } else {
                        browser.wait(utils.ECHelper(parser.parser(`HomePage > ${elements.Element}`), `${elements.EC}`), CUSTOM_TIMEOUT, `${elements.Element} is not ${elements.EC}`);
                    }
                });
            });
        });
    });
});
