// controllers/socketController.js

const messageController = require('./MessageController');

const handleSocketEvents = (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', async (data) => {
    socket.to(data.room).emit('receive_message', data);

    try {
      await messageController.saveMessageToDB(data.room, socket.id, data.message);
    } catch (error) {
      // Handle error as needed
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
};

module.exports = {
  handleSocketEvents,
};
