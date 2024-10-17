import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ItemDocument = Item & Document;

@Schema({ versionKey: false, timestamps: true })
export class Item {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

}

export const ItemSchema = SchemaFactory.createForClass(Item);