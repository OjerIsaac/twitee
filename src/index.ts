import dotenv from 'dotenv';
dotenv.config(); // load env variables
import 'reflect-metadata';
import app from './app';
import Knex from 'knex';
import config from './knexfile';
import { Model } from 'objection';

(async () => {
    try {
        // Initialize knex.
        const knex = Knex(config.development);

        // Bind all Models to a knex instance.
        Model.knex(knex);
        
        const port = Number(process.env.PORT) || 1001;

        // spin up the server
        app.listen(port, () => {
            console.log("Twitee backend service is running on http://localhost:" + port);
        });
    } catch(err) {
        console.log(err);
        process.exit();
    }

})();

// server needs to crash gracefully 
process.on('uncaughtException', (err) => {
    if(process.env.NODE_ENV === 'production') {
        // notify us of the error either by sending pass err.message and err.stack to cloud watcher log
    }
    console.log('Server crashing gracefully..');
    console.log(err);
    process.exit(1); //server needs to crash and a process manager will restart it
})