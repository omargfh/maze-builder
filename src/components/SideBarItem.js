import React from 'react'

const SideBarItem = ({ icon, onClick }) => {
    return (
        <div className='item' onClick={onClick}>
            <img src={icon}></img>
        </div>
    )
}

export default SideBarItem
