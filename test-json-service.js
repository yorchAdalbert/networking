'use strict';

const server = require('net').createServer(connection => {
    console.log('Subscriber connected!');

    // Two message chunks that together make a wholw message.
    const firstChunck = '{"type":"changed", "timesta';
    const secondChunck = 'mp":1450694370094}\n';

    // Send the first chunck inmediately.
    connection.write(firstChunck);

    // After a short delay, send the other chunk.
    const timer = setTimeout(() => {
        connection.write(secondChunck);
        connection.end();
    }, 100);

    // Clear timer when the console ends.
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected!');
    });
});

server.listen(60300, () => console.log('Test server listining for subscribers...'));