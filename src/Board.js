import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


 class Board extends React.Component{
    static defaultProps={
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25
      }

    constructor(props) {
        super(props);
        // TODO: set initial state
        this.state={
          hasWon: false,
          showBoard: [],
          board: []
        }
        this.createBoard = this.createBoard.bind(this);
        this.handleChanges = this.handleChanges.bind(this); 
        this.flipCellsAround = this.flipCellsAround.bind(this);
        this.flipCell = this.flipCell.bind(this);
        // this.showBoard = this.showBoard.bind(this);
    }

      /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    handleChanges(){
        this.createBoard();
        this.flipCellsAround();
    }
    
    createBoard() {
        // TODO: create array-of-arrays of true/false values
        const {nrows, ncols} = this.props;
        let board = [];
        for(let i=0;i<nrows; i++){
        board.push([])
        for(let j=0; j<ncols; j++){
            let rand = Math.random()*10;
            if(rand>7){board[i].push(true)}else{board[i].push(false)}
        }
        }
        let showBoard = (board)=>{
            return  board.map((arrVal, i)=>{
              return <tr key={i}>{arrVal.map((val,j)=>{
                return <Cell flipCellsAroundMe={this.flipCellsAround}  keyyo={[i,j]} key={[i,j]} isLit={val}/>;
              })}</tr>
            })
        }
        let newBoard = board;
        let showBoardd = showBoard(board)
        this.setState({board: newBoard, showBoard: showBoardd})
    }

    flipCell(y, x, board){
        // if this coord is actually on board, flip it
        let helperArr = [];
        if (x >= 0 && x < this.props.ncols && y >= 0 && y < this.props.nrows) {
           board[y][x]?board[y][x] = false: board[y][x] = true;
           
           this.setState({board: board})
        }
    }

    /** handle changing a cell: update board & determine if winner */
    
    flipCellsAround(coord) {
        let {ncols, nrows} = this.props;
        let board = this.state.board;
        console.log(coord);

        let showBoard = (board)=>{
            return  board.map((arrVal, i)=>{
              return <tr key={i}>{arrVal.map((val,j)=>{
                return <Cell flipCellsAroundMe={this.flipCellsAround}  keyyo={[i,j]} key={[i,j]} isLit={val}/>;
              })}</tr>
            })
        }
        
        if(coord !== undefined){
            let [y, x] = coord
            let hasWon = false;
    
        
            // TODO: flip this cell and the cells around it
            
            this.flipCell(y,x, board);
            this.flipCell(y-1,x, board);
            this.flipCell(y+1,x, board);
            this.flipCell(y,x-1, board);
            this.flipCell(y,x+1, board);

            let showBoardd = showBoard(board)
            this.setState({showBoard: showBoardd})
            // win when every cell is turned off
            
            let newBoard = board;
        
            hasWon = board.map(arrVal=>{
            return arrVal.filter((val)=>{return val === true}).length !== 0
            }).filter((val)=>{return val === true}).length === 0
        
            // TODO: determine is the game has been won
        
            this.setState({hasWon: hasWon});
            }
            // let [y, x] = coord/* .split("-").map(Number) */;
        
    }

    /** Render game board or winning message. */

    render() {
        // setTimeout(()=>{this.handleChanges()},0)
        // if the game is won, just show a winning msg & render nothing else
        // TODO

        let board = this.state.showBoard

        return(
        <div className="Board">
            <h1 className="Board-tag"><span className="Board-tag-l">LIGHTS</span><span className="Board-tag-o">OUT</span></h1>
            <div className="Board-box">
              {this.state.hasWon
              ?<p>You win!!</p>
              :<table className="Board">
              <tbody>
                  {board}
              </tbody>
              </table>}
            </div>
            <button className="Board-button" onClick={this.handleChanges}>generate</button>
        </div>
        )
        // make table board

        // TODO
    }
 }

 export default Board;