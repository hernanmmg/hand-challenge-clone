/* eslint-disable indent */
/**
👉 : moves the memory pointer to the next cell

👈 : moves the memory pointer to the previous cell

👆 : increment the memory cell at the current position

👇 : decreases the memory cell at the current position.

🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛

🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜

👊 : Display the current character represented by the ASCII code defined by the current position
*/

const MIN_CELL = 0
const MAX_CELL = 255

const clamp = value => {
    if (value > MAX_CELL) return MIN_CELL
    if (value < MIN_CELL) return MAX_CELL
    return value
}

const getNextIndex = (index, instructions) => {
    let fists = 1
    for (let i = index + 1; i < instructions.length; i++) {
        if (instructions[i] === '🤜') fists++
        if (instructions[i] === '🤛') fists--
        if (fists === 0) return i
    }
}

const getPrevIndex = (index, instructions) => {
    let fists = 1
    for (let i = index - 1; i >= 0; i++) {
        if (instructions[i] === '🤜') fists--
        if (instructions[i] === '🤛') fists++
        if (fists === 0) return i
    }
}

function translate (string) {
    const memory = [0] // array as memory

    let pointer = 0 // memory pointer
    let index = 0
    let output = ''

    // converting the emojis into a string
    const arrayOfEmojis = Array.from(string)

    const diccionary = {
        '👉': () => {
            pointer++
            memory[pointer] ??= 0
        },
        '👈': () => {
            pointer--
            memory[pointer] ??= 0
        },
        '👆': () => {
            memory[pointer] = clamp(memory[pointer] + 1)
        },
        '👇': () => {
            memory[pointer] = clamp(memory[pointer] - 1)
        },
        '🤜': () => {
            if (memory[pointer] === 0) {
                index = getNextIndex(index, arrayOfEmojis)
            }
        },
        '🤛': () => {
            if (memory[pointer] !== 0) {
                index = getPrevIndex(index, arrayOfEmojis)
            }
        },
        '👊': () => {
            output += String.fromCharCode(memory[pointer])
        }
    }

    while (index < arrayOfEmojis.length) {
        const action = arrayOfEmojis[index]
        diccionary[action]()
        index++
    }

    return output
}

console.log(translate('🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'))
console.log(translate('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊'))

module.exports = translate