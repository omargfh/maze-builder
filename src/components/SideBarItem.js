import React from 'react'

const SideBarItem = ({ icon, onClick, opt }) => {
    if (opt === undefined) opt = ''
    return (
        <div className={'item ' + opt} onClick={onClick}>
            <img src={icon}></img>
        </div>
    )
}

export default SideBarItem
