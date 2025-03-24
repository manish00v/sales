import elasticClient from '../config/elasticsearch.js';

class ElasticsearchService {
  // Index a document (store data in Elasticsearch)
  async indexDocument(index, document) {
    try {
      const result = await elasticClient.index({
        index,
        body: document,
      });
      return result;
    } catch (error) {
      console.error('Error indexing document:', error);
      throw error;
    }
  }

  // Search for documents
  async searchDocuments(index, query) {
    try {
        const result = await elasticClient.search({
            index,
            body: {
                query: {
                    match: query, // Example: { name: 'product name' }
                },
            },
        });
        return result.hits.hits; // Return search results
    } catch (error) {
        console.error('Error searching documents:', error);
        console.error('Full error object:', error.meta); // Log the full error object
        throw error;
    }
}

  // Delete an index (optional)
  async deleteIndex(index) {
    try {
      const result = await elasticClient.indices.delete({
        index,
      });
      return result;
    } catch (error) {
      console.error('Error deleting index:', error);
      throw error;
    }
  }


  async checkIndexExists(index) {
    try {
        const result = await elasticClient.indices.exists({
            index,
        });
        return result;
    } catch (error) {
        console.error('Error checking index existence:', error);
        throw error;
    }
}

}


// Export an instance of the service
export default new ElasticsearchService();