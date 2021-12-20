import React from 'react'

const Item = ({component, classes, onClick}) => {
    return (
        <div className={'item ' + classes} text={typeof component == 'string' ? component : ''} onClick={onClick}>
            {typeof component !== 'string' ? component : (<></>) }
        </div>
    )
}

export default Item
