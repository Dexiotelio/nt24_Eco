import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @Get(':id')
  async products(@Param() params: any) {
    return `${params.id}`;
  }
  // @Get(":id")
  // allProducts()
}
