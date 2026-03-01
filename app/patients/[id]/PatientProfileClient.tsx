"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StaffHeader from "@/app/components/StaffHeader";
import { generateBill } from "@/app/components/BillGenerator";
import {
    User, Phone, Calendar, Edit2, Search,
    Plus, FileText, Trash2, Stethoscope, Loader2, X,
    FileUp, Eye, Printer, Scale, Leaf, Droplets, BadgePercent, Activity,
    ChevronDown, ChevronUp, Save, Wallet, IndianRupee, CreditCard
} from "lucide-react";

import {
    getPatientData,
    getPharmacyInventory,
    updatePatientDetails,
    savePrescription,
    searchPatients,
    deleteVisit,
    uploadConsultationReport,
    updatePatientWallet
} from "@/app/patients/actions";

import {
    DOSAGE_OPTIONS, VEHICLE_OPTIONS, POTENCY_OPTIONS, INSTRUCTION_OPTIONS, WITH_OPTIONS,
    REGULAR_DURATIONS, PANCHKARMA_DURATIONS, PHYSICAL_GENERALS_TEMPLATE
} from "../constants";
import { cleanName } from "../utils";
import WalletModal from "../components/WalletModal";
import PatientDetailsCard from "../components/PatientDetailsCard";
import VisitHistoryList from "../components/VisitHistoryList";
import repertoryData from "@/app/data/repertory.json";

// Helper to format history
const formatVisitHistory = (pData: any) => {
    if (!pData || !pData.consultations) return [];
    return pData.consultations.map((c: any) => ({
        id: c.id,
        appointmentId: c.appointment?.readableId,
        date: c.createdAt,
        diagnosis: c.diagnosis,
        notes: c.notes,
        doctorName: c.doctorName,
        reportUrl: c.reportUrl,
        pharmacyDiscount: c.discount || 0,
        appointmentDiscount: c.appointment?.discount || 0,
        paidAmount: c.paidAmount || 0,
        paymentMode: c.paymentMode || "Cash",
        bloodPressure: c.bloodPressure,
        pulse: c.pulse,
        temperature: c.temperature,
        respiratoryRate: c.respiratoryRate,
        miasms: c.miasms,
        aggravationAmelioration: c.aggravationAmelioration,
        repertoryRubrics: c.repertoryRubrics,
        prescriptions: c.prescriptions.flatMap((p: any) =>
            p.items.map((i: any) => ({
                id: i.id,
                medicineName: i.medicine.name,
                medicineId: i.medicineId,
                dosage: i.dosage,
                vehicle: i.unit,
                potency: i.panchkarma,
                duration: i.duration,
                instruction: i.instruction,
                price: i.medicine.price
            }))
        )
    }));
};

interface PatientProfileClientProps {
    initialPatient?: any;
    initialInventory?: any[];
    patientId: string;
    linkedAppointmentId: string | null;
}

export default function PatientProfileClient({
    initialPatient,
    initialInventory,
    patientId,
    linkedAppointmentId
}: PatientProfileClientProps) {
    const router = useRouter();

    // --- STATE ---
    const [loading, setLoading] = useState(false);
    const [savingDetails, setSavingDetails] = useState(false);
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [showExtendedDetails, setShowExtendedDetails] = useState(false);

    // Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [patientSuggestions, setPatientSuggestions] = useState<any[]>([]);
    const [showPatientSearch, setShowPatientSearch] = useState(false);

    // Medicine States
    const [inventory, setInventory] = useState<any[]>(initialInventory || []);
    const [medQuery, setMedQuery] = useState("");
    const [showMedList, setShowMedList] = useState(false);
    const medListRef = useRef<HTMLDivElement>(null);

    // Patient Data
    const [patient, setPatient] = useState<any>(initialPatient);
    const [visitHistory, setVisitHistory] = useState<any[]>(() => formatVisitHistory(initialPatient));

    // Current Visit (Draft)
    const [consultationType, setConsultationType] = useState<'REGULAR' | 'PANCHKARMA'>('REGULAR');
    const [visitNote, setVisitNote] = useState("");
    const [panchkarmaNote, setPanchkarmaNote] = useState("");
    const [isChargeable, setIsChargeable] = useState("YES");
    const [bloodPressure, setBloodPressure] = useState("");
    const [pulse, setPulse] = useState("");
    const [temperature, setTemperature] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [miasms, setMiasms] = useState("");
    const [aggravationAmelioration, setAggravationAmelioration] = useState("");
    const [repertoryRubrics, setRepertoryRubrics] = useState<string[]>([]);
    const [repSearch, setRepSearch] = useState("");
    const [showRep, setShowRep] = useState(false);

    // Wallet Modal State
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [walletAmount, setWalletAmount] = useState("");
    const [walletType, setWalletType] = useState<"CREDIT" | "DUE">("CREDIT");

    // Track the Appointment ID explicitly
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(linkedAppointmentId);

    const [currentPrescriptions, setCurrentPrescriptions] = useState<any[]>([]);
    const [editingVisitId, setEditingVisitId] = useState<string | null>(null);

    const [editingMedId, setEditingMedId] = useState<number | null>(null);

    const [newMed, setNewMed] = useState({
        medicineId: "",
        medicineName: "",
        potency: "30c",
        dosage: "1-0-1",
        vehicle: "Pills",
        duration: "7 Days",
        instruction: "",
        with: "Regular Water"
    });

    // --- 1. LOAD DATA (Refetching logic) ---
    // Initial load is handled by SSR, this is only for updates
    async function reFetchData() {
        try {
            setLoading(true);
            const [pData, pharmacyData] = await Promise.all([
                getPatientData(patientId),
                getPharmacyInventory("", 10000)
            ]);

            if (pData) {
                const rawData = pData as any;
                setPatient({
                    ...pData,
                    physicalGenerals: rawData.physicalGenerals ? rawData.physicalGenerals : PHYSICAL_GENERALS_TEMPLATE
                });
                setVisitHistory(formatVisitHistory(pData));
            }
            setInventory(pharmacyData || []);
        } catch (err) {
            console.error("Load Failed", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Only set appointment ID if provided and changed
        if (linkedAppointmentId) {
            setSelectedAppointmentId(linkedAppointmentId);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (medListRef.current && !medListRef.current.contains(event.target as Node)) {
                setShowMedList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [linkedAppointmentId]);

    // ✅ FETCH ON MOUNT IF NO INITIAL DATA
    useEffect(() => {
        if (!initialPatient || !initialInventory) {
            reFetchData();
        }
    }, []);

    // --- 2. SEARCH EFFECT ---
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 1) {
                const results = await searchPatients(searchQuery);
                setPatientSuggestions(results);
                setShowPatientSearch(true);
            } else {
                setPatientSuggestions([]);
                setShowPatientSearch(false);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // --- HANDLERS ---
    const selectPatient = (id: string) => {
        setSearchQuery("");
        setShowPatientSearch(false);
        router.push(`/patients/${id}`);
    };

    const handleSaveDetails = async () => {
        setSavingDetails(true);
        const cleanData = {
            ...patient,
            initialWeight: patient.initialWeight || null,
            currentWeight: patient.currentWeight || null,
            physicalGenerals: patient.physicalGenerals
        };

        const res = await updatePatientDetails(patientId, cleanData);
        setSavingDetails(false);
        if (res.success) setIsEditingDetails(false);
        else alert("Failed to update details.");
    };

    const selectMedicine = (med: any) => {
        setNewMed({ ...newMed, medicineId: med.id, medicineName: med.name, vehicle: med.vehicle || "Pills", potency: med.potency || "30c" });
        setMedQuery(med.name);
        setShowMedList(false);
    };

    const handleAddMedicine = () => {
        if (!newMed.medicineId && !newMed.medicineName) return alert("Please select or enter a medicine");

        const combinedInstruction = consultationType === 'REGULAR'
            ? `${newMed.instruction} (with ${newMed.with})`
            : newMed.instruction;

        const newItem = {
            ...newMed,
            instruction: combinedInstruction,
            medicineName: newMed.medicineName || medQuery,
            dosage: consultationType === 'REGULAR' ? newMed.dosage : "-",
            unit: consultationType === 'REGULAR' ? newMed.vehicle : "-",
            panchkarma: consultationType === 'REGULAR' ? newMed.potency : "-",
            id: Date.now()
        };

        if (editingMedId !== null) {
            setCurrentPrescriptions(prev => prev.map(item => item.id === editingMedId ? { ...item, ...newItem } : item));
            setEditingMedId(null);
        } else {
            setCurrentPrescriptions([...currentPrescriptions, newItem]);
        }

        setNewMed({ ...newMed, medicineId: "", medicineName: "", instruction: "" });
        setMedQuery("");
    };

    const handleEditDraftMedicine = (item: any) => {
        setEditingMedId(item.id);
        setMedQuery(item.medicineName);

        let instr = item.instruction;
        let withVal = "Regular Water";
        if (instr && instr.includes("(with")) {
            const parts = instr.split("(with");
            instr = parts[0].trim();
            withVal = parts[1].replace(")", "").trim();
        }

        setNewMed({
            medicineId: item.medicineId,
            medicineName: item.medicineName,
            potency: item.potency || "30c",
            dosage: item.dosage,
            vehicle: item.vehicle || "Pills",
            duration: item.duration,
            instruction: instr,
            with: withVal
        });
    };

    const removeDraftMedicine = (id: number) => {
        setCurrentPrescriptions(currentPrescriptions.filter(p => p.id !== id));
        if (editingMedId === id) {
            setEditingMedId(null);
            setNewMed({ ...newMed, medicineId: "", medicineName: "", instruction: "" });
            setMedQuery("");
        }
    };

    const handleSaveVisit = async () => {
        if (currentPrescriptions.length === 0 && !visitNote && !panchkarmaNote) {
            return alert("Please add medicines or a note before saving.");
        }

        // Logic: If Chargeable=YES, Discount=0. If NO, Discount=500.
        const calculatedApptDiscount = isChargeable === "YES" ? 0 : 500;

        const visitData = {
            diagnosis: consultationType === 'REGULAR' ? visitNote : "Panchkarma Procedure",
            notes: panchkarmaNote,
            prescriptions: currentPrescriptions,
            doctorName: "Dr. Chirag Raval",

            appointmentId: selectedAppointmentId,
            appointmentDiscount: calculatedApptDiscount,

            // Default to 0 so it registers as "Due" in wallet if not paid immediately
            discount: 0,
            paidAmount: 0,
            paymentMode: "Cash",
            bloodPressure,
            pulse,
            temperature,
            respiratoryRate,
            miasms,
            aggravationAmelioration,
            repertoryRubrics: JSON.stringify(repertoryRubrics)
        };

        const result = await savePrescription(patientId, visitData, editingVisitId || undefined);

        if (result.success) {
            alert(editingVisitId ? "Consultation Updated!" : "Consultation Saved!");
            window.location.reload();
        } else {
            alert("Failed to save visit.");
        }
    };

    const handleDeleteHistory = async (id: string) => {
        if (confirm("Delete this consultation?")) {
            await deleteVisit(id, patientId);
            setVisitHistory(visitHistory.filter(v => v.id !== id));
        }
    };

    const handleEditHistory = (visit: any) => {
        if (currentPrescriptions.length > 0) {
            if (!confirm("Discard current unsaved changes?")) return;
        }

        setEditingVisitId(visit.id);
        setVisitNote(visit.diagnosis || "");
        setPanchkarmaNote(visit.notes || "");
        setSelectedAppointmentId(visit.appointmentId || null);
        setIsChargeable(visit.appointmentDiscount >= 500 ? "NO" : "YES");
        setBloodPressure(visit.bloodPressure || "");
        setPulse(visit.pulse || "");
        setTemperature(visit.temperature || "");
        setRespiratoryRate(visit.respiratoryRate || "");
        setMiasms(visit.miasms || "");
        setAggravationAmelioration(visit.aggravationAmelioration || "");
        try {
            setRepertoryRubrics(visit.repertoryRubrics ? JSON.parse(visit.repertoryRubrics) : []);
        } catch (e) { setRepertoryRubrics([]); }

        const draftItems = visit.prescriptions.map((p: any) => ({
            id: Math.random(),
            medicineId: p.medicineId,
            medicineName: p.medicineName,
            potency: p.panchkarma || "30c",
            dosage: p.dosage,
            vehicle: p.unit || "Pills",
            duration: p.duration,
            instruction: p.instruction,
        }));
        setCurrentPrescriptions(draftItems);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingVisitId(null);
        setVisitNote("");
        setPanchkarmaNote("");
        setIsChargeable("YES");
        setBloodPressure("");
        setPulse("");
        setTemperature("");
        setRespiratoryRate("");
        setMiasms("");
        setAggravationAmelioration("");
        setRepertoryRubrics([]);
        setSelectedAppointmentId(linkedAppointmentId || null);
        setCurrentPrescriptions([]);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, consultationId: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 4 * 1024 * 1024) return alert("File size too large (Max 4MB)");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("consultationId", consultationId);

        setUploadingId(consultationId);
        try {
            const res = await uploadConsultationReport(formData);
            if (res.success) {
                setVisitHistory(prev => prev.map(v => v.id === consultationId ? { ...v, reportUrl: res.url } : v));
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error uploading file");
        } finally {
            setUploadingId(null);
        }
    };

    // ✅ MANAGE WALLET
    const handleWalletUpdate = async () => {
        if (!walletAmount || parseFloat(walletAmount) <= 0) return alert("Please enter valid amount");

        const res = await updatePatientWallet(patientId, parseFloat(walletAmount), walletType);

        if (res.success) {
            alert("Wallet Updated!");
            setShowWalletModal(false);
            setWalletAmount("");
            reFetchData(); // Refresh data to show new balance
        } else {
            alert("Failed to update wallet");
        }
    };

    const handlePrintReceipt = (visit: any) => {
        const items = visit.prescriptions.map((p: any) => ({
            name: `${p.medicineName} ${p.unit !== '-' ? `(${p.unit})` : ''}`,
            qty: 1,
            amount: p.price || 0
        }));

        const fee = 500 - (visit.appointmentDiscount || 0);

        if (fee > 0) items.unshift({ name: "Consultation Charge", qty: 1, amount: fee });
        else items.unshift({ name: "Consultation (Free)", qty: 1, amount: 0 });

        if (visit.pharmacyDiscount > 0) items.push({ name: "PHARMACY DISCOUNT", qty: 1, amount: -visit.pharmacyDiscount });

        if (visit.paidAmount > 0) items.push({ name: `PAID (${visit.paymentMode})`, qty: 1, amount: -visit.paidAmount });

        generateBill({
            billNo: `RCPT-${visit.id.slice(-4).toUpperCase()}`,
            date: new Date(visit.date).toLocaleDateString(),
            patientName: cleanName(patient.name),
            patientId: patient.readableId || patient.id.slice(0, 6),
            appointmentId: visit.appointmentId || "WALK-IN",
            doctorName: visit.doctorName || "Dr. Chirag Raval",
            items: items
        });
    };

    if (loading) return <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" /> Loading...</div>;
    if (!patient) return <div className="p-10 text-center">Patient not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <StaffHeader />

            <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">

                {/* --- TOP BAR (SEARCH & WALLET) --- */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[#0f172a]">Patient Profile</h2>
                        <div className="flex gap-2 items-center mt-1">
                            <p className="text-xs text-[#0284c7] font-bold uppercase tracking-widest bg-[#0f172a]/5 px-2 py-1 rounded w-fit">
                                ID: {patient.readableId}
                            </p>
                            {linkedAppointmentId && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">Linked: {linkedAppointmentId.slice(-4)}</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* 💰 WALLET BADGE */}
                        <button
                            onClick={() => {
                                setWalletAmount("");
                                setWalletType("CREDIT");
                                setShowWalletModal(true);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition hover:shadow-md ${patient.walletBalance < 0 ? 'bg-red-50 border-red-200 text-red-700' : (patient.walletBalance > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 text-gray-600')}`}
                        >
                            <Wallet size={18} />
                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase">Wallet Balance</p>
                                <p className="font-bold text-sm">
                                    {patient.walletBalance < 0 ? `Due: ₹${Math.abs(patient.walletBalance)}` : `Credit: ₹${patient.walletBalance}`}
                                </p>
                            </div>
                        </button>

                        <div className="relative w-full sm:w-80">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search Patient..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => searchQuery.length > 1 && setShowPatientSearch(true)}
                                    onBlur={() => setTimeout(() => setShowPatientSearch(false), 200)}
                                />
                                {searchQuery && (
                                    <button onClick={() => { setSearchQuery(""); setShowPatientSearch(false); }} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            {showPatientSearch && patientSuggestions.length > 0 && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                                    {patientSuggestions.map((p) => (
                                        <button key={p.id} onClick={() => selectPatient(p.id)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b flex justify-between group">
                                            <div><p className="font-bold text-sm text-[#0f172a]">{cleanName(p.name)}</p><p className="text-xs text-gray-500">{p.phone}</p></div>
                                            <div className="text-right">
                                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{p.readableId}</span>
                                                {p.walletBalance !== 0 && (
                                                    <p className={`text-[10px] font-bold mt-1 ${p.walletBalance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                        {p.walletBalance < 0 ? `Due: ${Math.abs(p.walletBalance)}` : `Adv: ${p.walletBalance}`}
                                                    </p>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* --- LEFT: PATIENT DETAILS --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <PatientDetailsCard
                            patient={patient}
                            setPatient={setPatient}
                            isEditingDetails={isEditingDetails}
                            setIsEditingDetails={setIsEditingDetails}
                            handleSaveDetails={handleSaveDetails}
                            savingDetails={savingDetails}
                            showExtendedDetails={showExtendedDetails}
                            setShowExtendedDetails={setShowExtendedDetails}
                        />
                    </div>

                    {/* --- RIGHT: PRESCRIBE --- */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className={`bg-white rounded-xl shadow-sm border p-6 relative ${editingVisitId ? 'border-amber-400 ring-1 ring-amber-400' : 'border-gray-100'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-[#0f172a] flex items-center gap-2">
                                    <Stethoscope className="text-[#0284c7]" />
                                    {editingVisitId ? "Editing Past Consultation" : "New Consultation"}
                                </h3>
                                {editingVisitId && (
                                    <button onClick={handleCancelEdit} className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-gray-600">Cancel Edit</button>
                                )}
                            </div>

                            <div className="flex gap-4 mb-4 p-1 bg-gray-50 rounded-lg w-fit">
                                <button type="button" onClick={() => setConsultationType('REGULAR')} className={`px-4 py-2 text-xs font-bold rounded-md transition ${consultationType === 'REGULAR' ? 'bg-[#0f172a] text-white shadow' : 'text-gray-500 hover:bg-gray-200'}`}>Regular Consultation</button>
                                <button type="button" onClick={() => setConsultationType('PANCHKARMA')} className={`px-4 py-2 text-xs font-bold rounded-md transition ${consultationType === 'PANCHKARMA' ? 'bg-[#0284c7] text-[#0f172a] shadow' : 'text-gray-500 hover:bg-gray-200'}`}>Panchkarma / Procedure</button>
                            </div>

                            {consultationType === 'REGULAR' && (
                                <>
                                    {/* VITALS SECTION */}
                                    <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 border p-3 rounded-lg">
                                        <div><label className="text-[10px] font-bold uppercase text-gray-500">BP</label><input placeholder="e.g. 120/80" className="w-full p-2 border rounded text-xs bg-white" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} /></div>
                                        <div><label className="text-[10px] font-bold uppercase text-gray-500">Pulse</label><input placeholder="e.g. 72 bpm" className="w-full p-2 border rounded text-xs bg-white" value={pulse} onChange={(e) => setPulse(e.target.value)} /></div>
                                        <div><label className="text-[10px] font-bold uppercase text-gray-500">Temp</label><input placeholder="e.g. 98.6 F" className="w-full p-2 border rounded text-xs bg-white" value={temperature} onChange={(e) => setTemperature(e.target.value)} /></div>
                                        <div><label className="text-[10px] font-bold uppercase text-gray-500">Resp</label><input placeholder="e.g. 16/min" className="w-full p-2 border rounded text-xs bg-white" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} /></div>
                                    </div>

                                    {/* CASE TAKING */}
                                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Diagnosis / Symptoms</label>
                                            <textarea className="w-full p-3 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0284c7] outline-none" rows={2} value={visitNote} onChange={(e) => setVisitNote(e.target.value)} placeholder="Enter Chief Complaints & Diagnosis..." />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Aggravation / Amelioration</label>
                                            <textarea className="w-full p-3 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0284c7] outline-none" rows={2} value={aggravationAmelioration} onChange={(e) => setAggravationAmelioration(e.target.value)} placeholder="e.g. < morning, > warmth" />
                                        </div>
                                    </div>

                                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Miasms</label>
                                            <input className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0284c7] outline-none" value={miasms} onChange={(e) => setMiasms(e.target.value)} placeholder="e.g. Psora, Sycosis..." />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-gray-400">Special Note (Optional)</label>
                                            <input className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0284c7] outline-none" value={panchkarmaNote} onChange={(e) => setPanchkarmaNote(e.target.value)} placeholder="Additional private notes..." />
                                        </div>
                                    </div>

                                    {/* REPERTORY TAGGING */}
                                    <div className="mb-4">
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Repertory Rubrics</label>
                                        <div className="relative">
                                            <input className="w-full p-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-[#0284c7]" placeholder="Search chapter or rubric... e.g. Mind Anxiety" value={repSearch} onChange={e => { setRepSearch(e.target.value); setShowRep(true); }} onFocus={() => setShowRep(true)} />
                                            {showRep && repSearch.length > 0 && (
                                                <div className="absolute top-full mt-1 left-0 w-full bg-white border shadow-lg max-h-48 overflow-y-auto z-50 rounded-lg">
                                                    {repertoryData.flatMap(chap => chap.rubrics.map(rub => ({ chapter: chap.chapter, rubric: rub })))
                                                        .filter(r => `${r.chapter} ${r.rubric}`.toLowerCase().includes(repSearch.toLowerCase()))
                                                        .slice(0, 20)
                                                        .map((r, i) => (
                                                            <button key={i} type="button" onClick={() => {
                                                                if (!repertoryRubrics.includes(`${r.chapter} - ${r.rubric}`)) {
                                                                    setRepertoryRubrics([...repertoryRubrics, `${r.chapter} - ${r.rubric}`]);
                                                                }
                                                                setRepSearch("");
                                                                setShowRep(false);
                                                            }} className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 border-b last:border-0 block">
                                                                <span className="font-bold text-gray-700">{r.chapter}:</span> {r.rubric}
                                                            </button>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                        {repertoryRubrics.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {repertoryRubrics.map((r, idx) => (
                                                    <span key={idx} className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-blue-200">
                                                        {r} <button type="button" onClick={() => setRepertoryRubrics(repertoryRubrics.filter((_, i) => i !== idx))} className="hover:text-red-500"><X size={12} /></button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {consultationType === 'PANCHKARMA' && (
                                <div className="mb-4">
                                    <label className="text-[10px] font-bold uppercase text-[#0284c7]">Procedure Details / Notes</label>
                                    <textarea
                                        className="w-full p-3 border border-purple-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
                                        rows={3}
                                        placeholder="Enter Panchkarma procedure details..."
                                        value={panchkarmaNote}
                                        onChange={(e) => setPanchkarmaNote(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className={`bg-[#f8faf9] p-4 rounded-lg border transition-all ${editingMedId !== null ? 'border-amber-300 ring-1 ring-amber-300' : 'border-gray-200'}`}>
                                {editingMedId !== null && <div className="text-xs font-bold text-amber-600 mb-2 flex items-center gap-1"><Edit2 size={12} /> Editing Item</div>}
                                <div className="grid grid-cols-12 gap-3 items-end">
                                    <div className={`col-span-12 ${consultationType === 'PANCHKARMA' ? 'md:col-span-8' : 'md:col-span-4'} relative`} ref={medListRef}>
                                        <label className="text-[10px] font-bold uppercase text-gray-500">{consultationType === 'PANCHKARMA' ? 'Procedure' : 'Medicine'}</label>
                                        <input type="text" className="w-full p-2 border rounded-md text-sm bg-white" value={medQuery} onChange={(e) => { setMedQuery(e.target.value); setShowMedList(true); }} onFocus={() => setShowMedList(true)} placeholder={consultationType === 'PANCHKARMA' ? "Search procedure..." : "Search medicine..."} />
                                        {showMedList && (
                                            <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto z-40">
                                                {inventory.filter(i => i.name.toLowerCase().includes(medQuery.toLowerCase())).map(item => (
                                                    <button type="button" key={item.id} onClick={() => selectMedicine(item)} className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 text-[#0f172a] border-b">{item.name}</button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {consultationType === 'REGULAR' && (
                                        <>
                                            <div className="col-span-6 md:col-span-2"><label className="text-[10px] font-bold uppercase text-gray-500">Potency</label><input list="potency-opts" className="w-full p-2 border rounded text-sm bg-white" value={newMed.potency} onChange={e => setNewMed({ ...newMed, potency: e.target.value })} /><datalist id="potency-opts">{POTENCY_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</datalist></div>
                                            <div className="col-span-6 md:col-span-2"><label className="text-[10px] font-bold uppercase text-gray-500">Dosage</label><select className="w-full p-2 border rounded text-sm bg-white" value={newMed.dosage} onChange={e => setNewMed({ ...newMed, dosage: e.target.value })}>{DOSAGE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></div>
                                            <div className="col-span-6 md:col-span-2"><label className="text-[10px] font-bold uppercase text-gray-500">Vehicle</label><select className="w-full p-2 border rounded text-sm bg-white" value={newMed.vehicle} onChange={e => setNewMed({ ...newMed, vehicle: e.target.value })}>{VEHICLE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></div>
                                        </>
                                    )}

                                    <div className="col-span-6 md:col-span-2"><label className="text-[10px] font-bold uppercase text-gray-500">Duration</label><select className="w-full p-2 border rounded text-sm bg-white" value={newMed.duration} onChange={e => setNewMed({ ...newMed, duration: e.target.value })}>{(consultationType === 'PANCHKARMA' ? PANCHKARMA_DURATIONS : REGULAR_DURATIONS).map(opt => <option key={opt}>{opt}</option>)}</select></div>
                                    <div className="col-span-6 md:col-span-2"><button type="button" onClick={handleAddMedicine} className={`w-full h-[38px] text-white rounded flex items-center justify-center text-sm font-bold shadow-md ${editingMedId !== null ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0f172a] hover:bg-[#020617]'}`}>{editingMedId !== null ? <Save size={16} /> : <Plus size={16} />}<span className="ml-1">ADD</span></button></div>
                                </div>

                                <div className="grid grid-cols-12 gap-3 items-end mt-2">
                                    {consultationType === 'REGULAR' && (
                                        <div className="col-span-4">
                                            <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1"><Droplets size={10} /> With</label>
                                            <select className="w-full p-2 border rounded text-sm bg-white" value={newMed.with} onChange={e => setNewMed({ ...newMed, with: e.target.value })}>{WITH_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select>
                                        </div>
                                    )}
                                    <div className={consultationType === 'REGULAR' ? "col-span-8" : "col-span-12"}>
                                        <label className="text-[10px] font-bold uppercase text-gray-500">Instruction</label>
                                        <input list="instruction-options" className="w-full p-2 border rounded text-sm bg-white" value={newMed.instruction} onChange={e => setNewMed({ ...newMed, instruction: e.target.value })} placeholder="Select or type..." />
                                        <datalist id="instruction-options">{INSTRUCTION_OPTIONS.map(opt => <option key={opt} value={opt} />)}</datalist>
                                    </div>
                                </div>
                            </div>

                            {currentPrescriptions.length > 0 && (
                                <div className="mt-4 border rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
                                            <tr><th className="p-2 pl-3">Medicine/Procedure</th><th className="p-2">Dosage</th><th className="p-2">Details</th><th className="p-2 text-right">Action</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {currentPrescriptions.map((p) => (
                                                <tr key={p.id} className={editingMedId === p.id ? "bg-amber-50" : ""}>
                                                    <td className="p-2 pl-3"><div className="font-bold text-[#0f172a]">{p.medicineName} <span className="font-mono text-purple-700 font-bold ml-1">{p.potency !== "-" ? p.potency : ""}</span></div><div className="text-xs text-gray-500">{p.vehicle} • {p.duration}</div></td>
                                                    <td className="p-2 font-mono text-xs">{p.dosage}</td>
                                                    <td className="p-2 text-xs text-gray-600">{p.instruction}</td>
                                                    <td className="p-2 text-right"><button onClick={() => handleEditDraftMedicine(p)} className="text-blue-400 hover:text-blue-600 mr-2"><Edit2 size={16} /></button><button onClick={() => removeDraftMedicine(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="mt-6 border-t pt-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><BadgePercent size={14} /> Consultation Charge?</span>
                                    <div className="flex gap-2 bg-gray-100 p-1 rounded">
                                        <button type="button" onClick={() => setIsChargeable("YES")} className={`px-3 py-1 rounded text-xs font-bold transition ${isChargeable === "YES" ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:bg-white'}`}>Yes (₹500)</button>
                                        <button type="button" onClick={() => setIsChargeable("NO")} className={`px-3 py-1 rounded text-xs font-bold transition ${isChargeable === "NO" ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-white'}`}>No (Free)</button>
                                    </div>
                                </div>

                                <button type="button" onClick={handleSaveVisit} className={`px-6 py-2 rounded font-bold text-sm shadow flex items-center gap-2 ${editingVisitId ? 'bg-amber-400 text-black hover:bg-amber-500' : 'bg-[#0284c7] text-[#0f172a] hover:bg-[#0369a1]'}`}>
                                    <FileText size={16} /> {editingVisitId ? "Update Consultation" : "Save Consultation"}
                                </button>
                            </div>
                        </div>

                        {/* Visit History */}
                        <VisitHistoryList
                            visitHistory={visitHistory}
                            handleEditHistory={handleEditHistory}
                            handleDeleteHistory={handleDeleteHistory}
                            handlePrintReceipt={handlePrintReceipt}
                            handleFileUpload={handleFileUpload}
                            uploadingId={uploadingId}
                        />
                    </div>
                </div>

                {/* ✅ WALLET UPDATE MODAL */}
                <WalletModal
                    showWalletModal={showWalletModal}
                    setShowWalletModal={setShowWalletModal}
                    walletType={walletType}
                    setWalletType={setWalletType}
                    walletAmount={walletAmount}
                    setWalletAmount={setWalletAmount}
                    handleWalletUpdate={handleWalletUpdate}
                    patientName={patient.name}
                />

            </main>
        </div>
    );
}
