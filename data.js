/* Contenido original en español: paráfrasis, nunca citas textuales. */
const row=(text,answer,why)=>({text,answer,why});
const DATA={
 lab:[
 row('La bola azul se mueve después del choque.','Observación','Percibimos movimientos y sucesión temporal; no una fuerza necesaria como impresión separada.'),
 row('Tras varios choques semejantes, espero que vuelva a moverse.','Hábito','La repetición genera una expectativa: la mente pasa de un acontecimiento al otro.'),
 row('Veo que el efecto no podría dejar de ocurrir en ningún caso.','Necesidad no demostrada','Ninguna observación aislada ni repetida muestra esa imposibilidad absoluta.'),
 row('En los ensayos registrados, el contacto fue seguido de movimiento.','Observación','La conjunción observada se limita a los casos examinados.'),
 row('Confío en que el próximo choque tendrá un resultado parecido.','Hábito','La confianza práctica no equivale a una demostración lógica del futuro.'),
 row('La repetición demuestra que el futuro será necesariamente igual.','Necesidad no demostrada','Usar el pasado para justificar la uniformidad futura presupone lo que se quiere justificar.'),
 row('La lámpara se encendió después de pulsar el botón.','Observación','Es una sucesión percibida; por sí sola no demuestra un vínculo necesario.'),
 row('Espero luz al pulsar de nuevo porque así ocurrió muchas veces.','Hábito','La expectativa se explica por la costumbre formada en experiencias semejantes.'),
 row('La necesidad que une botón y luz es directamente visible.','Necesidad no demostrada','Observamos los acontecimientos, no la conexión necesaria misma.'),
 row('Oigo un sonido después de tocar la campana.','Observación','Escuchamos el sonido y vemos la acción: acontecimientos experimentados.'),
 row('Anticipo otro sonido al ver acercarse el badajo.','Hábito','La transición mental aprendida explica la anticipación.'),
 row('La campana jamás podría dejar de sonar, por pura lógica.','Necesidad no demostrada','Lo contrario de una cuestión de hecho es concebible sin contradicción lógica.')],
 prediction:[
 row('Es razonable en la vida práctica esperar otro resultado semejante.','Expectativa práctica','Hume explica nuestras expectativas por el hábito; no exige abandonar la investigación empírica.'),
 row('La secuencia pasada demuestra lógicamente el siguiente resultado.','Certeza excesiva','Una serie finita de observaciones no demuestra la uniformidad del futuro.'),
 row('Si falla la predicción, la ciencia deja de tener toda utilidad.','Certeza excesiva','La crítica de la fundamentación deductiva no elimina la utilidad de contrastar y revisar predicciones.'),
 row('Podemos revisar nuestras expectativas ante nuevas experiencias.','Expectativa práctica','La experiencia guía las inferencias prácticas, aunque no dé garantía deductiva.'),
 row('Acertar esta vez prueba que nunca habrá excepciones.','Certeza excesiva','Un acierto añade un caso; no constituye una prueba de necesidad universal.'),
 row('Más observaciones pueden apoyar una expectativa sin hacerla infalible.','Expectativa práctica','El apoyo empírico y la certeza demostrativa son distintos.'),
 row('La naturaleza debe repetir el patrón porque antes lo repitió.','Certeza excesiva','Ese argumento utiliza ya la inferencia del pasado al futuro que está en discusión.'),
 row('La costumbre explica mi confianza, aunque no sea una demostración.','Expectativa práctica','Es la solución escéptica de Hume: una explicación natural de la creencia.')],
 categories:[
 row('Unidad','Cantidad','Pensar lo múltiple bajo la determinación de uno.'),row('Pluralidad','Cantidad','Pensar una multiplicidad; no exige reunirla como un todo.'),row('Totalidad','Cantidad','La pluralidad considerada como unidad de un todo.'),
 row('Realidad','Cualidad','Determinación positiva del contenido; aquí no significa existencia.'),row('Negación','Cualidad','Negación de una determinación real.'),row('Limitación','Cualidad','Una realidad determinada mediante negación: no es una cantidad ilimitada.'),
 row('Sustancia: inherencia y subsistencia','Relación','Relación entre lo que subsiste y sus determinaciones inherentes.'),row('Causalidad y dependencia','Relación','Relación de causa y efecto bajo una regla.'),row('Comunidad o acción recíproca','Relación','Interacción recíproca entre sustancias; no significa comunidad social.'),
 row('Posibilidad / imposibilidad','Modalidad','Relación con las condiciones de la experiencia posible.'),row('Existencia / no existencia','Modalidad','No añade una propiedad real al concepto del objeto.'),row('Necesidad / contingencia','Modalidad','La necesidad no equivale a una sensación subjetiva de seguridad.'),
 row('Espacio','No es categoría','Es una forma a priori de la sensibilidad externa.'),row('Tiempo','No es categoría','Es una forma a priori de la sensibilidad, no una categoría del entendimiento.'),row('Costumbre','No es categoría','Es central en la explicación humeana de la inferencia causal, no en la tabla kantiana.'),row('Imaginación','No es categoría','Tiene funciones en la síntesis, pero no es una de las doce categorías.'),row('Felicidad','No es categoría','Es una noción relevante en la filosofía práctica, no una categoría.'),row('Intuición','No es categoría','Es una representación inmediata y singular; no una categoría.'),row('Alma','No es categoría','El alma como sustancia simple es tema de la psicología racional, no una categoría.'),row('Dios','No es categoría','Es una idea de la razón, no una categoría del entendimiento.')],
 frontier:[
 row('Investigar un planeta todavía no visto mediante sus efectos observables.','Experiencia posible','No visto no significa suprasensible: una hipótesis puede referirse a fenómenos comprobables indirectamente.'),
 row('Buscar causas naturales para un cambio de temperatura.','Experiencia posible','La causalidad tiene uso objetivo en el ámbito de la experiencia posible.'),
 row('Medir distancias y duraciones de un experimento.','Experiencia posible','Espacio y tiempo estructuran nuestra experiencia; no son propiedades conocidas de cosas en sí.'),
 row('Demostrar una primera causa suprasensible aplicando la causalidad más allá del mundo empírico.','Excede el conocimiento','La categoría no permite conocer objetos fuera de las condiciones de la experiencia posible.'),
 row('Del «yo pienso» deducir que el alma es una sustancia simple e inmortal.','Excede el conocimiento','La unidad de apercepción no proporciona una intuición del alma como cosa en sí.'),
 row('Probar la existencia de Dios porque la existencia perfecciona su concepto.','Excede el conocimiento','La existencia no es un predicado real que amplíe el concepto: no se deduce de él un objeto existente.'),
 row('Buscar la máxima unidad sistemática de las leyes naturales sin afirmar que conocemos su fundamento suprasensible.','Uso regulativo','La razón orienta la investigación hacia la unidad, sin constituir conocimiento de un objeto trascendente.'),
 row('Investigar las conexiones de la naturaleza como si formasen un sistema unitario.','Uso regulativo','El «como si» orienta la investigación; no demuestra un diseñador divino.'),
 row('Tratar la idea de alma como guía de unidad de los fenómenos internos, sin probar una sustancia simple.','Uso regulativo','La idea organiza la investigación psicológica; no autoriza una psicología racional constitutiva.'),
 row('Conocer teóricamente la libertad trascendental como un objeto medible.','Excede el conocimiento','La libertad trascendental no es objeto de experiencia; su papel práctico es distinto de una prueba teórica.'),
 row('Afirmar que conocemos el espacio como propiedad de las cosas en sí.','Excede el conocimiento','La idealidad trascendental del espacio es compatible con su realidad empírica.'),
 row('Estudiar regularidades de los procesos mentales en la experiencia interna.','Experiencia posible','El estudio empírico no demuestra por sí mismo la simplicidad o inmortalidad del alma.'),
 row('Conocer el mundo como totalidad completa dada y decidir por esa vía si tiene comienzo absoluto.','Excede el conocimiento','Tratar la totalidad incondicionada como objeto dado conduce a la antinomia; no equivale a estudiar un período cósmico empírico.'),
 row('Buscar leyes cada vez más generales sin declarar alcanzada una explicación absoluta.','Uso regulativo','La unidad sistemática puede funcionar como horizonte de investigación.')],
 voices:[
 row('La conexión necesaria no se presenta como una impresión externa entre acontecimientos.','Hume','Hume distingue los acontecimientos observados de la necesidad que atribuimos a su conexión.'),
 row('La causalidad es una categoría a priori del entendimiento.','Kant','Es condición de una experiencia objetiva de la sucesión, no una generalización por hábito.'),
 row('El conocimiento de objetos requiere condiciones trascendentales.','Kant','La sensibilidad y el entendimiento hacen posible nuestra experiencia objetiva.'),
 row('Las tensiones internas de una determinación pueden impulsar su desarrollo conceptual.','Hegel','La transición debe surgir del contenido, no de oponer arbitrariamente una opinión.'),
 row('La costumbre explica el paso de la experiencia pasada a la expectativa futura.','Hume','La creencia causal se explica naturalmente sin convertirla en una demostración deductiva.'),
 row('La superación niega una forma limitada y conserva momentos de ella.','Hegel','Aufhebung no equivale a destrucción total ni a compromiso entre dos opiniones.'),
 row('El «yo pienso» no prueba que el alma sea una sustancia simple.','Kant','La condición formal de la experiencia no es conocimiento metafísico del alma.'),
 row('Las impresiones suelen distinguirse de las ideas por su fuerza y vivacidad.','Hume','Las ideas son percepciones menos vivaces; no es una oposición entre objetos reales e irreales.'),
 row('Las relaciones de ideas son distintas de las cuestiones de hecho.','Hume','La negación de una cuestión de hecho no implica contradicción lógica.'),
 row('Espacio y tiempo son formas a priori de la sensibilidad.','Kant','No son categorías ni aprendemos su estructura formal solamente por repetición.'),
 row('La oposición fija entre pensamiento y cosa en sí debe ser examinada críticamente.','Hegel','Hegel cuestiona que esa separación pueda funcionar como límite definitivo del conocimiento.'),
 row('Las determinaciones del pensamiento no son solo una rejilla subjetiva ajena a lo real.','Hegel','La lógica hegeliana tiene alcance ontológico; no dice que imaginar algo lo haga existir.')],
 dialectic:[
 {name:'El puente del devenir',intro:'Reconstruye un movimiento lógico, no una historia sobre el origen físico del universo.',steps:['Pensar el ser puro, sin determinación alguna.','Reconocer que esa completa indeterminación no ofrece contenido que lo distinga de la nada pura.','Pensar el devenir como unidad móvil de ser y nada.'],negate:'La autosuficiencia de ser y nada tomados aisladamente.',keep:'Ser y nada como momentos distinguibles del devenir.',transform:'La oposición inmóvil pasa a comprenderse como movimiento conceptual.',why:'El ser puro no es una cosa concreta. El devenir no mezcla dos objetos: expresa el tránsito de estas determinaciones abstractas.'},
 {name:'El puente de lo finito',intro:'Versión introductoria del problema de la mala infinitud. No se trata de sumar objetos sin fin.',steps:['Contraponer lo finito a un infinito situado completamente más allá.','Advertir que ese más allá queda limitado por lo finito que excluye.','Reconsiderar el infinito como superación de esa oposición, incluyendo lo finito como momento.'],negate:'La separación rígida entre lo finito y un más allá exterior.',keep:'La determinación de lo finito como momento, no como absoluto independiente.',transform:'La relación entre finito e infinito se vuelve interna, no una huida interminable.',why:'La mala infinitud repite un más allá. Su crítica exige revisar la oposición misma, no encontrar el último número.'},
 {name:'El puente de la certeza sensible',intro:'Adaptación introductoria de la Fenomenología del espíritu: alguien intenta expresar un «ahora» puramente singular.',steps:['Pretender expresar lo singular inmediato diciendo «ahora».','Advertir que «ahora» puede designar muchos momentos distintos y tiene un carácter universal.','Reconocer la mediación conceptual implicada en lo que parecía pura inmediatez.'],negate:'La pretensión de expresar lo singular sin mediación alguna.',keep:'El contenido sensible como momento del conocer.',transform:'La certeza se revisa al reconocer la mediación de lo universal.',why:'No se elimina toda experiencia sensible. Se examina la pretensión de que lo inmediato constituya por sí solo la verdad completa.'}
 ],
 tribunal:[
 {title:'Escudo I · La regularidad',prompt:'Una estación registró el mismo patrón durante cien días. Une cada argumento con su perspectiva.',rows:[
 row('El registro apoya una expectativa, pero no demuestra por lógica que mañana se repetirá.','Hume','La regularidad pasada no elimina el problema de la inducción.'),
 row('Para experimentar objetivamente cambios, el entendimiento los ordena bajo la categoría de causalidad.','Kant','Esto no vuelve infalible una predicción meteorológica concreta.'),
 row('Examinemos si los conceptos con que oponemos pensamiento y mundo revelan tensiones internas.','Hegel','Es una pregunta sobre el desarrollo de las determinaciones, no un pronóstico del clima.') ]},
 {title:'Escudo II · Detecta la confusión',prompt:'Clasifica las objeciones: ¿son precisas o deforman la posición?',rows:[
 row('La tesis de Kant no demuestra a priori cada ley empírica particular.','Objeción precisa','Hay que investigar empíricamente qué causas y leyes particulares operan.'),
 row('Hume afirma que nunca debemos usar la ciencia porque no predice con necesidad lógica.','Deformación','La crítica de la certeza deductiva es compatible con investigación, expectativas y vida práctica.'),
 row('Hegel permite afirmar cualquier contradicción arbitraria como verdadera.','Deformación','La contradicción dialéctica requiere un desarrollo determinado del contenido.'),
 row('El límite kantiano del conocer no convierte a los fenómenos en ilusiones.','Objeción precisa','El idealismo trascendental es compatible con el realismo empírico.') ]},
 {title:'Núcleo · Conecta las respuestas',prompt:'Reconstruye la relación entre problema y respuesta.',rows:[
 row('¿Qué explica nuestra expectativa de repetición según Hume?','Costumbre','Una explicación del hábito no es una deducción del futuro.'),
 row('¿Qué hace posible ordenar objetivamente acontecimientos en Kant?','Condiciones a priori','La experiencia requiere formas de sensibilidad y categorías.'),
 row('¿Cómo se revisa una determinación unilateral en Hegel?','Negación determinada','La crítica surge de su contenido y conserva momentos en una nueva determinación.') ]}
 ]};
const GAMES=[
 {name:'El laboratorio de Hume',short:'Laboratorio',author:'Hume',icon:'◉',color:'mint',summary:'La experiencia muestra acontecimientos y regularidades. No percibimos en ellos una conexión necesaria; el hábito explica la transición de la mente hacia el efecto esperado.'},
 {name:'La máquina de las predicciones',short:'Predicciones',author:'Hume',icon:'⚙',color:'mint',summary:'El pasado sostiene expectativas prácticas, pero no demuestra lógicamente el futuro. Hume no cancela la utilidad de investigar, contrastar y corregir nuestras creencias.'},
 {name:'La fábrica de categorías de Kant',short:'Categorías',author:'Kant',icon:'▦',color:'blue',summary:'Las doce categorías se agrupan en cantidad, cualidad, relación y modalidad. Espacio y tiempo son formas de la sensibilidad; alma y Dios no son categorías.'},
 {name:'La frontera del conocimiento',short:'Frontera',author:'Kant',icon:'◇',color:'blue',summary:'Conocemos fenómenos, incluidos objetos inferidos indirectamente. Las ideas pueden orientar la investigación sin dar conocimiento teórico suprasensible. Lo invisible no equivale a noúmeno.'},
 {name:'El desafío dialéctico de Hegel',short:'Dialéctica',author:'Hegel',icon:'⌘',color:'pink',summary:'La negación determinada parte de una insuficiencia concreta. La superación niega y conserva; no aplica una fórmula externa ni combina opiniones por compromiso.'},
 {name:'¿Quién dijo qué?',short:'Encuentro',author:'Comparación',icon:'☷',color:'gold',summary:'Estas son paráfrasis, no citas. Hume explica la inferencia por hábito; Kant estudia las condiciones de la experiencia; Hegel examina el desarrollo de las determinaciones conceptuales.'},
 {name:'El tribunal de la metafísica',short:'Tribunal',author:'Final',icon:'♜',color:'gold',summary:'Las tres perspectivas no son intercambiables: explicar una creencia, justificar condiciones del conocimiento y desarrollar dialécticamente los conceptos son tareas diferentes.'}
];
if(typeof module!=='undefined') module.exports={DATA,GAMES};
DATA.frontier.push(
 row('Formular el juicio empírico «esta piedra se ha calentado» y contrastarlo.','Experiencia posible','Es un juicio sintético a posteriori: se apoya en la experiencia.'),
 row('Aplicar a los acontecimientos el principio de que todo cambio ocurre según una regla causal.','Experiencia posible','Para Kant es un principio sintético a priori de la experiencia, no una descripción de las cosas en sí.'),
 row('Concluir que la libertad es imposible porque todo fenómeno está sujeto a causalidad natural.','Excede el conocimiento','La causalidad natural rige los fenómenos; no decide por sí sola la cuestión de la libertad trascendental. Esto no prueba teóricamente que seamos libres.')
);
DATA.tribunal[0].rows.push(
 row('Concebir un resultado diferente mañana no implica contradicción lógica.','Hume','Las cuestiones de hecho se distinguen de las relaciones de ideas.'),
 row('Los fenómenos son empíricamente reales, aunque no conozcamos las cosas tal como son en sí.','Kant','El idealismo trascendental no niega la realidad empírica de la naturaleza.'),
 row('El resultado de una crítica conceptual conserva determinaciones del punto de partida transformándolas.','Hegel','La negación determinada no deja una nada abstracta.')
);
DATA.tribunal[1].rows.push(
 row('No ver directamente un objeto no basta para llamarlo noúmeno.','Objeción precisa','Un objeto puede investigarse indirectamente dentro de la experiencia posible.'),
 row('La categoría kantiana de realidad es exactamente lo mismo que existencia.','Deformación','Realidad pertenece a cualidad; existencia pertenece a modalidad.'),
 row('La dialéctica de Hegel es siempre un compromiso entre dos opiniones.','Deformación','Las transiciones deben justificarse por el contenido, no por un acuerdo externo.'),
 row('El uso regulativo de una idea no constituye una prueba de un objeto suprasensible.','Objeción precisa','Una orientación de la investigación es distinta de conocimiento teórico constitutivo.')
);
DATA.tribunal[2].rows.push(
 row('¿Qué permite explicar la anticipación causal humeana sin deducir el futuro?','Costumbre','La repetición modifica la disposición de la mente a esperar el efecto.'),
 row('¿Qué investiga Kant al preguntar cómo es posible una experiencia objetiva?','Condiciones a priori','Su investigación no se limita a reunir observaciones psicológicas sobre hábitos.'),
 row('¿Qué nombre recibe una negación cuyo resultado depende del contenido negado?','Negación determinada','Conserva una relación interna con lo que niega, en lugar de descartar todo sin más.')
);
