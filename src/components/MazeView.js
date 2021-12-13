import React from 'react'

const MazeView = ({style, grid}) => {
    return (
        <div id='maze-view' className={style}>
          {grid}
        </div>
    )
}

export default MazeView
