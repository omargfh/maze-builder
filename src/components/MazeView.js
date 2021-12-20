import { useRef, forwardRef, useImperativeHandle } from 'react'

const MazeView = forwardRef((props, ref) => {

    const mazeRef = useRef(null)

    useImperativeHandle(ref, 
        () => ({
            openFullscreen() {
                if (mazeRef.current.requestFullscreen) {
                mazeRef.current.requestFullscreen();
                } else if (mazeRef.current.webkitRequestFullscreen) { /* Safari */
                mazeRef.current.webkitRequestFullscreen();
                } else if (mazeRef.current.msRequestFullscreen) { /* IE11 */
                mazeRef.current.msRequestFullscreen();
                }
            }
        })
    )

    return (
        <div id='maze-view' className={props.style} ref={mazeRef} >
          {props.grid}
          <props.Tools magnify={props.magnify}
                       demagnify={props.demagnify}
                       setCurrentTool={props.setCurrentTool}
                       currentTool={props.currentTool} />
        </div>
    )
})

export default MazeView
