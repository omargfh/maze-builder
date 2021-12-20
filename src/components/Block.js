import { useState } from 'react'

const Block = ({inheritedType, dimensions, onAction, onDoubleClick }) => {

    return (
        <div className={['grid-item', inheritedType].join(' ')}
               style={{width: dimensions, height: dimensions}}
               onClick={onAction}
               onDoubleClick={(e) => onDoubleClick(e, inheritedType)}>
        </div>
    )
}

export default Block


