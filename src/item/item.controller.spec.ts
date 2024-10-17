import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';


describe('ItemController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      // providers: [ItemController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/items (POST)', () => {
    return request(app.getHttpServer())
    .post('/items')
    .send({ name: 'Item1', description: 'Test item', quantity: 10 })
    .expect(201)
    .then((response) => {
      // console.log(response.body);
      
      expect(response.body.name).toEqual('Item1');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
