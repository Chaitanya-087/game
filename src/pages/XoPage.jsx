import React from 'react'
import '../styles/xopage.css'
import { useXo } from '../helper/xoContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const XOpage = () => {
  const { setPlayer, choice } = useXo()

  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(true)

  const handleChoice1 = () => {
    setActive1(true)
    setActive2(false)
    setPlayer('x')
  }
  const handleChoice2 = () => {
    setActive1(false)
    setActive2(true)
    setPlayer('o')
  }

  return (
    <div className='container'>
      <div className='top'>
        <div className='x-wrapper'>
          <div className='x'></div>
        </div>
        <div className='o-wrapper'>
          <div className='o'></div>
        </div>
      </div>
      <div className='middle'>
        <h3 className="title">
          pick player 1's mark
        </h3>
        <div className='picker'>
          <div className={`choice-1 ${active1 && 'active'}`} onClick={handleChoice1}>
            <div className='x'></div>
          </div>
          <div className={`choice-2 ${active2 && 'active'}`} onClick={handleChoice2}>
            <div className='o'></div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <Link to='/xo' >
          <button className='btn-vsplayer' onClick={() => choice('PLAYER')}>new game (vs player)</button>
        </Link>
        <Link to='/xo'>
          <button className='btn-cpu' onClick={() => choice("CPU")}>new game (vs cpu)</button>
        </Link>
      </div>
    </div>
  )
}

export default XOpage