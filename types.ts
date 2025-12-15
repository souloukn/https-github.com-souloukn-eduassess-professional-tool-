
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
  school: string; // Faculty
  university: string;
  department: string; // New: Department
  email: string;
  subject: string;
  level: string; // Grade/Level
  academicYear: string; // New: Academic Year
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
