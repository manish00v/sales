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
        const { body } = await elasticClient.search({
            index,
            body: { query: { match: query } },
        });
        return body.hits.hits;
    } catch (error) {
        console.error('Elasticsearch search error:', error.meta?.body?.error || error.message);
        throw new Error('Failed to search documents');
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
        const { body: exists } = await elasticClient.indices.exists({ index });
        return exists;
    } catch (error) {
        console.error('Elasticsearch connection failed:', error.message);
        return false; // Instead of throwing, return false
    }
}
}




// Export an instance of the service
export default new ElasticsearchService();