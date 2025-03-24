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

        // Check if the index exists
        const indexExists = await elasticsearchService.checkIndexExists(index);
        if (!indexExists) {
            return res.status(404).json({ 
                message: 'Index not found', 
                error: `Index ${index} does not exist.`, 
            });
        }

        // Perform the search
        const results = await elasticsearchService.searchDocuments(index, query);
        res.status(200).json({ message: 'Search successful', data: results });
    } catch (error) {
        console.error('Error in searchDocuments:', error);
        res.status(500).json({ 
            message: 'Error searching documents', 
            error: error.message || 'Unknown error', // Include the error message
            details: error.meta || null, // Include additional error details
        });
    }
}
}

// Export an instance of the controller
export default new SearchController();