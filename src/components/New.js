import { useState } from 'react'
import Darken from './Darken'


const New = ({w, h, createNew, hide, clearHistory}) => {

    const [width, setWidth] = useState(w)
    const [height, setHeight] = useState(h)
    const [random, setRandom] = useState(true)
    const [showGrids, setShowGrids] = useState(true)

    const updateWidth = (w) => {
        setWidth(w)
    }

    const updateHeight = (h) => {
        setHeight(h)
    }

    const toggleRandom = () => {
        setRandom(!random)
    }

    const toggleGrid = () => {
        setShowGrids(!showGrids)
    }

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!width) {
          alert('Please add a width')
          return
        }

        if (!height) {
            alert('Please add a height')
            return
        }
    
        createNew(width, height, random, showGrids)
        clearHistory()
    }


    return (
        <>
        <Darken />
        <form className='form-container' onSubmit={onSubmit} >
            <div className='form-row'>
                <div className='form-control'>
                    <label>Width</label>
                    <input type='text'
                        placeholder={w}
                        onChange={(e) => updateWidth(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>Height</label>
                    <input type='text'
                        placeholder={h}
                        onChange={(e) => updateHeight(e.target.value)}></input>
                </div>
            </div>
            <div className='form-row' style={{"display": "block"}}>
                <div className='form-control form-control-check'>
                    <input
                    type='checkbox'
                    checked={random}
                    value={random}
                    onChange={() => toggleRandom()}
                    />
                    <label className='checkbox'>
                        Random
                    </label>
                </div>
                <div className='form-control form-control-check'>
                    <input
                    type='checkbox'
                    checked={showGrids}
                    onChange={() => toggleGrid()}
                    />
                    <label className='checkbox'>Show Grid Guides</label>
                </div>
            </div>
            <div className='form-row' style={{"justifyContent": "center"}}>
                <div className='form-control'>
                    <input type='submit' value='Create New' className='btn btn-brown' />
                </div>
                <div className='form-control'>
                    <button className='btn btn-red' onClick={() => hide()}>Cancel</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default New
