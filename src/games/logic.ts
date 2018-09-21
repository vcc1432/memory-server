import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board,Row } from './entities'


@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {

    return board.length === 4 &&
      board.every(row =>
        row.length === 6 
      )
  }
}

export const calculateWinner = (finished, scoreX, scoreO): string | null => {
  if(finished === true && scoreX > scoreO){
    return "x"
  }
  else if(finished === true && scoreX < scoreO){
    return "o"
  }
  else if(finished === true && scoreX === scoreO)
    return "x"
  else{
    return null
  }
}

export const finished = (board: Board) : boolean=>
  board
    .reduce((a,b) => a.concat(b) as Row)
    .every(symbol => symbol === "")

