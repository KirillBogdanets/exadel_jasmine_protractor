'use strict';
const path = require("path");
const yargs = require("yargs").argv;
const fs = require("fs");
const HTMLReport = require('protractor-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: 'https://exadel.com/',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 2,
        version: "66.0.3359.139"
    },
    // multiCapabilities: [{
    //     browserName: 'chrome',
    //     version: "66.0.3359.139"
    // }, {
    //     browserName: 'firefox'
    // }],

    specs: [
        `jasmine_e2e/${yargs.spec || "*/*.js"}`
    ],
    // restartBrowserBetweenTests: true,
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        var reporters = require('jasmine-reporters');
        var junitReporter = new reporters.JUnitXmlReporter({
            savePath: "./report/",
            consolidateAll: true
        });
        jasmine.getEnv().addReporter(junitReporter)
    },
    beforeLaunch: function () {
        const dir = path.resolve("./report/");
        console.log("Cleaning 'report' folder.");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else {
            fs.readdirSync(dir).forEach(file => fs.unlinkSync(path.resolve(dir + "/" + file)));
        }
    },
    onComplete: function () {
        let testConfig = {
            reportTitle: 'Test Execution Report',
            outputPath: './',
            testBrowser: "chrome",
            browserVersion: "66"
        };
        new HTMLReport().from('./report/junitresults.xml', testConfig);
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};