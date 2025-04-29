import express from 'express';
import searchController from '../controllers/searchController.js';

const router = express.Router();


router.get('/global', searchController.globalSearch);
router.post('/global', searchController.globalSearch);

// Index a document for a service
router.post('/index', searchController.indexDocument);

// Search across one or more services
router.post('/search', searchController.searchDocuments);

// Global search across all services
router.post('/search/global', searchController.globalSearch);

// Service-specific search with field filtering
router.post('/search/:service', searchController.serviceSpecificSearch);


// Add this temporary route to test connection
router.get('/api/test-elastic', async (req, res) => {
    try {
      const { body } = await elasticClient.ping();
      res.json({ connected: body, indices: await elasticClient.cat.indices({ format: 'json' }) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;