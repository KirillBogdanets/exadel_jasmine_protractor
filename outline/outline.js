/**
* Data driven testing
* @param {Array<Object>} testData - test data
* @param {Function<Object>} callback - function to be called to each data item
* @example
* const testData = [1,2,3];
* outline(testData, (data) => {
* it("your test", () => {
* console.log(data);
* });
* }); //will execute it for each test data item
*/
function outline(testData, callback) {
    for (let data of testData) {
        callback(data);
    }
}

module.exports = outline;