const XoReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case 'SET_PLAYER':
            return {...state,player:payload.player}
        case 'SET_AI':
            return {...state,ai:payload.ai}
        case 'SET_BOARD':
            return {...state,board:payload.board}
        case 'SET_WINNER':
            return {...state,winner:payload.winner}
        case 'SET_CHOICE':
            return {...state,choicePlayer:payload.choice}
        case 'RESET':
            return {...state,...payload.state}
        default:
            return state
    }

}



// const playerMove = (board,index,player) => {
//     const newBoard = board.map((element,i) => {
//         if (element === '' && index === i) return player
//         return element
//     })
//     return newBoard
// }
    
// const cpuTurn = (board,ai,player) => {
//     let bestScore = -Infinity
//     let bestMove
//     for (let i = 0; i < board.length; i++) {
//         if (board[i] === '') {
//             board[i] = ai
//             let score = minmax(board, 0, false,ai,player)
//             board[i] = ''
//             if (score > bestScore) {
//                 bestScore = score
//                 bestMove = i
//             }
//         }
//     }
//     const newBoard = board.map((element,i) => {
//         if (i === bestMove) return ai
//         return element
//     })
//     return newBoard
// }

// const checkWinner = (board) => {
//     for (let i = 0; i < winningCombinations.length; i++) {
//         const [a, b, c] = winningCombinations[i]
//         if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
//             return board[a]
//         }
//     }

//     const draw = board.every(element => element !== '')
//     if (draw) return 'draw'

// }

// const minmax = (board, depth, isMaximizing,ai,player) => {
//     let result = checkWinner(board)
//     if (result !== '') return score[result]
//     if (isMaximizing) {
//         let bestScore = -Infinity
//         for (let i = 0; i < board.length; i++) {
//             if (board[i] === '') {
//                 board[i] = ai
//                 let score = minmax(board, depth + 1, false,ai,player)
//                 board[i] = ''
//                 bestScore = Math.max(bestScore, score)
//             }
//         }
//         return bestScore
//     }
//     else {
//         let bestScore = Infinity
//         for (let i = 0; i < board.length; i++) {
//             if (board[i] === '') {
//                 board[i] = player
//                 let score = minmax(board, depth + 1, true,ai,player)
//                 board[i] = ''
//                 bestScore = Math.min(bestScore, score)
//             }
//         }
//         return bestScore
//     }
// }

export default XoReducer