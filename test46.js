function parseTabulatedTextToTable(rawText) {
    return rawText
      .trim()                           // Supprimer les espaces ou retours en début/fin
      .split('\n')                      // Séparer par lignes
      .map(line => line.split('\t'));  // Séparer chaque ligne en colonnes
  }
  
  function extractDifference(text) {
    const match = text.match(/^(\d+)\s*\/\s*(\d+)$/);
    
    if (match) {
      const num = parseInt(match[1], 10);
      const denom = parseInt(match[2], 10);
      console.log('====================================');
      console.log("denom",denom);
      console.log("num",num);
      console.log('====================================');
      return denom - num;
    }
    return null; // ou 0 selon ton besoin
  }
  function Getsumm(tableau){
    let somme = 0
    tableau.map((e)=>{
        somme= Number(somme)+Number(e)
    })
    return somme
  }
  function extractNumerator(text) {
    const match = text.match(/^(\d+)\s*\/\s*\d+$/);
    return match ? parseInt(match[1], 10) : null;
  }
  function extractGameCounts(input) {
    // Supprime le contenu entre parenthèses
    const cleanedInput = input.replace(/\(.*?\)/g, '');
    
    // Divise les scores par espace (un score pour chaque set)
    const sets = cleanedInput.split(' ');
  
    // Initialiser les compteurs de jeux gagnés pour chaque joueur
    let playerA = 0;
    let playerB = 0;
  
    // Pour chaque set, récupère les jeux gagnés pour chaque joueur
    sets.forEach(set => {
      const scores = set.split('-');
      if (scores.length === 2) {
        const scoreA = parseInt(scores[0]);
        const scoreB = parseInt(scores[1]);
        playerA += scoreA;  // Compte les jeux gagnés par le joueur A
        playerB += scoreB;  // Compte les jeux gagnés par le joueur B
      }
    });
  
    return { playerA, playerB };
  }
function bpSaveList (){
    console.log(document.querySelector('.arraytextbps').value);
    
    let tmp = parseTabulatedTextToTable(document.querySelector('.arraytextbps').value)
    let end = []
    
    tmp.map((e,index)=>{
        e.map((x,i)=>{
          
            if(i===15)
              
            end.push(extractDifference(x))
            
        })
        
        
    })

    return end
    
}
function bpConvList (){
    let tmp = parseTabulatedTextToTable(document.querySelector('.arraytextbpc').value)
    let end = []
    
    tmp.map((e,index)=>{
        e.map((x,i)=>{
            if(i===15)
            end.push(extractNumerator(x))
            
        })
    })
    
    return end
    
}
function getNbGame(){
   let tmp = parseTabulatedTextToTable(document.querySelector('.arraytextbpc').value)
    let tableau =[]
    tmp.map((e,index)=>{
        
        tableau.push(extractGameCounts(e[7]))
  }  )
  return tableau
}


function breakPercentage(){
    const numberGames= getNbGame()
    const bpslist= bpSaveList()
    let table = []
    bpConvList().map((bpcMatch,i)=>{
        table.push((Number(bpcMatch)/(Number(numberGames[i].playerB)-Number(bpslist[i])+Number(bpcMatch))))
    })
    const columnText = table.join('\n');
    navigator.clipboard.writeText(columnText);
    console.log(columnText);
    
    return columnText
    
}
document.querySelector('.button-actionBPC').addEventListener("click",()=>{
   breakPercentage()
})

function holdPercentage(){
    const numberGames= getNbGame()
    const bpslist= bpSaveList()
    
    let table = []
    bpConvList().map((bpcMatch,i)=>{
        table.push((Number(numberGames[i].playerA)-Number(bpcMatch))/((Number(numberGames[i].playerA)-Number(bpcMatch))+bpslist[i]))
    })
    const columnText = table.join('\n');
    navigator.clipboard.writeText(columnText);
    console.log(columnText);
    
    return columnText
}
document.querySelector('.button-actionBPS').addEventListener("click",()=>{
    
    holdPercentage()
})