// A tout les devs qui verront ca, désolé d'avance pour le code ignoble ci dessous =Q

let button = document.querySelector('.button-action')
let input = document.querySelector('.arraytext')
let nameNotation =document.querySelector('.playerNameNotation')
let totalMatch = 0
let totalWin = 0
let historicArray = []
let limit = 20
function splitFunction(text,limit){
    let tmp = text.split(/\r?\n|\r|\n/g)
    console.log("split by line " , tmp);
    
    tmp.forEach((element,i) => {
        const t = element.split('\t')
        let x = {}
        t.forEach((e,i)=>{
            if(i===6){
                let tmp =e.substring(0,nameNotation.value.length+4) 
                if(tmp.includes(nameNotation.value)){
                    totalWin+=1
                    x.win=true

                }
                else{
                    x.win=false

                    totalMatch +=1
                }
                
            }
            if(i===7){
                
                    x.set=nombreDeSets(e)

            setTimeout(() => {
                historicArray.push(x)
            }, 150);

            }
        })
    });
    console.log('====================================');
    console.log(totalWin, "nombre de win sur ", totalMatch , " matchs");
    console.log('====================================');
    return tmp
}
button.addEventListener('click',(e)=>{
    e.preventDefault()
    splitFunction(input.value);
    setTimeout(() => {
        displayResult(historicArray)
    }, 500);
})
function nombreDeSets(score) {
    score = score.replace(/[,]+/g, " ").trim();

    score = score.replace(/\([^)]*\)/g, "").trim();

    let sets = score.split(/\s+/).filter(set => !/^[A-Z]+$/.test(set));

    if(sets.length===1) return sets[0]
    return sets.length; 
}
function displayResult(array){
    let section = document.querySelector('.displayResults')
    let percent1 = document.querySelector('.percent')
    let percent2 = document.querySelector('.percent2')
    
    array.forEach((e,i)=>{
        let t = document.createElement('div')
        t.classList.add('pastille')
        t.innerHTML=e.set
        if(e.win){
            t.classList.add('green')
        }
        if(!e.win){
            t.classList.add('red')
        }
        section.appendChild(t)
    })
    document.querySelectorAll('.btn').forEach(e=>{
        e.style.display="flex"
    })
    document.querySelector('.result').style.display="flex"
    
document.querySelector('.refresh').addEventListener('click',()=>{
    location.reload();
})
    let y = displayAverageSet(getAverageSet(array))
    document.querySelector('.result').appendChild(calculPercentage(historicArray))
    document.querySelector('.form').remove()
}
document.querySelector('.copy').addEventListener("click", () => {
    const body = document.body;
            const range = document.createRange();
            range.selectNode(body);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            try {
                document.execCommand("copy");
            } catch (err) {
                console.error("Erreur lors de la copie :", err);
            }
            window.getSelection().removeAllRanges();
  });
function calculPercentage(array,limit){
    let l =0
    let w =0
    let container = document.createElement('div')
    array.forEach((e,i)=>{
        let x= document.createElement('div')
        if(e.win===false){
            x.innerHTML=0
            container.appendChild(x)
        }
        if(e.win===true){
            x.innerHTML=1
            container.appendChild(x)

        }

    })
    return container
}
function getAverageSet(entry){
    let output = {
        twoWin:{
            label:"Two set wins:",
            number:0
        },
        twoLose:{
            label:"Two set lose:",
            number:0
        },
        threeWin:{
            label:"Three set win:",
            number:0
        },
        threeLose:{
            label:"Three set lose:",
            number:0
        },
        fourWin:{
            label:"Four set win:",
            number:0
        },
        fourLose:{
            label:"Four set lose:",
            number:0
        },
        fiveWin:{
            label:"Five set win:",
            number:0
        },
        fiveLose:{
            label:"Five set lose:   ",
            number:0
        },

    }
    entry.forEach(e=>{
        if(e.win && e.set===2) output.twoWin.number+=1
        if(e.win===false && e.set===2) output.twoLose.number+=1
        if(e.win && e.set===3) output.threeWin.number+=1
        if(e.win===false && e.set===3) output.threeLose.number+=1
        if(e.win && e.set===4) output.fourWin.number+=1
        if(e.win===false && e.set===4) output.fourLose.number+=1
        if(e.win && e.set===5) output.fiveWin.number+=1
        if(e.win===false && e.set===5) output.fiveLose.number+=1
    })
    console.log('====================================');
    console.log(output);
    console.log('====================================');
    return output
    
}
function displayAverageSet (object){
    let container = document.createElement('div')
    Object.values(object).forEach(e=>{
        let y = document.createElement('div')
        y.classList.add('row')
        let number = document.createElement('div')
        let label = document.createElement('div')
        number.classList.add('number')
        label.classList.add('label__set')
        number.innerHTML = e.number
        label.innerHTML = e.label
        container.classList.add('container')
        y.appendChild(label)
        y.appendChild(number)
        container.appendChild(y)
    })
    return container
}