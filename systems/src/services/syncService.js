const axios = require('axios');
const { mapFromSystemA, defaultFieldMappings } = require('../utils/mapper');

async function syncData() {
  try {
    const sourceResp = await axios.get('http://localhost:3001/api/nhan-vien');
    console.log("🚀 ~ syncData ~ sourceResp:", sourceResp)
    const sourceData = sourceResp.data?.data || [];

    const normalizedData = Array.isArray(sourceData) ? sourceData : [sourceData];
    console.log("🚀 ~ syncData ~ normalizedData:", normalizedData)
    const mappedPayload = normalizedData.map((item) =>
      mapFromSystemA(item, defaultFieldMappings)
    );
    console.log("🚀 ~ syncData ~ mappedPayload:", mappedPayload)

    const targetResp = await axios.post(
      'http://localhost:3002/api/users/import',
      {users: mappedPayload}
    );
    console.log("🚀 ~ syncData ~ targetResp:", targetResp)

    return targetResp.data;
  } catch (error) {
    console.error('syncData failed:', error.message);
    throw error;
  }
}

module.exports = {
  syncData,
};

