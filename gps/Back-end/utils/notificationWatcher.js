const Notification = require('../models/notification'); // Modelo Mongoose
const { enviarNotificacion } = require('../server'); // Importar la función para enviar notificaciones

// Escuchar cambios en la colección Notification
const iniciarWatcher = () => {
    const changeStream = Notification.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            const newNotification = change.fullDocument;
            enviarNotificacion(newNotification);
        }
    });

    changeStream.on('error', (error) => {
        console.error('Error en el change stream:', error);
    });
};

module.exports = iniciarWatcher;
