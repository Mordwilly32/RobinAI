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
    1: 80, 2: 100, 3: 120, 4: 140, 5: 160, 7: 200, 8: 220, 9: 250
};

// Elementos de la nueva interfaz
const aiChatBox = document.getElementById('aiChatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const thumbUpGif = document.getElementById('thumb-up-gif');
const handWaveGif = document.getElementById('hand-wave-gif');
const loadingScreen = document.getElementById('loading-screen');
const mainInterface = document.getElementById('main-interface');
const resetBtn = document.getElementById('resetBtn');

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
    messageDiv.classList.add('ai-message');
    if (sender === 'user') {
        messageDiv.classList.remove('ai-message');
        messageDiv.classList.add('user-message');
        messageDiv.innerHTML = `<p>${message}</p>`;
    } else {
        messageDiv.innerHTML = `<span class="ai-icon">✨</span> ${message}`;
    }
    aiChatBox.appendChild(messageDiv);
    aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

function showGesture(gesture) {
    thumbUpGif.style.display = 'none';
    handWaveGif.style.display = 'none';
    if (gesture === 'thumb-up') {
        thumbUpGif.style.display = 'block';
    } else if (gesture === 'hand-wave') {
        handWaveGif.style.display = 'block';
    }
}

async function processInput(input) {
    const cleanedInput = input.trim().toLowerCase();

    if (state === 'ask_grade') {
        const gradeName = gradeMap[cleanedInput];
        const gradeNumber = Object.keys(gradeMap).find(key => gradeMap[key].toLowerCase() === cleanedInput);

        if (gradeName) {
            selectedGrade = gradeNumber;
            state = 'ask_topic_text';
            setTimeout(() => displayMessage(`¡Perfecto! Has seleccionado el grado **${gradeName}**. Ahora, dime en qué te puedo ayudar o qué texto quieres que revise.`), 500);
            showGesture('hand-wave');
        } else {
            setTimeout(() => displayMessage('Lo siento, no entendí tu respuesta. Por favor, intenta de nuevo. Escribe el número o el nombre completo del grado.'), 500);
            showGesture('hand-wave');
        }

    } else if (state === 'ask_topic_text') {
        const parts = cleanedInput.split(':').map(part => part.trim());
        let topic = '';
        let text = '';
        
        if (parts.length > 1) {
            topic = parts[0];
            text = parts.slice(1).join(':');
        } else {
            // Asume que todo es texto si no hay ":"
            text = cleanedInput;
        }

        if (text) {
            state = 'processing';
            displayMessage('Estoy procesando la información. Esto podría tardar un momento...');
            showGesture('hand-wave');

            const prompt = `Actúa como un profesor que revisa el trabajo de un estudiante de ${descriptions[selectedGrade].title}. El texto es sobre el tema "${topic}". Evalúa el texto basándote en su calidad, originalidad, ortografía y relevancia para el tema. Da una puntuación del 1 al 10 y un comentario.
            
            Texto del estudiante: "${text}"`;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error en la llamada a la API: ${response.statusText}`);
                }

                const data = await response.json();
                const aiResponse = data.candidates[0].content.parts[0].text;
                
                displayMessage(aiResponse);
                showGesture('thumb-up');
                state = 'ask_more';
            } catch (error) {
                console.error("Error al obtener la respuesta de la IA:", error);
                displayMessage('Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
                showGesture('hand-wave');
                state = 'ask_topic_text'; // Vuelve al estado para que el usuario pueda intentar de nuevo
            }
        } else {
            displayMessage('Por favor, ingresa el tema seguido de tu texto, como: "El agua: El agua es un recurso vital..." o solo el texto para una evaluación general.');
            showGesture('hand-wave');
        }

    } else if (state === 'ask_more') {
        if (cleanedInput.includes('no') || cleanedInput.includes('gracias') || cleanedInput.includes('adios')) {
            setTimeout(() => displayMessage('¡De nada! Si me necesitas, aquí estaré. Adiós.'), 500);
            state = 'ask_grade';
            selectedGrade = null;
            setTimeout(() => displayMessage('✨ Hola, soy tu Asistente Inteligente. Por favor, escribe el número de tu grado escolar (ej: "1" o "tercero") para empezar.'), 2000);
            showGesture('hand-wave');
        } else {
            setTimeout(() => displayMessage('¿Qué más necesitas?'), 500);
            showGesture('hand-wave');
            state = 'ask_topic_text';
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

resetBtn.addEventListener('click', () => {
    aiChatBox.innerHTML = '';
    state = 'ask_grade';
    selectedGrade = null;
    displayMessage('✨ Hola, soy tu Asistente Inteligente. Por favor, escribe el número de tu grado escolar (ej: "1" o "tercero") para empezar.');
    showGesture('hand-wave');
});

window.onload = function() {
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainInterface.style.display = 'grid';
            showGesture('hand-wave');
        }, 1000);
    }, 3000);
};

