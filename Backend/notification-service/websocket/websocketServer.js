import { WebSocketServer } from 'ws';

class WebSocketServerWrapper {
    constructor(port = 8080) {
        this.wss = new WebSocketServer({ port });
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.wss.on('connection', (ws) => {
            console.log('Client connected');

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    broadcastNotification(notification) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) { // Use WebSocket.OPEN here
                client.send(JSON.stringify(notification));
            }
        });
    }

    close() {
        this.wss.close(() => {
            console.log('WebSocket server closed');
        });
    }
}

console.log('WebSocket server is running on ws://localhost:8080');
export default WebSocketServerWrapper;