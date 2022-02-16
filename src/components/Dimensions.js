import { useState } from 'react'
import Darken from './Darken'


const Dimensions = ({w, h, setSize, fitDim, hide, clearHistory}) => {

    const [width, setWidth] = useState(w)
    const [height, setHeight] = useState(h)

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
    
        setSize({height: height, width: width})


        clearHistory()
        hide()
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
                        onChange={(e) => setWidth(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>Height</label>
                    <input type='text'
                        placeholder={h}
                        onChange={(e) => setHeight(e.target.value)}></input>
                </div>
            </div>
            <div className='form-row' style={{"justifyContent": "center"}}>
                <div className='form-control'>
                    <input type='submit' value='Change Size' className='btn btn-brown' />
                </div>
                <div className='form-control'>
                    <button className='btn btn-red' onClick={() => hide()}>Cancel</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default Dimensions