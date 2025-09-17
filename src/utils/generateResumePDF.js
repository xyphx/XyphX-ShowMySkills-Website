import jsPDF from "jspdf";

// Lucide SVG icons (converted to base64 PNGs for jsPDF)
const linkedinIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZmlsbD0iIzAwNzdhYyIgZD0iTTMuMjUgMi4xYTYuMzcgNi4zNyAwIDEgMCAuMDIgMTIuNzVBNi4zNyA2LjM3IDAgMCAwIDMuMjUgMi4xWk0xLjYgNmgxLjc1djYuOGgtMS43NVp4bTIuNjMtNi41YTQuMzUgNC4zNSAwIDAgMCAuMDMgOC43QTYuNzggNi43OCAwIDAgMCA0LjIgMi42YS42My42MyAwIDAgMCAwIC0uODQ2IDYuODMgNi44MyAwIDAgMCA0LjM5LTEuNjJaTTEzLjUgNi43NXY2Ljg4aC0xLjc1di00LjA0YzAtMS4wNi0uMzcgMS44LTEuMyAxLjhzLTEuODItLjcyLTEuODItMS44VjYuNzVoLTEuNzV2Ni44OGgxLjc1di0uOTNhMi4yIDIuMiAwIDAgMCAxLjggMS4wNiAyLjIgMi4yIDAgMCAwIDIuMi0yLjI1WiIvPjwvc3ZnPg==";
const githubIcon =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAyYy01LjUgMC0xMCA0LjUtMTAgMTAgMCA0LjQgMi44IDguMiA2LjYgOS41LjUgLjEgLjctLjIgLjctLjUgMC0uMiAwLS45IDAtMS43LTMgLjYtMy42LTIuMS0zLjYtMi4xLTEuMy0uOSAwLS45IDAgLS45LjYgMCAxLjQgLjYgMS45IDIuNCAxLjkgMCAuNi0uMiAxLjEtLjUuMS0yLjUgMC0zLjgtMi0zLjgtMy43IDAtLjkgLjMtMS42LjktMi4yLS4xLS4yLS40LS45LjEtMi4xIDAgMCAuOC0uMiAyLjYgMSAuNy0uMiAxLjUtLjMgMi4zLS4zLjggMCAxLjYuMSAyLjMuMyAxLjgtMS4yIDIuNi0xIDIuNi0xIC41IDEuMi4yIDEuOS4xIDIuMS42LjUuOSAxLjMuOSAyLjIuNiAxLjkuOSAyLjEuOSA0LjcgMCAxLjEtLjEgMi0uMSAyLjIgMCAuMy4yLjYgLjcuNSAzLjggMS4zIDYuNiA1IDYuNiA5LjUgMCA1LjUtNC41IDEwLTEwIDEweiIvPjwvc3ZnPg==";
const instagramIcon =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZTZlNmU2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgM2MtMi44IDAtMy4xIDAtNC4yLjEtMS4xLjEtMS44LjMtMi40LjcuNi0uNCAxLjMtLjYgMi40LS43IDEuMS0uMSAxLjQtLjEgNC4yLS4xczMuMSAwIDQuMi4xYyAxLjEuMSAxLjguMyAyLjQuNy42LjQuOCAxLjEuOCAyLjIgMCAxLjEuMSAxLjQuMSA0LjIgMHMtLjEgMy4xLS4xIDQuMmMtLjEuMS0uMy44LS43IDIuNC0uNC42LS43IDEuMy0uNyAyLjQuMSAxLjEuMyAxLjggLjcgMi40LS42LS40LTEuMy0uNi0yLjQtLjctMS4xLS4xLTEuNC0uMS00LjItLjF6bTAgMTFjLTIuNyAwLTQuOS0yLjItNC45LTQuOXMyLjItNC45IDQuOS00LjkgNC45IDIuMiA0LjkgNC45LTIuMiA0LjktNC45IDQuOXptNy4yLTEwLjJhMS4yIDEuMiAwIDEgMS0yLjQgMCAxLjIgMS4yIDAgMCAxIDIuNCAweiIvPjwvc3ZnPg==";


export async function generateResumePDF(user) {
  const doc = new jsPDF();
  let y = 20;

  // ===== HEADER =====
  doc.setFont("helvetica", "bold").setFontSize(20);
  doc.text(user.displayName || "", 15, y);
  y += 8;

  doc.setFont("helvetica", "normal").setFontSize(11);
  let contactInfo = [];
  if (user.email) contactInfo.push(user.email);
  if (user.phone && user.showPhoneNumber) contactInfo.push(user.phone);
  if (user.location) contactInfo.push(user.location);
  doc.text(contactInfo.join(" | "), 15, y);
  y += 12;

  const drawLine = () => {
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);
    y += 8;
  };

  // ===== ABOUT =====
  if (user.about) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("About", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    const splitAbout = doc.splitTextToSize(user.about, 180);
    doc.text(splitAbout, 20, y);
    y += splitAbout.length * 6 + 4;
    drawLine();
  }

  // ===== EDUCATION =====
  if (user.college || user.course || user.branch) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Education", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    if (user.college) doc.text(`• ${user.college}`, 20, y), (y += 6);
    if (user.customCourse || user.course) doc.text(`• ${user.customCourse || user.course}`, 20, y), (y += 6);
    if (user.customBranch || user.branch) doc.text(`• ${user.customBranch || user.branch}`, 20, y), (y += 6);
    y += 2;
    drawLine();
  }

  // ===== SKILLS =====
  if (user.skills && user.skills.length > 0) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Skills", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    user.skills.filter(Boolean).forEach(skill => {
      doc.text(`• ${skill}`, 20, y);
      y += 6;
    });
    drawLine();
  }

  // ===== EXPERIENCE =====
  if (user.experience && user.experience.length > 0) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Experience", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    user.experience.forEach(exp => {
      doc.setFont("helvetica", "bold");
      doc.text(`• ${exp.title || ""} – ${exp.organization || ""}`, 20, y);
      y += 6;
      doc.setFont("helvetica", "italic");
      if (exp.timePeriod) doc.text(exp.timePeriod, 25, y), (y += 6);
      doc.setFont("helvetica", "normal");
      if (exp.description) {
        const splitDesc = doc.splitTextToSize(exp.description, 170);
        doc.text(splitDesc, 25, y);
        y += splitDesc.length * 6 + 4;
      }
    });
    drawLine();
  }

  // ===== PROJECTS =====
  if (user.works && user.works.length > 0) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Projects", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    user.works.forEach(work => {
      doc.setFont("helvetica", "bold");
      doc.text(`• ${work.title || ""}`, 20, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      if (work.description) {
        const splitDesc = doc.splitTextToSize(work.description, 170);
        doc.text(splitDesc, 25, y);
        y += splitDesc.length * 6 + 2;
      }
      if (work.link) {
        doc.setTextColor(0, 0, 255);
        doc.textWithLink("🔗 View Project", 25, y, { url: work.link });
        doc.setTextColor(0, 0, 0);
        y += 8;
      }
    });
    drawLine();
  }

  // ===== ACHIEVEMENTS =====
  if (user.achievements && user.achievements.length > 0) {
    doc.setFont("helvetica", "bold").setFontSize(13);
    doc.text("Achievements", 15, y);
    y += 6;
    doc.setFont("helvetica", "normal").setFontSize(11);
    user.achievements.forEach(ach => {
      doc.text(`• ${ach.title || ""}`, 20, y);
      y += 6;
      if (ach.description) {
        const splitDesc = doc.splitTextToSize(ach.description, 170);
        doc.text(splitDesc, 25, y);
        y += splitDesc.length * 6 + 2;
      }
    });
    drawLine();
  }


  
  // ===== SOCIAL LINKS =====
  if (user.linkedin || user.github || user.instagram) {
    y += 10;
    doc.setFontSize(13).setFont("helvetica", "bold");
    doc.text("Social Links", 15, y);
    doc.setFontSize(11).setFont("helvetica", "normal");
    let offset = 6;
    if (user.linkedin) {
      doc.text(`LinkedIn: ${user.linkedin}`, 20, y + offset, { maxWidth: 180 });
      offset += 6;
    }
    if (user.github) {
      doc.text(`GitHub: ${user.github}`, 20, y + offset, { maxWidth: 180 });
      offset += 6;
    }
    if (user.instagram) {
      doc.text(`Instagram: ${user.instagram}`, 20, y + offset, { maxWidth: 180 });
      offset += 6;
    }
  }

  return doc;
}
