/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */
const axios = require("axios");

module.exports = async function (context) {
  const adminDistrict = context.bindingData.adminDistrict;
  const postalCode = context.bindingData.postalCode;
  const city = context.bindingData.city;
  const addressLine = context.bindingData.addressLine;
  const bingMapsKey = process.env.BING_MAPS_KEY;
  var result = {};

  const callUrl = `http://dev.virtualearth.net/REST/v1/Locations/US/${adminDistrict}/${postalCode}/${city}/${addressLine}?key=${bingMapsKey}`;
  console.log(callUrl);

  await axios
    .get(callUrl)
    .then((response) => {
      console.log(response);

      result = {
        lat: response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0].toString(),
        lon: response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1].toString(),
      };
    })
    .catch((error) => {
      console.log(error);
    });

  //http://dev.virtualearth.net/REST/v1/Locations/DE/{postalCode}/{locality}/{addressLine}?includeNeighborhood={includeNeighborhood}&include={includeValue}&maxResults={maxResults}&key={BingMapsKey}

  return result;
};
