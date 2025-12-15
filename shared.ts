
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  points: number;
  maxAttempts: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  questions: Question[];
  durationMinutes: number;
  createdAt: number;
  accessCode: string;
}

export interface Teacher {
  id: string;
  name: string;
  school: string;
  university: string;
  department: string;
  email: string;
  subject: string;
  level: string;
  academicYear: string;
}

export interface Submission {
  id: string;
  examId: string;
  studentName: string;
  studentId: string;
  studentGender: string;
  answers: number[];
  score: number;
  totalPoints: number;
  timestamp: number;
  teacherInfo: Teacher;
}

export type ViewState = 'HOME' | 'TEACHER_DASHBOARD' | 'CREATE_EXAM' | 'EXAM_VIEW' | 'STUDENT_LOGIN' | 'STUDENT_TAKE_EXAM' | 'TEACHER_SETTINGS' | 'RESULTS' | 'TEACHER_GATE' | 'STUDENT_FIND_EXAM';

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    appName: "EduAssess",
    tagline: "Professional Student Evaluation",
    heroDesc: "The advanced evaluation platform developed by Mounkang Souloukna, expert geomatician.",
    teacherPortal: "Educator Portal",
    studentPortal: "Student Portal",
    backToDashboard: "Back to Dashboard",
    dashboard: "Dashboard",
    results: "Results",
    settings: "Settings",
    totalExams: "Total Exams",
    totalStudents: "Total Students",
    avgScore: "Avg. Score",
    createExam: "New Exam",
    yourExams: "Active Exams",
    noExams: "No exams yet.",
    createFirstExam: "Create your first exam",
    copyLink: "Copy Link",
    viewResults: "View Results",
    linkCopied: "Link copied to clipboard!",
    teacherProfile: "Educator Profile",
    fullName: "Full Name",
    facultyName: "Faculty",
    deptName: "Department",
    universityName: "University",
    academicYearLabel: "Academic Year",
    emailAddress: "Email",
    primarySubject: "Primary Subject",
    academicLevel: "Level / Class",
    saveProfile: "Save Settings",
    resetApp: "System Reset",
    examTitle: "Exam Title",
    instructions: "Instructions",
    optional: "Optional",
    addQuestion: "Add Question",
    remove: "Remove",
    saveExam: "Save Exam",
    cancel: "Cancel",
    question: "Question",
    option: "Option",
    startAssessment: "Start Assessment",
    finishSubmit: "Finish & Submit",
    progress: "Progress",
    score: "Score",
    percentage: "Percentage",
    date: "Date",
    student: "NOM ET PRÉNOMS",
    studentId: "MATRICULE",
    ccScore: "CC",
    participation: "Participation",
    finalGrade: "Note finale",
    submissionsReceived: "submissions",
    assessmentResults: "Assessment Archive",
    trackProgress: "Official results and academic records.",
    enterFullName: "Enter Full Name",
    goodLuck: "Good luck with your exam!",
    submissionComplete: "Submitted! Your grade:",
    uniqueCode: "Access Key",
    invalidCode: "Invalid Key. Access denied.",
    duplicateId: "This ID has already submitted.",
    duration: "Time (min)",
    timeRemaining: "Time Left",
    minutes: "min",
    accessCodeLabel: "Enter your educator access key",
    teacherAuthTitle: "Educator Login",
    studentAuthTitle: "Student Registration",
    examExpired: "Time limit reached! Submitting...",
    points: "Points",
    pointLabel: "pts",
    answerLocked: "Locked.",
    returnToHome: "Home",
    exitExam: "Exit",
    attemptsRemaining: "Attempts",
    returnBtn: "Back",
    findExam: "Locate Exam",
    enterExamCode: "Exam Access Code",
    examCodeDesc: "Enter the 6-character code from your teacher.",
    examNotFound: "Exam not found.",
    goBtn: "Join",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    developerCredit: "Developed by Mounkang Souloukna, expert geomatician",
    examCode: "Code",
    academicReport: "NOTE DE CONTRÔLE CONTINU"
  },
  fr: {
    appName: "EduAssess",
    tagline: "Évaluation Étudiante Professionnelle",
    heroDesc: "La plateforme d'évaluation avancée développée par Mounkang Souloukna, expert géomaticien.",
    teacherPortal: "Portail Éducateur",
    studentPortal: "Portail Étudiant",
    backToDashboard: "Retour au Tableau",
    dashboard: "Tableau de Bord",
    results: "Résultats",
    settings: "Paramètres",
    totalExams: "Total Examens",
    totalStudents: "Total Étudiants",
    avgScore: "Score Moyen",
    createExam: "Nouvel Examen",
    yourExams: "Examens Actifs",
    noExams: "Aucun examen.",
    createFirstExam: "Créez votre premier examen",
    copyLink: "Lien",
    viewResults: "Résultats",
    linkCopied: "Lien copié !",
    teacherProfile: "Profil Éducateur",
    fullName: "Nom Complet",
    facultyName: "Faculté",
    deptName: "Département",
    universityName: "Université",
    academicYearLabel: "Année académique",
    emailAddress: "Email",
    primarySubject: "Matière",
    academicLevel: "Niveau",
    saveProfile: "Enregistrer",
    resetApp: "Réinitialiser",
    examTitle: "Titre de l'Examen",
    instructions: "Instructions",
    optional: "Optionnel",
    addQuestion: "Ajouter Question",
    remove: "Supprimer",
    saveExam: "Enregistrer",
    cancel: "Annuler",
    question: "Question",
    option: "Option",
    startAssessment: "Démarrer",
    finishSubmit: "Terminer",
    progress: "Progression",
    score: "Score",
    percentage: "Pourcentage",
    date: "Date",
    student: "NOM ET PRÉNOMS",
    studentId: "MATRICULE",
    ccScore: "CC",
    participation: "Participation",
    finalGrade: "Note finale",
    submissionsReceived: "soumissions",
    assessmentResults: "Archive des Résultats",
    trackProgress: "Résultats officiels et dossiers académiques.",
    enterFullName: "Nom Complet",
    goodLuck: "Bonne chance !",
    submissionComplete: "Terminé ! Votre note :",
    uniqueCode: "Clé d'Accès",
    invalidCode: "Clé invalide.",
    duplicateId: "Déjà soumis.",
    duration: "Durée (min)",
    timeRemaining: "Temps Restant",
    minutes: "min",
    accessCodeLabel: "Entrez votre clé d'accès éducateur",
    teacherAuthTitle: "Connexion Éducateur",
    studentAuthTitle: "Inscription Étudiant",
    examExpired: "Temps écoulé ! Envoi...",
    points: "Points",
    pointLabel: "pts",
    answerLocked: "Verrouillé.",
    returnToHome: "Accueil",
    exitExam: "Quitter",
    attemptsRemaining: "Tentatives",
    returnBtn: "Retour",
    findExam: "Chercher Examen",
    enterExamCode: "Code de l'Examen",
    examCodeDesc: "Entrez le code à 6 caractères fourni par l'enseignant.",
    examNotFound: "Examen introuvable.",
    goBtn: "Rejoindre",
    gender: "Genre",
    male: "Masculin",
    female: "Féminin",
    other: "Autre",
    developerCredit: "Développé par Mounkang Souloukna, expert géomaticien",
    examCode: "Code",
    academicReport: "NOTE DE CONTRÔLE CONTINU"
  }
};

export const getTranslation = (lang: Language) => translations[lang];

const STORAGE_KEYS = {
  TEACHER: 'eduassess_teacher',
  EXAMS: 'eduassess_exams',
  SUBMISSIONS: 'eduassess_submissions',
};

export const storage = {
  getTeacher: (): Teacher | null => {
    const data = localStorage.getItem(STORAGE_KEYS.TEACHER);
    return data ? JSON.parse(data) : null;
  },
  saveTeacher: (teacher: Teacher) => {
    localStorage.setItem(STORAGE_KEYS.TEACHER, JSON.stringify(teacher));
  },
  getExams: (): Exam[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXAMS);
    return data ? JSON.parse(data) : [];
  },
  saveExam: (exam: Exam) => {
    const exams = storage.getExams();
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify([...exams, exam]));
  },
  getSubmissions: (): Submission[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return data ? JSON.parse(data) : [];
  },
  isIdUsedForExam: (studentId: string, examId: string): boolean => {
    const subs = storage.getSubmissions();
    return subs.some(s => s.studentId === studentId && s.examId === examId);
  },
  saveSubmission: (submission: Submission) => {
    const subs = storage.getSubmissions();
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify([...subs, submission]));
  },
  clearAll: () => {
    localStorage.clear();
  }
};
