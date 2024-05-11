export const filterNotesByStudentId = (professors, studiantId) => {
  let studentNotes = [];

  // Parcourir chaque professeur dans le tableau
  professors.forEach((professor) => {
    // Vérifier si le professeur a des évaluations
    if (professor.rating && Array.isArray(professor.rating)) {
      // Filtrer les évaluations du professeur pour l'étudiant donné
      const studentRatings = professor.rating.filter(
        (rating) => rating.studiantId === studiantId
      );

      // Ajouter les valueNote filtrées à la liste
      studentNotes.push(...studentRatings.map((rating) => rating.valueNote));
    }
  });

  return studentNotes;
};
