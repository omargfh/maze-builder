import './App.css';

// Components

/* Viewport */
import Block from './components/Block'
import Row from './components/Row'
import Grid from './components/Grid'
import MazeView from './components/MazeView';

/* Other Components */
import SideBarItem from './components/SideBarItem';
import Tools from './components/Tools'

// Dialogs
import NewMazeDialog from './components/New'
import Export from './components/Export'
import Dimensions from './components/Dimensions';
import Filename from './components/Filename';

// Icons
import New from './assets/new-page.png'
import Checkmark from './assets/checkmark.png'
import Maximize from './assets/maximize.png'
import Random from './assets/random.png'
import Square from './assets/square-measument.png'
import GridIcon from './assets/grid.png'
import GridIconHide from './assets/gridhide.png'
import Undo from './assets/undo.png'
import Redo from './assets/redo.png'
import Save from './assets/save.png'
import Open from './assets/open.png'

// Modifiers
import scewedRandomness from './Modifiers/randomness'
import save from './Modifiers/save'



import { useState, useEffect, useRef } from 'react'

function App() {
  const [size, setSize] = useState({
    width: 20,
    height: 20
  })

  const defaultDimensions = 85

  const [dimensions, setDimensions] = useState(defaultDimensions)
  const [scale, setScale] = useState(1)
  const [MazeViewStyle, setMazeViewStyle] = useState(String())
  const [maze, setMaze] = useState([])
  const [mazeHistory, setMazeHistory] = useState([])
  const [mazeFuture, setMazeFuture] = useState([])

  const historyMaxLength = 50
  const appendToHistory = (state) => {
    if (mazeHistory.length >= historyMaxLength) {
      let newMazeHistory = [...mazeHistory, state]
      newMazeHistory.shift()
      setMazeHistory(newMazeHistory)
    }
    else {
      setMazeHistory([...mazeHistory, state])
    }
  } 

  const appendCurrentMazeToHistory = () => { appendToHistory(maze) }

  const [canUndo, setCanUndo] = useState(false)
  useEffect(() => {
    if (mazeHistory.length === 0) {
      setCanUndo(false)
    }
    else {
      setCanUndo(true)
    }
  }, [mazeHistory])

  const undo = () => {
    if (canUndo) {
      setMazeFuture([maze, ...mazeFuture])
      let newMazeHistory = [...mazeHistory]
      let newMaze = newMazeHistory.pop()
      setMaze(newMaze)
      setMazeHistory(newMazeHistory)
    }
  }

  const [canRedo, setCanRedo] = useState(false)
  useEffect(() => {
    if (mazeFuture.length === 0) {
      setCanRedo(false)
    }
    else {
      setCanRedo(true)
    }
  }, [mazeFuture])

  const redo = () => {
    if (canRedo) {
      setMazeHistory([...mazeHistory, maze])
      let newMazeFuture = [...mazeFuture]
      let newMaze = newMazeFuture.shift()
      setMaze(newMaze)
      setMazeFuture(newMazeFuture)
    }

  }

  const clearHistory = () => {
    setMazeFuture([])
    setMazeHistory([])
  }


  const [globalW, globalH] = [window.innerWidth * 0.9 - 35, window.innerHeight * 0.85 - 16.8]

  const getAttrib = (columns, rows, defaultDimensions) => {
    let scale = defaultDimensions
    // If there are more columns than rows
    if (columns >= rows) {
      // Sets the scale to fill the height with rows
      scale = globalH / (rows * defaultDimensions)
      // Unless the columns do not fill the entire width of the screen
      if (columns * defaultDimensions * scale < globalW) {
        scale = globalW / (columns * defaultDimensions)
      }
    }
    // In the opposite scenario (rows more than columns)
    if (rows > columns) {
      // Sets the scale to fill the width with columns
      scale = globalW / (columns * defaultDimensions)
      // Unless the rows do not fill the height
      if (rows * defaultDimensions * scale < globalH) {
        scale = globalH / (rows * defaultDimensions)
      }
    }

    // Compute flags
    const flags = {
      centerWidth: columns * defaultDimensions < globalW,
      centerHeight: rows * defaultDimensions < globalH
    }

    // Sets maximum result 1 and minimum 0
    if (scale >= 1) return { scale: 1, flags: flags }
    else if (scale <= 0.1) return { scale: 0.1, flags: {centerWidth: false, centerHeight: false} }
    else return {scale: scale, flags:  {centerWidth: false, centerHeight: false}}
  } 

  const getMazeViewAuxStyle = (flags) => {
    // Unpack a flag
    let [centerWidth, centerHeight] = [flags.centerWidth, flags.centerHeight]
    // If both flags are false return an empty string
    if (!centerWidth && !centerHeight) { return String() }

    // If the columns and rows are not sufficient
    if (dimensions * size.width < globalW && dimensions * size.height < globalH) return "small smallw smallh"

    // Otherwise find the necessary class names
    let style = "small"
    if (centerWidth) style = style + " smallw"
    if (centerHeight) style = style + " smallh"
    return style
  }


  const populateArea = () => {
    // Fetch attributes of the current maze
    const fetchedAttrib = getAttrib(size.width, size.height, defaultDimensions)

    // Update the scale and dimensions
    setScale(fetchedAttrib.scale)
    setDimensions(defaultDimensions * fetchedAttrib.scale)

    // Update flags
    setMazeViewStyle(["maze-view", getMazeViewAuxStyle(fetchedAttrib.flags)].join(" "))
  }

  const reset = () => {
    populateArea()
    initializeMazeSpace(size.height, size.width)
    populateRandom()
  }

  const fitDim = (i, j) => {
    populateArea()
    let newMaze = [...maze]
    while(newMaze.length > i) {
      newMaze.pop()
    }
    newMaze.forEach(row => {
      while(row.length > j) {
        row.pop()
      }
    })
    while(newMaze.length < i) {
      newMaze.push([])
    }
    newMaze.forEach(row => {
      while(row.length < j) {
        row.push("empty")
      }
    })
    setMaze(newMaze)
  }

  const initializeMazeSpace = (rows, columns) => {
    let newMaze = maze
    for (let i = 0; i < rows; i++) {
      newMaze[i] = []
      for (let j  = 0; j < columns; j++) {
        newMaze[i][j] = "empty"
      }
    }
    setMaze(newMaze)
  }

  const emptyAll = (blockState) => {
    const newMaze = [...maze]
    for(let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
         newMaze[i][j] = maze[i][j] === blockState ? "empty" : maze[i][j]
      }
    }
    setMaze(newMaze)
  }

  const blocks = ["empty", "wall", "steel steel-a", "steel steel-b"]
  const emptyMaze = () => {
    blocks.forEach(b => {
      emptyAll(b)
    })
  }

  const updateMaze = (i, j, blockState) => {
    if (maze.length === 0) {
      initializeMazeSpace(size.height, size.width)
    }

    if (['steel steel-a', 'steel steel-b'].includes(blockState)) {
      emptyAll(blockState)
    }

    setMaze(maze.map((row, a) => 
        i === a ? (row.map((block, b) => b === j ? blockState : block)) : row
      )
    )
  }

  const randomObject = [
    {
      name: "empty",
      prob: 0.7,
      unique: false
    },
    {
      name: "wall",
      prob: 0.3,
      unique: false
    },
    {
      name: "steel steel-a",
      prob: 0.05,
      unique: true
    },
    {
      name: "steel steel-b",
      prob: 0.03,
      unique: true
    }
  ]

  const populateRandom = (height = size.height, width = size.width) => {
    setMaze(maze.map((row) => {
      return (row.map((block) => {
        return (scewedRandomness(randomObject))
      })
    )}))
  }

  const [gridArray, setGridArray] = useState([])
  const [isDown, setIsDown] = useState(false)
  const renderMaze = () => {

    let grid = []
    maze.forEach((row, i) => {
      let renderedRow = []
      row.forEach((block, j) => {
        renderedRow.push(<Block key={size.width * i + j}
          inheritedType={block}
          dimensions={defaultDimensions * scale}
          onAction={() => {
            setBlock(i, j)
            setMazeFuture([])
          }}
          onDoubleClick={() => updateMaze(i, j, "empty")}
          isDown = {isDown}
          setIsDown={setIsDown}
          appendToHistory={appendCurrentMazeToHistory} 
        />)
      })
      grid.push(<Row key={i} columns={renderedRow} rowHeight={defaultDimensions * scale}/>)
    })

    setGridArray(grid)
  }
  // Tool functions

  const [gridGuides, setGridGuides] = useState(true)
  const [gridGuidesIcon, setGridGuidesIcon] = useState(GridIcon)
  const [currentTool, setCurrentTool] = useState("wall")
  const [newWindowStatus, setNewWindowStatus] = useState(false)
  const [exportDialog, setExportDialog] = useState(false)
  const [dimensionDialog, setDimensionDialog] = useState(false)
  const [filenameDialog, setFilenameDialog] = useState(false)


  const mazeRef = useRef(null)

  const magnify = (factor) => {
    setScale(scale + factor)
  }

  const setBlock = (i, j) => {
    updateMaze(i, j, currentTool)
  }

  const createNew = (w, h, r, g) => {
    setSize({height: h, width: w})
    if (r) populateRandom()
    if (!r) ["wall", "steel steel-a", "steel steel-b"].forEach(a => emptyAll(a))
    setGridGuides(g)
    hideDialog(setNewWindowStatus)
  }

  const hideDialog = (dialog) => {
    dialog(false)
  }

  // Populates the maze in the right dimensions
  // only when a new maze is loaded
  useEffect(() => {
    reset()
  }, [])


  let populateTrue = true
  useEffect(() => {
    fitDim(size.height, size.width)
    if (populateTrue) {
      populateArea()
    }
    else populateTrue = true
  }, [size])

  // Updates the dimensions based on scale
  useEffect (() => {
    setDimensions(defaultDimensions * scale)
  }, [scale])

  useEffect(() => {
    if (gridGuides === true) {
      setGridGuidesIcon(GridIconHide)
    }
    else {
      setGridGuidesIcon(GridIcon)
    }
  }, [gridGuides])
  
  useEffect(() => {
    renderMaze()
  }, [maze, scale, currentTool, isDown])



  const exportString = (e, w, a, b) => {
    return maze.map((row) => row.map((block) => {
        if (block === "wall") return w
        if (block === "empty") return e 
        if (block === "steel steel-a") return a
        if (block === "steel steel-b") return b
      }
    ).join('')).join('\n')
  }

  const parseUploaded = (e) => {
    e.preventDefault()
    if (!e.target.files.length) {
      console.error("No files uploaded")
      return 0
    }
    const reader = new FileReader()
    reader.onload = event => {
      const parsed = JSON.parse(reader.result)
      populateTrue = false

      setMaze(parsed.maze)
      setScale(parsed.scale)
    }
    reader.readAsText(e.target.files[0])
  }

  const UploadFile = useRef(null)

  return (
    <>
      <div className='view'>
        <MazeView style={MazeViewStyle}
                  grid={<Grid rows={gridArray} gridGuides={gridGuides} />}
                  Tools={Tools}
                  magnify={() => magnify(0.2)}
                  demagnify={() => magnify(-0.2)}
                  setCurrentTool={setCurrentTool} 
                  currentTool={currentTool}
                  ref={mazeRef}
                  />

        <div className='sidebar'>
          <SideBarItem icon={New} onClick={() => setNewWindowStatus(true)}/>
          <SideBarItem icon={Open} onClick={() => { UploadFile.current.click() }}/>
          <SideBarItem icon={Square} onClick={() => setDimensionDialog(true)}/>
          <SideBarItem icon={Save} onClick={() => setFilenameDialog(true)  }/>
          <SideBarItem icon={gridGuidesIcon} onClick={() => {setGridGuides(!gridGuides)}} />
          <SideBarItem icon={Maximize} onClick={() => mazeRef.current.openFullscreen() } />
          <SideBarItem icon={Undo} onClick={() => undo()} opt={!canUndo ? 'disabled' : ''}/>
          <SideBarItem icon={Redo} onClick={() => redo()} opt={!canRedo ? 'disabled' : ''}/>
          <SideBarItem icon={Random} onClick={() => {
            appendCurrentMazeToHistory()
            populateRandom()
          }}/>
          <SideBarItem icon={Checkmark} onClick={() => setExportDialog(true)} />


        </div>

      </div>
      
      <input type="file"
             style={{"width": 0, "position": "absolute"}}
             ref={UploadFile}
             onChange={(e) => parseUploaded(e) }>
      </input>

      {newWindowStatus ? <NewMazeDialog w={size.width} h={size.height} createNew={createNew} hide={() => hideDialog(setNewWindowStatus)} clearHistory={clearHistory} /> : (<></>) }

      {exportDialog ? <Export action={exportString} hide={() => hideDialog(setExportDialog)} /> : (<></>) }

      {dimensionDialog ? <Dimensions w={size.width} h={size.height}  setSize={setSize} fitDim={fitDim} hide={() => hideDialog(setDimensionDialog)} clearHistory={clearHistory} /> : (<></>) }

      {filenameDialog ? <Filename hide={() => hideDialog(setFilenameDialog)} action={(filename) => save(maze, size, scale, filename)} /> : (<></>) }
  

    </>
  );
}

export default App
