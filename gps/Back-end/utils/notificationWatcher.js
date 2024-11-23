const Notification = require('../models/notification'); // Modelo Mongoose
const { enviarNotificacion } = require('./websocketUtils'); // Importamos la función de envío de notificaciones

const iniciarWatcher = (wss) => { // Recibe la instancia de WebSocket Server
    const changeStream = Notification.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            const newNotification = change.fullDocument;
            enviarNotificacion(newNotification, wss); // Pasamos wss al enviarNotificacion
        }
    });

    changeStream.on('error', (error) => {
        console.error('Error en el change stream:', error);
    });
};

module.exports = iniciarWatcher;
