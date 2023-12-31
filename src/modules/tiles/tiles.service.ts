import { Logger } from 'winston';

export async function getTile(logger: Logger, authToken: string, { tilesetFQN, z, x, y }) {
  logger.info(`Getting tile: z:${z} x:${x} y:${y} from ${tilesetFQN}`);
  try {
    return true;
  } catch (error) {
    const { data, status, statusText } = error.response;
    logger.error(data.source);
    throw { status, message: statusText };
  }
}
