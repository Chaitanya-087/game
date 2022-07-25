import { createContext, useContext, useEffect, useReducer } from "react"
import XoReducer from './XoReducer'
import { winningCombinations } from "./states"
import { initialState } from "./states"

const XoContext = createContext(initialState)
const getStateLocalStorage = () => {
    const data = localStorage.getItem('state')
    if (data) {
        return { ...initialState, ...JSON.parse(data) }
    }
    else {
        return initialState
    }
}

const XoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(XoReducer, getStateLocalStorage());

    const setPlayer = (player) => {
        dispatch({ type: 'SET_PLAYER', payload: { player } })
    }

    const setBoard = (index) => {
        const newBoard = state.board.map((element, i) => {
            if (element === '' && index === i) return state.player
            return element
        })    
        //update board   
        if (!state.winner) {
            dispatch({ type: 'SET_BOARD', payload: {board:newBoard} })
        }
        //check winner 
        if (state.choicePlayer === 'CPU' && !state.winner) {
            cpuTurn(newBoard)
        }
        // change player object in player mode
        if (state.choicePlayer === 'PLAYER') {
            const nextPlayer = state.player === 'x' ? 'o' : 'x'
            dispatch({ type: 'SET_PLAYER', payload: { player: nextPlayer } })
        }
    }
    const reset = () => {
        dispatch({ type: 'RESET' ,payload:{state:{...state,board:Array(9).fill('')}}})
    }
    useEffect(() => {
        dispatch({type:'SET_WINNER',payload:{winner:checkWinner(state.board)}})
    },[state.board])

    const checkWinner = (board) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }
        const draw = board.every(element => element !== '')
        if (draw) return 'draw'
    }

    const cpuTurn = (board) => {
        let bestScore = -Infinity
        let bestMove
        for (let i = 0; i < board.length; i++) {
            if (board[i] === ''){
                board[i] = state.ai
                let score = minimax(board, 0, false)
                board[i] = ''
                if (score > bestScore) {
                    bestScore = score
                    bestMove = i
                }
            }
        }

        const newBoard = board.map((element,index) => {
            if (index === bestMove) return state.ai
            return element
        })
        dispatch({ type: 'SET_BOARD', payload: {board:newBoard} })
    }

    const choice = (value) => {
        reset()
        dispatch({ type: 'SET_CHOICE', payload: { choice: value } })
        if (value === 'CPU'){
            const ai = state.player === 'x'?'o':'x'
            dispatch({ type: 'SET_AI', payload: { ai } })
        }
    }

    const minimax = (board,depth,isMaximizing) => {
        const res = checkWinner(board)
        if (res !== '') {
            if (res === 'draw') return 0
            if (res === state.ai) return 10
            if (res === state.player) return -10
        }
        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === ''){
                    board[i] = state.ai
                    let score = minimax(board,depth+1,false)
                    board[i] = ''
                    bestScore = Math.max(bestScore,score)
                }
            }
            return bestScore
        }
        else {
            let bestScore = Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === ''){
                    board[i] = state.player
                    let score = minimax(board,depth+1,true)
                    board[i] = ''
                    bestScore = Math.min(bestScore,score)
                }
            }
            return bestScore
        }
    }

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify({ player: state.player, ai: state.ai, choicePlayer: state.choicePlayer }))
    }, [state])

    const value = {
        player: state.player,
        board: state.board,
        winner: state.winner,
        choicePlayer:state.choicePlayer,
        ai:state.ai,
        reset,
        choice,
        setPlayer,
        setBoard,
        cpuTurn,
    }
    return <XoContext.Provider value={value}>{children}</XoContext.Provider>
}

const useXo = () => {
    const context = useContext(XoContext);

    if (!context) {
        throw new Error("useXo must be used within a XoContextProvider")
    }
    return context
}


export { XoContextProvider, useXo }