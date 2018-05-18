const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const CUSTOM_TIMEOUT = 15 * 1000;
const parser = require('../../step_definitions/utils/poParser');
const utils = require('../../step_definitions/utils/utils');
const MemoryObject = require('../../step_definitions/memory/memory');
const outline = require("../../outline/outline");
const FooterElements = require("../../test_date/footer.json");

describe('FOOTER', function () {
    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
    });

    outline(FooterElements, (elements) => {

        it(`verify that user can see tables with ${elements.Table} items when he is scrolling to the ${elements.Element} element in the Footer`, async () => {
            await utils.scrollerToTheElement(`HomePage > Footer > ${elements.Element}`);
            await browser.wait(utils.ECHelper(parser.parser(`HomePage > Footer > #1 of ${elements.Table}`), "present"), CUSTOM_TIMEOUT, `${elements.Element} is not present`);

            const arraySize = await parser.parser(`HomePage > Footer > ${elements.Table}`).count();

            return expect(arraySize, `${elements.Table} size (${arraySize}) is different then given count (${elements.TableItems})`).toEqual(parseInt(`${elements.TableItems}`));
        });

        it(`verify that user can see the same elements items in the Header: '${elements.HeaderDuplicateItems}' and in the Footer: '${elements.Table}'`, async () => {
            await browser.actions().mouseMove(parser.parser(`HomePage > Header > ${elements.HeaderDuplicate}`)).perform();
            await browser.wait(utils.ECHelper(parser.parser(`HomePage > Header > ${elements.HeaderDuplicateItems}`), "present"), CUSTOM_TIMEOUT, `${elements.HeaderDuplicateItems} is not present`);

            await utils.textRememberer(`HomePage > Header > #${elements.NumberOfItems} of ${elements.HeaderDuplicateItems}`, "ItemText");

            await utils.scrollerToTheElement(`HomePage > Footer > ${elements.Element}`);
            await browser.wait(utils.ECHelper(parser.parser(`HomePage > Footer > #1 of ${elements.Table}`), "present"), CUSTOM_TIMEOUT, `${elements.Element} is not present`);
            await utils.isElementsTextIsEqualTo(`HomePage > Footer > #${elements.NumberOfItems} of ${elements.Table}`, "$ItemText", "ignoringCase");
        });
    });
});