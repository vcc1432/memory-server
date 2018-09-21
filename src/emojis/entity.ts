import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export default class Emoji extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  name: string

  @Column('text')
  url: string

}
