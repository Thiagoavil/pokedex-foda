import axios from "axios";

const txtNome = document.getElementById("txtnome") as HTMLInputElement;
const formulario = document.getElementById("formulario") as HTMLFormElement;

// DOM Objects
const mainScreen = document.querySelector('.main-screen') as HTMLDivElement;
const pokeName:any|null = document.querySelector('.poke-name');
const pokeId:any|null = document.querySelector('.poke-id');
const pokeFrontImage:any|null = document.querySelector('.poke-front-image');
const pokeBackImage:any|null = document.querySelector('.poke-back-image');
const pokeTypeOne:any|null = document.querySelector('.poke-type-one');
const pokeTypeTwo:any|null = document.querySelector('.poke-type-two');
const pokeWeight:any|null = document.querySelector('.poke-weight');
const pokeHeight:any|null = document.querySelector('.poke-height');
const pokeListItems:any = document.querySelectorAll('.list-item')as NodeListOf<HTMLDivElement>;
const leftButton = document.querySelector('.left-button') as HTMLDivElement;
const rightButton = document.querySelector('.right-button') as HTMLDivElement;


// constants and variables
const TYPES = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];
let prevUrl:any = null;
let nextUrl:any = null;

async function obterdadosJson(nome:string){
  try{
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`,{responseType:"json"});

    const pokemon =resposta.data;

    resetScreen();

    const dataTypes = pokemon['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
    if (dataSecondType) {
      pokeTypeTwo.classList.remove('hide');
      pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
      pokeTypeTwo.classList.add('hide');
      pokeTypeTwo.textContent = '';
    }
    mainScreen.classList.add(dataFirstType['type']['name']);

    pokeName.textContent = capitalize(pokemon['name']);
    pokeId.textContent = '#' + pokemon['id'].toString().padStart(3, '0');
    pokeWeight.textContent = pokemon['weight'];
    pokeHeight.textContent = pokemon['height'];
    pokeFrontImage.src = pokemon['sprites']['front_default'] || '';
    pokeBackImage.src = pokemon['sprites']['back_default'] || '';

    txtNome.innerText="";
  }
  catch(error){
    console.log(error);
  }
}

// Functions
const capitalize = (str:string) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

async function Pokemonlist(url:string) {
  try{
    let resposta = await axios.get(url,{responseType:"json"});

    let pokemon = resposta.data;
  
      const { results, previous, next } = pokemon;
      prevUrl = previous;
      nextUrl = next;

      for (let i = 0; i < pokeListItems.length ; i++) {
        const pokeListItem = pokeListItems[i];
        const resultData = results[i];

        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split('/');
          const id = urlArray[urlArray.length - 2];
          pokeListItem.textContent = id + '. ' + capitalize(name);
        } else {
          pokeListItem.textContent = '';
        }
      }
  }
  catch(error){
    console.log(error);
  }

}

// const fetchPokeList = url => {
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       const { results, previous, next } = data;
//       prevUrl = previous;
//       nextUrl = next;

//       for (let i = 0; i < pokeListItems.length ; i++) {
//         const pokeListItem = pokeListItems[i];
//         const resultData = results[i];

//         if (resultData) {
//           const { name, url } = resultData;
//           const urlArray = url.split('/');
//           const id = urlArray[urlArray.length - 2];
//           pokeListItem.textContent = id + '. ' + capitalize(name);
//         } else {
//           pokeListItem.textContent = '';
//         }
//       }
//     });
// };

async function pokemonData(id:string) {
  try{
    let resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`,{responseType:"json"});

    let pokemon = resposta.data;
    resetScreen();

    const dataTypes = pokemon['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
    if (dataSecondType) {
      pokeTypeTwo.classList.remove('hide');
      pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
      pokeTypeTwo.classList.add('hide');
      pokeTypeTwo.textContent = '';
    }
    mainScreen.classList.add(dataFirstType['type']['name']);

    pokeName.textContent = capitalize(pokemon['name']);
    pokeId.textContent = '#' + pokemon['id'].toString().padStart(3, '0');
    pokeWeight.textContent = pokemon['weight'];
    pokeHeight.textContent = pokemon['height'];
    pokeFrontImage.src = pokemon['sprites']['front_default'] || '';
    pokeBackImage.src = pokemon['sprites']['back_default'] || '';
  }
  catch(error){
    console.log(error);
  }
}

// const fetchPokeData = id => {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//     .then(res => res.json())
//     .then(data => {
//       resetScreen();

//       const dataTypes = data['types'];
//       const dataFirstType = dataTypes[0];
//       const dataSecondType = dataTypes[1];
//       pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
//       if (dataSecondType) {
//         pokeTypeTwo.classList.remove('hide');
//         pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
//       } else {
//         pokeTypeTwo.classList.add('hide');
//         pokeTypeTwo.textContent = '';
//       }
//       mainScreen.classList.add(dataFirstType['type']['name']);

//       pokeName.textContent = capitalize(data['name']);
//       pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
//       pokeWeight.textContent = data['weight'];
//       pokeHeight.textContent = data['height'];
//       pokeFrontImage.src = data['sprites']['front_default'] || '';
//       pokeBackImage.src = data['sprites']['back_default'] || '';
//     });
// };

const handleLeftButtonClick = () => {
  if (prevUrl) {
    Pokemonlist(prevUrl);
  }
};

const handleRightButtonClick = () => {
  if (nextUrl) {
    Pokemonlist(nextUrl);
  }
};

const handleListItemClick = (e:any) => {
  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;

  const id = listItem.textContent.split('.')[0];
  pokemonData(id);
};


// adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {
  pokeListItem.addEventListener('click', handleListItemClick);
}


// initialize App
Pokemonlist('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
formulario.addEventListener("click",(_evt:MouseEvent)=>obterdadosJson(txtNome.value));