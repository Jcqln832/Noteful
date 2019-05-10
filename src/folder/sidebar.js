import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SideBar extends Component () {
    render() {
        
    return (
       <div className='Nav'>    
        <Link to='/'>
            Home
        </Link>

        <Link to='/about'>
            About
        </Link>

        <Link to='/workouts'>
            Workouts
        </Link>
        </div>

     )
   }
}