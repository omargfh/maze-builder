import React, { useState } from 'react'
import Mag from '../assets/mag.png'
import DeMag from '../assets/demag.png'
import Eraser from '../assets/eraser.png'

import Item from './Item'

const Tools = ({ magnify, demagnify, setCurrentTool, currentTool }) => {
    const mag = <img src={Mag}></img>
    const demag = <img src={DeMag}></img>
    const eraser = <img src={Eraser} style={{"transform": "scale(0.5)"}}></img>

    const checkActive = () => {
      return ["wall", "empty", "steel steel-a", "steel steel-b"].map((e) => {
        if (e === currentTool) {
          return "selected"
        }
        else return ''
      })
    }
    const [pActive, eActive, aActive, bActive] = checkActive()


    return (
        <div className='tools'>

            <div className='set'>
              <Item component={mag} classes={''} onClick={magnify}/>
              <Item component={demag} classes={''} onClick={demagnify}/>
            </div>

            <div className='set'>
              <Item component={'+'}
                    classes={'bg bg-brick text plus ' + pActive} 
                    onClick={() => setCurrentTool("wall")} />

              <Item component={eraser}
                    classes={'bg bg-brick ' + eActive}
                    onClick={() => setCurrentTool("empty")}/>

              <Item component={'A'}
                    classes={'bg bg-steel text ' + aActive}
                    onClick={() => setCurrentTool("steel steel-a")}/>

              <Item component={'B'}
                    classes={'bg bg-steel text ' + bActive}
                    onClick={() => setCurrentTool("steel steel-b")}/>
            </div>

            <div className='set more'>
            <Item component={'>'}
                    classes={'bg bg-steel text '}/>
            </div>

          </div>
    )
}

export default Tools
