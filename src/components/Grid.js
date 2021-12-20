import React from 'react'


const Grid = ({ rows, gridGuides }) => {
    const classes = !gridGuides ? 'grid-view' : 'grid-view grid-guides-visible'

    return (
        <div className={classes}>
           {rows}
        </div>
    )
}

export default Grid
