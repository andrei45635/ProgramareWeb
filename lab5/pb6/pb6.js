const puzzleContainer = $('#puzzle');

let puzzle = [];
let size = 3; // 3 x 3 grid

playGame();

function playGame() {
    generatePuzzle();
    randomizePuzzle();
    renderPuzzle();
    handleInput();
}

function getRow(pos) {
    return Math.ceil(pos / size);
}

function getColumn(pos) {
    let column = pos % size;
    if (column === 0) {
        return size;
    }
    return column;
}

function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
        puzzle.push({
            value: i,
            position: i,
            x: (getColumn(i) - 1) * Math.ceil(600 / size),
            y: (getRow(i) - 1) * Math.ceil(600 / size),
            disabled: false,
        });
    }
}

function renderPuzzle() {
    $(puzzleContainer).html('');
    for (let pz of puzzle) {
        console.log('in for')
        if (pz.disabled === true){
            console.log(pz, 'hidden');
            continue;
        }
        const puzzleItem = $('<div>').attr('id', 'puzzleItem')
            .css('left', pz.x + 'px')
            .css('top', pz.y + 'px')
            .text(pz.value);
        $(puzzleContainer).append(puzzleItem);
        console.log('out of for')
    }
}

function generateRandoms(size) {
    const numbers = [];
    for (let i = 1; i <= size * size; i++) {
        numbers.push(i);
    }
    return numbers.sort(() => Math.random() - 0.5);
}

function randomizePuzzle() {
    const randoms = generateRandoms(size);
    let i = 0;
    $.each(puzzle, function (index, pz) {
        pz.value = randoms[i];
        i++;
    });
    /*const hiddenPiece = $(puzzle).find(function (item) {
        return item.value === size * size;
    });
    console.log(hiddenPiece)
    hiddenPiece.disabled = true;*/
    const hiddenPiece = puzzle.find((item) => item.value === size * size);
    hiddenPiece.disabled = true;
}

function handleKeydown(o) {
    console.log(o.key);
    switch (o.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }
    renderPuzzle();
}

function swapPieces(firstPiece, secondPiece, isX = false) {
    let temp = firstPiece.position;
    firstPiece.position = secondPiece.position;
    secondPiece.position = temp;

    if (isX) {
        temp = firstPiece.x;
        firstPiece.x = secondPiece.x;
        secondPiece.x = temp;
    } else {
        temp = firstPiece.y;
        firstPiece.y = secondPiece.y;
        secondPiece.y = temp;
    }
}

function moveLeft() {
    const emptyPiece = getEmptyPiece();
    const rightPiece = getRightPiece();
    if (rightPiece) {
        swapPieces(emptyPiece, rightPiece, true);
    }
}

function moveRight() {
    const emptyPiece = getEmptyPiece();
    const leftPiece = getLeftPiece();
    if (leftPiece) {
        swapPieces(emptyPiece, leftPiece, true);
    }
}

function moveUp() {
    const emptyPiece = getEmptyPiece();
    const downPiece = getDownPiece();
    if (downPiece) {
        swapPieces(emptyPiece, downPiece, false);
    }
}

function moveDown() {
    const emptyPiece = getEmptyPiece();
    const upperPiece = getUpPiece();
    if (upperPiece) {
        swapPieces(emptyPiece, upperPiece, false);
    }
}

function getEmptyPiece() {
    return $().grep(puzzle, function (item) {
        item.disabled;
    });
}

function getPuzzleByPosition(pos) {
    return $().grep(puzzle, function (item) {
        return item.position === pos;
    });
}

function getRightPiece() {
    const emptyPuzzle = getEmptyPiece();
    //checking if the hidden piece is on the right edge
    if (getColumn(emptyPuzzle.position) === size) {
        return null;
    }
    return getPuzzleByPosition(emptyPuzzle.position + 1);
}

function getLeftPiece() {
    const emptyPuzzle = getEmptyPiece();
    //checking if the hidden piece is on the left edge
    if (getColumn(emptyPuzzle.position) === 1) {
        return null;
    }
    return getPuzzleByPosition(emptyPuzzle.position - 1);
}

function getUpPiece() {
    const emptyPuzzle = getEmptyPiece();
    //checking if the hidden piece is on the upper edge
    if (getRow(emptyPuzzle.position) === 1) {
        return null;
    }
    return getPuzzleByPosition(emptyPuzzle.position - size);
}

function getDownPiece() {
    const emptyPuzzle = getEmptyPiece();
    //checking if the hidden piece is on the lower edge
    if (getRow(emptyPuzzle.position) === size) {
        return null;
    }
    return getPuzzleByPosition(emptyPuzzle.position + size);
}

function handleInput() {
    $(document).on('keydown', handleKeydown);
}