let detaildiv = document.createElement("details")
detaildiv.className = "dropit"

let jokeques = document.createElement("summary")
jokeques.className = "joke"

let punchjoke = document.createElement("punchline")
punchjoke.className = "punchline"


let replay = document.getElementById("play")

//mapping replay button to reload/refresh the page
replay.addEventListener("click", () => {
    location.reload()
}
)
replay.style.display = "none"

//function to make the repaly button reappear
async function appear() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            replay.style.display = "block"
        }, 200);
        resolve()
    })
}


//function to fetch ten random jokes
async function getjoke() {
    let x = await fetch("https://official-joke-api.appspot.com/jokes/ten")
    let data = await x.json()
    return data
};

//function to iterate and randomly pick a joke(object) from the array of jokes
function randomchooser(arr) {
    let rand = Math.floor(Math.random() * arr.length)
    let count = 0;
    for (const element of arr) {
        if (count == rand) {
            let final = element;
            return final;
        }
        count++

    }
}


(async function main() {
    replay.before(detaildiv)
    let jokes = await getjoke() //joke is an array of ten random fetched jokes in the form objects each

    //choosing a random joke from the array of ten fetched jokes
    let joke = randomchooser(jokes)

    //destructuring joke object to extract setup and punchline in different variables
    let { setup, punchline } = joke;

    jokeques.innerHTML = setup
    punchjoke.innerHTML = punchline


    detaildiv.append(jokeques)
    detaildiv.append(punchjoke);
    
    detaildiv.addEventListener("click",(params) => {
        (async function appearance() {
            await appear()
        })()
    }
    )
})()