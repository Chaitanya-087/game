import React from "react";
import { useReducer } from "react";
import { initialState } from "../helper/states";
import XoReducer from "../helper/XoReducer";



const XOGrid = () => {
  const [state, dispatch] = useReducer(XoReducer, initialState);

  const gameProcess = (idx) => {
    dispatch({ type: 'PLAYER_CHOICE', payload: { index: idx } })
    dispatch({ type: 'CHECK_WIN' })
    dispatch({ type: 'SWAP_PLAYER' })
    dispatch({ type: 'CHECK_DRAW' })
  };

  return (
    <div className={"grid " + state.player}>
      {state.boardState.map((element, index) => (
        <div key={index} className={"element " + element} onClick={() => gameProcess(index)}></div>
      ))}
      {
        state.isWin && console.log(`${state.player} wins`)
      }
      {
        state.isDraw && console.log('draw')
      }
    </div>
  );
};

export default XOGrid;