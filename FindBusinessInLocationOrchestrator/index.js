/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const geoLocation = yield context.df.callActivity(
        "GeoEncodeAddressActivity",
        context.bindingData.input
    );

    context.bindingData.input.lat = geoLocation.lat;
    context.bindingData.input.lon = geoLocation.lon;
    context.bindingData.input.query = context.bindingData.input.query;

    const businesses = yield context.df.callActivity(
        "ExecuteLocalSearchActivity",
        context.bindingData.input
    );
    return businesses;
});