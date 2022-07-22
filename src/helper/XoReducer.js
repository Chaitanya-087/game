import { winningCombinations } from "./states"

const XoReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case 'PLAYER_CHOICE':
            const updatedBoardState = state.boardState.map((element,index) => {
                if (element === '' && index === payload.index) return state.player
                return element
            })
            if (! state.isWin) return {...state,boardState:updatedBoardState}
            return state

        case 'SWAP_PLAYER':
            if (state.isWin) return state            
            return {...state,player:state.player === 'x' ? 'o' : 'x'}

        case 'CHECK_WIN':
            const isWin = winningCombinations.some((comb) => {
                return comb.every((index) => state.boardState[index] === state.player)
            })
            return {...state,isWin:isWin}

        case 'CHECK_DRAW':
            const isDraw = state.boardState.every((element) => element !== '')
            return {...state,isDraw}

        default:
            return state
    }
}

export default XoReducer