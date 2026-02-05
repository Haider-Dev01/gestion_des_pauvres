const processMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
        return res.json({ response: "Bonjour ! Comment puis-je vous aider ?" });
    }
    const lowerMsg = message.toLowerCase();

    let response = "Je ne suis pas sûr de comprendre. Vous pouvez me demander des infos sur le stock, les dons, la distribution ou nos horaires.";

    if (lowerMsg.includes("bonjour") || lowerMsg.includes("salut") || lowerMsg.includes("coucou")) {
      response = "Bonjour ! Je suis l'assistant virtuel de l'association. Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerMsg.includes("aide") || lowerMsg.includes("help")) {
      response = "Je peux vous renseigner sur :\n- Faire un don (offres)\n- Consulter le stock\n- La distribution\n- Nos horaires et contact";
    } else if (lowerMsg.includes("stock") || lowerMsg.includes("disponible")) {
      response = "Vous pouvez consulter l'état actuel des stocks et leur localisation dans la section 'Suivi du Stock'.";
    } else if (lowerMsg.includes("offre") || lowerMsg.includes("don") || lowerMsg.includes("donner")) {
      response = "Merci pour votre générosité ! Pour faire un don, connectez-vous et allez dans 'Gestion des Offres' > 'Nouvelle Offre'.";
    } else if (lowerMsg.includes("redistribution") || lowerMsg.includes("distribuer")) {
      response = "La redistribution est gérée par nos administrateurs via l'onglet 'Redistribution'.";
    } else if (lowerMsg.includes("horaire") || lowerMsg.includes("ouverture") || lowerMsg.includes("quand")) {
        response = "Nos locaux sont ouverts du Lundi au Vendredi, de 9h à 18h.";
    } else if (lowerMsg.includes("contact") || lowerMsg.includes("telephone") || lowerMsg.includes("mail") || lowerMsg.includes("adresse")) {
        response = "Vous pouvez nous joindre au 01.02.03.04.05 ou par mail à contact@espoir.org. Notre adresse : 10 rue de la Paix.";
    } else if (lowerMsg.includes("urgence")) {
        response = "En cas d'urgence sociale, veuillez contacter le 115.";
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
