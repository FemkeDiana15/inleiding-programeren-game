let selectedKat = null;
const pages = ["startscherm", "kieskatscherm","kiesnaamscherm", "kieskledingscherm", "kiesinstrumentenscherm", "eindscherm"];
let currentIndex = 0; 
const klikGeluid = new Audio('audio/Ping sound effect.mp3');
const savedName = localStorage.getItem('katName');
const katName = localStorage.getItem('katName')
const outfitObject = {
  bril: false,
  strikhoed: false,
  cowboyhoed: false,
  sjaal: false,
  strandhoed: false,
  zonnebril: false,
  cutestrikje: false,
  ketting: false,
  rockhaar: false,
  halsband: false,
};
const outfitItems = document.querySelectorAll('.outfit');
const containers = document.querySelectorAll('.selected-cat-container');
const instrumentObjects = {
  elektrischegitaar: false,
  akoestischegitaar: false,
  gitaarroze: false,
  microphoneitem: false
};
const instrumentItems = document.querySelectorAll('#microphone, .gitaar');
const nummers = {
  muziekSabrina: new Audio("audio/Sabrina Carpenter - Espresso (cover by Bongo Cat).mp3"),
  muziekBillie: new Audio("audio/Billie Eilish - What Was I Made For_ (cover by Bongo Cat).mp3"),
  muziekTaylor: new Audio("audio/Taylor Swift - Shake It Off (cover by Bongo Cat).mp3")
};
const achtergrondKnop = document.getElementById('achtergrondKnop');
const eindscherm = document.getElementById('eindscherm');
let isDefaultBackground = true; 
const katMessages = [
  "Meow-sic to my ears!",
  "Purr-fect choice!",
  "Fur-real, this rocks!",
  "Paws-itively awesome!",
  "You're claw-some!",
  "Let's meow-ve it!",
  "Feline groovy!",
  "Whisker-lickin' good!",
  "This is the cat's meow!"
];
const messageElement = document.getElementById('katMessage');
const randomIndex = Math.floor(Math.random() * katMessages.length);

document.addEventListener("DOMContentLoaded", load);

function load() {

//knop start
document.getElementById("startknop").addEventListener("click", function() {
    showPage(1); // Als je klikt dan toont function kieskatscherm
});
  
function showPage(index) {
  currentIndex = Math.max(0, Math.min(index, pages.length - 1));
  pages.forEach(function(p, i) {
      if (i === currentIndex) {
          document.getElementById(p).style.display = "block";
          updateSelectedKat();
          updateSelectedOutfit();
          updateSelectedInstrumenten();
          updatekatNameDisplay(); 
      if (p === "eindscherm") {
            showRandomkatMessage();
        }
      } else {
          document.getElementById(p).style.display = "none";
      }
  });
}

//pijlen
document.querySelectorAll(".pijl").forEach(function(pijl) {
    pijl.addEventListener("click", function() {
      klikGeluid.play();
        let direction;
        if (pijl.alt.toLowerCase().includes("volgende")) {
            direction = 1;
        } else {
            direction = -1;
        }
        showPage(currentIndex + direction);
    });
});

showPage(0); // Begin op startscherm

// Katten selectie scherm
document.querySelectorAll("#kat1, #kat2, #kat3").forEach(function(kat) {
  kat.addEventListener("click", katKlik);
});

// Kat selecteer en update
function katKlik(event) {
  const klikKat = event.target;
  const klikMeow = new Audio('audio/Scratch the cat_ Meow! (Sound effect).mp3');
  klikMeow.play();
  if (selectedKat) {
      selectedKat.style.border = "";
  }
  if (selectedKat !== klikKat) {
    klikKat.style.border = "15px solid rgb(141, 0, 151)";
      selectedKat = klikKat;
  } else {
      selectedKat = null;
  }   
  updateSelectedKat();
}

function updateSelectedKat() {
  containers.forEach( function(container) {
      if (selectedKat) {
          container.innerHTML = `<img src="${selectedKat.src}" alt="Gekozen kat">`;
      }
      else {
          container.innerHTML = '';
      }
  });  
}; 

// Kat naam geven
// Bronvermelding https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_input_name 
if (savedName) {
  document.getElementById('katNameInput').value = savedName;
  updatekatNameDisplay(); // Update display bij het laden
}

// Luister naar input
document.getElementById('katNameInput').addEventListener('input', function() {
  localStorage.setItem('katName', this.value);
  updatekatNameDisplay();
});

// Update functie
function updatekatNameDisplay() {
  const katName = localStorage.getItem('katName') || ""; 
  document.querySelectorAll('.kat-name-display').forEach(element => {
    element.textContent = katName;
  });
}

// Sla outfit/instruments op
const savedOutfit = localStorage.getItem('outfitState');
if (savedOutfit) {
  Object.assign(outfitObject, JSON.parse(savedOutfit));
  updateSelectedOutfit();
}

const savedInstruments = localStorage.getItem('instrumentState');
    if (savedInstruments) {
        Object.assign(instrumentObjects, JSON.parse(savedInstruments));
        updateSelectedInstrumenten();
    }

//knop restart 
document.getElementById("opnieuwknop").addEventListener("click", function() {
        showPage(0); 
});

} //load eindigt

// Outfits selecteren
// Bronvermelding deepseek mijn vraag aan hem was: I want the selected item to appear on the cat.
// Hieruit volgde wat handige informatie waardoor ik op deze code kwam die ik ook bij de instrumenten pagina heb gebruikt.

outfitItems.forEach(item => {
    item.addEventListener('click', function() {
      //haalt target-id op
      const targetId = this.dataset.target;
      //zoekt naar kledingstuk
      const kledingItem = document.getElementById(targetId);
  
      if (kledingItem) {
        const isVisible = kledingItem.style.display === 'block';
        if (isVisible) {
          kledingItem.style.display = 'none';
        } else {
          kledingItem.style.display = 'block';
        }
        outfitObject[targetId] = !isVisible;

        // Update display van selected outfit
        updateSelectedOutfit();
    }
  });
});

// laat de geselecteerde outfit zien in volgende scherm
function updateSelectedOutfit() {
  const containers = document.querySelectorAll('.selected-outfit-container');
  const selectedCount = Object.values(outfitObject).filter(Boolean).length;
  const warning = document.getElementById('outfitWarning');

  // waarschuwing van te veel kleidng aan
  if (selectedCount > 4) {
      warning.style.display = 'block';
  } else {
      warning.style.display = 'none';
  }

  containers.forEach(container => {
      container.innerHTML = '';
      
      Object.keys(outfitObject).forEach(itemId => {
          if (outfitObject[itemId]) {
              const originalElement = document.getElementById(itemId);
              const clonedElement = originalElement.cloneNode(true);
              
              clonedElement.style.position = originalElement.style.position;
              clonedElement.style.top = originalElement.style.top;
              clonedElement.style.left = originalElement.style.left;
              clonedElement.style.zIndex = originalElement.style.zIndex;

              //voegt de gekloonde elemten toe aan de container
              container.appendChild(clonedElement);
          }
      });
  });
}

//instrumenten selecteren 
instrumentItems.forEach(item => {
    item.addEventListener('click', function() {
      //haalt target-id op
      const targetId = this.dataset.target;
      //zoekt naar instrument
      const instrumentItem = document.getElementById(targetId);
      
      if (instrumentItem) {
        const isVisible = instrumentItem.style.display === 'block';
        if (isVisible) {
          instrumentItem.style.display = 'none';
        } else {
          instrumentItem.style.display = 'block';
        }
        instrumentObjects[targetId] = !isVisible;
        
        // Update display van selected instruments
        updateSelectedInstrumenten();
      }
    });
  });
  
  
  // geselecteerde instrumenten worden in volgende schermen getoond
  function updateSelectedInstrumenten() {
    const containers = document.querySelectorAll('.selected-instrumenten-container');
    
    containers.forEach(container => {
      container.innerHTML = ''; 
  
      Object.keys(instrumentObjects).forEach(instrumentId => {
        if (instrumentObjects[instrumentId]) {
          const originalInstrument = document.getElementById(instrumentId);
          const clonedInstrument = originalInstrument.cloneNode(true);
  
          clonedInstrument.style.position = originalInstrument.style.position;
          clonedInstrument.style.top = originalInstrument.style.top;
          clonedInstrument.style.left = originalInstrument.style.left;
          clonedInstrument.style.zIndex = originalInstrument.style.zIndex;

          //voegt de gekloonde elemten toe aan de container
          container.appendChild(clonedInstrument);
        }
      });
    });
  }
  

// Selecteer alle knoppen met de class "muziekknop"
// Bronvermelding https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_audio_play
document.querySelectorAll(".muziekknop").forEach(knop => {
  knop.addEventListener("click", () => {
      const audio = nummers[knop.id]; 

      if (audio.paused) {
          // Stop andere audio als er al iets speelt
          Object.values(nummers).forEach(n => n.pause());
          audio.play();
      } else {
          audio.pause();
      }
  });
});

//achtergrond veranderen
achtergrondKnop.addEventListener('click', function() {

    if(isDefaultBackground) {
        // Verander naar alternatieve achtergrond
        eindscherm.style.backgroundImage = "url('images/achtergrondeindoptie.png')";
        this.textContent = 'Verassing geactiveerd!';
        isDefaultBackground = false;
    } else {
        // Terug naar originele achtergrond
        eindscherm.style.backgroundImage = "url('images/achtergrondeind.png')";
        this.textContent = 'Verassing uitgezet!';
        isDefaultBackground = true;
    }
    
    // Visuele feedback animatie
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // Reset tekst na 5 seconden
    setTimeout(() => {
        this.textContent = 'Verassing';
    }, 5000);
});

//laat random bericht zien
// Bronvermedling lesstof en beetje hulp deepseek ik vroeg: I want the cat to display a different message on the last page, chosen randomly.
function showRandomkatMessage() {
  messageElement.textContent = katMessages[randomIndex];
}