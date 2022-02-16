import { useState, useEffect } from 'react'
import Darken from './Darken'


const Filename = ({action, hide}) => {

    const [filename, setFilename] = useState("maze")

    const onSubmit = (e) => {
        e.preventDefault()

        action(filename)
        hide()
    }

    return (
        <>
        <Darken />
        <form className='form-container expanded' onSubmit={onSubmit} >
            <div class='form-row'>
                <div className='form-control' style={{"display": 'flex',
            "justifyContent": "center", "alignItems": "center", "width": "100%"}}>
                    <label style={{"margin-right": "1rem"}}>Filename:</label>
                    <input type='text'
                        placeholder=" "
                        onChange={(e) => setFilename(e.target.value)}></input>
                </div>
            </div>
            <div className='form-row' style={{"justifyContent": "center"}}>
                <div className='form-control'>
                    <input type='submit' value='Save File' className='btn btn-brown' />
                </div>
                <div className='form-control'>
                    <button className='btn btn-red' onClick={() => hide()}>Cancel</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default Filename
