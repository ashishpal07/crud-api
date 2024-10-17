import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item, ItemDocument, ItemSchema } from './schema/item.model';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { connect, Connection } from 'mongoose';

describe('ItemService', () => {
  let service: ItemService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let itemModel: Model<ItemDocument>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])
      ],
      providers: [ItemService],
    }).compile();

    service = module.get<ItemService>(ItemService);
    itemModel = module.get<Model<ItemDocument>>(getModelToken(Item.name));
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all items should return an array of items', async () => {
    const createdItem = new itemModel({ name: 'Test Item' });
    await createdItem.save();
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Item');
  });

  it('get single item should return one document of item', async () => {
    const createdItem = new itemModel({ name: 'Test Item' });
    const created = await createdItem.save();
    const result = await service.get(created._id.toString());
    expect(result.name).toBe('Test Item');
  });
  
  it('delete item should retrun deleted document', async () => {
    const createdItem = new itemModel({ name: 'Test Item' });
    const created = await createdItem.save();
    const res = await service.delete(created._id.toString());
    expect(res.name).toBe('Test Item');
  })
});
