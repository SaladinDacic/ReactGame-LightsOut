import React, {Component} from 'react'
import "./Cell.css"

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

class Cell extends React.Component{
    static defaultProps = {
        isLit : false,
        flipCellsAroundMe: function flipCellseAround(cords) {
          
        }
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(evt) {
        evt.persist()
        // call up to the board to flip cells around this cell
        this.props.flipCellsAroundMe(this.props.keyyo);
    }
    render() {
        let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    
        return (
                <td className={classes} onClick={this.handleClick} />
        )
    }
}

export default Cell;