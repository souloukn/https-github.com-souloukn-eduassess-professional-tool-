
import { Submission } from '../shared';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { getTranslation, Language } from '../shared';

// UPM Tchad Logo - Extracted from context
const UPM_LOGO_BASE64 = "https://raw.githubusercontent.com/AI-Gen-Assets/logos/main/upm_tchad_logo.png";

export const exportResults = {
  toPDF: (submissions: Submission[], examTitle: string, lang: Language) => {
    const t = getTranslation(lang);
    const doc = new jsPDF() as any;
    const teacher = submissions[0]?.teacherInfo || { 
      name: 'N/A', 
      university: 'Université Polytechnique de Mongo', 
      school: 'Faculté des Mines et Géologie', 
      department: 'Département de Géomatique',
      subject: 'Examen',
      academicYear: '2025-2026'
    };
    
    // Header Style
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    
    // Left Header text
    doc.text(teacher.university, 20, 15);
    doc.setFont('helvetica', 'normal');
    doc.text(teacher.school, 20, 21);
    doc.text(teacher.department, 20, 27);
    
    // Right Header text
    doc.text(`${t.academicYearLabel} ${teacher.academicYear}`, 190, 15, { align: 'right' });

    // Center Logo
    try {
      doc.addImage(UPM_LOGO_BASE64, 'PNG', 95, 8, 20, 20);
    } catch (e) {
      doc.circle(105, 18, 10, 'S');
      doc.setFontSize(6);
      doc.text('UPM', 105, 19, { align: 'center' });
    }

    // Horizontal Dotted line
    doc.setLineWidth(1);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(20, 35, 190, 35);
    doc.setLineDashPattern([], 0);

    // Document Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(t.academicReport, 105, 45, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(examTitle, 105, 53, { align: 'center' });

    // Watermark
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.05 }));
    doc.setFontSize(70);
    doc.setTextColor(150);
    doc.text("UPM TCHAD", 105, 150, { align: 'center', angle: 45 });
    doc.restoreGraphicsState();

    // Table
    const tableData = submissions.map(s => [
      s.studentName.toUpperCase(),
      s.studentId,
      s.score,
      '0', 
      s.score
    ]);

    autoTable(doc, {
      startY: 65,
      head: [[t.student, t.studentId, t.ccScore, t.participation, t.finalGrade]],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [92, 184, 92], // UPM Green theme from screenshot
        textColor: [255, 255, 255], 
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 4,
        lineColor: [200, 200, 200],
      },
      alternateRowStyles: {
        fillColor: [245, 255, 245]
      },
      columnStyles: {
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center', fontStyle: 'bold' }
      }
    });

    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(t.developerCredit, 105, 285, { align: 'center' });

    doc.save(`UPM_Report_${examTitle.replace(/\s+/g, '_')}.pdf`);
  },

  toExcel: (submissions: Submission[], examTitle: string, lang: Language) => {
    const t = getTranslation(lang);
    const data = submissions.map(s => ({
      [t.student]: s.studentName.toUpperCase(),
      [t.studentId]: s.studentId,
      [t.ccScore]: s.score,
      [t.participation]: 0,
      [t.finalGrade]: s.score,
      'University': s.teacherInfo.university,
      'Department': s.teacherInfo.department,
      'Year': s.teacherInfo.academicYear
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, `Report_${examTitle}.xlsx`);
  },

  toWord: (submissions: Submission[], examTitle: string, lang: Language) => {
    const t = getTranslation(lang);
    const teacher = submissions[0]?.teacherInfo;
    const html = `
      <html>
        <body style="font-family: Arial">
          <div style="text-align: center">
            <h2>${teacher?.university.toUpperCase()}</h2>
            <p>${teacher?.school}<br>${teacher?.department}</p>
            <hr>
            <h3>${t.academicReport}</h3>
            <h4>${examTitle}</h4>
          </div>
          <table border="1" style="width:100%; border-collapse: collapse">
            <tr style="background: #5cb85c; color: white">
              <th>${t.student}</th><th>${t.studentId}</th><th>${t.ccScore}</th><th>${t.participation}</th><th>${t.finalGrade}</th>
            </tr>
            ${submissions.map(s => `
              <tr>
                <td>${s.studentName.toUpperCase()}</td><td>${s.studentId}</td><td align="center">${s.score}</td><td align="center">0</td><td align="center"><b>${s.score}</b></td>
              </tr>
            `).join('')}
          </table>
          <p style="text-align: center; margin-top: 50px; font-size: 8pt">${t.developerCredit}</p>
        </body>
      </html>
    `;
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Report_${examTitle}.doc`;
    link.click();
  }
};
