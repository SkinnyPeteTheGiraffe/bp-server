import bootstrap from './bootstrap';
import * as express from 'express';

import { text } from 'figlet';
import { yellow, blue } from 'chalk';

console.time('Total Boot Time');

const app = express();
const path = '/graphql';

bootstrap(app, path).then(({ server, connection }) => {
    const port = Number(process.env.APP_PORT || 3001);
    app.listen(port, () => {
        text(
            'BP-Server',
            {
                font: 'Slant',
                horizontalLayout: 'default',
                verticalLayout: 'default',
            },
            function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(yellow('_____________________________________________________'));
                console.log(yellow(data));
                console.log(yellow('_____________________________________________________'));
                console.log(`Version: ${blue(process.env.npm_package_version)}`);
                console.timeEnd('Total Boot Time');
                console.log('Endpoints:');
                console.log(` * GraphQL: http://localhost:${port}${server.graphqlPath}`);
                console.log(yellow('_____________________________________________________'));
            }
        );
    });
});
