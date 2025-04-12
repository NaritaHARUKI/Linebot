import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ShopLocate } from './Shop-locate'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, nullable: true })
  userId!: string

  @Column({ nullable: true })
  name!: string

  @Column({ nullable: true })
  url!: string

  @Column({ default: false })
  complete!: boolean

  // relation
  @OneToMany(() => ShopLocate, (locate) => locate.shopId)
  shopLocates: ShopLocate[] = []
}

