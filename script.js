initCells();
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellsContentDiv.addEventListener("scroll" , function(e){ // to fix the top row if scrolled down and left-col if srolled sideways
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";  
})



let cell=document.querySelectorAll(".cell");
let addressBar=document.querySelector("#address"); 

addressBar.click(function(){return false;});
for(let i=0;i<cell.length;i++){
    cell[i].addEventListener('click', function(e){ // eventListener on click
        let rowid= Number(e.target.getAttribute("rowid")); //getting the rowid
        let colid= Number(e.target.getAttribute("colid"));

        let cellObject = db[rowid][colid];
        formulaInput.value = cellObject.formula;
        let row= String.fromCharCode(colid+65) + (rowid+1 );
        addressBar.value=row;
    })
    cell[i].addEventListener('blur',function(e){
        lastSelectedCell=e.target;
        let row=e.target.getAttribute("rowid");
        let col=e.target.getAttribute("colid");
        let cellContent=e.target.textContent;
        let val=db[row][col];
        if(cellContent==val.value){
            return;
        }
        val.value=cellContent;
        // console.log(db[row][col]);
    })
    
}
formulaInput.addEventListener("blur" , function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId , colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        let computedValue = solveFormula(formula);
        console.log(computedValue);
        // formula update
        cellObject.formula = formula;
        // cellObject value update
        cellObject.value = computedValue;
        // ui update
        lastSelectedCell.textContent = computedValue;
    }
})
