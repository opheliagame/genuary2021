
let proxyUrl = 'https://warm-plains-24972.herokuapp.com/';
// rig veda api -> http://api-rv.herokuapp.com/rv/v1
let baseUrl = 'https://tronalddump.io';
let searchKeyword = "women";
let currentKeyword = searchKeyword;
let currentQuote = "";
let quoteP;
let arrDiv = [];

// gsap.registerPlugin(SplitText);
// gsap.to('.para', {duration: 2, innerText: "This is the new text"});


function setup() {
  createCanvas(800, 600);

  let targetUrl = '/search/quote?query=women';
  // getQuote(targetUrl);
  
  let quoteButton = createButton("more quotes!");
  quoteButton.mousePressed(() => getQuote(`/search/quote?query=${searchKeyword}`));


  frameRate(30);

  currentQuote = "How much of my mother has my mother left in me? ";
  currentQuote += "How much of my love will be insane to some degree? ";
  currentQuote += "And what about this feeling...";
  splitText();
  // makeParaElements();
  noLoop();
}

function makeParaElements() {
  arrDiv = [];
  let num = 10;
  let fixedL = 60;
  for(let i = 0; i < num; i++) {
    let para = createP(currentQuote);
    para.position(0, i*width/num);
    // para.size(width, width/num);
    // para.elt.style.maxWidth = `${width}px`;
    para.elt.style.maxHeight = `${width/num}px`;
    
    let string = currentQuote;
    let cutPoint = Math.floor(random()*string.length); 
    let newString = string.substring(cutPoint) + string.substring(0, cutPoint);
    para.attribute("start", cutPoint);
    para.class('ele');
    para.html(newString.substring(0, fixedL));
    para.html("hello");
    arrDiv.push(para);
  }
}

function draw() {
  background(0);
  fill(255);
  textSize(32);
  rectMode(CORNERS);
  // rect(24, 24, width-24, 24*2);
  // text(currentKeyword, 24, 24*2, width-24, 24*2);
  textSize(18);

  

  // let fixedL = 60;
  // for(let i = 0; i < arrDiv.length; i++) {
  //   let para = arrDiv[i];

  //   let string = currentQuote;
  //   let cutPoint = Math.floor(float(frameCount)/20); 
  //   cutPoint = cutPoint + para.attribute('start');
  //   cutPoint = cutPoint % string.length;
  //   // cutPoint = 0;
  //   // console.log(cutPoint, string.length);
  //   let newString = string.substring(cutPoint) + string.substring(0, cutPoint);
  //   para.html(newString.substring(0, fixedL));
  // }

  // console.log(string.substring(0, cutPoint));
  
  // text(currentQuote, 24, 24*5, width-24*2, height-24);
}

function splitText() {
  let pdiv = createDiv();

  let globalx = 0;
  let span = false;
  let opentag = false;
  let spanword = "";
  for(let i = 0; i < currentQuote.length; i++) {
    let c = currentQuote.charAt(i);

    // // if c is part of a tag
    // if(c == "<" && opentag == false) {
    //   opentag = true;
    //   // p = createSpan(c);
    //   continue;
    //   // let i = currentQuote.substring(c).indexOf(">");
    // }
    // else if(c == ">" && opentag == true) {
    //   // opentag = false;
    //   span = true;
    //   spanword = "";
    //   continue;
    // }
    // else if(c == "<" && opentag == true) {
    //   opentag = false;
    //   span = false;
    //   continue;
    // }
    // else if(c == ">" && opentag == false) {
    //   continue;
    // }
    

    let p = createP(c);    
    // if(span == true) {
    //   p = createSpan(c);
    // }


    textSize(64);
    let x = textWidth(c);
    p.position(globalx % (width-width/4), 64 * globalx/width + 64);
    globalx += x;
    p.class('ele');
    pdiv.child(p);
  }

  gsap.to('.ele', {duration: 5, x: width/4-64, stagger: 0.1, ease: "none", repeat: -1});

}

function getQuote(targetUrl) {
  fetch(baseUrl + targetUrl)
    .then(response => response.json())
    .then(jsonData => {
      currentKeyword = searchKeyword;
      let quotes = []; 
      jsonData._embedded.quotes.forEach(quote => quotes.push(quote.value));
      currentQuote = quotes.sample();
      let searchString = quotes.join(' ');
      // console.log(searchString);
      searchKeyword = searchString.split(' ').sample();
      // console.log(searchKeyword);

      let p = window.document.getElementsByTagName('p')[0];
      let keywordloc = currentQuote.toLowerCase().indexOf(currentKeyword.toLowerCase());
      if(keywordloc !== -1) {
        let parahtml = currentQuote.substr(0, keywordloc) +
                        "<span>" + 
                        currentQuote.substr(keywordloc, currentKeyword.length) +
                        "</span>" +
                        currentQuote.substr(keywordloc+currentKeyword.length, currentQuote.length);

        // p.innerHTML = parahtml;
        // currentQuote = parahtml;
        console.log(currentQuote);
        console.log(parahtml);
      }
      else {
        p.innerHTML = currentQuote;
      }
     
    })
    // .then(()=> makeParaElements())
    .then(() => splitText())
    .catch(error => console.log(`error ${error}`));
}

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

// RIG VEDA API Annanditi @twitter

// let targetUrl = '/resources?sungbycategory=female&sungforcategory=male'
// fetch(proxyUrl + baseUrl + targetUrl)
//   .then((response) => response.json())
//   .then((jsonData) => {
//     femaleForMale = jsonData.length;
//     console.log(`F->M ${femaleForMale}`);
//   })
//   .catch((error) => console.log("error ", error));

// targetUrl = '/resources?sungbycategory=male&sungforcategory=female'
// fetch(proxyUrl + baseUrl + targetUrl)
//   .then(response => response.json())
//   .then(jsonData => {
//     maleForFemale = jsonData.length;
//     console.log(`M->F ${maleForFemale}`);
//   })
//   .catch(error => `error ${error}`);