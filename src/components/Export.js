import { useState } from 'react'
import Darken from './Darken'


const Export = ({action, hide}) => {

    const [empty, setEmpty] = useState(' ')
    const [wall, setWall] = useState('#')
    const [a, setA] = useState('A')
    const [b, setB] = useState('B')
    const [exported, setExported] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!empty || !wall || !a || !b) {
          alert('Missing arguments.')
          return
        }
        let res = action(empty, wall, a, b)
        setExported(res)
    }


    return (
        <>
        <Darken />
        <form className='form-container expanded' onSubmit={onSubmit} >
            <div class='form-row compact'>
                <div className='form-control'>
                    <label>Empty</label>
                    <input type='text'
                        placeholder=" "
                        onChange={(e) => setEmpty(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>Wall</label>
                    <input type='text'
                        placeholder="#"
                        onChange={(e) => setWall(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>Start Point</label>
                    <input type='text'
                        placeholder="A"
                        onChange={(e) => setA(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>End Point</label>
                    <input type='text'
                        placeholder="B"
                        onChange={(e) => setB(e.target.value)}></input>
                </div>
            </div>
            <div className='form-row' style={{"justifyContent": "center"}}>
                <div className='form-control'>
                    <input type='submit' value='Export String' className='btn btn-brown' />
                </div>
                <div className='form-control'>
                    <button className='btn btn-red' onClick={() => hide()}>Cancel</button>
                </div>
            </div>
            {exported.length > 0 ? (
              <div className='form-control center'>
                   <textarea value={exported}>
                   </textarea>
              </div>
            ) : (<></>)}
        </form>
        </>
    )
}

export default Export