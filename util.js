function solveFormula(formula, selfCellObject){

    let formComp=formula.split(" ");

    for(let i=0;i<formComp.length;i++){
        let comp=formComp[i];

        if(comp[0]>="A" && comp[0]<="Z"){
            let {rowId , colId} = getRowIdColIdFromAddress(comp);   
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            if (selfCellObject) {
                // push yourself in the childrens of formula Components cellObject
                cellObject.children.push(selfCellObject.name);
                // selfCellObject.parents.push(cellObject.name);
            }
            formula = formula.replace(comp , value);
        }
    }
    
    let computedValue=eval(formula);
    return computedValue;
}
function updateChildren(cellObject) {
    // {
    //     name:"A1",
    //     value:"100",
    //     formula:"",
    //     childrens:["B1",  "C1"]
    // }
    for (let i = 0; i < cellObject.children.length; i++) {
      let childrenName = cellObject.children[i];
      let { rowId, colId } = getRowIdColIdFromAddress(childrenName);
      let childrenCellObject = db[rowId][colId];
      // {
      //     name:"B1",
      //     value:"30",
      //     formula:"( A1 + A2 )",
      //     childrens:[]
      // }
      let newValue = solveFormula(childrenCellObject.formula);
      
      // ui update
      document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).textContent = newValue;
      // db update
      childrenCellObject.value = newValue;
      updateChildren(childrenCellObject);
    }
  }
  
//   function removeFormula(cellObject){
//     cellObject.formula = "";
//     for(let i=0 ; i<cellObject.parents.length ; i++){
//       let parentName = cellObject.parents[i];
//       let {rowId , colId} = getRowIdColIdFromAddress(parentName);
//       let parentCellObject = db[rowId][colId];
  
//       let updatedChildrens = parentCellObject.childrens.filter(function(children){
//         return children != cellObject.name;
//       })
  
//       parentCellObject.childrens = updatedChildrens;
//     }
//     cellObject.parents = [];
//   }
  

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
