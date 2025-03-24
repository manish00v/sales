import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({
    node: 'http://localhost:9200', // Elasticsearch server URL
    auth: {
        username: 'elastic', // Default username
        password: 'your_password', // Default password (if applicable)
    },
});

export default elasticClient;