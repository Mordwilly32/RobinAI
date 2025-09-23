const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const aiAvatar = document.getElementById('aiAvatar');

let state = 'ask_grade';
let selectedGrade = null;

const responses = {
    ask_grade: {
        text: '✨ Hola, soy tu Asistente Inteligente. Por favor, escribe el número de tu grado escolar (ej: "1" o "tercero") para empezar.',
        avatar: 'RR2.png',
        jump: true,
    },
    ask_topic: {
        text: '¡Perfecto! Has seleccionado el grado **${grade}**. Ahora, dime en qué te puedo ayudar o qué texto quieres que revise.',
        avatar: 'RR2.png',
        jump: true,
    },
    processing_text: {
        text: 'Estoy procesando la información. Esto podría tardar un momento...',
        avatar: 'RR3.png',
        jump: true,
    },
    final_result: {
        text: 'Análisis completado. Tu texto es [calidad]. ¿Puedo ayudarte con algo más?',
        avatar: 'RR2.png',
        jump: true,
    },
    error: {
        text: 'Lo siento, no entendí tu respuesta. Por favor, intenta de nuevo.',
        avatar: 'RR3.png',
        jump: true,
    },
};

const gradeMap = {
    '1': 'Primero',
    '2': 'Segundo',
    '3': 'Tercero',
    '4': 'Cuarto',
    '5': 'Quinto',
    '6': 'Sexto',
    '7': 'Séptimo',
    '8': 'Octavo',
    '9': 'Noveno',
    'primero': 'Primero',
    'segundo': 'Segundo',
    'tercero': 'Tercero',
    'cuarto': 'Cuarto',
    'quinto': 'Quinto',
    'sexto': 'Sexto',
    'septimo': 'Séptimo',
    'octavo': 'Octavo',
    'noveno': 'Noveno'
};

const difficultyFactors = {
    1: 80, 2: 100, 3: 120, 4: 140, 5: 160, 6: 180, 7: 200, 8: 220, 9: 250
};

function displayMessage(message, sender = 'ai') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function updateAvatar(newSrc, shouldJump) {
    aiAvatar.src = newSrc;
    aiAvatar.classList.toggle('jump-animation', shouldJump);
}

function processInput(input) {
    const cleanedInput = input.trim().toLowerCase();
    
    if (state === 'ask_grade') {
        const gradeName = gradeMap[cleanedInput];
        const gradeNumber = Object.keys(gradeMap).find(key => gradeMap[key].toLowerCase() === cleanedInput);
        
        if (gradeName) {
            selectedGrade = gradeNumber;
            state = 'ask_topic';
            const message = responses.ask_topic.text.replace('${grade}', gradeName);
            updateAvatar(responses.ask_topic.avatar, responses.ask_topic.jump);
            setTimeout(() => displayMessage(message), 500);
        } else {
            updateAvatar(responses.error.avatar, responses.error.jump);
            setTimeout(() => displayMessage(responses.error.text), 500);
        }
    } else if (state === 'ask_topic') {
        const [topic, ...textParts] = cleanedInput.split(':').map(part => part.trim());
        const text = textParts.join(':');

        if (text && topic) {
            state = 'processing';
            updateAvatar(responses.processing_text.avatar, responses.processing_text.jump);
            displayMessage(responses.processing_text.text);
            
            // Simular el análisis y la respuesta
            setTimeout(() => {
                const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
                const difficulty = difficultyFactors[selectedGrade] || 100;
                const wordCountScore = Math.min((wordCount / difficulty) * 10, 10);
                
                const relevanceCount = topic.split(/\s+/).filter(word => text.includes(word)).length;
                const topicRelevanceScore = (relevanceCount / topic.split(/\s+/).length) * 10;
                
                const finalScore = ((wordCountScore * 0.5) + (topicRelevanceScore * 0.5)).toFixed(1);
                
                let quality = 'limitada';
                if (finalScore >= 8) {
                    quality = 'excelente y muy relevante';
                } else if (finalScore >= 5) {
                    quality = 'buena, pero se puede mejorar';
                }
                
                const resultMessage = responses.final_result.text.replace('[calidad]', quality);
                updateAvatar(responses.final_result.avatar, responses.final_result.jump);
                displayMessage(`Análisis completado. Tu texto es **${quality}** con una puntuación de **${finalScore}/10**. ¿Puedo ayudarte con algo más?`);
                state = 'ask_more';
            }, 2000);
            
        } else {
            updateAvatar(responses.error.avatar, responses.error.jump);
            setTimeout(() => displayMessage('Por favor, ingresa el tema seguido de tu texto, como: "El agua: El agua es un recurso vital..."'), 500);
        }
    } else if (state === 'ask_more') {
        if (cleanedInput.includes('no') || cleanedInput.includes('gracias')) {
            updateAvatar(responses.ask_grade.avatar, responses.ask_grade.jump);
            setTimeout(() => displayMessage('¡De nada! Si me necesitas, aquí estaré. Adiós.'), 500);
            state = 'ask_grade';
            selectedGrade = null;
            setTimeout(() => displayMessage(responses.ask_grade.text), 2000);
        } else {
            updateAvatar(responses.ask_topic.avatar, responses.ask_topic.jump);
            setTimeout(() => displayMessage('¿Qué más necesitas?'), 500);
            state = 'ask_topic';
        }
    }
}

sendBtn.addEventListener('click', () => {
    const input = userInput.value;
    if (input.trim() === '') return;
    displayMessage(input, 'user');
    userInput.value = '';
    processInput(input);
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Mensaje de bienvenida inicial
window.onload = () => {
    displayMessage(responses.ask_grade.text);
    updateAvatar(responses.ask_grade.avatar, responses.ask_grade.jump);
};
