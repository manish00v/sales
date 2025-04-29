import { elasticClient } from '../config/elasticsearch.js';

class ElasticsearchService {
  constructor() {
    this.serviceIndices = {
      'order-service': 'orders',
      'product-service': 'products',
      'inventory-service': 'inventory',
      'billing-service': 'bills',
      'shipment-service': 'shipments'
    };
  }

  async globalSearch(query) {
    try {
      // Verify connection first
      await elasticClient.ping();
      
      const allIndices = Object.values(this.serviceIndices).join(',');
      
      const { body } = await elasticClient.search({
        index: allIndices,
        body: {
          query: {
            simple_query_string: {
              query,
              fields: ["*"],
              default_operator: "OR"
            }
          },
          size: 100
        }
      });

      return {
        total: body.hits.total.value,
        results: body.hits.hits.map(hit => ({
          service: this.getServiceNameByIndex(hit._index),
          id: hit._id,
          score: hit._score,
          data: hit._source
        }))
      };
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  getServiceNameByIndex(index) {
    return Object.entries(this.serviceIndices).find(
      ([_, idx]) => idx === index
    )?.[0] || index;
  }

  // Index a document with service awareness
  async indexDocument(serviceName, document) {
    try {
      const index = this.getServiceIndex(serviceName);
      const result = await elasticClient.index({
        index,
        body: document,
        refresh: true // Ensure documents are immediately searchable
      });
      return result;
    } catch (error) {
      console.error(`Error indexing document for ${serviceName}:`, error);
      throw error;
    }
  }

  // Enhanced search across services
  async searchDocuments(services, query) {
    try {
      // Convert single service to array if needed
      const serviceArray = Array.isArray(services) ? services : [services];
      
      // Get all indices for the requested services
      const indices = serviceArray.map(service => 
        this.getServiceIndex(service)
      ).join(',');

      const { body } = await elasticClient.search({
        index: indices,
        body: {
          query: {
            bool: {
              should: [
                { multi_match: { query, fields: ['*'] } }, // Search all fields
                { wildcard: { _id: `*${query}*` } } // Include ID matches
              ]
            }
          },
          highlight: {
            fields: {
              '*': {} // Highlight matches in all fields
            }
          }
        }
      });

      return {
        hits: body.hits.hits,
        total: body.hits.total.value,
        services: serviceArray
      };
    } catch (error) {
      console.error('Elasticsearch search error:', error.meta?.body?.error || error.message);
      throw new Error('Failed to search documents');
    }
  }

  // Search across all microservices
  // async globalSearch(query) {
  //   try {
  //     // Get all indices
  //     const indices = Object.values(this.serviceIndices).join(',');

  //     const { body } = await elasticClient.search({
  //       index: indices,
  //       body: {
  //         query: {
  //           multi_match: {
  //             query: query,
  //             fields: ["*"], // Search all fields
  //             fuzziness: "AUTO" // Enable fuzzy matching
  //           }
  //         },
  //         size: 100 // Limit results
  //       }
  //     });

  //     return {
  //       total: body.hits.total.value,
  //       results: body.hits.hits.map(hit => ({
  //         service: this.getServiceNameByIndex(hit._index),
  //         ...hit._source
  //       }))
  //     };
  //   } catch (error) {
  //     console.error('Global search error:', error);
  //     throw new Error('Failed to perform global search');
  //   }
  // }

  // Check index exists
  async checkIndexExists(index) {
    try {
      const { body: exists } = await elasticClient.indices.exists({ index });
      return exists;
    } catch (error) {
      console.error('Elasticsearch connection failed:', error.message);
      return false;
    }
  }

  // Initialize indices with mappings
  async initializeIndices() {
    try {
      // First check if Elasticsearch is available
      const { body: available } = await elasticClient.ping();
      if (!available) {
        throw new Error('Elasticsearch cluster is not available');
      }
  
      for (const [service, index] of Object.entries(serviceIndices)) {
        try {
          const exists = await this.checkIndexExists(index);
          if (!exists) {
            await elasticClient.indices.create({ 
              index,
              body: {
                settings: {
                  number_of_shards: 1,
                  number_of_replicas: 1
                }
              }
            });
            console.log(`Created index ${index} for ${service}`);
          }
        } catch (error) {
          console.error(`Error creating index ${index}:`, error.message);
          // Continue with other indices even if one fails
          continue;
        }
      }
    } catch (error) {
      console.error('Elasticsearch initialization failed:', error.message);
      throw error;
    }
  }
}
export default new ElasticsearchService();