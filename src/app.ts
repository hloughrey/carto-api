import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { HealthCheckController } from '@latitude55/modules/health-check';
import { createLogger } from '@latitude55/libs';
import { TileController, TableController } from './modules';

export function getApp(): Express {
  const app = express();
  const logger = createLogger('Server');

  dotenv.config();
  app.use(cors());

  app.use(bodyParser.json());

  logger.info('Mapping API Paths');

  app.use('/api/', new HealthCheckController('/health-check').router);
  app.use('/api/table', new TableController('/api/table').router);
  app.use('/api/tiles', new TileController('/api/tiles').router);
  app.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
      message: error.message
    });
  });

  return app;
}
