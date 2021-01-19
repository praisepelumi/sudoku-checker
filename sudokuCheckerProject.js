let puzzle = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 2,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,4,6,3,2,5,8,1,9 ],
              [ 3,2,8,1,9,6,5,4,7 ]];


sudokuIsValid(puzzle);

sudokuIsValid(puzzle);


function getRow (sudokuGrid, rowIdx) {
    /* function should return an array containing
    numbers in the specified row */

    for (let i = 0; i < sudokuGrid.length; i++) {
        if (i === rowIdx) {
            return sudokuGrid[rowIdx];
        }
    }
    
}

function getColumn (sudokuGrid, columnIdx) {
    /* function should return an array containg
    the numbers in the specified column*/
    let columnToReturn = [];

    for (let i = 0; i < sudokuGrid.length; i++) {
        let curArray = sudokuGrid[i];
        if (Array.isArray(curArray)) {
            columnToReturn.push(curArray[columnIdx])
        }
        
    }
    return columnToReturn;
}

function getSection (sudokuGrid, x, y) {
    /* returns an array with all the numbers in the
    specified subgrid*/
    let finalSubGrid = [];
    let temporaryGrid = [];

    // write a function that takes y and develops the grid instead of hard coding 
    function subGridGenerator (value) {
        for (let i = value * 3; i < (value * 3) + 3; i++) {
            let curArray = sudokuGrid[i];
            temporaryGrid.push(curArray)
        }
    
        for (let j = 0; j < temporaryGrid.length; j++) {
            let curArray2 = temporaryGrid[j];
            let startIdx = x * 3
            let endIdx = startIdx + 3
            let finalArray = curArray2.slice(startIdx, endIdx);
            finalSubGrid = finalSubGrid.concat(...finalArray)
        }
        return finalSubGrid;
    }
    return subGridGenerator(y); 

}

/* write a fucntion that accepts a subsection 
and checks if it includes 1-9 with no repeats */


function includes1to9 (subsection) {
    let totalAmountNum = ""

    let numChecker = [1,2,3,4,5,6,7,8,9];

    for (let i = 0; i < subsection.length; i++) {
        let curNum = subsection[i];

        if (subsection.indexOf(curNum) === subsection.lastIndexOf(curNum) && numChecker.includes(curNum)) {
            totalAmountNum += curNum;
        }
    }

    if (totalAmountNum.length === 9) {
        return true;
    }

    else {
        return false;
    }
}

function sudokuIsValid(grid) {
    // we are adding 27 arrays to the checks array via the getRow, getColumn and getSection 
    // running all the functions for every single number between 0 and 8. 
    let checks = []

    for (let i = 0; i < grid.length; i++) {
        checks.push(getRow(grid, i));
        checks.push(getColumn(grid, i));
    }

    let a = 0;
    let b = 0;

    for (let k = 0; k < grid.length; k++) {

        if (k > 2 && k < 5) {
            b = 1
        }
        if (k > 4 && k < 9) {
            b = 2
        }

        checks.push(getSection(grid,a,b));
        a++;
        if (a > 2) {
            a = 0;
        }
    }

    // Now loop through all the arrays in your checks array
    for (let l = 0; l < checks.length; l++) {
        if (!includes1to9(checks[l])) {
            return false;
        }
    
    }
    return true;
}



console.log(sudokuIsValid(puzzle))



