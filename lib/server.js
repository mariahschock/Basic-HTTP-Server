import net from 'net';
import chalk from 'chalk';

const serverLog = (...args) => console.log(chalk.cyan('[server]'), ...args);

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        serverLog('A peer connected!')
        socket.on('data', (data) => {
            const dataStr = data.toString()
            serverLog('Received data:', data.toString());

            const lines = dataStr.split('\n')
            const firstLine = lines[0];
            const [ method, path, ] = firstLine.split(' ');
            if(method == 'GET' && path == '/') {
                const body = `<html>
                <main>
                <h1> CONFUSION </h1>
                <p> I have confusion </p>
                </main>
                </html>`;
                socket.write(`HTTP/1.1 200 Ok 
Content-Type: text/html 
Content-Length: ${body.length} 

${body}`
                        )
            } else if (method == 'GET' && path == '/jsonData') {
                const jsonObject = { name: 'Leo', type: 'cat', age: 5 }
                socket.write(`HTTP/1.1 200 Ok
Content-Type: application/json
Content-Length: ${JSON.stringify(jsonObject.length)}

${JSON.stringify(jsonObject)}`
                        )
            } else {
                socket.write(dataStr.toUpperCase());
            }
        });
        socket.on('end', () => {
            serverLog('Client disconnected');
        });
        socket.on('error', (err) => {
            serverLog('Error', err);
        });
    });
    server.listen(port, host, () => {
        serverLog('My server is running!');
    });
    serverLog('Attempting to start server');
    return server; 
}