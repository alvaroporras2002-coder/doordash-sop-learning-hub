(function () {
  const modules = {
    es: [
      ["outreach", "☎", "Outreach y preparación", "Organiza el contacto, el objetivo y el seguimiento antes de intervenir.", "Preparar una conversación útil y documentar el siguiente paso.", ["Revisa contexto, historial y métricas disponibles.", "Define un objetivo concreto para la conversación.", "Confirma el siguiente paso y registra el resumen."], "No prometas resultados, plazos o cambios sin validarlos.", "Redacta un resumen breve después de una llamada."],
      ["portal", "▥", "Lectura del Merchant Portal", "Aprende a encontrar señales antes de tomar una decisión.", "Identificar datos relevantes y convertirlos en preguntas.", ["Selecciona el periodo correcto.", "Compara tendencias, no un único dato.", "Separa síntomas de posibles causas."], "No atribuyas una causa basándote en una sola métrica.", "Explica qué dato cambiaría tu recomendación."],
      ["operations", "◫", "Operación y pedidos", "Analiza problemas de pedidos con un proceso consistente.", "Priorizar acciones que reduzcan fricción operacional.", ["Aclara cuándo ocurre el problema.", "Revisa el patrón y la frecuencia.", "Define responsable y seguimiento."], "Evita compartir información sensible en notas o capturas.", "Construye un checklist de diagnóstico."],
      ["menu", "☷", "Menú y tienda", "Usa claridad, disponibilidad y calidad visual para mejorar la experiencia.", "Reconocer mejoras de menú que un merchant puede validar.", ["Revisa nombres, descripciones y modificadores.", "Comprueba disponibilidad y horarios.", "Prioriza una mejora visible por vez."], "No edites precios ni configuraciones sin autorización.", "Propón una mejora concreta del menú."],
      ["tickets", "⌁", "Casos y tickets", "Documenta situaciones para que otra persona pueda continuar el trabajo.", "Escribir un resumen accionable y verificable.", ["Describe el problema de forma neutral.", "Incluye evidencia no sensible.", "Indica acción, responsable y fecha de seguimiento."], "No incluyas contraseñas, correos privados o datos internos.", "Convierte una nota confusa en un resumen claro."],
      ["media", "▧", "Fotos y contenido", "Evalúa el contenido visual desde la perspectiva de un cliente.", "Detectar oportunidades de calidad, cobertura y consistencia.", ["Revisa luz, enfoque y presentación.", "Prioriza productos principales.", "Comprueba que el contenido representa el producto real."], "No uses contenido sin permiso o información personal.", "Elige tres productos prioritarios para fotografiar."],
      ["promos", "✦", "Ads y promociones", "Conecta un objetivo de negocio con una prueba medible.", "Proponer una prueba con hipótesis y revisión.", ["Define objetivo y métrica principal.", "Elige una iniciativa simple.", "Fija fecha de revisión y aprendizaje."], "No presentes una promoción como garantía de ventas.", "Formula una hipótesis de campaña."],
      ["cofunding", "◇", "Co-funding y acuerdos", "Evalúa una propuesta con contexto, elegibilidad y documentación.", "Presentar opciones de forma transparente y responsable.", ["Confirma requisitos y políticas vigentes.", "Explica aporte, periodo y objetivo.", "Documenta aceptación y próximos pasos."], "No confirmes condiciones antes de la aprobación correspondiente.", "Prepara tres preguntas de descubrimiento."]
    ],
    en: [
      ["outreach", "☎", "Outreach and preparation", "Organize the conversation, goal, and follow-up before acting.", "Prepare a useful conversation and document the next step.", ["Review context, history, and available metrics.", "Set one specific conversation goal.", "Confirm the next step and log the summary."], "Do not promise outcomes, timing, or changes without validation.", "Write a short call recap."],
      ["portal", "▥", "Reading the Merchant Portal", "Find signals before making a decision.", "Identify useful data and turn it into questions.", ["Choose the correct time period.", "Compare trends, not a single number.", "Separate symptoms from possible causes."], "Do not assign a cause from one metric alone.", "Explain what data would change your recommendation."],
      ["operations", "◫", "Operations and orders", "Analyze order issues with a consistent process.", "Prioritize actions that reduce operational friction.", ["Clarify when the issue occurs.", "Review pattern and frequency.", "Set owner and follow-up."], "Avoid sensitive information in notes or screenshots.", "Build a diagnostic checklist."],
      ["menu", "☷", "Menu and store", "Use clarity, availability, and visual quality to improve the experience.", "Recognize menu improvements a merchant can validate.", ["Review names, descriptions, and modifiers.", "Check availability and hours.", "Prioritize one visible improvement at a time."], "Do not change prices or settings without authorization.", "Suggest one concrete menu improvement."],
      ["tickets", "⌁", "Cases and tickets", "Document situations so another person can continue the work.", "Write an actionable, verifiable summary.", ["Describe the issue neutrally.", "Include non-sensitive evidence.", "State action, owner, and follow-up date."], "Do not include passwords, private emails, or internal details.", "Turn a vague note into a clear summary."],
      ["media", "▧", "Photos and content", "Evaluate visual content from the customer perspective.", "Identify quality, coverage, and consistency opportunities.", ["Review lighting, focus, and presentation.", "Prioritize top products.", "Confirm content represents the actual item."], "Do not use content without permission or personal information.", "Choose three products to photograph first."],
      ["promos", "✦", "Ads and promotions", "Connect a business objective to a measurable test.", "Propose a test with a hypothesis and review.", ["Define goal and primary metric.", "Choose one simple initiative.", "Set a review date and learning."], "Do not present a promotion as a sales guarantee.", "Write a campaign hypothesis."],
      ["cofunding", "◇", "Co-funding and agreements", "Evaluate a proposal with context, eligibility, and documentation.", "Present options transparently and responsibly.", ["Confirm current requirements and policies.", "Explain contribution, period, and goal.", "Document approval and next steps."], "Do not confirm conditions before the appropriate approval.", "Prepare three discovery questions."]
    ],
    fr: [
      ["outreach", "☎", "Préparation et contact", "Organisez l’échange, l’objectif et le suivi avant d’agir.", "Préparer une conversation utile et documenter la prochaine étape.", ["Vérifiez le contexte, l’historique et les métriques.", "Définissez un objectif précis.", "Confirmez la prochaine étape et notez le résumé."], "Ne promettez pas de résultats ou de délais sans validation.", "Rédigez un bref résumé d’appel."],
      ["portal", "▥", "Lecture du Merchant Portal", "Trouvez les signaux avant de prendre une décision.", "Identifier les données utiles et les transformer en questions.", ["Choisissez la bonne période.", "Comparez les tendances, pas un seul chiffre.", "Séparez symptômes et causes possibles."], "N’attribuez pas une cause à une seule métrique.", "Expliquez quelle donnée changerait votre recommandation."],
      ["operations", "◫", "Opérations et commandes", "Analysez les problèmes de commande avec une méthode cohérente.", "Prioriser les actions qui réduisent les frictions.", ["Clarifiez quand le problème survient.", "Vérifiez la tendance et la fréquence.", "Définissez responsable et suivi."], "Évitez les informations sensibles dans les notes.", "Créez une checklist de diagnostic."],
      ["menu", "☷", "Menu et boutique", "Utilisez clarté, disponibilité et qualité visuelle.", "Reconnaître les améliorations de menu à valider.", ["Vérifiez noms, descriptions et options.", "Contrôlez disponibilité et horaires.", "Priorisez une amélioration visible à la fois."], "Ne modifiez pas prix ou paramètres sans autorisation.", "Proposez une amélioration précise."],
      ["tickets", "⌁", "Dossiers et tickets", "Documentez une situation pour permettre la continuité du travail.", "Rédiger un résumé clair et vérifiable.", ["Décrivez le problème de façon neutre.", "Ajoutez des preuves non sensibles.", "Indiquez action, responsable et date de suivi."], "N’ajoutez ni mots de passe ni données privées.", "Transformez une note vague en résumé clair."],
      ["media", "▧", "Photos et contenu", "Évaluez le contenu visuel du point de vue du client.", "Détecter les opportunités de qualité et cohérence.", ["Vérifiez lumière, netteté et présentation.", "Priorisez les produits vedettes.", "Confirmez que le contenu représente le produit réel."], "N’utilisez pas de contenu sans permission.", "Choisissez trois produits à photographier."],
      ["promos", "✦", "Publicité et promotions", "Reliez un objectif commercial à un test mesurable.", "Proposer un test avec hypothèse et revue.", ["Définissez objectif et métrique principale.", "Choisissez une initiative simple.", "Fixez une date de revue."], "Ne présentez pas une promotion comme une garantie.", "Rédigez une hypothèse de campagne."],
      ["cofunding", "◇", "Co-financement et accords", "Évaluez une proposition avec contexte et documentation.", "Présenter les options avec transparence.", ["Confirmez critères et politiques actuelles.", "Expliquez contribution, période et objectif.", "Documentez approbation et prochaines étapes."], "Ne confirmez pas de conditions sans approbation.", "Préparez trois questions de découverte."]
    ]
  };

  const copy = {
    es: {
      nav: ["Inicio", "Rutas de aprendizaje", "Simulador de casos", "Biblioteca SOP", "Mi progreso"],
      hero: ["SOP interactivo · ES / EN / FR", "Convierte cada", "caso en una decisión clara.", "Una experiencia didáctica para preparar, analizar, resolver y dar seguimiento.", "Explorar la ruta", "Resolver un caso"],
      labels: ["Módulos", "casos prácticos", "minutos de aprendizaje", "Comenzar", "Ver módulo", "Objetivo", "Proceso guiado", "Evita esto", "Práctica recomendada"],
      credits: ["Proyecto SOP desarrollado por Zaret Castillo", "Estructura y arquitectura de la página por Alvaro Porras"],
      cases: [
        ["Caída de pedidos", "Un merchant indica que sus pedidos bajaron durante la semana. ¿Cuál es el mejor primer paso?", ["Prometer una promoción inmediatamente.", "Revisar periodo, tendencia y posibles cambios antes de recomendar.", "Cambiar el menú sin confirmación."], 1, "Primero hay que entender la señal y el contexto."],
        ["Producto no disponible", "Un producto principal aparece no disponible repetidamente. ¿Qué debes verificar?", ["Disponibilidad, horarios, patrón y responsable.", "Solo el número total de pedidos.", "Únicamente las fotos."], 0, "La disponibilidad requiere revisar configuración y operación."],
        ["Solicitud de apoyo", "Un merchant solicita apoyo promocional. ¿Qué respuesta es responsable?", ["Confirmar el beneficio sin revisión.", "Explicar que se revisarán requisitos y opciones vigentes.", "Garantizar resultados de ventas."], 1, "La elegibilidad y las condiciones deben validarse."]
      ]
    },
    en: {
      nav: ["Home", "Learning paths", "Case simulator", "SOP library", "My progress"],
      hero: ["Interactive SOP · ES / EN / FR", "Turn every", "case into a clear decision.", "A learning experience to prepare, analyze, solve, and follow up.", "Explore the path", "Solve a case"],
      labels: ["Modules", "practice cases", "learning minutes", "Start", "View module", "Objective", "Guided process", "Watch out", "Recommended practice"],
      credits: ["SOP Project developed by Zaret Castillo", "Page structure and architecture by Alvaro Porras"],
      cases: [
        ["Order decline", "A merchant says orders dropped this week. What is the best first step?", ["Promise a promotion immediately.", "Review period, trend, and changes before recommending.", "Change the menu without confirmation."], 1, "Start by understanding the signal and context."],
        ["Unavailable item", "A key item is repeatedly unavailable. What should you check?", ["Availability, hours, pattern, and owner.", "Only total orders.", "Only photos."], 0, "Availability requires configuration and operations review."],
        ["Support request", "A merchant requests promotional support. What is responsible?", ["Confirm the benefit without review.", "Explain that current requirements and options will be reviewed.", "Guarantee sales results."], 1, "Eligibility and conditions must be validated."]
      ]
    },
    fr: {
      nav: ["Accueil", "Parcours", "Simulateur de cas", "Bibliothèque SOP", "Mon progrès"],
      hero: ["SOP interactif · ES / EN / FR", "Transformez chaque", "cas en décision claire.", "Une expérience pour préparer, analyser, résoudre et assurer le suivi.", "Explorer le parcours", "Résoudre un cas"],
      labels: ["Modules", "cas pratiques", "minutes d’apprentissage", "Commencer", "Voir le module", "Objectif", "Processus guidé", "À éviter", "Pratique recommandée"],
      credits: ["Projet SOP développé par Zaret Castillo", "Structure et architecture de la page par Alvaro Porras"],
      cases: [
        ["Baisse de commandes", "Un merchant signale une baisse cette semaine. Quelle est la première étape ?", ["Promettre une promotion immédiatement.", "Vérifier période, tendance et changements avant de recommander.", "Modifier le menu sans confirmation."], 1, "Commencez par comprendre le signal et le contexte."],
        ["Produit indisponible", "Un produit vedette est souvent indisponible. Que vérifier ?", ["Disponibilité, horaires, tendance et responsable.", "Seulement le total de commandes.", "Seulement les photos."], 0, "Il faut revoir configuration et opérations."],
        ["Demande de soutien", "Un merchant demande un soutien promotionnel. Quelle réponse est responsable ?", ["Confirmer sans vérification.", "Expliquer que les critères et options seront vérifiés.", "Garantir des ventes."], 1, "Les critères et conditions doivent être validés."]
      ]
    }
  };

  function makeModules(language) {
    return modules[language].map((item, index) => ({
      id: item[0], icon: item[1], number: String(index + 1).padStart(2, "0"),
      minutes: [8, 10, 9, 8, 9, 7, 10, 9][index],
      title: item[2], summary: item[3], objective: item[4],
      steps: item[5], watchOut: item[6], action: item[7]
    }));
  }

  function makeQuiz(language) {
    const questions = {
      es: ["¿Qué debes hacer antes de recomendar una acción?", "¿Qué ayuda a entender una tendencia?", "¿Qué nunca debe incluirse en una nota?", "¿Qué debe tener un seguimiento?", "¿Cómo se presenta una promoción?", "¿Qué revisas primero ante un problema?", "¿Qué protege la claridad de un menú?", "¿Cuál es una buena práctica de ticket?", "¿Qué confirma una buena decisión?", "¿Qué debe revisarse antes de un acuerdo?"],
      en: ["What should happen before recommending an action?", "What helps explain a trend?", "What must never be in a note?", "What should follow-up include?", "How should a promotion be presented?", "What do you check first in an issue?", "What supports a clear menu?", "What is good ticket practice?", "What confirms a good decision?", "What must be reviewed before an agreement?"],
      fr: ["Que faire avant de recommander une action ?", "Qu’est-ce qui explique une tendance ?", "Que ne faut-il jamais mettre dans une note ?", "Que doit inclure le suivi ?", "Comment présenter une promotion ?", "Que vérifier d’abord face à un problème ?", "Qu’est-ce qui rend un menu clair ?", "Quelle est une bonne pratique de ticket ?", "Qu’est-ce qui confirme une bonne décision ?", "Que vérifier avant un accord ?"]
    };

    const options = {
      es: ["Revisar contexto y datos", "Prometer un resultado", "Ignorar el seguimiento"],
      en: ["Review context and data", "Promise an outcome", "Ignore follow-up"],
      fr: ["Vérifier contexte et données", "Promettre un résultat", "Ignorer le suivi"]
    };

    return questions[language].map((question, index) => ({
      id: `q${index + 1}`,
      question,
      options: [options[language][0], options[language][1], options[language][2]],
      answer: 0,
      explanation: options[language][0]
    }));
  }

  window.SOP_CONTENT = {};

  ["es", "en", "fr"].forEach((language) => {
    const t = copy[language];

    window.SOP_CONTENT[language] = {
      language,
      ui: {
        navHome: t.nav[0], navLearn: t.nav[1], navCases: t.nav[2],
        navLibrary: t.nav[3], navProgress: t.nav[4],
        guest: language === "es" ? "Modo invitado" : language === "en" ? "Guest mode" : "Mode invité",
        signIn: language === "es" ? "Iniciar sesión con Google" : language === "en" ? "Sign in with Google" : "Se connecter avec Google",
        signOut: language === "es" ? "Cerrar sesión" : language === "en" ? "Sign out" : "Se déconnecter",
        completed: language === "es" ? "Completado" : language === "en" ? "Completed" : "Terminé",
        continue: language === "es" ? "Continuar" : language === "en" ? "Continue" : "Continuer"
      },
      hero: t.hero,
      labels: t.labels,
      credits: t.credits,
      modules: makeModules(language),
      cases: t.cases.map((item, index) => ({
        id: `case-${index + 1}`, title: item[0], question: item[1],
        options: item[2], answer: item[3], explanation: item[4]
      })),
      resources: makeModules(language).slice(0, 6),
      quiz: makeQuiz(language)
    };
  });
})();
