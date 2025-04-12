import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Shop } from './Shop'

@Entity()
export class ShopLocate {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ default: false })
  shopId!: number 

  @Column({ default: false })
  stationId!: number

  // relation
  @ManyToOne(() => Shop, (shop) => shop.shopLocates)
  shop: Shop | undefined
}
