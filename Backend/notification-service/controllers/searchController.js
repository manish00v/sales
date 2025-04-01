import elasticsearchService from '../services/elasticsearchService.js';

class SearchController {
  // Index a document
  async indexDocument(req, res) {
    try {
      const { index, document } = req.body;
      const result = await elasticsearchService.indexDocument(index, document);
      res.status(200).json({ message: 'Document indexed successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error indexing document', error: error.message });
    }
  }

  // Search for documents
  async searchDocuments(req, res) {
    try {
        const { index, query } = req.body;

        const indexExists = await elasticsearchService.checkIndexExists(index);
        if (!indexExists) {
            return res.status(404).json({ 
                message: 'Index not found or Elasticsearch unavailable',
                error: `Index "${index}" does not exist or connection failed.`,
            });
        }

        const results = await elasticsearchService.searchDocuments(index, query);
        res.status(200).json({ data: results });
    } catch (error) {
        res.status(500).json({
            message: 'Search failed',
            error: error.message,
            details: error.meta?.body || null,
        });
    }
}
}

// Export an instance of the controller
export default new SearchController();