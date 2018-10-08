
/**
 * Simple tic-tac-toe game example. 
 */
const game = (function () {

  const cellElements = [
    document.getElementById('upper-left'),
    document.getElementById('upper-mid'),
    document.getElementById('upper-right'),
    document.getElementById('center-left'),
    document.getElementById('center-mid'),
    document.getElementById('center-right'),
    document.getElementById('lower-left'),
    document.getElementById('lower-mid'),
    document.getElementById('lower-right')
  ]

  let status = [

  ]
  status[8] = undefined

  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].addEventListener('click', async function () {

      // add player's X
      const isValidMove = await addX(cellElements[i]);
      status[i] = 'X'
      let winner = getWinner()
      if(winner){
        setTimeout(function(){
          alert(winner + "won")
          window.location.reload()
        }, 1)
      }

      if (isValidMove) {

        // choose computer's O
        const j = await findBestMove(cellElements);

        // pause, then add computer's O
        await new Promise((resolve) => setTimeout(() => resolve(), 150));
        await addO(cellElements[j]);
        status[j] = "Y"
        winner = getWinner()
        if(winner){
          setTimeout(function(){
            alert(winner + "won")
            window.location.reload()
          }, 1)
        }
  
      }

    });
  }

  async function findBestMove(arr) {
    for (let n = 0; n < arr.length; n++) {
      if (arr[n].childElementCount === 0) {
        return n;
      }
    }
  }

  async function addX(cellElement) {
    if (cellElement.childElementCount === 1) { return false; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("X");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
    return true;
  }

  async function addO(cellElement) {
    if (cellElement.childElementCount === 1) { return; }
    const headingElement = document.createElement("h1");
    const textNode = document.createTextNode("O");
    headingElement.appendChild(textNode);
    cellElement.appendChild(headingElement);
  }

  
  function getWinner(){
    let twodArray = [
        status.slice(0,3),
        status.slice(3,6),
        status.slice(6,9)
    ]

    for(row of twodArray){
      let prevelement = ''
      let count = 0
      for(col of row){
        if(col === prevelement){
          count += 1
        }
        prevelement = col
      }
      if(count === 2){
        return prevelement
      }
    }

    for(col of [0,1,2]){
      let prevelement = ''
      let count = 0
      for(row of [0,1,2]){
        if(twodArray[row][col] === prevelement){
          count += 1
        }
        prevelement = twodArray[row][col]
      }
      if(count === 2){
        return twodArray[row][col]
      }
    }
    return false
  }
})();