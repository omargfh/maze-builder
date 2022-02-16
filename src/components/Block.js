const Block = ({inheritedType, dimensions, onAction, onDoubleClick, isDown, setIsDown, appendToHistory }) => {

    return (
        <div className={['grid-item', inheritedType].join(' ')}
               style={{width: dimensions, height: dimensions}}
               onClick={onAction}
               onMouseDown={() => {
                   onAction()
                   setIsDown(true)
                   appendToHistory()
                }}
               onMouseUp={() => setIsDown(false)}
               onMouseOver={() => {
                   if (isDown) {
                       onAction()
                   }
               }}
               onDoubleClick={(e) => onDoubleClick(e, inheritedType)}>
        </div>
    )
}

export default Block


