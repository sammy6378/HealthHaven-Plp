
import { createServer } from 'http';
import { Server } from 'socket.io'


const httpServer = createServer();

const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket) =>{
    console.log("New client connected",socket);

    socket.on('prescriptions', (data) => {
        console.log('Received prescription:', data);
    
        // Emit to clients that are listening for prescriptions
        socket.broadcast.emit('prescriptions', data); // Or socket.emit if you want to send to the sender too
      });
})


// Export the HTTP server and Socket.io server
export { httpServer, io };
