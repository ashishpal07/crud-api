import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schema/item.model';
import { CreateItemDTO, UpdateItemDTO } from './dto/item.dto';

@Injectable()
export class ItemService {

  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<ItemDocument[] | []> {
    return await this.itemModel.find();
  }

  async create(data: CreateItemDTO): Promise<ItemDocument | null> {
    const item = new this.itemModel({ ...data });
    return await item.save();
  }

  async update(id: string, data: UpdateItemDTO): Promise<ItemDocument | null> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    const updateItem = await this.itemModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
  
    return updateItem;
  }

  async delete(id: string): Promise<ItemDocument | null> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    const deleteItem = await this.itemModel.findByIdAndDelete(id);
    return deleteItem;
  }

  async get(id: string): Promise<ItemDocument | null> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }
}
