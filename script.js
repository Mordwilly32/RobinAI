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
    1: 80,
    2: 100,
    3: 120,
    4: 140,
    5: 160,
    6: 180,
    7: 200,
    8: 220,
    9: 250
};

const buttons = document.querySelectorAll('.btn');
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const resetBtn = document.getElementById('resetBtn');
const aiPrompt = document.getElementById('aiPrompt');
const textSection = document.getElementById('textSection');
const documentText = document.getElementById('documentText');
const topicInput = document.getElementById('topicInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeStatus = document.getElementById('analyzeStatus');
const analyzeStatusText = document.getElementById('analyzeStatusText');
const loadingScreen = document.getElementById('loading-screen');
const mainInterface = document.getElementById('main-interface');
const thumbUpGif = document.getElementById('thumb-up-gif');
const handWaveGif = document.getElementById('hand-wave-gif');

let selectedGrade = null;

function displayAiMessage(message) {
    aiPrompt.innerHTML = `<span class="ai-icon">✨</span> ${message}`;
}

function displayAnalyzeStatus(message, isError = false) {
    analyzeStatus.style.display = 'flex';
    analyzeStatusText.textContent = message;
    analyzeStatus.classList.toggle('error', isError);
    analyzeStatus.querySelector('.ai-icon').textContent = isError ? '⚠️' : '🧠';
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

function selectGrade(n) {
    buttons.forEach(b => b.dataset.selected = (b.dataset.grade == n));
    selectedGrade = n;
    const g = descriptions[n];
    if (!g) return;

    displayAiMessage(`Procesando información del grado **${g.title}**...`);
    setTimeout(() => {
        displayAiMessage(`¡Información obtenida! Aquí tienes la descripción de **${g.title}**. Ahora, puedes pegar tu texto para un análisis.` );
    }, 700);

    resultTitle.textContent = `Información del Grado: ${g.title}`;
    resultText.textContent = g.text;
    textSection.style.display = 'flex';
    analyzeStatus.style.display = 'none';
    documentText.value = '';
    topicInput.value = '';
    showGesture('hand-wave');
}

function analyzeDocument() {
    const textContent = documentText.value.trim();
    const topic = topicInput.value.trim();

    if (!selectedGrade) {
        displayAnalyzeStatus('Por favor, selecciona primero un grado escolar.', true);
        showGesture('hand-wave');
        return;
    }

    if (textContent.length === 0 || topic.length === 0) {
        displayAnalyzeStatus('Por favor, introduce tanto el texto como el tema para analizar.', true);
        showGesture('hand-wave');
        return;
    }

    const words = textContent.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const topicWords = topic.toLowerCase().split(/\s+/).filter(word => word.length > 0);

    displayAnalyzeStatus('Generando análisis del texto...');
    showGesture('hand-wave');

    setTimeout(() => {
        // Calcular la puntuación de relevancia del tema
        let relevanceCount = 0;
        topicWords.forEach(topicWord => {
            const regex = new RegExp(`\\b${topicWord}\\b`, 'gi');
            if (textContent.match(regex)) {
                 relevanceCount++;
            }
        });

        const topicRelevanceScore = topicWords.length > 0 ? (relevanceCount / topicWords.length) * 10 : 0;

        // Obtener el factor de dificultad del grado seleccionado
        const difficulty = difficultyFactors[selectedGrade] || 100;
        const wordCountScore = Math.min((wordCount / difficulty) * 10, 10);

        // Puntuación final, ponderando el 50% para cada factor
        const finalScore = ((wordCountScore * 0.5) + (topicRelevanceScore * 0.5)).toFixed(1);

        let resultMessage = `<p class="grade-title">Resultados del Análisis AI</p>`;
        resultMessage += `<p class="grade-desc">El Asistente AI ha procesado tu texto, considerando el grado **${descriptions[selectedGrade].title}** y el tema **"${topic}"**.</p>`;
        resultMessage += `<p class="grade-desc">  - **Palabras detectadas:** ${wordCount}</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación de Extensión:** ${wordCountScore.toFixed(1)}/10</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación de Relevancia del Tema:** ${topicRelevanceScore.toFixed(1)}/10</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación Final Combinada:** <span style="font-size: 1.2rem; font-weight: bold; color: var(--accent-color);">${finalScore}/10</span></p>`;

        if (finalScore >= 8) {
            resultMessage += `<p class="grade-desc">¡Análisis completado con éxito! Tu texto demuestra una excelente extensión y una gran relevancia con el tema. ¡Magnífico trabajo!</p>`;
            showGesture('thumb-up');
        } else if (finalScore >= 5) {
            resultMessage += `<p class="grade-desc">Análisis completo. Tu texto tiene una buena base, pero puedes mejorarlo añadiendo más detalles o asegurándote de que todas las ideas se relacionen con el tema.</p>`;
            showGesture('hand-wave');
        } else {
            resultMessage += `<p class="grade-desc">Análisis completo. La extensión o la relevancia del texto es limitada. Se recomienda expandirlo o revisar la conexión con el tema para mejorar la puntuación.</p>`;
            showGesture('hand-wave');
        }

        displayAnalyzeStatus('Análisis de texto completado.', false);
        resultTitle.innerHTML = '';
        resultText.innerHTML = resultMessage;
    }, 2000);
}

buttons.forEach(btn => btn.addEventListener('click', () => selectGrade(btn.dataset.grade)));
analyzeBtn.addEventListener('click', analyzeDocument);

resetBtn.addEventListener('click', () => {
    buttons.forEach(b => b.dataset.selected = 'false');
    selectedGrade = null;
    resultTitle.textContent = 'Información Detallada';
    resultText.textContent = 'El Asistente AI está esperando tu selección de grado o la introducción de un texto para analizar.';
    displayAiMessage('✨ Hola, soy tu Asistente Inteligente. Por favor, selecciona tu grado escolar para empezar.');
    textSection.style.display = 'none';
    analyzeStatus.style.display = 'none';
    documentText.value = '';
    topicInput.value = '';
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