import { Request, Response, Router } from 'express';
import { Controller } from '@latitude55/types';
import { createLogger } from '@latitude55/libs';
import { getTable } from './table.service';

export class TableController implements Controller {
  private path: string;
  public router = Router();
  logger = createLogger('Table');

  constructor(path) {
    this.path = path;
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.logger.info(`Initialising endpoints on path: ${this.path}`);
    this.router.get('/:tableFQN', this.getTable);
  };

  getTable = async (req: Request, res: Response) => {
    const getTableArgs = {
      tableFQN: req.params.tableFQN,
      geoColumn: typeof req.query.geoColumn === 'string' ? req.query.geoColumn : 'geog'
    };

    try {
      const result = await getTable(this.logger, getTableArgs);

      if (!result) {
        return res.status(406).json({ error: 'Could not get table' });
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  };
}
