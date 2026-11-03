'use strict';
const $=s=>document.querySelector(s), app=$('#app'), KEY='metafisica-party-v1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n), delay=ms=>new Promise(r=>setTimeout(r,ms));
const AVATARS=['Exploradora','Astrónomo','Brote','Cometa'], COLORS=['#efa9bc','#9ebff5','#95dfbf','#ffd46c'];
let S=null,M=null,practice=false,busy=false,sound=false,reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,audioCtx;
const POS=Array.from({length:24},(_,i)=>{const t=-Math.PI/2+i*Math.PI/12;return [50+39*Math.cos(t),50+39*Math.sin(t)]});
const TYPES=['mint','blue','pink','gold','blue','mint','pink','gold','mint','blue','pink','gold','blue','mint','pink','gold','mint','blue','pink','gold','blue','mint','pink','gold'];
function mascot(i=0){return `<svg class="mascot" viewBox="0 0 64 76" aria-hidden="true" shape-rendering="crispEdges"><path fill="#182749" d="M14 12h36v8h6v38h-8v12H36V60h-8v10H16V58H8V24h6z"/><path fill="${COLORS[i]}" d="M17 16h30v8h5v30H12V28h5z"/><path fill="#fff4d7" d="M20 30h25v18H20z"/><path fill="#182749" d="M24 34h4v6h-4zm12 0h4v6h-4zm-8 11h9v3h-9z"/><path fill="${i===0?'#b74f65':i===1?'#42659a':i===2?'#32785e':'#d99c2d'}" d="M14 16h36v12H14z"/><path fill="#fff4d7" d="M20 10h24v7H20z"/>${i===2?'<path fill="#32785e" d="M30 0h8v8h-8zM21 4h9v6h-9z"/>':i===3?'<path fill="#ffd46c" d="M30 0h5v5h6v5h-6v5h-5v-5h-6V5h6z"/>':''}</svg>`}
function on(id,fn){const el=document.getElementById(id);if(el)el.onclick=fn}
function save(){if(!S||practice)return;try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}}
function load(){try{let s=JSON.parse(localStorage.getItem(KEY));return s?.version===1&&Array.isArray(s.players)?s:null}catch{return null}}
function tone(ok=true){if(!sound)return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='triangle';o.frequency.value=ok?660:180;g.gain.setValueAtTime(.065,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.18);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.2)}catch{}}
function modal(html){$('#dialog-content').innerHTML=html;$('#dialog').showModal()}
$('#close-dialog').onclick=()=>$('#dialog').close();
$('#sound').onclick=()=>{sound=!sound;$('#sound').textContent=`♫ Sonido: ${sound?'sí':'no'}`;$('#sound').setAttribute('aria-pressed',sound);tone()};
function motion(){document.body.classList.toggle('reduced',reduced);$('#motion').textContent=`Animación: ${reduced?'no':'sí'}`;$('#motion').setAttribute('aria-pressed',reduced)}
$('#motion').onclick=()=>{reduced=!reduced;motion()};motion();
$('#help').onclick=()=>modal('<h2>Tu turno de pensar</h2><ol><li>Lanza el dado virtual. Tu personaje avanza automáticamente.</li><li>Abre el desafío de la casilla. El itinerario reserva los seis retos y la batalla final.</li><li>Arrastra una tarjeta, o tócala y luego toca su destino. No hay reloj.</li><li>Lee la explicación y pulsa «Continuar». Puedes cometer dos errores; al tercero repites solo ese minijuego.</li><li>En equipos, pasa el dispositivo al terminar el turno.</li></ol><p>Ganas una estrella por reto. La clasificación usa puntos medios por desafío (máximo 105), para equilibrar las pruebas. Los errores de todos los intentos cuentan; no se gana puntuación repitiendo.</p><p>Se guarda el tablero al terminar cada turno y después del dado. Si cierras durante una prueba, la retomas desde el principio.</p>');
function renderWorld(live=false){let ps=live?S.players:[{avatar:0,pos:2,name:''},{avatar:1,pos:10,name:''},{avatar:2,pos:19,name:''}];return `<div class="world"><svg class="board-path" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="39" ry="39" fill="none" stroke="#91ad96" stroke-width="9"/><ellipse cx="50" cy="50" rx="39" ry="39" fill="none" stroke="#eff0cb" stroke-width="6" stroke-dasharray="2 2"/></svg>${POS.map((p,i)=>`<div class="tile ${TYPES[i]}" style="left:${p[0]}%;top:${p[1]}%" aria-label="Casilla ${i+1}">${['◉','▦','⌘','✦'][['mint','blue','pink','gold'].indexOf(TYPES[i])]}</div>`).join('')}<div class="board-center"><div class="big-star">✦</div><h2>EL ARCHIPIÉLAGO<br>DE LAS IDEAS</h2><p>EXPLORA · PIENSA · CONECTA</p></div>${ps.map((p,i)=>`<div id="token-${i}" class="token" style="left:${POS[p.pos][0]+(live?i*1.1:0)}%;top:${POS[p.pos][1]}%">${mascot(p.avatar)}${live?`<span class="token-label">${i+1}</span>`:''}</div>`).join('')}</div>`}
function home(){busy=false;M=null;practice=false;app.innerHTML=`<div class="hero"><section><div class="eyebrow"><span class="dot"></span> El gran encuentro de las ideas</div><h1>Metafísica <span class="party">Party</span><small>Bienio Filosófico UCB</small></h1><p class="lead">Lanza el dado. Desafía tus certezas.<br>Un viaje por Hume, Kant y Hegel donde <strong>pensar bien es la mejor jugada.</strong></p><div class="tags"><span class="tag">7 minijuegos</span><span class="tag">1–4 equipos</span><span class="tag">Sin prisa, sin reloj</span></div><div class="setup"><div class="setup-row"><label>¿Cómo jugamos?<select id="mode"><option value="1">Aventura individual</option><option value="2">2 equipos · relevos</option><option value="3">3 equipos · relevos</option><option value="4">4 equipos · relevos</option></select></label></div><div id="players-input" class="players-input"></div><button class="primary" id="start">¡Comenzar la aventura! →</button>${load()?'<button class="quiet full" id="resume">Continuar partida guardada</button>':''}<p class="pause-note">Reserva unos 25–30 minutos; con equipos y debate puede durar más. Todo se juega en este dispositivo.</p></div><button class="quiet" id="practice">Practicar un minijuego</button></section><section class="hero-art">${renderWorld()}<div class="art-caption"><span>UN MUNDO POR EXPLORAR</span><span>✦ 3 ISLAS · 1 GRAN FINAL</span></div></section></div><section class="philosophers"><div class="phil-card"><span class="phil-icon">◉</span><div><h3>Hume <small>· La experiencia</small></h3><p>¿Observas una conexión o esperas que ocurra?</p></div></div><div class="phil-card"><span class="phil-icon">▦</span><div><h3>Kant <small>· Los límites</small></h3><p>Ordena lo que conocemos. Examina sus condiciones.</p></div></div><div class="phil-card"><span class="phil-icon">⌘</span><div><h3>Hegel <small>· El desarrollo</small></h3><p>Descubre lo que una idea debe transformar.</p></div></div></section>`;renderInputs();$('#mode').onchange=renderInputs;on('start',start);on('resume',()=>{S=load();S.ended?ending():board()});on('practice',practiceMenu)}
function renderInputs(){const n=+$('#mode').value;$('#players-input').innerHTML=Array.from({length:n},(_,i)=>`<div class="player-input"><input id="name-${i}" aria-label="Nombre ${i+1}" maxlength="24" value="${n===1?'Exploradora':`Equipo ${i+1}`}"><select id="avatar-${i}" aria-label="Personaje ${i+1}">${AVATARS.map((a,j)=>`<option value="${j}" ${i===j?'selected':''}>${a}</option>`).join('')}</select></div>`).join('')}
function start(){const n=+$('#mode').value;S={version:1,players:Array.from({length:n},(_,i)=>({name:$('#name-'+i).value.trim()||`Equipo ${i+1}`,avatar:+$('#avatar-'+i).value,pos:0,results:[],stars:0})),turn:0,normalTurns:Math.ceil(6/n)*n,visited:[],pending:null,ended:false};practice=false;save();board()}
function player(){return S.players[S.turn%S.players.length]}
function average(p){return p.results.length?Math.round(p.results.reduce((a,b)=>a+b,0)/p.results.length):0}
function board(){M=null;busy=false;const p=player(),final=S.turn>=S.normalTurns;app.innerHTML=`<div class="section-head"><div><div class="eyebrow">${final?'El tribunal abre sus puertas':'El archipiélago de las ideas'}</div><h1>${final?'La batalla final':'Tu próxima idea está a un dado de distancia.'}</h1></div><button id="exit" class="small">Guardar y salir</button></div><div class="board-layout"><section>${renderWorld(true)}<div class="legend"><span>Hume</span><span>Kant</span><span>Hegel</span><span>Encuentro / premio</span></div></section><aside><div class="panel"><div class="turn-top">${mascot(p.avatar)}<div><div class="eyebrow">Turno ${S.turn+1} / ${S.normalTurns+S.players.length}</div><h2>${esc(p.name)}</h2></div></div><div id="dice" class="dice" aria-live="polite">${S.pending?['','⚀','⚁','⚂','⚃','⚄','⚅'][S.pending.die]:'⚄'}</div><p class="turn-message" id="turn-message">${S.pending?pendingMessage():final?'Lanza el dado para entrar al tribunal. Cada equipo tendrá su propio desafío final.':'Explora el tablero. Cada color propone un destino; el itinerario garantiza todos los minijuegos.'}</p><button id="roll" class="gold-btn full">${S.pending?'Entrar al desafío →':'Lanzar dado'}</button><p class="pause-note">Sin dados físicos. Sin temporizador. Los errores nunca borran tu recorrido.</p></div><div class="score-list">${S.players.map((q,i)=>`<div class="score-row ${q===p?'active':''}">${mascot(q.avatar)}<span style="flex:1">${esc(q.name)}<small>${q.results.length} retos · ${q.results.reduce((a,b)=>a+b,0)} puntos acumulados</small></span><b>${average(q)} <small>media · ${q.stars} ✦</small></b></div>`).join('')}</div><div class="journey">${GAMES.map((g,i)=>`<span class="checkpoint ${S.visited.includes(i)?'done':''}">${S.visited.includes(i)?'✓ ':''}${g.short}</span>`).join('')}</div></aside></div>`;on('roll',()=>S.pending?begin(S.pending.game):roll());on('exit',()=>{save();home()})}
function pendingMessage(){let d=S.pending;return `${d.die} pasos · Casilla ${player().pos+1}. ${d.reward?`¡Estrella fugaz! +${d.reward} puntos de exploración. `:''}${d.surprise?'¡Portal sorpresa! ':''}Te espera: <strong>${GAMES[d.game].name}</strong>.`}
function chooseGame(type){let available=[0,1,2,3,4,5].filter(x=>!S.visited.includes(x));if(!available.length)available=[0,1,2,3,4,5];const preferred=type==='surprise'?available:type==='mint'?[0,1]:type==='blue'?[2,3]:type==='pink'?[4]:[5];return sample(available.filter(x=>preferred.includes(x)).length?available.filter(x=>preferred.includes(x)):available,1)[0]}
async function roll(){if(busy)return;busy=true;$('#roll').disabled=true;const die=1+Math.floor(Math.random()*6);$('#dice').classList.add('rolling');for(let i=0;i<(reduced?1:9);i++){ $('#dice').textContent=['⚀','⚁','⚂','⚃','⚄','⚅'][Math.floor(Math.random()*6)];await delay(reduced?0:70)}$('#dice').classList.remove('rolling');$('#dice').textContent=['','⚀','⚁','⚂','⚃','⚄','⚅'][die];const p=player(),idx=S.turn%S.players.length;for(let i=0;i<die;i++){p.pos=(p.pos+1)%24;let el=$('#token-'+idx);el.style.left=POS[p.pos][0]+idx*1.1+'%';el.style.top=POS[p.pos][1]+'%';tone();await delay(reduced?0:220)}const type=TYPES[p.pos];const surprise=type==='gold'&&Math.random()<.5;S.pending={die,game:S.turn>=S.normalTurns?6:chooseGame(surprise?'surprise':type),reward:type==='gold'?5:0,surprise};save();busy=false;board()}
function practiceMenu(){practice=true;app.innerHTML=`<section class="game-shell"><div class="eyebrow">Entrenamiento libre · sin alterar la partida</div><h1>Elige tu desafío</h1><div class="choices">${GAMES.map((g,i)=>`<button id="pr-${i}">${g.icon} ${g.name} →</button>`).join('')}</div><button class="quiet" id="back">Volver al inicio</button></section>`;GAMES.forEach((_,i)=>on('pr-'+i,()=>begin(i)));on('back',home)}
function begin(id,restart=false){const totalErrors=restart?M.totalErrors:(!practice?(S.pending.totalErrors||0):0);M={id,errors:0,totalErrors,index:0,phase:0,locked:false,bonus:0,correct:0,deck:[],history:[],scene:Math.floor(Math.random()*3)};if(id===0){M.scene=Math.floor(Math.random()*3);M.deck=shuffle(DATA.lab.slice(M.scene===0?0:M.scene===1?6:9,M.scene===0?6:M.scene===1?9:12));}if(id===1)M.deck=sample(DATA.prediction,4);if(id===2)M.deck=shuffle([...DATA.categories.slice(0,12),...sample(DATA.categories.slice(12),4)]);if(id===3)M.deck=[...sample(DATA.frontier.filter(x=>x.answer==='Experiencia posible'),2),...sample(DATA.frontier.filter(x=>x.answer==='Excede el conocimiento'),2),...sample(DATA.frontier.filter(x=>x.answer==='Uso regulativo'),2)];if(id===3)M.deck=shuffle(M.deck);if(id===4){M.case=sample(DATA.dialectic,1)[0];M.order=shuffle(M.case.steps.map((text,i)=>({text,i})));}if(id===5)M.deck=shuffle(['Hume','Kant','Hegel'].flatMap(a=>sample(DATA.voices.filter(x=>x.answer===a),2)));if(id===6)M.deck=sample(DATA.tribunal[0].rows,3);renderGame()}
function gameTotal(){return M.id===4?6:M.id===1?M.deck.length+1:M.id===6?10:M.deck.length}
function progress(){return M.id===6?([0,3,7][M.phase]||0)+M.index:M.id===1?(M.phase?M.index+1:0):M.index}
function frame(content,instruction){const g=GAMES[M.id];app.innerHTML=`<section class="game-shell"><div class="game-top"><div><div class="eyebrow">${practice?'Práctica libre':esc(player().name)} · ${g.author}</div><h1>${g.name}</h1></div><span class="badge ${g.color}">${g.icon} ${M.id+1}/7</span></div><div class="game-status"><span id="counter">${progress()} / ${gameTotal()}</span><div class="progress"><i style="width:${progress()/gameTotal()*100}%"></i></div><span id="errors">Errores: ${M.errors}/2</span></div><p class="game-instruction">${instruction}</p><div class="stage ${M.id===6?'tribunal':''}">${content}<div id="feedback" class="feedback" role="status" aria-live="polite">Piensa con calma. No hay límite de tiempo.</div><div id="next-row" class="next-row"></div></div><div style="display:flex;justify-content:space-between;margin-top:18px"><button id="pause" class="quiet small">${practice?'Volver a prácticas':'Pausa'}</button><span class="pause-note">Dos errores permitidos; el tercero reinicia esta prueba.</span></div></section>`;on('pause',()=>practice?practiceMenu():modal('<h2>Pausa</h2><p>Tu turno sigue aquí. Puedes tomarte todo el tiempo que necesites.</p><p>El tablero se guarda automáticamente; cerrar la página reinicia únicamente la prueba actual.</p>'))}
function feedback(ok,text){$('#feedback').className='feedback '+(ok?'good':'bad');$('#feedback').innerHTML=`<strong>${ok?'¡Conexión lograda!':'Revisa esta distinción.'}</strong> ${esc(text)}`;tone(ok)}
function answer(ok,why,next){if(M.locked)return;M.locked=true;if(ok){M.correct++;feedback(true,why);$('#next-row').innerHTML='<button id="next" class="primary">Continuar →</button>';on('next',()=>{M.locked=false;next()})}else{M.errors++;M.totalErrors++;if(!practice){S.pending.totalErrors=M.totalErrors;save();}$('#errors').textContent=`Errores: ${M.errors}/2`;feedback(false,why);if(M.errors>=3){$('#next-row').innerHTML='<button id="retry" class="primary">Reintentar este minijuego ↻</button>';$('#feedback').innerHTML+='<p>Tercer error: repites solo esta prueba. Tu tablero y tus estrellas están a salvo. Los errores de este intento siguen contando para la puntuación.</p>';on('retry',()=>begin(M.id,true));}else{$('#next-row').innerHTML='<button id="try-again" class="primary">Volver a intentar</button>';on('try-again',()=>{M.locked=false;$('#next-row').innerHTML='';$('#feedback').textContent='Prueba otra relación con la explicación que acabas de leer.';$('#feedback').className='feedback'})}}}
function philosopher(name){const i=['Hume','Kant','Hegel'].indexOf(name);return `<svg class="portrait" viewBox="0 0 64 72" aria-hidden="true" shape-rendering="crispEdges"><path d="M10 26h44v36H10z" fill="#ddd6c7"/><path d="M17 18h30v36H17z" fill="#ebbf9a"/><path d="M15 12h34v12H15zM10 20h9v30h-9zM47 20h8v30h-8z" fill="${i===2?'#a49b88':'#e9e4dc'}"/><path d="M23 30h4v5h-4zm15 0h4v5h-4zM27 42h10v3H27z" fill="#182749"/><path d="M8 55h48v17H8z" fill="${COLORS[i]}"/><path d="M24 54h16l-8 14z" fill="#fff8e5"/></svg>`}
function classifyContent(row,targets,extra='',floating=false){return `${extra}<div class="card-tray ${floating?'factory':''}"><div class="concept ${floating?'floating':''}" id="card" draggable="true" role="button" tabindex="0" aria-label="Tarjeta para clasificar: ${esc(row.text)}">${esc(row.text)}</div></div><div class="targets game-targets-${M.id} ${targets.length===5?'five':''}">${targets.map((t,i)=>`<button class="target" data-target="${i}">${['Hume','Kant','Hegel'].includes(t)?philosopher(t):`<span class="symbol">${M.id===3?'◈':['▣','◇','✦','◉','↩'][i]}</span>`}${esc(t)}</button>`).join('')}</div>`}
function wireClassify(row,targets,next){const card=$('#card');const pick=()=>{card.classList.add('selected');card.setAttribute('aria-pressed','true')};card.onclick=pick;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}};card.ondragstart=e=>{pick();e.dataTransfer.setData('text/plain','concept')};card.style.touchAction='none';let origin=null;card.onpointerdown=e=>{if(e.pointerType!=='mouse'){origin={x:e.clientX,y:e.clientY};pick();card.setPointerCapture(e.pointerId)}};card.onpointerup=e=>{if(origin){const dest=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-target]');if(dest)submit(+dest.dataset.target);origin=null}};function submit(i){answer(row.answer===targets[i],row.why,next)}document.querySelectorAll('[data-target]').forEach(b=>{b.onclick=()=>submit(+b.dataset.target);b.ondragover=e=>{e.preventDefault();b.classList.add('over')};b.ondragleave=()=>b.classList.remove('over');b.ondrop=e=>{e.preventDefault();b.classList.remove('over');submit(+b.dataset.target)}})}
function advance(){M.index++;M.index>=M.deck.length?complete():renderGame()}
function renderGame(){if(M.id===4)return dialectic();if(M.id===1&&M.phase===0)return prediction();let targets,extra='',inst='Arrastra la tarjeta a su destino, o toca la tarjeta y después el destino.';if(M.id===0){targets=['Observación','Hábito','Necesidad no demostrada'];extra=`<div class="scene ${M.scene===0?'billiard':''}">${M.scene===0?'<i class="ball"></i><i class="ball second"></i>':M.scene===1?'<div class="switch">ON</div><div class="lamp"></div>':'<div class="bell"><svg width="60" height="70" viewBox="0 0 60 70" aria-hidden="true"><path d="M12 48h36L42 36V22a12 12 0 0 0-24 0v14z" fill="#ffd46c" stroke="#182749" stroke-width="3"/><circle cx="30" cy="52" r="5" fill="#182749"/></svg></div><i class="bell-hammer"></i>'}<div class="scene-caption">${['Choque → movimiento','Pulsación → luz','Golpe → sonido'][M.scene]}</div></div>`}if(M.id===1){targets=['Expectativa práctica','Certeza excesiva'];extra='<div class="eyebrow">Después de apostar · ¿qué podemos concluir?</div>'}if(M.id===2){targets=['Cantidad','Cualidad','Relación','Modalidad','No es categoría'];inst='Clasifica las 12 categorías y separa los distractores. Puedes arrastrar, o tocar tarjeta y contenedor. El movimiento no tiene límite de tiempo.'}if(M.id===3){targets=['Experiencia posible','Excede el conocimiento','Uso regulativo'];extra='<div class="eyebrow">Puesto de inspección · evalúa la pretensión, no solo el tema</div>'}if(M.id===5){targets=['Hume','Kant','Hegel'];inst+=' Dirige cada idea hacia su interlocutor.';inst+=' Todas las afirmaciones son paráfrasis conceptuales, no citas textuales.'}if(M.id===6){const phase=DATA.tribunal[M.phase];targets=M.phase===0?['Hume','Kant','Hegel']:M.phase===1?['Objeción precisa','Deformación']:['Costumbre','Condiciones a priori','Negación determinada'];extra=`<div class="boss"><span class="boss-icon">♜</span><div><div class="eyebrow">El tribunal de la metafísica</div><div class="shields">${[0,1,2].map(i=>`<span class="shield ${i<M.phase?'broken':''}">${i<M.phase?'✓':'◇'}</span>`).join('')}</div></div></div><h2>${phase.title}</h2><p>${phase.prompt}</p>`;inst='Pregunta común: ¿cómo justificar nuestro conocimiento del mundo y de sus regularidades? Rompe los tres escudos conectando argumentos, objeciones y respuestas.'}const row=M.deck[M.index];frame(classifyContent(row,targets,extra,M.id===2),inst);wireClassify(row,targets,()=>{M.index++;if(M.index<M.deck.length)renderGame();else if(M.id===6&&M.phase<2){M.phase++;M.index=0;M.deck=sample(DATA.tribunal[M.phase].rows,M.phase===1?4:3);renderGame()}else complete()})}
function prediction(){M.pattern??=Math.random()<.5?'●':'◆';frame(`<div class="machine"><div class="eyebrow">Generador de acontecimientos · registro observado</div><div class="reels">${Array.from({length:5},()=>`<span>${M.pattern}</span>`).join('')}<span>?</span></div><p>¿Qué esperas que salga a continuación?</p></div><div class="prediction-buttons"><button id="bet-0">●</button><button id="bet-1">◆</button></div>`,'Haz una apuesta basada en lo observado. Acertar puede dar un pequeño premio, pero no demuestra una ley necesaria.');['●','◆'].forEach((v,i)=>on('bet-'+i,()=>{if(M.locked)return;M.locked=true;const result=Math.random()<.8?M.pattern:(M.pattern==='●'?'◆':'●');M.bonus=v===result?5:0;$('.reels').lastElementChild.textContent=result;feedback(true,`${v===result?'Acertaste: +5 puntos posibles.':'Esta vez no acertaste; no cuenta como error filosófico.'} La máquina es una simulación programada. Su resultado ilustra que acertar una predicción no demuestra necesidad lógica en la naturaleza.`);$('#next-row').innerHTML='<button id="prediction-next" class="primary">Examinar mi conclusión →</button>';on('prediction-next',()=>{M.phase=1;M.locked=false;renderGame()})}))}
function dialectic(){const c=M.case;if(M.index<3){frame(`<h2>${c.name}</h2><p>${c.intro}</p><div class="bridge">${[0,1,2].map(i=>`<div class="bridge-piece ${i<M.index?'filled':''}">${i<M.index?esc(c.steps[i]):`Tramo ${i+1} · por construir`}</div>`).join('')}</div><div class="choices">${M.order.filter(o=>o.i>=M.index).map(o=>`<button id="step-${o.i}">${esc(o.text)}</button>`).join('')}</div>`,'Construye el puente: elige el siguiente paso del desarrollo conceptual. El orden expresa razones, no una cronología física.');M.order.filter(o=>o.i>=M.index).forEach(o=>on('step-'+o.i,()=>answer(o.i===M.index,o.i===M.index?c.why:'Comienza por la pretensión inicial, luego examina su insuficiencia interna y finalmente la determinación que resulta de esa revisión.',()=>{M.index++;dialectic()})))}else{const stages=[{q:'¿Qué se niega?',right:c.negate,wrong:['Todo el contenido del punto de partida, sin conservar nada.','Una opinión contraria añadida desde fuera arbitrariamente.']},{q:'¿Qué se conserva?',right:c.keep,wrong:['La pretensión inicial intacta, sin modificación alguna.','Solo un promedio entre dos opiniones incompatibles.']},{q:'¿Cómo se transforma?',right:c.transform,wrong:['Se aplica siempre la misma receta de tres palabras.','Se abandona toda pretensión de comprender el contenido.']}];const t=stages[M.index-3];frame(`<h2>${c.name}</h2><div class="bridge">${c.steps.map(s=>`<div class="bridge-piece filled">${esc(s)}</div>`).join('')}</div><h3>${t.q}</h3><div class="choices">${shuffle([t.right,...t.wrong]).map((s,i)=>`<button id="dial-${i}" data-right="${s===t.right}">${esc(s)}</button>`).join('')}</div>`,'Ahora abre la puerta: distingue lo que se niega, se conserva y se transforma.');document.querySelectorAll('[data-right]').forEach(b=>b.onclick=()=>answer(b.dataset.right==='true',c.why+' La superación niega una pretensión unilateral y conserva momentos determinados.',()=>{M.index++;M.index===6?complete():dialectic()}))}}
function complete(){M.locked=true;const reward=practice?0:S.pending.reward,base=Math.max(40,100-10*M.totalErrors),points=Math.min(105,base+M.bonus+reward);M.points=points;app.innerHTML=`<section class="complete"><div class="award">✦</div><div class="eyebrow" style="justify-content:center">${M.id===6?'Tribunal superado':'Desafío superado'}</div><h1>${GAMES[M.id].name}</h1><div class="stats"><div class="stat"><b>${points}</b><small>puntos del desafío</small></div><div class="stat"><b>${M.totalErrors}</b><small>errores en todos los intentos</small></div><div class="stat"><b>+1 ✦</b><small>${practice?'estrella de práctica':'estrella ganada'}</small></div></div><div class="panel"><h2>La idea que te llevas</h2><p>${GAMES[M.id].summary}</p>${M.id===4?`<p>${M.case.why}</p>`:''}</div><p class="small">Puntuación: 100 − 10 por error (mínimo 40), más premios; máximo 105. La predicción fallida no penaliza.</p><button id="finish" class="gold-btn">${practice?'Volver a prácticas':'Recoger estrella y continuar →'}</button></section>`;on('finish',()=>{if(practice)return practiceMenu();if(!M)return;const p=player();p.results.push(points);p.stars++;if(!S.visited.includes(M.id))S.visited.push(M.id);S.turn++;S.pending=null;M=null;if(S.turn>=S.normalTurns+S.players.length){S.ended=true;save();ending()}else{save();board()}});tone()}
function ending(){const ranks=[...S.players].sort((a,b)=>average(b)-average(a));app.innerHTML=`<section class="complete celebrate"><div class="award">♜ ✦</div><div class="eyebrow" style="justify-content:center">La fiesta de las ideas</div><h1>¡El tribunal ha sido superado!</h1><p>Exploraste la experiencia, sus condiciones y el desarrollo de los conceptos. Las buenas preguntas también son una victoria.</p><div class="ranking">${ranks.map((p,i)=>`<div class="rank-row"><b>${i>0&&average(p)===average(ranks[i-1])?'=':i+1}</b>${mascot(p.avatar)}<span class="rank-name"><strong>${esc(p.name)}</strong><br><small>${p.stars} estrellas · ${p.results.reduce((a,b)=>a+b,0)} puntos acumulados</small></span><b>${average(p)}<small style="display:block;font-size:11px">puntos medios</small></b></div>`).join('')}</div><p class="small">Gana la mayor media por desafío. Igual media = empate compartido. Todos los equipos completan el mismo número de turnos.</p><div class="panel"><h2>Para conversar antes de salir</h2><p>¿Por qué una predicción exitosa no equivale a una demostración? ¿Qué aporta Kant que no aporta la costumbre? ¿Cómo cambia Hegel la pregunta por los límites del pensamiento?</p></div><p><button id="again" class="gold-btn">Nueva aventura ↻</button> <button id="practice-final">Seguir practicando</button></p></section>`;on('again',home);on('practice-final',practiceMenu)}
home();


/* ============================================================
   METAFÍSICA PARTY — SOPORTE PARA MANDOS USB / 2.4 GHz
   Añadido sin cambiar las reglas, preguntas ni partidas guardadas.
   Usa la Gamepad API nativa del navegador (Chrome/Edge/Firefox).
   ============================================================ */
(() => {
  'use strict';
  const STORE = 'metafisica-party-mando-v1';
  const defaults = { aceptar: 0, alternativo: 2, volver: 1, principal: 9, anterior: 4, siguiente: 5 };
  const names = {
    aceptar: 'Aceptar / seleccionar', alternativo: 'Otro botón para aceptar',
    volver: 'Volver / cerrar diálogo', principal: 'Acción principal',
    anterior: 'Opción anterior', siguiente: 'Opción siguiente'
  };
  let controls = {...defaults};
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    for (const k of Object.keys(defaults)) {
      if (Number.isInteger(saved[k]) && saved[k] >= 0 && saved[k] < 64) controls[k] = saved[k];
    }
  } catch (_) {}

  const style = document.createElement('style');
  style.textContent = `
    .mp-gamepad-focus {outline:4px solid #ffd46c !important;outline-offset:3px !important;
      box-shadow:0 0 0 7px rgba(24,39,73,.58) !important;position:relative;z-index:2}
    #mp-gamepad-indicator {position:fixed;bottom:14px;right:14px;z-index:1000;
      background:#172448;color:#fff4d7;border:2px solid #9ebff5;border-radius:14px;
      box-shadow:0 5px 20px #0711226b;font:600 12px/1.35 system-ui,sans-serif;
      display:flex;align-items:center;gap:8px;padding:7px 8px 7px 12px;max-width:min(370px,96vw)}
    #mp-gamepad-indicator button {min-height:32px !important;min-width:34px !important;
      padding:4px 7px !important;border-radius:9px;font-size:14px !important;
      background:#36547d !important;color:white !important;border:1px solid #9ebff5 !important}
    #mp-gamepad-indicator.connected {border-color:#95dfbf}
    #mp-gamepad-dialog {max-width:min(560px,95vw);max-height:90vh;overflow:auto;color:#172448;
      background:#fff8e9;border:3px solid #9ebff5;border-radius:17px;padding:20px 22px;
      box-shadow:0 15px 80px #0610239c;font:15px/1.4 system-ui,sans-serif}
    #mp-gamepad-dialog::backdrop {background:rgba(7,16,35,.72)}
    #mp-gamepad-dialog h2 {font-size:23px;margin:0 0 10px;color:#172448}
    #mp-gamepad-dialog p {margin:8px 0 12px;color:#263b57}
    #mp-gamepad-dialog .mp-mapping {display:flex;align-items:center;gap:9px;
      justify-content:space-between;border-bottom:1px solid #c8d3d6;padding:7px 0}
    #mp-gamepad-dialog .mp-mapping span {flex:1}
    #mp-gamepad-dialog button {font:600 13px/1.3 system-ui,sans-serif;min-height:36px !important;
      color:#fff;background:#234773;border:0;border-radius:8px;padding:7px 12px;cursor:pointer}
    #mp-gamepad-dialog #mp-close {background:#217052;margin-top:13px}
    #mp-gamepad-dialog #mp-reset {background:#6d516a;margin-top:13px}
    #mp-gamepad-dialog #mp-capture {background:#fff0b1;color:#493b0b;
      border-radius:8px;padding:9px;min-height:24px}
    @media (max-width:520px) {#mp-gamepad-indicator {bottom:8px;right:8px;max-width:250px;
      font-size:11px} #mp-gamepad-dialog {padding:15px}}
  `;
  document.head.appendChild(style);

  const indicator = document.createElement('div');
  indicator.id = 'mp-gamepad-indicator';
  indicator.innerHTML = '<span id="mp-gamepad-state">🎮 Pulsa un botón del mando para conectarlo</span>' +
    '<button type="button" id="mp-gamepad-setup" title="Configurar el mando" aria-label="Configurar el mando">⚙</button>';
  document.body.appendChild(indicator);
  const setup = document.createElement('dialog');
  setup.id = 'mp-gamepad-dialog';
  setup.innerHTML = `
    <h2>🎮 Control para Metafísica Party</h2>
    <p>Conecta el receptor USB y pulsa cualquier botón del mando. La palanca izquierda o la cruceta
       recorren las opciones; <b>aceptar</b> elige una respuesta, lanza el dado o continúa.</p>
    <p>Si los botones de tu TGZ no coinciden, puedes asignarlos aquí: pulsa <b>Asignar</b> y luego
       el botón físico correspondiente. No se borra ninguna partida.</p>
    <div id="mp-gamepad-details" aria-live="polite">Esperando un mando…</div>
    <div id="mp-gamepad-mappings"></div>
    <p id="mp-capture" aria-live="polite">Pulsa «Asignar» para personalizar un botón.</p>
    <div style="display:flex;flex-wrap:wrap;gap:9px">
      <button id="mp-reset" type="button">Restablecer botones</button>
      <button id="mp-close" type="button">Cerrar y jugar</button>
    </div>`;
  document.body.appendChild(setup);

  let enabled = false, selected = null, currentPadId = '', previousButtons = [],
      lastDirection = '', nextDirectionAt = 0, lastInfoAt = 0, waitingFor = null, povNeutralSeen = false;
  const state = indicator.querySelector('#mp-gamepad-state');
  const info = setup.querySelector('#mp-gamepad-details');
  const capture = setup.querySelector('#mp-capture');
  const mappings = setup.querySelector('#mp-gamepad-mappings');

  const getPad = () => {
    if (typeof navigator.getGamepads !== 'function') return null;
    try { return Array.from(navigator.getGamepads() || []).find(p => p && p.connected) || null; }
    catch (_) { return null; }
  };
  const pressed = b => !!b && (b.pressed || b.value > 0.65);
  const inDialog = () => setup.open ? setup : (document.getElementById('dialog')?.open ? document.getElementById('dialog') : null);
  const visible = el => !!el && el.isConnected && !el.disabled &&
    el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  function options() {
    const dlg = inDialog();
    const root = dlg || document;
    const selector = dlg ? 'button,select,input,a[href],[role="button"]' :
      '#app button,#app select,#app input,#app a[href],#app [role="button"],header button';
    return Array.from(root.querySelectorAll(selector)).filter(visible);
  }
  function prefer(list) {
    const selectors = [
      '#next-row button', '#roll', '#finish', '#start', '#again', '#prediction-next',
      '#close-dialog', '#mp-close', '.target', '.choices button', '#card', '#mode',
      '#resume', '#practice'
    ];
    for (const s of selectors) { const found = list.find(el => el.matches(s)); if (found) return found; }
    return list[0] || null;
  }
  function choose(el) {
    if (!el || !visible(el)) return;
    if (selected && selected !== el) selected.classList.remove('mp-gamepad-focus');
    selected = el;
    el.classList.add('mp-gamepad-focus');
    try { el.focus({preventScroll: true}); } catch (_) { el.focus(); }
    el.scrollIntoView({block:'nearest', inline:'nearest', behavior:'instant'});
  }
  function ensureSelection() {
    const list = options();
    if (!list.length) { if (selected) selected.classList.remove('mp-gamepad-focus'); selected = null; return null; }
    if (!selected || !list.includes(selected)) choose(prefer(list));
    return selected;
  }
  function nearby(direction) {
    const list = options();
    if (!list.length) return;
    const from = ensureSelection();
    if (!from) return;
    if (from.matches('select') && (direction === 'left' || direction === 'right')) {
      const delta = direction === 'right' ? 1 : -1;
      from.selectedIndex = (from.selectedIndex + delta + from.options.length) % from.options.length;
      from.dispatchEvent(new Event('change', {bubbles: true}));
      choose(from); return;
    }
    const a = from.getBoundingClientRect();
    const ax = (a.left + a.right) / 2, ay = (a.top + a.bottom) / 2;
    let target = null, best = Infinity;
    for (const el of list) {
      if (el === from) continue;
      const b = el.getBoundingClientRect(), dx = (b.left+b.right)/2-ax,
            dy = (b.top+b.bottom)/2-ay;
      const main = direction==='right'?dx:direction==='left'?-dx:direction==='down'?dy:-dy;
      const ortho = direction==='right'||direction==='left'?Math.abs(dy):Math.abs(dx);
      if (main <= 5) continue;
      const score = main + ortho*2.3 + (ortho > main*1.5 ? 150 : 0);
      if (score < best) { best = score; target = el; }
    }
    if (!target) {
      const idx = list.indexOf(from);
      target = list[(idx+(direction==='right'||direction==='down'?1:-1)+list.length)%list.length];
    }
    choose(target);
  }
  function cycle(delta) {
    const list = options();
    if (!list.length) return;
    const pos = list.indexOf(ensureSelection());
    choose(list[(pos + delta + list.length)%list.length]);
  }
  function accept() {
    const el = ensureSelection();
    if (!el) return;
    if (el.matches('select')) { choose(el); return; }
    el.click();
  }
  function primary() {
    const list = options();
    const btn = list.find(el => el.matches('#next-row button,#roll,#finish,#start,#prediction-next,#close-dialog,#mp-close,#again'));
    if (btn) { choose(btn); accept(); } else accept();
  }
  function back() {
    if (setup.open) { closeSetup(); return; }
    const dialog = document.getElementById('dialog');
    if (dialog?.open) { dialog.close(); selected=null; return; }
    const card = document.getElementById('card');
    if (card?.classList.contains('selected')) { card.classList.remove('selected'); card.setAttribute('aria-pressed','false'); }
    else cycle(-1);
  }
  function buildMappings() {
    mappings.innerHTML = Object.entries(names).map(([k, label]) =>
      `<div class="mp-mapping"><span>${label}</span><b>${controls[k]}</b>` +
      `<button type="button" data-mp-map="${k}">Asignar</button></div>`).join('');
  }
  function closeSetup() {waitingFor = null; setup.close(); selected=null;}
  indicator.querySelector('#mp-gamepad-setup').addEventListener('click', () => {
    buildMappings(); setup.showModal(); selected=null; ensureSelection();
  });
  setup.querySelector('#mp-close').addEventListener('click', closeSetup);
  setup.querySelector('#mp-reset').addEventListener('click', () => {
    controls={...defaults}; try {localStorage.removeItem(STORE);} catch (_) {}
    waitingFor=null; capture.textContent='Botones restablecidos.';buildMappings();
  });
  mappings.addEventListener('click', e => {
    const btn=e.target.closest('[data-mp-map]'); if (!btn) return;
    waitingFor=btn.dataset.mpMap;
    capture.textContent=`Pulsa ahora el botón físico para «${names[waitingFor]}»…`;
  });
  setup.addEventListener('close', () => { waitingFor=null;selected=null; });

  function directionFor(g) {
    const bs = g.buttons || [], axis = g.axes || [];
    // Mapeo estándar: D-pad 12/13/14/15. En mandos genéricos, usamos palanca izquierda.
    const horizontal = (pressed(bs[14])?-1:0)+(pressed(bs[15])?1:0);
    const vertical = (pressed(bs[12])?-1:0)+(pressed(bs[13])?1:0);
    // Algunos mandos DirectInput comunican la cruceta como un eje POV (eje 9).
    if (axis.length>9 && axis[9]>1.12) povNeutralSeen=true;
    if (povNeutralSeen && axis.length>9 && axis[9]>=-1.06 && axis[9]<=1.06) {
      const sector=Math.max(0,Math.min(7,Math.round((axis[9]+1)*3.5)));
      return ['up','right','right','down','down','left','left','up'][sector];
    }
    const x = horizontal || (axis[0] || 0), y = vertical || (axis[1] || 0);
    if (Math.abs(x) < .48 && Math.abs(y) < .48) return '';
    return Math.abs(x) >= Math.abs(y) ? (x>0?'right':'left') : (y>0?'down':'up');
  }
  function report(g, now) {
    if (!g) {
      indicator.classList.remove('connected');
      const text = typeof navigator.getGamepads==='function' ?
        '🎮 Conecta el receptor y pulsa un botón del mando' :
        '🎮 Este navegador no admite mandos';
      if (state.textContent!==text)state.textContent=text;
      if (setup.open)info.textContent='No se detecta ningún mando. Revisa el receptor USB y pulsa un botón.';
      return;
    }
    indicator.classList.add('connected');
    const text = '🎮 Mando listo · palanca para elegir · A para aceptar';
    if (state.textContent!==text)state.textContent=text;
    if (setup.open && now-lastInfoAt>180) {
      const buttons=(g.buttons||[]).map((b,i)=>pressed(b)?i:null).filter(i=>i!==null);
      info.textContent=`Detectado: ${g.id || 'Mando USB'} · ${g.buttons.length} botones · `+
        `Pulsados: ${buttons.length?buttons.join(', '):'ninguno'} · `+
        `Palanca: ${(g.axes[0]||0).toFixed(2)}, ${(g.axes[1]||0).toFixed(2)}`;
      lastInfoAt=now;
    }
  }
  function frame(now) {
    const g = getPad();
    report(g,now);
    if (!g) {
      previousButtons=[];lastDirection='';currentPadId='';
      requestAnimationFrame(frame);return;
    }
    if (g.id!==currentPadId) {currentPadId=g.id;previousButtons=[];lastDirection='';}
    const buttons=Array.from(g.buttons||[],pressed);
    const edges=[];
    for (let i=0;i<buttons.length;i++) if (buttons[i]&&!previousButtons[i])edges.push(i);
    previousButtons=buttons;
    const dir=directionFor(g);
    if (edges.length || dir) enabled=true;
    if (waitingFor && edges.length) {
      controls[waitingFor]=edges[0];
      try {localStorage.setItem(STORE,JSON.stringify(controls));} catch (_) {}
      capture.textContent=`¡Listo! «${names[waitingFor]}» es ahora el botón ${edges[0]}.`;
      waitingFor=null;buildMappings();
      requestAnimationFrame(frame);return;
    }
    if (enabled && !waitingFor) {
      if (dir && (dir!==lastDirection || now>=nextDirectionAt)) {
        nearby(dir);nextDirectionAt=now+(dir!==lastDirection?280:170);
      }
      lastDirection=dir;
      // El botón de confirmar siempre se interpreta después de la navegación.
      for (const idx of edges) {
        if (idx===controls.volver) {back();break;}
        if (idx===controls.aceptar||idx===controls.alternativo) {accept();break;}
        if (idx===controls.principal) {primary();break;}
        if (idx===controls.anterior) {cycle(-1);break;}
        if (idx===controls.siguiente) {cycle(1);break;}
      }
    }
    requestAnimationFrame(frame);
  }
  // Tras una respuesta, el botón 'Continuar' aparece sin recargar el resto de la pantalla.
  // Se le da el foco automáticamente para avanzar con el mismo botón del mando.
  const gameRoot = document.getElementById('app');
  if (gameRoot) new MutationObserver(() => {
    if (!enabled || inDialog()) return;
    const next = document.querySelector('#next-row button');
    if (next && visible(next) && selected !== next) choose(next);
  }).observe(gameRoot,{childList:true,subtree:true});
  window.addEventListener('gamepaddisconnected',()=>{selected?.classList.remove('mp-gamepad-focus');selected=null;});
  window.addEventListener('gamepadconnected',()=>{enabled=true;});
  requestAnimationFrame(frame);
})();
