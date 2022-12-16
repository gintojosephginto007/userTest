/**
 * Required External Modules
 */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import error from './common/middleware/error';
import './config';
import config from "./config/config";
// import './modules/cron/cron.controller';
import { Server } from './server';

// dotenv.config();
/**
 * App Variables
 */
if (!config.port) {
  process.exit(1)
}

const PORT: number = parseInt(config.port as string, 10)

const app = express()
/**
 *  App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(error)
/**
 * Server Activation
 */

const server = new Server(app);
server.start(PORT);
