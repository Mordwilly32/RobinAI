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
    },
    10: {
        title: '1º Bachillerato',
        text: 'En 1º de Bachillerato, se exige un alto nivel de análisis, síntesis e investigación. El enfoque se centra en la preparación para la universidad y en la especialización de áreas de estudio. Los trabajos requieren profundidad argumentativa, uso de fuentes confiables y una estructura formal.'
    },
    11: {
        title: '2º Bachillerato',
        text: 'El 2º de Bachillerato es la etapa final de la educación preuniversitaria. Los trabajos académicos deben reflejar un dominio avanzado de la materia, con capacidad para formular argumentos originales, realizar investigaciones exhaustivas y presentar conclusiones sólidas y bien fundamentadas. Se prioriza la excelencia y el rigor intelectual.'
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
    9: 250,
    10: 350,
    11: 450
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
const generateBtn = document.getElementById('generateBtn');
const analyzeStatus = document.getElementById('analyzeStatus');
const analyzeStatusText = document.getElementById('analyzeStatusText');
const loadingScreen = document.getElementById('loading-screen');
const mainInterface = document.getElementById('main-interface');
const thumbUpImg = document.getElementById('thumb-up-img');
const handWaveImg = document.getElementById('hand-wave-img');

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
    thumbUpImg.style.display = 'none';
    handWaveImg.style.display = 'none';
    if (gesture === 'thumb-up') {
        thumbUpImg.style.display = 'block';
    } else if (gesture === 'hand-wave') {
        handWaveImg.style.display = 'block';
    }
}

function selectGrade(n) {
    buttons.forEach(b => b.dataset.selected = (b.dataset.grade == n));
    selectedGrade = n;
    const g = descriptions[n];
    if (!g) return;

    displayAiMessage(`Procesando información del grado **${g.title}**...`);
    setTimeout(() => {
        displayAiMessage(`¡Información obtenida! Aquí tienes la descripción de **${g.title}**. Ahora, puedes pegar o generar tu texto para un análisis.`);
    }, 700);

    resultTitle.textContent = `Información del Grado: ${g.title}`;
    resultText.textContent = g.text;
    textSection.style.display = 'flex';
    analyzeStatus.style.display = 'none';
    documentText.value = '';
    topicInput.value = '';
    showGesture('hand-wave');
}

function getSuggestions(finalScore, wordCountScore, topicRelevanceScore) {
    let suggestions = '';

    if (finalScore >= 8) {
        suggestions = `¡Excelente trabajo! Has demostrado una gran habilidad. Sigue practicando para mantener tu nivel.`;
    } else if (finalScore >= 5) {
        if (wordCountScore < 5 && topicRelevanceScore >= 5) {
            suggestions = `Tu texto es relevante para el tema, pero es un poco corto. Intenta expandir tus ideas con más detalles y ejemplos para mejorar la puntuación de extensión.`;
        } else if (wordCountScore >= 5 && topicRelevanceScore < 5) {
            suggestions = `La extensión de tu texto es buena, pero parece que no está muy enfocado en el tema. Revisa el tema y asegúrate de que tus ideas principales se conecten directamente con él.`;
        } else {
            suggestions = `Tu texto tiene una buena base, pero hay espacio para mejorar tanto en extensión como en relevancia. Intenta expandir tus ideas y asegurarte de que cada punto se relacione con el tema.`;
        }
    } else {
        if (wordCountScore < 3 && topicRelevanceScore < 3) {
            suggestions = `Tu texto es muy corto y no parece estar muy relacionado con el tema. Se recomienda leer más sobre el tema antes de escribir y usar oraciones más completas.`;
        } else if (wordCountScore < 3) {
            suggestions = `Tu texto es demasiado corto para un análisis completo. Intenta escribir más párrafos y desarrollar tus ideas para que el asistente pueda darte una mejor retroalimentación.`;
        } else if (topicRelevanceScore < 3) {
            suggestions = `Tu texto no parece abordar el tema de manera efectiva. Vuelve a leer la pregunta o el tema que te dieron y reescribe tu texto para que tus ideas se centren en ello.`;
        } else {
            suggestions = `Hay varias áreas de oportunidad. Te sugerimos revisar la estructura de tus párrafos y asegurarte de que tu texto se relacione claramente con el tema en todo momento.`;
        }
    }

    return `<div class="suggestion-box"><p class="grade-title" style="margin-bottom: 5px;">Sugerencias del Asistente AI:</p><p class="grade-desc">${suggestions}</p></div>`;
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
        let relevanceCount = 0;
        topicWords.forEach(topicWord => {
            const regex = new RegExp(`\\b${topicWord}\\b`, 'gi');
            if (textContent.match(regex)) {
                relevanceCount++;
            }
        });

        const topicRelevanceScore = topicWords.length > 0 ? (relevanceCount / topicWords.length) * 10 : 0;

        const difficulty = difficultyFactors[selectedGrade] || 100;
        const wordCountScore = Math.min((wordCount / difficulty) * 10, 10);

        const finalScore = ((wordCountScore * 0.5) + (topicRelevanceScore * 0.5)).toFixed(1);

        let resultMessage = `<p class="grade-title">Resultados del Análisis AI</p>`;
        resultMessage += `<p class="grade-desc">El Asistente AI ha procesado tu texto, considerando el grado **${descriptions[selectedGrade].title}** y el tema **"${topic}"**.</p>`;
        resultMessage += `<p class="grade-desc">  - **Palabras detectadas:** ${wordCount}</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación de Extensión:** ${wordCountScore.toFixed(1)}/10</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación de Relevancia del Tema:** ${topicRelevanceScore.toFixed(1)}/10</p>`;
        resultMessage += `<p class="grade-desc">  - **Puntuación Final Combinada:** <span style="font-size: 1.2rem; font-weight: bold; color: var(--accent-color);">${finalScore}/10</span></p>`;

        const suggestions = getSuggestions(finalScore, wordCountScore, topicRelevanceScore);
        resultMessage += suggestions;

        displayAnalyzeStatus('Análisis de texto completado.', false);
        resultTitle.innerHTML = '';
        resultText.innerHTML = resultMessage;
    }, 2000);
}

function generateText() {
    if (!selectedGrade || !topicInput.value.trim()) {
        displayAnalyzeStatus('Por favor, selecciona un grado y escribe un tema para generar texto.', true);
        showGesture('hand-wave');
        return;
    }

    const topic = topicInput.value.trim();
    const difficulty = difficultyFactors[selectedGrade];
    const sampleText = `El tema de ${topic} es muy interesante. Según la perspectiva de un estudiante de **${descriptions[selectedGrade].title}**, es crucial entender cómo este tema se relaciona con otros aspectos del conocimiento. Se puede argumentar que la relevancia de ${topic} reside en su impacto directo en nuestra vida diaria y en los avances tecnológicos. Por ejemplo, la aplicación de principios relacionados con ${topic} ha permitido innovaciones significativas en campos como la ciencia y la tecnología. En resumen, el estudio de ${topic} no solo enriquece nuestro conocimiento, sino que también nos prepara para los desafíos del futuro.`;

    displayAnalyzeStatus('Generando texto de ejemplo...');
    showGesture('hand-wave');

    setTimeout(() => {
        const words = sampleText.split(' ');
        let generatedWords = words.slice(0, Math.min(difficulty, words.length));
        documentText.value = generatedWords.join(' ') + (difficulty > words.length ? '...' : '');

        displayAnalyzeStatus('Texto de ejemplo generado. Ahora puedes analizarlo.', false);
        showGesture('thumb-up');
    }, 2000);
}

buttons.forEach(btn => btn.addEventListener('click', () => selectGrade(btn.dataset.grade)));
analyzeBtn.addEventListener('click', analyzeDocument);
generateBtn.addEventListener('click', generateText);

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
