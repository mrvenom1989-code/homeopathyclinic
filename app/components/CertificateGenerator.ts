import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CertificateData {
    patientName: string;
    patientAge?: number | string;
    patientAddress?: string;
    patientPassportOrId?: string;
    date: string;
    diagnosis: string;
    doctorName: string;
    restFrom?: string;
    restTo?: string;
    restDays?: string;
    resumeOn?: string;
    recommendations?: string;
    medicines?: { name: string; dosage: string; qty: string | number }[];
}

// Helper to load image for PDF
const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};

const drawHeader = async (doc: any) => {
    try {
        const logo = await loadImage("/logo.jpg");
        doc.addImage(logo, "JPEG", 10, 10, 25, 25);
    } catch {
        console.warn("Logo not found");
    }

    doc.setFontSize(22);
    doc.setTextColor(19, 56, 47);
    doc.setFont("times", "bold");
    doc.text("Dr. Mayank Raval's", 120, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11);
    doc.setFont("helvetica", "bold");
    doc.text("ADVANCED HOMEOPATHY", 120, 26, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text('"Precision. Depth. Lasting Healing."', 120, 32, { align: "center" });

    doc.setDrawColor(176, 155, 92);
    doc.setLineWidth(0.5);
    doc.line(10, 38, 200, 38);
};

const drawFooter = (doc: any) => {
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(19, 56, 47);
    doc.text("For Appointment: +91 99791 33069", 105, pageHeight - 22, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Ahmedabad", 105, pageHeight - 15, { align: "center" });
    doc.text("lifetronhomeopathyamd@gmail.com", 105, pageHeight - 10, { align: "center" });
};

export const generateSickCertificate = async (data: CertificateData) => {
    const doc = new jsPDF();
    await drawHeader(doc);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("SICK CERTIFICATE", 105, 50, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Date: ${data.date}`, 14, 65);
    doc.text("To Whomsoever It May Concern,", 14, 75);

    const textBody = `This is to certify that Mr./Ms./Mrs. ${data.patientName}, aged ${data.patientAge || '____'} years, was examined by me on ${data.date}.

He/She is suffering from ${data.diagnosis || '_________________'}.

Based on the medical evaluation, he/she is advised to take rest from ______________ to ______________ (_____ days).

He/She is expected to resume normal duties/activities on ______________.

Recommendations / Restrictions (if any):
${data.recommendations || 'None'}`;

    doc.text(textBody, 14, 85, { maxWidth: 180, lineHeightFactor: 1.5 });

    const signatureY = 160;
    doc.setFont("helvetica", "bold");
    doc.text(`Doctor's Name: Dr. Mayank Raval`, 14, signatureY);
    doc.text(`Reg. No.: _______________________`, 14, signatureY + 10);

    doc.text(`Signature & Clinic Seal:`, 130, signatureY);
    doc.text(`_________________________________`, 130, signatureY + 15);

    drawFooter(doc);
    doc.save(`Sick_Certificate_${data.patientName.replace(/\\s+/g, "_")}.pdf`);
};

export const generateAirportCertificate = async (data: CertificateData) => {
    const doc = new jsPDF() as any;
    await drawHeader(doc);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("AIRPORT MEDICINE CLEARANCE CERTIFICATE", 105, 50, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Date: ${data.date}`, 14, 65);
    doc.text("To Whomsoever It May Concern,", 14, 75);

    const textBody = `This is to certify that Mr./Ms./Mrs. ${data.patientName}, holding Passport / National ID No. _______________________, is undergoing treatment under my care for ${data.diagnosis || '_________________'}.

The patient has been prescribed the following essential medications for his/her condition:`;

    doc.text(textBody, 14, 85, { maxWidth: 180, lineHeightFactor: 1.5 });

    const tableBody = (data.medicines || []).map((m) => [m.name, m.dosage, m.qty]);
    if (tableBody.length === 0) {
        tableBody.push(["_____________________", "_____________________", "_____________________"]);
    }

    autoTable(doc, {
        startY: 115,
        head: [['Medicine Name', 'Dosage', 'Quantity Prescribed']],
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [30, 58, 41], textColor: 255 },
        styles: { fontSize: 10, cellPadding: 3 },
    });

    let finalY = doc.lastAutoTable?.finalY || 135;

    const textFooter = `These medications are critical for the patient's health and well-being.
We request the security and customs authorities at the airport/border to kindly allow the patient to carry these medicines in their hand luggage / checked-in baggage during their travel.

If you have any queries, please feel free to contact the undersigned.
Thank you for your cooperation.

Sincerely,`;

    doc.text(textFooter, 14, finalY + 10, { maxWidth: 180, lineHeightFactor: 1.5 });

    const signatureY = finalY + 55;
    if (signatureY > 250) {
        doc.addPage();
    }

    const currentY = signatureY > 250 ? 20 : signatureY;

    doc.setFont("helvetica", "bold");
    doc.text(`Doctor's Name: Dr. Mayank Raval`, 14, currentY);
    doc.text(`Registration No.: _______________________`, 14, currentY + 7);
    doc.text(`Clinic Name: Dr. Mayank Raval's ADVANCED HOMEOPATHY`, 14, currentY + 14);
    doc.text(`Contact Number: +91 99791 33069`, 14, currentY + 21);
    doc.text(`Email ID: lifetronhomeopathyamd@gmail.com`, 14, currentY + 28);

    doc.text(`Signature & Seal:`, 130, currentY + 14);
    doc.text(`_________________________________`, 130, currentY + 28);

    drawFooter(doc);
    doc.save(`Airport_Clearance_${data.patientName.replace(/\\s+/g, "_")}.pdf`);
};
