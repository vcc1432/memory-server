import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
//import {Emoji} from '../emojis/entity';

// export type CorrectMove = (string|number|null)[]
export type Symbol= "x" | "o"
export type Row = Array<number|null|string> 
export type Board = Array<Row>
type Status = 'pending' | 'started' | 'finished'


const images = [1,2,3,4,5,6,7,8,9,10,11,12]

const starterBoard = images.concat(images)

const randomizedBoard = starterBoard.sort(() => 0.5 - Math.random())

const emptyRow: Row = [null, null, null, null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow, emptyRow ]

const hiddenRow1: Row = [randomizedBoard[0], randomizedBoard[1], randomizedBoard[2], randomizedBoard[3], randomizedBoard[4], randomizedBoard[5]]
const hiddenRow2: Row = [randomizedBoard[6], randomizedBoard[7], randomizedBoard[8], randomizedBoard[9], randomizedBoard[10], randomizedBoard[11]]
const hiddenRow3: Row = [randomizedBoard[12], randomizedBoard[13], randomizedBoard[14], randomizedBoard[15], randomizedBoard[16], randomizedBoard[17]]
const hiddenRow4: Row = [randomizedBoard[18], randomizedBoard[19], randomizedBoard[20], randomizedBoard[21], randomizedBoard[22], randomizedBoard[23]]
const hiddenBoard: Board = [ hiddenRow1, hiddenRow2, hiddenRow3, hiddenRow4 ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column ('json', {default: hiddenBoard})
  hiddenboard: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol | string

  @Column('text', {default: 'pending'})
  status: Status

  @Column({default: 0})
  scoreX: number

  @Column ({default: 0})
  scoreO: number

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol

}
