import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, nullable: true })
  userId!: string

  @Column({ nullable: true })
  name!: string

  @Column({ nullable: true })
  locate!: string

  @Column({ nullable: true })
  url!: string

  @Column({ default: false })
  complete!: boolean
}
