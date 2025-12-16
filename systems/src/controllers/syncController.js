const { syncData } = require('../services/syncService');

async function sync(req, res) {
  try {
    const result = await syncData();
    console.log("🚀 ~ sync ~ result:", result)
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('syncController.sync error:', error.message);
    res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
  }
}

module.exports = {
  sync,
};

