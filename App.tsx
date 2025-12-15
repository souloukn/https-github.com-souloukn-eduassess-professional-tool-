import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  PlusCircle, 
  Settings, 
  Users, 
  LogOut, 
  Share2, 
  FileText, 
  TrendingUp, 
  Download, 
  BookOpen, 
  Lock, 
  User, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  Hash, 
  School, 
  Building2, 
  CalendarDays,
  Sparkles
} from 'lucide-react';
import { storage, Language, ViewState, Teacher, Exam, Submission, Question, getTranslation } from './shared';
import { exportResults } from './services/export';

const TEACHER_ACCESS_CODE = "EDU-TEACH-2025";
const UPM_LOGO_URL = "https://raw.githubusercontent.com/AI-Gen-Assets/logos/main/upm_tchad_logo.png";

const AnimatedCard = ({ children, className = "", onClick, delay = 0 }: any) => (
  <div 
    onClick={onClick} 
    style={{ animationDelay: `${delay}ms` }}
    className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-xl hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0 ${className}`}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  const base = "px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50";
  const variants: any = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 shadow-lg",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 shadow-lg"
  };
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = getTranslation(lang);
  return (
    <footer className="mt-auto py-12 px-6 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <GraduationCap className="w-5 h-5" />
          <span className="font-bold text-sm tracking-tight uppercase">{t.appName}</span>
        </div>
        <div className="text-slate-400 text-xs font-medium text-center md:text-right">
          <p>{t.developerCredit}</p>
          <p className="mt-1 opacity-60">© {new Date().getFullYear()} - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('eduassess_lang') as Language) || 'fr');
  const [view, setView] = useState<ViewState>('HOME');
  const [teacher, setTeacher] = useState<Teacher | null>(storage.getTeacher());
  const [exams, setExams] = useState<Exam[]>(storage.getExams());
  const [submissions, setSubmissions] = useState<Submission[]>(storage.getSubmissions());
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [studentSession, setStudentSession] = useState<{name: string, id: string, gender: string} | null>(null);

  const t = getTranslation(lang);

  useEffect(() => {
    localStorage.setItem('eduassess_lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/exam/')) {
        const id = hash.replace('#/exam/', '');
        const target = storage.getExams().find(e => e.id === id || e.accessCode === id);
        if (target) {
          setActiveExamId(target.id);
          setView('STUDENT_LOGIN');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Teacher = {
      id: teacher?.id || crypto.randomUUID(),
      name: fd.get('name') as string,
      school: fd.get('school') as string,
      university: fd.get('university') as string,
      department: fd.get('department') as string,
      email: fd.get('email') as string,
      subject: fd.get('subject') as string,
      level: fd.get('level') as string,
      academicYear: fd.get('academicYear') as string,
    };
    storage.saveTeacher(data);
    setTeacher(data);
    setView('TEACHER_DASHBOARD');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdff] font-['Inter']">
      <nav className="glass sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('HOME')}>
          <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">{t.appName}</span>
            <div className="h-0.5 w-0 group-hover:w-full bg-indigo-600 transition-all duration-300"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 rounded-full p-1">
            <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>EN</button>
            <button onClick={() => setLang('fr')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'fr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>FR</button>
          </div>
          {teacher && view !== 'STUDENT_TAKE_EXAM' && (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <button onClick={() => setView('TEACHER_SETTINGS')} className="p-2 hover:bg-slate-100 rounded-full"><Settings className="w-5 h-5 text-slate-400" /></button>
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">{teacher.name.charAt(0)}</div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
        {view === 'HOME' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-16">
            <div className="space-y-6 max-w-3xl">
              <img src={UPM_LOGO_URL} alt="UPM Logo" className="w-24 h-24 mx-auto mb-8 animate-bounce" />
              <h1 className="text-6xl font-[900] text-slate-900 leading-tight">
                {lang === 'en' ? 'Official ' : 'Portail '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
                  {lang === 'en' ? 'Evaluation' : 'Évaluation'}
                </span>
                {lang === 'en' ? ' Portal' : ' Officiel'}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {t.heroDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <AnimatedCard delay={100} onClick={() => teacher ? setView('TEACHER_DASHBOARD') : setView('TEACHER_GATE')} className="cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t.teacherPortal}</h2>
                <p className="text-slate-500 text-sm mb-8">{lang === 'en' ? 'Secure access for educators to manage exams and reports.' : 'Accès sécurisé pour gérer les examens et les rapports.'}</p>
                <Button className="w-full">Enter</Button>
              </AnimatedCard>

              <AnimatedCard delay={200} onClick={() => setView('STUDENT_FIND_EXAM')} className="cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <User className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{t.studentPortal}</h2>
                <p className="text-slate-500 text-sm mb-8">{lang === 'en' ? 'Students can take timed exams with academic credentials.' : 'Les étudiants peuvent passer des examens chronométrés.'}</p>
                <Button variant="emerald" className="w-full">Join Exam</Button>
              </AnimatedCard>
            </div>
          </div>
        )}

        {view === 'STUDENT_FIND_EXAM' && (
          <div className="max-w-md mx-auto pt-10">
            <AnimatedCard className="text-center space-y-8">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto"><Search className="w-8 h-8 text-indigo-600" /></div>
              <h2 className="text-2xl font-bold">{t.findExam}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const code = (e.currentTarget.elements.namedItem('code') as HTMLInputElement).value.toUpperCase();
                const exam = exams.find(ex => ex.accessCode === code);
                if (exam) { setActiveExamId(exam.id); setView('STUDENT_LOGIN'); } else { alert(t.examNotFound); }
              }} className="space-y-6 text-left">
                <input name="code" required className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 outline-none focus:border-indigo-600 font-mono text-center text-2xl tracking-widest uppercase" placeholder="CODE6" />
                <Button type="submit" className="w-full py-4 text-lg">{t.goBtn}</Button>
              </form>
              <button onClick={() => setView('HOME')} className="text-slate-400 text-sm hover:text-slate-600 transition-colors">{t.returnBtn}</button>
            </AnimatedCard>
          </div>
        )}

        {view === 'TEACHER_GATE' && (
          <div className="max-w-md mx-auto pt-10">
             <AnimatedCard className="text-center space-y-8">
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto"><ShieldCheck className="w-8 h-8 text-indigo-600" /></div>
                <h2 className="text-2xl font-bold">{t.teacherAuthTitle}</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const c = (e.currentTarget.elements.namedItem('key') as HTMLInputElement).value;
                  if (c === TEACHER_ACCESS_CODE) setView(teacher ? 'TEACHER_DASHBOARD' : 'TEACHER_SETTINGS'); else alert(t.invalidCode);
                }} className="space-y-6">
                  <input name="key" type="password" placeholder="••••••••••••" className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 text-center text-xl tracking-widest outline-none focus:border-indigo-600" required />
                  <Button type="submit" className="w-full py-4">Verify Key</Button>
                </form>
                <button onClick={() => setView('HOME')} className="text-slate-400 text-sm hover:text-slate-600 transition-colors">{t.returnBtn}</button>
             </AnimatedCard>
          </div>
        )}

        {view === 'TEACHER_DASHBOARD' && teacher && (
          <div className="space-y-10 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">{t.dashboard}</h2>
                <p className="text-slate-500 font-medium">Academic Year: {teacher.academicYear}</p>
              </div>
              <Button onClick={() => setView('CREATE_EXAM')}><PlusCircle className="w-5 h-5" /> {t.createExam}</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: t.totalExams, val: exams.length, icon: BookOpen, col: 'indigo' },
                { label: t.totalStudents, val: new Set(submissions.map(s => s.studentId)).size, icon: Users, col: 'emerald' },
                { label: t.avgScore, val: submissions.length ? `${((submissions.reduce((a, s) => a + (s.score/s.totalPoints), 0)/submissions.length)*100).toFixed(1)}%` : '0%', icon: TrendingUp, col: 'amber' }
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl bg-white border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow`}>
                   <div className={`p-4 rounded-xl bg-${stat.col}-50 text-${stat.col}-600`}><stat.icon className="w-6 h-6" /></div>
                   <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p><p className="text-2xl font-black text-slate-900">{stat.val}</p></div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-slate-800">{t.yourExams}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.length > 0 ? exams.map((ex, i) => (
                <AnimatedCard key={ex.id} delay={i * 50}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-1 text-xs font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg"><Hash className="w-3 h-3" /> {ex.accessCode}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{ex.durationMinutes} min</div>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-4">{ex.title}</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-xs py-2" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/#/exam/${ex.accessCode}`); alert(t.linkCopied); }}><Share2 className="w-3 h-3" /> Share</Button>
                    <Button className="flex-1 text-xs py-2" onClick={() => { setActiveExamId(ex.id); setView('RESULTS'); }}>Report</Button>
                  </div>
                </AnimatedCard>
              )) : (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">{t.noExams}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'RESULTS' && teacher && (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
             <div className="flex items-center justify-between">
              <button onClick={() => setView('TEACHER_DASHBOARD')} className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600"><ArrowLeft className="w-5 h-5" /> {t.returnBtn}</button>
              <h2 className="text-3xl font-extrabold">{t.assessmentResults}</h2>
            </div>
            {exams.filter(e => activeExamId ? e.id === activeExamId : true).map(ex => {
              const subs = submissions.filter(s => s.examId === ex.id);
              return (
                <AnimatedCard key={ex.id} className="overflow-hidden p-0">
                  <div className="bg-slate-50 p-6 flex items-center justify-between border-b">
                    <div><h3 className="font-black text-xl">{ex.title}</h3><p className="text-xs text-slate-400 font-bold uppercase">{subs.length} {t.submissionsReceived}</p></div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportResults.toPDF(subs, ex.title, lang)}><Download className="w-4 h-4" /> PDF</Button>
                      <Button variant="outline" onClick={() => exportResults.toExcel(subs, ex.title, lang)}><Download className="w-4 h-4" /> EXCEL</Button>
                    </div>
                  </div>
                  <div className="p-6 overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr><th className="pb-4">{t.student}</th><th className="pb-4">{t.studentId}</th><th className="pb-4 text-center">{t.ccScore}</th><th className="pb-4 text-center">{t.finalGrade}</th></tr>
                      </thead>
                      <tbody className="divide-y text-sm font-medium">
                        {subs.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 font-bold">{s.studentName.toUpperCase()}</td>
                            <td className="py-4 text-slate-400 font-mono">{s.studentId}</td>
                            <td className="py-4 text-center">{s.score}</td>
                            <td className="py-4 text-center font-black text-indigo-600">{s.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        )}

        {view === 'TEACHER_SETTINGS' && (
          <div className="max-w-2xl mx-auto">
            <AnimatedCard className="space-y-10">
              <div className="flex items-center gap-4 border-b pb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Settings className="w-6 h-6" /></div>
                <h2 className="text-3xl font-black">{t.teacherProfile}</h2>
              </div>
              <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2"><label className="text-xs font-black text-slate-400 uppercase">{t.fullName}</label><input name="name" defaultValue={teacher?.name} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.universityName}</label><input name="university" defaultValue={teacher?.university || 'Université Polytechnique de Mongo'} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.facultyName}</label><input name="school" defaultValue={teacher?.school || 'Faculté des Mines et Géologie'} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.deptName}</label><input name="department" defaultValue={teacher?.department || 'Département de Géomatique'} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.academicYearLabel}</label><input name="academicYear" defaultValue={teacher?.academicYear || '2025-2026'} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.primarySubject}</label><input name="subject" defaultValue={teacher?.subject} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.academicLevel}</label><input name="level" defaultValue={teacher?.level} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="space-y-2 md:col-span-2"><label className="text-xs font-black text-slate-400 uppercase">{t.emailAddress}</label><input name="email" type="email" defaultValue={teacher?.email} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600" /></div>
                <div className="md:col-span-2 pt-6 flex gap-4">
                  <Button type="submit" className="flex-1">{t.saveProfile}</Button>
                  {teacher && <Button variant="secondary" onClick={() => { storage.clearAll(); window.location.reload(); }} className="flex-1 text-red-500"><LogOut className="w-4 h-4" /> Reset</Button>}
                </div>
              </form>
            </AnimatedCard>
          </div>
        )}

        {view === 'STUDENT_LOGIN' && activeExamId && (
          <div className="max-w-md mx-auto pt-10">
            <AnimatedCard className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6"><Sparkles className="w-10 h-10" /></div>
                <h2 className="text-3xl font-black">{t.studentAuthTitle}</h2>
                <p className="text-slate-400 font-bold mt-2">{exams.find(ex => ex.id === activeExamId)?.title}</p>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = fd.get('name') as string;
                const id = fd.get('id') as string;
                if (storage.isIdUsedForExam(id, activeExamId)) return alert(t.duplicateId);
                setStudentSession({ name, id, gender: 'male' });
                setView('STUDENT_TAKE_EXAM');
              }} className="space-y-6">
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">{t.enterFullName}</label><input name="name" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-600" /></div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-400 uppercase">{t.studentId}</label><input name="id" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-600 font-mono" placeholder="012400XX/GE" /></div>
                <Button type="submit" variant="emerald" className="w-full py-4">{t.startAssessment}</Button>
              </form>
              <button onClick={() => setView('HOME')} className="w-full text-slate-400 text-sm hover:text-slate-600">{t.cancel}</button>
            </AnimatedCard>
          </div>
        )}

        {view === 'STUDENT_TAKE_EXAM' && activeExamId && studentSession && (
          <StudentExamInterface 
            exam={exams.find(ex => ex.id === activeExamId)!} 
            student={studentSession}
            onFinish={(sub: Submission) => { storage.saveSubmission(sub); setSubmissions(storage.getSubmissions()); setView('HOME'); alert(`${t.submissionComplete} ${sub.score}`); }}
            lang={lang}
          />
        )}

        {view === 'CREATE_EXAM' && (
          <ExamCreatorUI 
            teacher={teacher!} 
            onSave={(ex: Exam) => { storage.saveExam(ex); setExams(storage.getExams()); setView('TEACHER_DASHBOARD'); }}
            onCancel={() => setView('TEACHER_DASHBOARD')}
            lang={lang}
          />
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
};

const ExamCreatorUI = ({ teacher, onSave, onCancel, lang }: any) => {
  const t = getTranslation(lang);
  const [questions, setQuestions] = useState<Question[]>([]);
  return (
    <div className="space-y-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex items-center justify-between"><h2 className="text-3xl font-black">{t.createExam}</h2><div className="flex gap-4"><Button variant="secondary" onClick={onCancel}>{t.cancel}</Button><Button onClick={() => {
        const titleInput = document.getElementById('etitle') as HTMLInputElement;
        const durInput = document.getElementById('edur') as HTMLInputElement;
        const title = titleInput.value;
        if (!title || questions.length === 0) return alert("Title and questions required.");
        onSave({ id: crypto.randomUUID(), title, questions, durationMinutes: parseInt(durInput.value), createdAt: Date.now(), accessCode: Math.random().toString(36).substring(2, 8).toUpperCase(), teacherId: teacher.id });
      }}>{t.saveExam}</Button></div></div>
      <AnimatedCard className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.examTitle}</label><input id="etitle" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold" /></div>
        <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase">{t.duration}</label><input id="edur" type="number" defaultValue="60" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold" /></div>
      </AnimatedCard>
      <div className="space-y-6">
        <div className="flex items-center justify-between"><h3 className="text-xl font-bold">Questions ({questions.length})</h3><Button variant="outline" onClick={() => setQuestions([...questions, { id: crypto.randomUUID(), text: '', options: ['', '', '', ''], correctAnswerIndex: 0, points: 1, maxAttempts: 1 }])}><PlusCircle className="w-4 h-4" /> Add</Button></div>
        {questions.map((q, idx) => (
          <AnimatedCard key={q.id} delay={idx * 50} className="space-y-6">
            <div className="flex justify-between"><label className="text-xs font-black text-indigo-600 uppercase tracking-widest">{t.question} {idx + 1}</label><button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} className="text-red-400 hover:text-red-600 transition-colors"><RotateCcw className="w-4 h-4" /></button></div>
            <input value={q.text} onChange={(e) => setQuestions(questions.map(x => x.id === q.id ? { ...x, text: e.target.value } : x))} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none font-bold" placeholder="Question text..." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-3">
                  <input type="radio" checked={q.correctAnswerIndex === oIdx} onChange={() => setQuestions(questions.map(x => x.id === q.id ? { ...x, correctAnswerIndex: oIdx } : x))} className="w-5 h-5 accent-indigo-600" />
                  <input value={opt} onChange={(e) => { const n = [...q.options]; n[oIdx] = e.target.value; setQuestions(questions.map(x => x.id === q.id ? { ...x, options: n } : x)); }} className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none" placeholder={`Option ${oIdx + 1}`} />
                </div>
              ))}
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

const StudentExamInterface = ({ exam, student, onFinish, lang }: any) => {
  const t = getTranslation(lang);
  const [answers, setAnswers] = useState<number[]>(new Array(exam.questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const latestAnswers = useRef(answers);
  useEffect(() => { latestAnswers.current = answers; }, [answers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); submit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submit = () => {
    let score = 0;
    exam.questions.forEach((q: any, i: number) => { if (latestAnswers.current[i] === q.correctAnswerIndex) score += q.points; });
    onFinish({ id: crypto.randomUUID(), examId: exam.id, studentName: student.name, studentId: student.id, studentGender: student.gender, answers: latestAnswers.current, score, totalPoints: exam.questions.reduce((a: any, b: any) => a + b.points, 0), timestamp: Date.now(), teacherInfo: storage.getTeacher()! });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass sticky top-24 z-40 p-5 rounded-2xl border flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">{student.name.charAt(0)}</div>
          <div><h3 className="font-bold">{exam.title}</h3><p className="text-xs text-slate-400 font-mono">{student.id}</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xl font-black ${timeLeft < 300 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
            <Clock className="w-5 h-5" /> {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2, '0')}
          </div>
          <Button onClick={submit}>{t.finishSubmit}</Button>
        </div>
      </div>
      <div className="space-y-6">
        {exam.questions.map((q: any, qIdx: number) => (
          <AnimatedCard key={q.id} delay={qIdx * 50}>
            <div className="flex justify-between mb-4"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.question} {qIdx + 1}</span><span className="text-[10px] font-black text-indigo-600">{q.points} {t.pointLabel}</span></div>
            <p className="text-xl font-bold mb-8">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt: string, oIdx: number) => (
                <button 
                  key={oIdx} 
                  onClick={() => setAnswers(prev => { const n = [...prev]; n[qIdx] = oIdx; return n; })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-semibold ${answers[qIdx] === oIdx ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </AnimatedCard>
        ))}
      </div>
      <div className="pb-20 pt-10 flex justify-center"><Button className="px-20 py-5 text-xl" onClick={submit}>{t.finishSubmit}</Button></div>
    </div>
  );
};

export default App;