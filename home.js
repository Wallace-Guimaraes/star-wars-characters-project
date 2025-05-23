let currentPageUrl = 'https://swapi.py4e.com/api/people/'

window.onload = async() => {

    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // limpar os resultados anteriores

    try {
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card =document.createElement("div")
            card.style.backgroundImage = `url('https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://i.pinimg.com/236x/21/9e/ae/219eaea67aafa864db091919ce3f5d82.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const colorEyes = document.createElement("span")
                colorEyes.className = "character-details"
                colorEyes.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(height)
                modalContent.appendChild(mass)
                modalContent.appendChild(colorEyes)
                modalContent.appendChild(birthYear)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disable = !responseJson.next
        backButton.disable = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
} 

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(colorEyes) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avelã",
        unknown: "desconhecido"
    };
    return cores[colorEyes.toLowerCase()] || colorEyes;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecido"
    }
    return (height / 100).toFixed(2); 
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }
    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }
    return birthYear
}
    