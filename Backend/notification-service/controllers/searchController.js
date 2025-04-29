import elasticsearchService from '../services/elasticsearchService.js';

class SearchController {
  async globalSearch(req, res) {
    try {
      // Support both query params and body
      const query = req.query.query || req.body?.query;
      
      if (!query) {
        return res.status(400).json({
          message: 'Query parameter is required',
          examples: {
            via_get: '/api/search/global?query=test',
            via_post: {
              url: '/api/search/global',
              body: { query: 'test' }
            }
          }
        });
      }
  
      const results = await elasticsearchService.globalSearch(query);
      res.status(200).json(results);
    } catch (error) {
      console.error('Search error:', error);
      const status = error.message.includes('failed') ? 500 : 400;
      res.status(status).json({
        message: 'Search failed',
        error: error.message,
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack
        })
      });
    }
  }

  // Index a document for a specific service
  async indexDocument(req, res) {
    try {
      const { service, document } = req.body;
      if (!service || !document) {
        return res.status(400).json({ message: 'Service and document are required' });
      }

      const result = await elasticsearchService.indexDocument(service, document);
      res.status(200).json({ 
        message: 'Document indexed successfully',
        service,
        data: result 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error indexing document', 
        error: error.message 
      });
    }
  }

  // Search across one or more services
  async searchDocuments(req, res) {
    try {
      const { services, query } = req.body;
      
      if (!services || !query) {
        return res.status(400).json({ 
          message: 'Services and query are required',
          available_services: Object.keys(serviceIndices)
        });
      }

      const results = await elasticsearchService.searchDocuments(services, query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({
        message: 'Search failed',
        error: error.message,
        details: error.meta?.body || null,
      });
    }
  }

  // Global search across all services
  // async globalSearch(req, res) {
  //   try {
  //     // Better error handling for empty body
  //     if (!req.body || Object.keys(req.body).length === 0) {
  //       return res.status(400).json({ 
  //         message: 'Request body is empty',
  //         example: {
  //           query: "your search term",
  //           // other possible parameters
  //         }
  //       });
  //     }
  
  //     const { query } = req.body;
  //     if (!query) {
  //       return res.status(400).json({ message: 'Query is required' });
  //     }
  
  //     const results = await elasticsearchService.globalSearch(query);
  //     res.status(200).json(results);
  //   } catch (error) {
  //     console.error('Global search error:', error);
  //     res.status(500).json({
  //       message: 'Global search failed',
  //       error: error.message
  //     });
  //   }
  // }

  // Service-specific search with field filtering
  async serviceSpecificSearch(req, res) {
    try {
      const { service, query, fields } = req.body;
      if (!service || !query) {
        return res.status(400).json({ message: 'Service and query are required' });
      }

      const results = await elasticsearchService.serviceSpecificSearch(
        service, 
        query, 
        fields
      );
      res.status(200).json({ data: results });
    } catch (error) {
      res.status(500).json({
        message: 'Service-specific search failed',
        error: error.message
      });
    }
  }
}

export default new SearchController();