import { IsOptional, IsString } from "class-validator";

export class CreateItemDTO {
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  quantity?: number;
}

export class UpdateItemDTO {
  description?: string;
  quantity?: number;
}
