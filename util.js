function solveFormula(formula){

    let formComp=formula.split(" ");

    for(let i=0;i<formComp.length;i++){
        let comp=formComp[i];

        if(comp[0]>="A" && comp[0]<="Z"){
            let {rowId , colId} = getRowIdColIdFromAddress(comp);   
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            formula = formula.replace(comp , value);
        }
    }
    let computedValue=eval(formula);
    return computedValue;
}


function getRowIdColIdFromElement(element){
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId , colId
    }
}

function getRowIdColIdFromAddress(address){
    // B22 => colid,rowId
    // B => 1
    let rowId = Number(address.substring(1)) - 1;
    let colId = address.charCodeAt(0) - 65;
    return {
        rowId , colId
    }
}
