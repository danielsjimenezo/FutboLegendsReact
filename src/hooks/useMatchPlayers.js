// Hook personalizado para buscar coincidencias entre un jugador objetivo y una lista de jugadores
export const useMatchPlayers = () => {

  // 🔧 Función utilitaria para normalizar cadenas:
  // Convierte a minúsculas, elimina tildes y espacios innecesarios
  const normalize = (str = "") =>
    str
      .normalize("NFD") // Descompone caracteres con tilde
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .toLowerCase() // Convierte a minúsculas
      .trim(); // Elimina espacios extra

  // 🔍 Función que determina si un jugador candidato es una coincidencia del jugador objetivo
  const matchPlayer = (targetPlayer, candidate) => {
    // Normaliza el nombre completo del jugador objetivo (ej: "Lionel Messi")
    const targetName = normalize(targetPlayer.name);

    // Normaliza el país de nacimiento del jugador objetivo y candidato
    const targetCountry = normalize(targetPlayer.birthCountry || "");
    const candidateCountry = normalize(candidate?.player?.birth?.country || "");

    // Divide el nombre objetivo en partes para obtener nombre y apellido
    const targetParts = targetName.split(" ");
    const targetFirstName = targetParts[0] || ""; // ej: "Lionel"
    const targetLastName = targetParts.length > 1 ? targetParts.slice(-1)[0] : ""; // ej: "Messi"

    // Normaliza firstname, lastname y nombre corto (ej: "L. Messi") del jugador candidato
    const candidateFirstname = normalize(candidate?.player?.firstname || "");
    const candidateLastname = normalize(candidate?.player?.lastname || "");
    const candidateName = normalize(candidate?.player?.name || "");

    // Obtiene solo el primer nombre del candidato (ej: de "Lionel Andrés", toma "Lionel")
    const candidateFirstNameOnly = candidateFirstname.split(" ")[0];

    // ✅ Coincidencia por nombre + apellido completo
    const fullMatch =
      candidateFirstNameOnly === targetFirstName &&
      candidateLastname.includes(targetLastName);

    // ✅ Coincidencia por formato abreviado (ej: "L. Messi")
    const shortNameMatch = candidateName === `${targetFirstName[0]}. ${targetLastName}`;

    // ✅ Coincidencia exacta del nombre completo normalizado
    const exactNameMatch = candidateName === targetName;
    
    // ✅ Coincidencia exacta de País, ayuda a evitar falsos positivos cuando tienen el mismo apellido, pero no son la misma persona. El país es un criterio desambiguador importante.
    const countryMatches = candidateCountry === targetCountry;

    // ✅ Coinciden si el país también coincide y al menos uno de los nombres es válido
    return countryMatches && (fullMatch || shortNameMatch || exactNameMatch);
  };

  // 🔁 Filtra todos los jugadores que coincidan con el jugador objetivo
  const getMatchingPlayers = (targetPlayer, playerList) =>
    playerList?.filter((candidate) => matchPlayer(targetPlayer, candidate)) || [];

  // 🔁 Exporta la función para que pueda usarse en otros componentes
  return { getMatchingPlayers };
};
