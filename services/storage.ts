
import { Exam, Submission, Teacher } from '../types';

const KEYS = {
  TEACHER: 'eduassess_teacher',
  EXAMS: 'eduassess_exams',
  SUBMISSIONS: 'eduassess_submissions',
};

export const storage = {
  getTeacher: (): Teacher | null => {
    const data = localStorage.getItem(KEYS.TEACHER);
    return data ? JSON.parse(data) : null;
  },
  saveTeacher: (teacher: Teacher) => {
    localStorage.setItem(KEYS.TEACHER, JSON.stringify(teacher));
  },
  getExams: (): Exam[] => {
    const data = localStorage.getItem(KEYS.EXAMS);
    return data ? JSON.parse(data) : [];
  },
  saveExam: (exam: Exam) => {
    const exams = storage.getExams();
    localStorage.setItem(KEYS.EXAMS, JSON.stringify([...exams, exam]));
  },
  getSubmissions: (): Submission[] => {
    const data = localStorage.getItem(KEYS.SUBMISSIONS);
    return data ? JSON.parse(data) : [];
  },
  isIdUsedForExam: (studentId: string, examId: string): boolean => {
    const subs = storage.getSubmissions();
    return subs.some(s => s.studentId === studentId && s.examId === examId);
  },
  saveSubmission: (submission: Submission) => {
    const subs = storage.getSubmissions();
    localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify([...subs, submission]));
  },
  clearAll: () => {
    localStorage.clear();
  }
};
