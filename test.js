
let button = document.querySelector('.button-action')
let input = document.querySelector('.arraytext')
let nameNotation =document.querySelector('.playerNameNotation')
let totalMatch = 0
let totalWin = 0
let historicArray = []
let limit = 10
document.querySelector('.refresh').addEventListener('click',()=>{
    location.reload();
})
function splitFunction(text,limit){
    let tmp = text.split(/\r?\n|\r|\n/g)
    console.log("split by line " , tmp);
    
    tmp.forEach((element,i) => {
        if(i>9) return
        const t = element.split('\t')
        let x = {}
        t.forEach((e,i)=>{
            if(i===6){
                let tmp =e.substring(0,nameNotation.value.length+3) 
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
    console.log('====================================');
    console.log(input.value);
    console.log('====================================');
    splitFunction(input.value);
    setTimeout(() => {
        displayResult(historicArray)
    }, 500);
})
function nombreDeSets(score) {
    score = score.replace(/[,]+/g, " ").trim();

    score = score.replace(/\([^)]*\)/g, "").trim();

    let sets = score.split(/\s+/).filter(set => !/^[A-Z]+$/.test(set));

    return sets.length; s
}
function displayResult(array){
    let section = document.querySelector('.displayResults')
    let percent1 = document.querySelector('.percent')
    let percent2 = document.querySelector('.percent2')

    array.forEach((e,i)=>{
        let t = document.createElement('div')
        t.classList.add('pastille')
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        t.innerHTML=e.set
        if(e.win){
            t.classList.add('green')
        }
        if(!e.win){
            t.classList.add('red')
        }
        section.appendChild(t)
    })
    percent1.innerHTML = calculPercentage(historicArray,5) 
    percent2.innerHTML = calculPercentage(historicArray,10) 

}
function calculPercentage(array,limit){
    let l =0
    let w =0
    array.forEach((e,i)=>{
        if(i>limit-1) return
        if(e.win===false){
            l+=1
        }
        if(e.win===true){
            w+=1
        }

    })
    console.log(l);
    console.log(w);
    
    return (w/(w+l))
}