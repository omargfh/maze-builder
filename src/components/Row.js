import React from 'react'

const Row = ({columns, rowHeight}) => {
    return (
        <div className='grid-row' style={{"height": rowHeight}}>
            {columns}
        </div>
    )
}

export default Row
