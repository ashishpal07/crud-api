import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDTO } from './dto/item.dto';
import { ItemDocument } from './schema/item.model';
import { Response } from 'express';

@Controller('items')
export class ItemController {

  constructor (
    private readonly itemService: ItemService
  ) {}

  @Post()
  async createItem(
    @Body() data: CreateItemDTO,
    @Res() res: Response,
  ) {
    try {
      const item = await this.itemService.create(data);
      return res.json(item).status(201);
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Error while creating item.'
      })
    }
  }

  @Patch(':id')
  async updateItem(
    @Body() data: CreateItemDTO,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const item = await this.itemService.update(id, data);
      return res.json(item).status(200);
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Error while updating item.'
      });
    }
  }

  @Delete(':id')
  async deleteItem(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const item = await this.itemService.delete(id);
      return res.json(item).status(200);
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Error while deleting item.'
      });
    }
  }

  @Get(':id')
  async getSingleItem(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const item = await this.itemService.get(id);
      return res.json(item).status(200);
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Error while deleting item.'
      });
    }
  }

  @Get()
  async getAll(
    @Res() res: Response,
  ) {
    try {
      const item = await this.itemService.findAll();
      return res.json(item).status(200);
    } catch (error) {
      console.log(error);
      return res.json({
        message: 'Error while getting all item.'
      });
    }
  }
}
