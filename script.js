// Конфігурація етапів: ключові слова, картинки та шляхи до звуків
const stages = [
    {
        phrases: ["voice recorder", "recorder"],
        image: "images/stage1.jpg",
        sound: "sounds/sound1.mp3"
    },
    {
        phrases: ["book"],
        image: "images/stage2.jpg",
        sound: "sounds/sound2.mp3"
    },
    {
        phrases: ["hard drive", "hdd"],
        image: "images/stage3.jpg",
        sound: "sounds/sound3.mp3"
    },
    {
        phrases: ["revolver", "gun"],
        image: "images/stage4.jpg",
        sound: "sounds/sound4.mp3"
    }
];

const FINAL_STORY_TEXT = "My sufferings are from fire, yet they do not burn me, My body is turned inside out, yet every day I remain whole, My torments are immeasurable, yet not for a deadly sin. Who am I?";

const sceneImage = document.getElementById("sceneImage");
const finalText = document.getElementById("finalText");
const inputContainer = document.getElementById("inputContainer");
const phraseInput = document.getElementById("phraseInput");

// Починаємо з нуля при кожному завантаженні сторінки
let currentStage = 0;

function checkState() {
    if (currentStage >= stages.length) {
        if (inputContainer) inputContainer.style.display = "none";
        if (finalText) {
            textTypingEffect(FINAL_STORY_TEXT, finalText);
            finalText.style.display = "block";
        }
        if (sceneImage) sceneImage.src = "images/stage4.jpg";
    } else {
        if (currentStage === 0) {
            if (sceneImage) sceneImage.src = "images/stage0.jpg";
        } else {
            if (sceneImage) sceneImage.src = stages[currentStage - 1].image;
        }
    }
}

function processInput() {
    if (!phraseInput) return;
    
    const userInput = phraseInput.value.trim().toLowerCase(); 
    const isCorrect = stages[currentStage].phrases.some(phrase => userInput === phrase);
    
    if (isCorrect) {
        // ДИНАМІЧНЕ СТВОРЕННЯ АУДІО (Прямо під час події Enter)
        const soundPath = stages[currentStage].sound;
        if (soundPath) {
            const audio = new Audio();
            audio.src = soundPath;
            
            // Змушуємо грати негайно
            audio.play()
                .then(() => console.log(`Успішно відтворено: ${soundPath}`))
                .catch(err => console.error(`Браузер відхилив трек ${soundPath}:`, err.message));
        }
        
        currentStage++; 
        
        if (sceneImage) {
            sceneImage.style.opacity = "0.3";
            setTimeout(() => {
                sceneImage.style.opacity = "1";
                checkState(); 
            }, 200);
        } else {
            checkState();
        }
    }

    phraseInput.value = ""; 
}

function textTypingEffect(text, element, i = 0) {
    if (i === 0) element.textContent = "";
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => textTypingEffect(text, element, i + 1), 30);
    }
}

if (phraseInput) {
    phraseInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            processInput();
        }
    });
}

// Стартова ініціалізація сайту
checkState();
