import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  userId!: string | null

  @Column()
  name!: string | null

  @Column()
  locate!: string | null

  @Column()
  url!: string | null

  @Column({ default: false })
  complete!: boolean
}
