import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useXo } from "../helper/xoContext";
import { Link } from "react-router-dom";
import '../styles/xogrid.css';

const getStats = () => {
  const data = localStorage.getItem('stats')
  if(data){
    return JSON.parse(data)
  }
  else{
    return {
      human:0,
      cpu:0,
      ties:0
    }
  }
}

const XOGrid = () => {
  const {board,player,setBoard,winner,choicePlayer,ai,reset} = useXo()
  const [stats,setStats] = useState(getStats())

  const gameStep = (index) => {
    setBoard(index)
  }

  useEffect(() => {
    const changeStats = () => {
      if(winner === 'draw') setStats(prev => ({...prev,ties:prev.ties+1}))
      if(winner === player) setStats(prev => ({...prev,human:prev.human + 1}))
      if(winner === ai) setStats(prev => ({...prev,cpu:prev.cpu + 1}))
    }
    changeStats()
  },[winner,ai,player])
  useEffect(() => {
    localStorage.setItem('stats',JSON.stringify(stats))
  },[stats])
  return (
      <div className="game-container">
        <div className="game-control">
          <div className="g">
            <div className="pos x"></div>
            <div className="pos o"></div>
          </div>
          <div className="turn">{player} Turn</div>
          <button className="btn-reset" onClick={reset}>
          <img src="https://img.icons8.com/material-two-tone/20/000000/recurring-appointment.png" alt="reset-icon"/>
          </button>
        </div>
    <div className={"grid " + player}>
      {
        board.map((element,index) => {
          return <button key={index}  disabled={element && true} className={"element " + element} onClick={() => gameStep(index)}></button>
        })
      }
    </div>
    {
      choicePlayer === 'CPU' 
      &&
      <div className="stats-container">
        <div className="human-wins">
          <p className="type">{player}(you)</p>
          <p className="score">{stats.human}</p>
        </div>
        <div className="ties">
          <p className="type">ties</p>
          <p>{stats.ties}</p>
        </div>
        <div className="cpu-wins">
          <p className="type">{ai}(cpu)</p>
          <p className="score">{stats.cpu}</p>
        </div>
      </div>
    }
    {
      winner &&
    <div className="message-wrapper">
      <div className="win-message">
        <p className="msg">
        {
          winner === 'draw' ? 'draw' : `${winner} wins`
        }
        </p>
        <p className={"player-info"} style = {{color: 'rgb(53, 199, 192)' }} >
          {winner === 'draw' ? 'it was a draw' : `${winner} takes the round`}
        </p>
        <div className="btns-container">
          <Link className="quit" to="/">quit</Link>
          <button className="nextround" onClick={reset}>next round</button>
        </div>
      </div>
    </div>
    }
    </div>

  );

};

export default XOGrid;