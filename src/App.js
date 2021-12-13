import './App.css';

import Block from './components/Block'
import Row from './components/Row'
import Grid from './components/Grid'
import MazeView from './components/MazeView';

import SideBarItem from './components/SideBarItem';

import New from './assets/new-page.png'
import Checkmark from './assets/checkmark.png'
import Maximize from './assets/maximize.png'
import Random from './assets/random.png'
import Square from './assets/square-measument.png'



import { useState, useEffect } from 'react'

function App() {
  const [size, setSize] = useState({
    width: 15,
    height: 8
  })

  const defaultDimensions = 85

  const [dimensions, setDimensions] = useState(defaultDimensions)
  const [scale, setScale] = useState(1)
  const [MazeViewStyle, setMazeViewStyle] = useState(String())
  const [maze, setMaze] = useState([])

  const [globalW, globalH] = [window.innerWidth * 0.9 - 35, window.innerHeight * 0.85]

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

    // Initialize maze space
    initializeMazeSpace(size.height, size.width)
    populateRandom()
  }

  // Populates the maze in the right dimensions
  // only when a new maze is loaded
  useEffect(() => {
    populateArea()
  }, [])

  // Updates the dimensions based on scale
  useEffect (() => {
    setDimensions(defaultDimensions * scale)
  }, [scale])

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

  const updateMaze = (i, j, blockState) => {
    if (maze.length === 0) {
      initializeMazeSpace(size.height, size.width)
    }
    setMaze(maze.map((row, a) => 
        i === a ? (row.map((block, b) => b === j ? blockState : block)) : row
      )
    )
  }

  const populateRandom = (height = size.height, width = size.width) => {
    const classes = ["empty", "wall", "steel"]
    setMaze(maze.map((row) => {
      return (row.map((block) => {
        return classes[Math.floor(Math.random() * 3)]
      })
    )}))
  }

  const [gridArray, setGridArray] = useState([])
  const renderMaze = () => {
    let grid = []
    for (let i = 0; i < maze.length; i++) {
        let row = []
        for (let j = 0; j < size.width; j++) {
            row.push(<Block key={size.width * i + j} inheritedType={maze[i][j]} dimensions={defaultDimensions * scale} />)
        }
        grid.push(<Row key={i} columns={row}/>) 
    }
    setGridArray(grid)
  }
  
  useEffect(() => {
    renderMaze()
  }, [maze, scale])
  
  return (
    <>
      <div className='view'>
        <MazeView style={MazeViewStyle} grid={<Grid rows={gridArray} />}/>
        <div className='sidebar'>
          <SideBarItem icon={New} onClick={() => {
            updateMaze(0,0,"steel")
          }}/>
          <SideBarItem icon={Square} onClick={() => console.log(maze)}/>
          <SideBarItem icon={Maximize} onClick={() => setScale(0.5)} />
          <SideBarItem icon={Random} onClick={() => populateRandom()}/>
          <SideBarItem icon={Checkmark} />
        </div>
      </div>
    </>
  );
}

export default App
