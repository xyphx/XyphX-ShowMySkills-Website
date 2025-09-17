import jsPDF from "jspdf";

export async function generateResumePDF(user) {
  const doc = new jsPDF();
  // Header
  doc.setFillColor(44, 188, 187);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text(user.displayName || "", 15, 20);
  doc.setFontSize(12);
  doc.text(user.email || "", 160, 20, { align: "right" });
  doc.setTextColor(0, 0, 0);

  let y = 40;
  // About
  if (user.about) {
    doc.setFontSize(14);
    doc.text("About", 15, y);
    doc.setFontSize(11);
    doc.text(user.about, 15, y + 6, { maxWidth: 180 });
    y += 18;
  }

  // Education
  doc.setFontSize(14);
  doc.text("Education", 15, y);
  doc.setFontSize(11);
  doc.text(`College: ${user.college || ""}`, 15, y + 6);
  doc.text(`Branch: ${user.customBranch || user.branch || ""}`, 80, y + 6);
  doc.text(`Course: ${user.customCourse || user.course || ""}`, 140, y + 6);
  y += 16;

  // Skills
  if (user.skills && user.skills.length > 0) {
    doc.setFontSize(14);
    doc.text("Skills", 15, y);
    doc.setFontSize(11);
    doc.text(user.skills.join(", "), 15, y + 6, { maxWidth: 180 });
    y += 16;
  }

  // Achievements
  if (user.achievements && user.achievements.length > 0) {
    doc.setFontSize(14);
    doc.text("Achievements", 15, y);
    doc.setFontSize(11);
    user.achievements.forEach((ach, i) => {
  doc.text(`- ${ach}`, 20, y + 6 + i * 6, { maxWidth: 170 });
    });
    y += 6 * user.achievements.length + 10;
  }

  // Experience
  if (user.experience && user.experience.length > 0) {
    doc.setFontSize(14);
    doc.text("Experience", 15, y);
    doc.setFontSize(11);
    user.experience.forEach((exp, i) => {
  doc.text(`${exp.title || ""} at ${exp.organization || ""} (${exp.timePeriod || ""})`, 20, y + 6 + i * 12, { maxWidth: 170 });
  if (exp.description) doc.text(exp.description, 25, y + 12 + i * 12, { maxWidth: 160 });
    });
    y += 12 * user.experience.length + 10;
  }

  // Social links
  let socialY = y;
  doc.setFontSize(14);
  doc.text("Social Links", 15, socialY);
  doc.setFontSize(11);
  let offset = 6;
  if (user.linkedin) {
  doc.text(`LinkedIn: ${user.linkedin}`, 15, socialY + offset, { maxWidth: 180 });
    offset += 6;
  }
  if (user.github) {
  doc.text(`GitHub: ${user.github}`, 15, socialY + offset, { maxWidth: 180 });
    offset += 6;
  }
  if (user.instagram) {
  doc.text(`Instagram: ${user.instagram}`, 15, socialY + offset, { maxWidth: 180 });
    offset += 6;
  }

  // Phone
  if (user.phone && user.showPhoneNumber) {
  doc.text(`Phone: ${user.phone}`, 15, socialY + offset, { maxWidth: 180 });
    offset += 6;
  }

  return doc;
}
