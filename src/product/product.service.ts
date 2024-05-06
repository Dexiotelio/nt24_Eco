import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ProductDto } from 'src/dto/products.dto';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async AllProucts(): Promise<Product[]> {
    try {
      const getProducts = this.productRepository.find({
        relations: {
          category_id: true,
          inventory_id: true,
          discount_id: true,
        },
        select: {
          id: true,
          name: true,
          desc: true,
          image: true,
          price: true,
        },
      });
      return getProducts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async GetOneProduct(id: number): Promise<Product> {
    try {
      const getProduct = this.productRepository.findOne({
        where: {
          id,
        },
      });
      return getProduct;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
