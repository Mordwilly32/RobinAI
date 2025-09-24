// ** Importante: Por seguridad, nunca subas tu API Key a un repositorio público como GitHub. **
// Si estás trabajando en un proyecto local, puedes colocarla aquí para fines de prueba.
const API_KEY = "AIzaSyBJ-lKPnwtJyguFP85Smz9I7y7JnGtyhEI";

const descriptions = {
    1: {
        title: 'Primero',
        text: 'En Primero, el enfoque se centra en el descubrimiento de letras, números y el desarrollo de la coordinación motora. Los estudiantes aprenden a leer palabras simples, a contar con confianza y a colaborar en actividades grupales. Es un año fundamental para el despertar de la curiosidad y los primeros logros académicos.'
    },
    2: {
        title: 'Segundo',
        text: 'En Segundo, se refuerzan intensamente las habilidades de lectura y escritura, con la introducción a párrafos sencillos y la construcción de oraciones más complejas. Las matemáticas avanzan con sumas y restas más elaboradas. También se fomenta la autonomía y responsabilidad con tareas específicas.'
    },
    3: {
        title: 'Tercero',
        text: 'Tercero introduce a los estudiantes en operaciones básicas con mayor profundidad y la creación de textos narrativos cortos. Se exploran activamente las ciencias y el estudio del entorno, desarrollando el pensamiento lógico y la adquisición de hábitos de estudio eficientes.'
    },
    4: {
        title: 'Cuarto',
        text: 'Cuarto se caracteriza por la intensificación de proyectos grupales, el desarrollo de la lectura comprensiva y la resolución de problemas más complejos. Se introducen temas de geografía, historia local y experimentos científicos básicos, aumentando progresivamente las responsabilidades académicas.'
    },
    5: {
        title: 'Quinto',
        text: 'En Quinto, el estudiante se prepara para desafíos educativos significativos: textos más extensos, operaciones de multiplicación y división avanzadas, y trabajos basados en proyectos. Se prioriza el desarrollo de la autonomía, la organización personal y el pensamiento crítico elemental.'
    },
    6: {
        title: 'Sexto',
        text: 'Sexto marca la transición hacia la educación secundaria, introduciendo materias separadas, lectura analítica y conceptos más abstractos en matemáticas y ciencias. Se pone especial énfasis en la investigación, las presentaciones orales y el fomento del trabajo colaborativo.'
    },
    7: {
        title: 'Séptimo',
        text: 'Séptimo se enfoca en desarrollar competencias avanzadas: introducción al álgebra, comprensión lectora profunda y aplicación del método científico en ciencias. Se comienzan a explorar habilidades vitales y a gestionar proyectos de mayor duración.'
    },
    8: {
        title: 'Octavo',
        text: 'En Octavo, se profundiza en el pensamiento crítico, la resolución de problemas complejos y la ejecución de proyectos interdisciplinarios. Los estudiantes perfeccionan sus técnicas de estudio y empiezan a considerar sus futuras trayectorias académicas.'
    },
    9: {
        title: 'Noveno',
        text: 'Noveno es un año de consolidación académica, preparando a los estudiantes para etapas superiores con materias más exigentes y una mayor responsabilidad en el aprendizaje autónomo. Se orienta al desarrollo de metas personales y la toma de decisiones informadas sobre su futuro educativo.'
    }
};

const difficultyFactors = {
    1: 80, 2: 100, 3: 120, 4: 140, 5: 160, 6: 180, 7: 200, 8: 220, 9: 250
};

// Elementos de la interfaz
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const aiAvatar = document.getElementById('aiAvatar');
const loadingScreen = document.getElementById('loading-screen');
const mainInterface = document.getElementById('main-interface');

let state = 'ask_grade';
let selectedGrade = null;

const gradeMap = {
    '1': 'Primero', '2': 'Segundo', '3': 'Tercero', '4': 'Cuarto', '5': 'Quinto',
    '6': 'Sexto', '7': 'Séptimo', '8': 'Octavo', '9': 'Noveno',
    'primero': 'Primero', 'segundo': 'Segundo', 'tercero': 'Tercero', 'cuarto': 'Cuarto',
    'quinto': 'Quinto', 'sexto': 'Sexto', 'septimo': 'Séptimo', 'octavo': 'Octavo', 'noveno': 'Noveno'
};

function displayMessage(message, sender = 'ai') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('ai-message');
    }
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
            const message = `¡Perfecto! Has seleccionado el grado **${gradeName}**. Ahora, dime en qué te puedo ayudar o qué texto quieres que revise.`;
            updateAvatar("RR2.png", true); // Asegúrate de tener estas imágenes
            setTimeout(() => displayMessage(message), 500);
        } else {
            updateAvatar("RR3.png", true); // Asegúrate de tener estas imágenes
            setTimeout(() => displayMessage('Lo siento, no entendí tu respuesta. Por favor, intenta de nuevo.'), 500);
        }
    } else if (state === 'ask_topic') {
        const [topic, ...textParts] = cleanedInput.split(':').map(part => part.trim());
        const text = textParts.join(':');

        if (text && topic) {
            state = 'processing';
            updateAvatar("RR3.png", true);
            displayMessage('Estoy procesando la información. Esto podría tardar un momento...');
            
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
                
                updateAvatar("RR2.png", true);
                displayMessage(`Análisis completado. Tu texto es **${quality}** con una puntuación de **${finalScore}/10**. ¿Puedo ayudarte con algo más?`);
                state = 'ask_more';
            }, 2000);
            
        } else {
            updateAvatar("RR3.png", true);
            setTimeout(() => displayMessage('Por favor, ingresa el tema seguido de tu texto, como: "El agua: El agua es un recurso vital..."'), 500);
        }
    } else if (state === 'ask_more') {
        if (cleanedInput.includes('no') || cleanedInput.includes('gracias')) {
            updateAvatar("RR2.png", true);
            setTimeout(() => displayMessage('¡De nada! Si me necesitas, aquí estaré. Adiós.'), 500);
            state = 'ask_grade';
            selectedGrade = null;
            setTimeout(() => displayMessage('✨ Hola, soy tu Asistente Inteligente. Por favor, escribe el número de tu grado escolar (ej: "1" o "tercero") para empezar.'), 2000);
        } else {
            updateAvatar("RR2.png", true);
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
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainInterface.style.display = 'flex';
            displayMessage('✨ Hola, soy tu Asistente Inteligente. Por favor, escribe el número de tu grado escolar (ej: "1" o "tercero") para empezar.');
            updateAvatar("RR2.png", true);
        }, 1000);
    }, 3000);
};
