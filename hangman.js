const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');


const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();
//degisen bi deger oldugu için let olarak tanımladık degıskenı
function getRandomWord() {
    const words = ["javascript","java","python","css","html"];
    return words[Math.floor(Math.random() * words.length)];//diziden random bir elemanı alması için Math.random u kullandık
}

function displayWord() {    //kelimenin harflerine ayrılması işlemini burada gerçekleştiririz.
    //sonrasında ise girilen kelimede harf var ise ekrana yazdırdık.
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}    
    `;

    const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Congrulations';
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0?'<h3>Wrong Leter</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if (index<errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'You Lost';
    }
}

function displayMessage() {    
    message.classList.add('show');

    setTimeout(function() {
        message.classList.remove('show');
    }, 2000);
    //mesajın kaybedilmesi için (e2sanıye sonra ) remove methodunu kullandık
}

PlayAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {        //girilen kodlara göre calısmayı saglar.a-z arası
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            //eger seçil, kelime o harfi içeriyorsa pushluyoruz.
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }
});

displayWord()