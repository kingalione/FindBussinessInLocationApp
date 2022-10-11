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
  const lat = context.bindingData.lat;
  const lon = context.bindingData.lon;
  const query = context.bindingData.query;
  const bingMapsKey = process.env.BING_MAPS_KEY;

  const callUrl = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=${query}&userCircularMapView=${lat},${lon},5000&key=${bingMapsKey}
    `;
  console.log(callUrl);

  await axios
    .get(callUrl)
    .then((response) => {
      console.log(response);

      if (
        response.data.resourceSets.length &&
        response.data.resourceSets[0].resources.length
      )
        result = response.data.resourceSets[0].resources.map((item) => {
          const {
            Address: { formattedAddress },
            name,
          } = item;
          return { name: name, address: formattedAddress };
        });
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};
