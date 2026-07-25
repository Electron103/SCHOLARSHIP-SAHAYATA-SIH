import jsPDF from "jspdf";
import type { Notification } from "../types";

/* ==================================================
         SINGLE NOTIFICATION — FULL GOVT STYLE PDF
================================================== */
export const downloadSingleNotification = (n: Notification) => {
  const doc = new jsPDF("p", "mm", "a4");

  const maxWidth = 170;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  /* -------------------------------------------
      HEADER (REPEATED ON EVERY PAGE)
  -------------------------------------------- */
  const drawHeader = () => {
    doc.setFillColor(79, 70, 229); // Indigo color
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Scholarship Sahayata", 10, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Aadhaar-DBT Awareness Portal", 10, 26);
  };

  /* -------------------------------------------
      FOOTER (PAGE NUMBERS)
  -------------------------------------------- */
  const drawFooter = (pageNumber: number) => {
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${pageNumber}`, 105, pageHeight - 10, { align: "center" });
  };

  let pageNumber = 1;

  // Draw first page header + footer
  drawHeader();
  drawFooter(pageNumber);

  let y = 42; // content start position

  /* -------------------------------------------
      CARD BACKGROUND
  -------------------------------------------- */
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(10, y, 190, 120, 4, 4, "F");
  y += 18;

  /* -------------------------------------------
      TITLE
  -------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setTextColor(33, 33, 33);
  doc.setFontSize(16);
  doc.text(n.title, 20, y);

  y += 12;

  /* -------------------------------------------
      CATEGORY BADGE

  doc.setFillColor(219, 234, 254);
  doc.setTextColor(30, 64, 175);
  doc.roundedRect(20, y - 5, 52, 10, 3, 3, "F");

  doc.setFontSize(10);
  doc.text(`Category: ${n.category}`, 23, y + 2);

  /* -------------------------------------------
      DATE BADGE
  
  if (n.createdAt) {
    doc.setFillColor(243, 244, 246);
    doc.setTextColor(75, 85, 99);
    doc.roundedRect(77, y - 5, 45, 10, 3, 3, "F");
    doc.text(formatDate(n.createdAt), 80, y + 2);
  }
  -------------------------------------------- */
  /* -------------------------------------------
      PRIORITY BADGE
 
  doc.setFillColor(254, 226, 226);
  doc.setTextColor(185, 28, 28);
  doc.roundedRect(130, y - 5, 55, 10, 3, 3, "F");
  doc.text(`Priority: ${n.priority}`, 133, y + 2);

  y += 22;
  -------------------------------------------- */
  /* -------------------------------------------
      MESSAGE HEADING
  -------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(55, 65, 81);
  doc.text("Message", 20, y);

  y += 8;

  /* ==========================================================
         MULTI-PAGE MESSAGE TEXT (NO CUTTING ANYMORE)
  ========================================================== */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);

  const messageText = n.description || n.message || "";
  const messageLines = doc.splitTextToSize(messageText, maxWidth);

  messageLines.forEach((line: string) => {
    if (y + lineHeight > pageHeight - 20) {
      doc.addPage();
      pageNumber++;
      drawFooter(pageNumber);

      y = 20; // restart below header
    }

    doc.text(line, 20, y);
    y += lineHeight;
  });

  /* -------------------------------------------
      SAVE FILE
  -------------------------------------------- */
  const safeTitle = n.title.replace(/[^\w\s]/gi, "_");
  doc.save(`${safeTitle}.pdf`);
};
/* ==================================================
      ALL NOTIFICATIONS PDF (MULTI-PAGE)
================================================== */
export const downloadAllNotifications = (notifications: Notification[]) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageHeight = doc.internal.pageSize.height;
  const maxWidth = 170;
  const lineHeight = 7;

  let y = 20;
  let pageNumber = 1;

  const drawHeader = () => {
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Scholarship Sahayata", 10, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Aadhaar-DBT Awareness Portal", 10, 26);
  };

  const drawFooter = () => {
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${pageNumber}`, 105, pageHeight - 10, { align: "center" });
  };

  drawHeader();
  drawFooter();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("All Notifications", 10, y);

  y += 15;

  notifications.forEach((n, i) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      pageNumber++;
      drawHeader();
      drawFooter();
      y = 40;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${i + 1}. ${n.title}`, 10, y);

    y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const desc = n.description || n.message || "";
    const lines = doc.splitTextToSize(desc, maxWidth);

    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - 20) {
        doc.addPage();
        pageNumber++;
        drawHeader();
        drawFooter();
        y = 40;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    y += 10;
  });

  doc.save("All_Notifications.pdf");
};
