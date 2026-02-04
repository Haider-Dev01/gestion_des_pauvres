const processMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMsg = message.toLowerCase();

    let response =
      "Je ne comprends pas encore cette demande. Essayez 'aide', 'stock', 'offres', ou 'don'.";

    if (lowerMsg.includes("bonjour") || lowerMsg.includes("salut")) {
      response =
        "Bonjour ! Comment puis-je vous aider dans la gestion des dons aujourd'hui ?";
    } else if (lowerMsg.includes("aide")) {
      response =
        "Je peux vous aider à naviguer. Essayez de demander l'état du stock, comment faire une offre, ou des infos sur la redistribution.";
    } else if (lowerMsg.includes("stock")) {
      response =
        "Vous pouvez consulter l'état actuel des stocks dans la section 'Suivi du Stock'.";
    } else if (lowerMsg.includes("offre") || lowerMsg.includes("don")) {
      response =
        "Pour enregistrer un nouveau don, allez dans 'Gestion des Offres' et cliquez sur 'Nouvelle Offre'.";
    } else if (lowerMsg.includes("redistribution")) {
      response =
        "La redistribution se gère via l'onglet 'Redistribution'. Vous pouvez y affecter des dons aux bénéficiaires.";
    }

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Erreur du serveur de chat" });
  }
};

module.exports = {
  processMessage,
};
