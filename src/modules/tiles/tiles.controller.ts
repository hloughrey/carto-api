import { Request, Response, Router } from 'express';
import { Controller } from '@latitude55/types';
import { createLogger } from '@latitude55/libs';
import { getTile } from './tiles.service';

export class TileController implements Controller {
  private path: string;
  public router = Router();
  logger = createLogger('Tiles');

  constructor(path) {
    this.path = path;
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.logger.info(`Initialising endpoints on path: ${this.path}`);
    this.router.get('/:tilesetFQN/:z/:x/:y', this.getTile);
  };

  getTile = async (req: Request, res: Response) => {
    const token = req.get('auth')!;

    const { tilesetFQN, z, x, y } = req.params;

    const getTileArgs = {
      tilesetFQN,
      z,
      x,
      y
    };

    try {
      const result = await getTile(this.logger, token, getTileArgs);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  };
}
