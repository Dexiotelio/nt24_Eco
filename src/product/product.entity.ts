import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Inventory } from '../inventory/inventory.entity';
import { Discount } from '../discount/discount.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'text' })
  desc: string;

  // @Column({ type: 'varchar', length: 100, unique: true })
  // SKU: string;

  @Column({ type: 'varchar', length: 350 })
  image: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category_id: Category;

  @OneToOne(() => Inventory)
  @JoinColumn()
  inventory_id: Inventory;

  @OneToOne(() => Discount)
  @JoinColumn()
  discount_id: Discount;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
