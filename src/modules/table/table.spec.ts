import request from 'supertest';
import { Express } from 'express';
import { BigQuery } from '@google-cloud/bigquery';

import { mockTableResponse } from './table.mocks';
import { getApp } from '../../app';

let app: Express;

const getQueryResults = jest.fn();

const mockBigQueryClient = new BigQuery();
jest.spyOn(mockBigQueryClient, 'createQueryJob').mockImplementation(() => [
  {
    getQueryResults
  }
]);

beforeAll(() => {
  app = getApp();
});

beforeEach(() => {});

describe('Table Controller', () => {
  const basePath = '/api/table';
  describe('[GET] /api/table/:tableFQN', () => {
    describe('success - 2xx HTTP status code', () => {
      it.skip('should get dummy table data', async () => {
        getQueryResults.mockResolvedValue(mockTableResponse);

        const { statusCode, body } = await request(app).get(`${basePath}/bigquery-public-data.usa_names.usa_1910_2013`);
        expect(statusCode).toEqual(201);
        expect(body.features).toHaveLength(2);
      });
    });
  });
});
