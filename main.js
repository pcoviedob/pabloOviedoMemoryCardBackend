
const THEMES_CHARACTERS='characters';
const THEMES_FLAGS='flags';
const THEMES_FRUITS='fruits';
const THEMES_SHIPS='ships';


const express = require('express');
var cors = require('cors');
// const axios = require(axios);
const app = express();
const port = 3000;
// app.use(cors());

// app.use(cors({
//   origin: 'https://pablo-oviedo-memory-card-ba-git-debb41-pablos-projects-703cc48d.vercel.app/'
// }));
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'https://pablooviedomemorygame.web.app/')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://pablo-oviedo-memory-card-ba-git-debb41-pablos-projects-703cc48d.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
const charactersImage =["assets/Luffy.png", "assets/Zoro.png", "assets/Sanji.png", "assets/Nami.png", "assets/Nico.png", "assets/Choper.png", "assets/Franky.png", "assets/Usop.png", "assets/Jimbe.png", "assets/Sabo.png", "assets/Ace.png", "assets/Brook.png"];
const flagsImage=["assets/luffyf.png", "assets/zorof.png", "assets/sanjif.png", "assets/namif.png", "assets/nicof.png", "assets/choperf.png", "assets/frankyf.png", "assets/usopf.png", "assets/jimbef.png", "assets/sabof.png", "assets/acef.png", "assets/brookf.png"];
const fruitsImage=["assets/luccifr.png", "assets/brookfr.png", "assets/choperfr.png", "assets/kaidofr.png", "assets/kidfr.png", "assets/lawfr.png", "assets/luffyfr.png", "assets/marcofr.png", "assets/moriafr.png", "assets/sabofr.png", "assets/smilefr.png", "assets/crocodilefr.png"];
const shipsImage=["assets/boash.png", "assets/whitebeardsh.png", "assets/lawsh.png", "assets/shankssh.png", "assets/dragonsh.png", "assets/merrysh.png", "assets/thousandsh.png", "assets/marinesh.png", "assets/garpsh.png", "assets/bugysh.png", "assets/enelsh.png", "assets/hawkeyesh.png"];


app.get('/', (req, res) => {
  res.send(data)
})

app.get('/cards/:difficulty/:themes', (req, res) => {
  
  let data = {cards: []};

  if(req.params !== null){
    if(req.params.difficulty !== null && req.params.themes !== null){
       let difficulty = req.params.difficulty;
       let themes = req.params.themes;
       let  cards = getCards(difficulty, themes);
       
       cards.forEach(card =>{
             data.cards.push(card);
       });

       cards.forEach(card =>{
             data.cards.push(card);
       });
       
    
      shuffle(data.cards);
       console.log(cards);
    }
  }
 
//   console.log(theme)
  res.send(JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getCards(difficulty, themes){
    let cards = [];
    let imageList = null;

switch (themes){
  case THEMES_CHARACTERS:
      imageList = charactersImage;
      break;
    case THEMES_FLAGS:
        imageList =flagsImage;
        break;
    case THEMES_FRUITS:
        imageList = fruitsImage;
        break;
    case THEMES_SHIPS:
        imageList = shipsImage;
        break;
    default:
        break;
}
for (let i = 0; i < difficulty; i++){
    var card = {id: i, src: imageList[i]};
    
    cards.push(card);
    
   
}

    return cards;
}
function shuffle(array){
    for( let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] =[array[j], array[i]]
    }
}