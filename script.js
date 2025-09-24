let state = "ask_grade";
let selectedGrade = null;

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typingStatus = document.getElementById("typingStatus");
const aiAvatar = document.getElementById("aiAvatar");
const actionRow = document.getElementById("actionRow");
const generateBtn = document.getElementById("generateBtn");
const reviewBtn = document.getElementById("reviewBtn");

const descriptions = {1:"Primero",2:"Segundo",3:"Tercero",4:"Cuarto",5:"Quinto",6:"Sexto",7:"Séptimo",8:"Octavo",9:"Noveno"};
const difficultyFactors = {1:80,2:100,3:120,4:140,5:160,6:180,7:200,8:220,9:250};

// --- Mensajes con animación ---
function appendMessage(text, who="ai"){
  const msg = document.createElement("div");
  msg.className = "message " + (who==="user"?"user":"ai");
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  if(who==="ai"){
    let i=0;
    function typeWriter(){
      if(i<text.length){
        msg.innerHTML = text.substring(0,i+1);
        i++;
        setTimeout(typeWriter,20); // velocidad
      }
    }
    typeWriter();
  } else {
    msg.innerHTML=text;
  }
}

function startTyping(){ aiAvatar.src="RR2.png"; typingStatus.style.visibility="visible"; }
function stopTyping(){ aiAvatar.src="RR3.png"; typingStatus.style.visibility="hidden"; }
function showActions(){ actionRow.style.display="flex"; }
function hideActions(){ actionRow.style.display="none"; }

function processInput(raw){
  const input=raw.trim().toLowerCase();
  if(!input) return;

  if(state==="ask_grade"){
    const num=parseInt(input);
    if(descriptions[num]){
      selectedGrade=num;
      appendMessage(`<strong>Has seleccionado:</strong> ${descriptions[num]}`);
      startTyping();
      setTimeout(()=>{stopTyping(); appendMessage("Ahora puedes elegir: <em>Generar texto</em> o <em>Revisar texto</em>."); showActions(); state="awaiting_action";},1000);
    } else {
      startTyping(); setTimeout(()=>{stopTyping(); appendMessage("No entendí el grado. Escribe un número entre 1 y 9.");},800);
    }
  } else if(state==="awaiting_action"){
    if(input.includes("generar")) triggerGenerate();
    else if(input.includes("revisar")) triggerReview();
    else appendMessage("Elige <em>Generar</em> o <em>Revisar</em>.");
  } else if(state==="generating"){
    startTyping();
    setTimeout(()=>{stopTyping(); const factor=difficultyFactors[selectedGrade]||100; const approxWords=Math.floor(factor/10); appendMessage(`📝 Texto generado (~${approxWords} palabras) para ${descriptions[selectedGrade]}: <br><br><em>${raw}</em> es un tema interesante. Aquí podrías desarrollar una introducción, ideas principales y conclusión.`); state="ask_more";},1500);
  } else if(state==="reviewing"){
    startTyping();
    setTimeout(()=>{stopTyping(); const words=raw.split(/\\s+/).filter(w=>w.length>0).length; appendMessage(`🔍 Tu texto tiene <strong>${words}</strong> palabras. Calidad: <strong>${words>50?"buena":"mejorable"}</strong>. Puntuación: ${(Math.min(words/10,10)).toFixed(1)}/10.`); state="ask_more";},1200);
  } else if(state==="ask_more"){
    if(input.includes("no")||input.includes("gracias")){ appendMessage("¡De nada! Puedes elegir otro grado si quieres."); state="ask_grade"; selectedGrade=null; hideActions(); }
    else { appendMessage("¿Quieres <em>Generar</em> o <em>Revisar</em> otro texto?"); state="awaiting_action"; }
  }
}

function triggerGenerate(){ appendMessage("<em>Modo Generar:</em> escribe el tema y presiona Enviar."); state="generating"; }
function triggerReview(){ appendMessage("<em>Modo Revisar:</em> pega tu texto y presiona Enviar."); state="reviewing"; }
generateBtn.addEventListener("click",triggerGenerate);
reviewBtn.addEventListener("click",triggerReview);

sendBtn.addEventListener("click",()=>{ const v=userInput.value.trim(); if(!v) return; appendMessage(v,"user"); userInput.value=""; processInput(v); });
userInput.addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); sendBtn.click(); } });

window.addEventListener("load",()=>{ appendMessage("✨ Hola, escribe tu grado (ej: 3)."); stopTyping(); });
