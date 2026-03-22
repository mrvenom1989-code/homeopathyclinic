"use client";

import { Calendar, Eye, FileUp, Loader2, Printer, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface VisitHistoryListProps {
    visitHistory: any[];
    handleEditHistory: (visit: any) => void;
    handleDeleteHistory: (id: string) => void;
    handlePrintSickCertificate: (visit: any) => void;
    handlePrintAirportCertificate: (visit: any) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    uploadingId: string | null;
}

export default function VisitHistoryList({
    visitHistory, handleEditHistory, handleDeleteHistory, handlePrintSickCertificate, handlePrintAirportCertificate, handleFileUpload, uploadingId
}: VisitHistoryListProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-[#0f172a] flex items-center gap-2 mb-6"><Calendar className="text-[#0284c7]" /> History</h3>
            <div className="space-y-6">
                {visitHistory.length === 0 ? <p className="text-gray-400 text-sm italic">No history found.</p> : visitHistory.map((visit) => (
                    <div key={visit.id} className="relative pl-6 border-l-2 border-[#0284c7]/30 pb-6 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0284c7] border-2 border-white shadow-sm"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-bold text-[#0284c7] uppercase">{format(new Date(visit.date), "dd/MM/yyyy")}</span>
                                <p className="font-bold text-sm mt-1">{visit.diagnosis || "No Diagnosis"}</p>

                                <div className="flex gap-2 mt-1 text-[10px]">
                                    {visit.appointmentDiscount >= 500 ? <span className="bg-blue-50 text-blue-600 px-1 rounded">Consult: Free</span> : <span className="bg-green-50 text-green-700 px-1 rounded">Consult: Paid</span>}
                                    {visit.paidAmount > 0 && <span className="bg-gray-100 text-gray-600 px-1 rounded">Paid: ₹{visit.paidAmount}</span>}
                                </div>

                                {(visit.pulse || visit.temperature || visit.miasms || visit.aggravationAmelioration || (visit.repertoryRubrics && visit.repertoryRubrics !== "[]")) && (
                                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 grid grid-cols-2 gap-2">
                                        {visit.repertoryRubrics && visit.repertoryRubrics !== "[]" && (
                                            <div className="col-span-2">
                                                <span className="font-bold">Repertory Rubrics:</span>{" "}
                                                {(() => {
                                                    try {
                                                        const parsed = JSON.parse(visit.repertoryRubrics);
                                                        return Array.isArray(parsed) ? parsed.join(", ") : visit.repertoryRubrics;
                                                    } catch (e) {
                                                        return visit.repertoryRubrics;
                                                    }
                                                })()}
                                            </div>
                                        )}
                                        {visit.pulse && <div><span className="font-bold">Pulse:</span> {visit.pulse}</div>}
                                        {visit.temperature && <div><span className="font-bold">Temp:</span> {visit.temperature}</div>}
                                        {visit.respiratoryRate && <div><span className="font-bold">Resp:</span> {visit.respiratoryRate}</div>}
                                        {visit.miasms && <div className="col-span-2"><span className="font-bold">Miasms:</span> {visit.miasms}</div>}
                                        {visit.aggravationAmelioration && <div className="col-span-2"><span className="font-bold">Agg/Amel:</span> {visit.aggravationAmelioration}</div>}
                                    </div>
                                )}

                                <div className="mt-2 flex items-center gap-3">
                                    {visit.reportUrl ? <a href={visit.reportUrl} target="_blank" className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded flex items-center gap-1 font-bold"><Eye size={12} /> View Report</a> : <label className={`text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded flex items-center gap-1 font-bold cursor-pointer ${uploadingId === visit.id ? 'opacity-50' : ''}`}>{uploadingId === visit.id ? <Loader2 size={12} className="animate-spin" /> : <FileUp size={12} />} Upload<input type="file" className="hidden" onChange={(e) => handleFileUpload(e, visit.id)} /></label>}
                                    <button onClick={() => handlePrintSickCertificate(visit)} className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-1 flex items-center gap-1 font-bold border border-yellow-200 rounded-lg hover:bg-yellow-100 transition shadow-sm"><Printer size={12} /> Sick Certificate</button>
                                    <button onClick={() => handlePrintAirportCertificate(visit)} className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 flex items-center gap-1 font-bold border border-purple-200 rounded-lg hover:bg-purple-100 transition shadow-sm"><Printer size={12} /> Airport Clearance</button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditHistory(visit)} className="text-blue-500 bg-blue-50 p-1 rounded"><Edit2 size={14} /></button>
                                <button onClick={() => handleDeleteHistory(visit.id)} className="text-red-500 bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
                            </div>
                        </div>
                        {visit.prescriptions?.map((p: any, i: number) => (
                            <div key={i} className="flex justify-between text-xs text-gray-600 py-1 border-b last:border-0 border-gray-100">
                                <span>{p.medicineName}</span>
                                <span>{p.dosage}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
