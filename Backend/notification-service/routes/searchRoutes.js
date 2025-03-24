import express from 'express';
import searchController from '../controllers/searchController.js';

const router = express.Router();

// Index a document
router.post('/index', searchController.indexDocument);

// Search for documents
router.post('/search', searchController.searchDocuments);

export default router;