const timeLeft = document.querySelector("#time-left")

const displayResult = document.querySelector("#result")

const startPauseButton = document.querySelector("#start-pause-button")

const squares = document.querySelectorAll(".grid div")

const logsleft = document.querySelectorAll('.log-left')

const logsright = document.querySelectorAll('.log-right')

const carsleft = document.querySelectorAll('.car-left')

const carsright = document.querySelectorAll('.car-right')

let currentIndex = 76

let currentTime = 31

let timerId
const width = 9
function moveFrog(e) {

    squares[currentIndex].classList.remove('frog')
    console.log('moved')

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0)
                currentIndex -= 1
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1)
                currentIndex += 1
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0)
                currentIndex -= width

            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width)
                currentIndex += width
            break;
    }

    squares[currentIndex].classList.add('frog')


}




function autoMoveElements() {
    timeLeft.innerHTML = currentTime
    currentTime--
    logsleft.forEach(logleft => moveLogLeft(logleft))
    logsright.forEach(logRight => moveLogRight(logRight))
    carsleft.forEach(carleft => moveCarLeft(carleft))
    carsright.forEach(carright => moveCarRight(carright))

}

function winloose() {
    lose()
    win()
}

function moveLogLeft(logleft) {
    switch (true) {
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1')
            logleft.classList.add('l2')
            break
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2')
            logleft.classList.add('l3')
            break
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3')
            logleft.classList.add('l4')
            break
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4')
            logleft.classList.add('l5')
            break
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5')
            logleft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carleft) {
    switch (true) {
        case carleft.classList.contains('c1'):
            carleft.classList.remove('c1')
            carleft.classList.add('c2')
            break
        case carleft.classList.contains('c2'):
            carleft.classList.remove('c2')
            carleft.classList.add('c3')
            break
        case carleft.classList.contains('c3'):
            carleft.classList.remove('c3')
            carleft.classList.add('c1')
            break

    }
}
function moveCarRight(carright) {
    switch (true) {
        case carright.classList.contains('c1'):
            carright.classList.remove('c1')
            carright.classList.add('c3')
            break
        case carright.classList.contains('c2'):
            carright.classList.remove('c2')
            carright.classList.add('c1')
            break
        case carright.classList.contains('c3'):
            carright.classList.remove('c3')
            carright.classList.add('c2')
            break

    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        displayResult.innerHTML = 'you loose!'
        clearInterval(timerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')
    ) {
        displayResult.innerHTML = 'you win!'
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
        document.removeEventListener('keyup', moveFrog)

    } else {
        timerId = setInterval(autoMoveElements, 1000)
        document.addEventListener('keyup', moveFrog)

    }
})

// timerId = setInterval(autoMoveElements, 1000)

setInterval(winloose, 1)