let cellsContentDiv = document.querySelector(".cells-content");
function initCells(){
    let cellsContent = "<div class='top-left-cell'></div>";
    cellsContent += "<div class='top-row'>"
    for(let i=0 ; i<26 ; i++){
        cellsContent += `<div class='top-row-cell'>${String.fromCharCode(65+i)}</div>`
    }
    cellsContent += "</div>"

    cellsContent += "<div class='left-col'>"
    for(let i=0 ; i<100 ; i++){
        cellsContent += `<div class="left-col-cell">${i+1}</div>`
    }
    cellsContent += "</div>"
    cellsContent += "<div class='cells'>"
    for(let i=0 ; i<100 ; i++){
        cellsContent += "<div class='row'>"
        for(let j=0 ; j<26 ; j++){
            cellsContent += `<div class='cell' rowid='${i}' colid='${j}' contentEditable='true'></div>`
        }
        cellsContent += "</div>"
    }
    cellsContent += "</div>"
    cellsContentDiv.innerHTML = cellsContent;    
}

let db;
function inDB(){
    db=[];
    for(let i=0;i<100;i++){
        let p=[];
        for(let j=0;j<26;j++){
            let name= String.fromCharCode(j+65)+(i+1)+"";
            let object1={
                "name":name,
                "value":"",
                "formula":"",
                "children":[],
                "parents":[]
            }
            p.push(object1);
        }
        db.push(p);
    }
}
inDB(); 