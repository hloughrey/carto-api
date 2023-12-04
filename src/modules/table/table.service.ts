import { Logger } from 'winston';
import { BigQuery } from '@google-cloud/bigquery';
import { TableResponseDto } from './table.types';

export async function getTable(logger: Logger, { tableFQN, geoColumn }): Promise<TableResponseDto> {
  const bigQueryClient = new BigQuery();

  try {
    const query = `
      SELECT *, 
        ST_ASGEOJSON(${geoColumn}) AS geoJson
      FROM \`${tableFQN}\`
      LIMIT 1000
    `;

    const options = {
      query: query,
      location: 'US'
    };

    const [job] = await bigQueryClient.createQueryJob(options);
    logger.info(`Running query with jobId: ${job.id}.`);

    const [rows] = await job.getQueryResults();

    const geojsonRes = rows.reduce(
      (acc, curr) => {
        const { geoJson, ...rest } = curr;
        delete rest[geoColumn];
        acc.features.push({ type: 'Feature', geometry: JSON.parse(geoJson), properties: { ...rest } });
        return acc;
      },
      {
        type: 'FeatureCollection',
        features: []
      }
    );
    return geojsonRes;
  } catch (error) {
    logger.error(error.errors);
    throw error.errors;
  }
}
