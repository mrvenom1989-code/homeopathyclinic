export const DOSAGE_OPTIONS = [
    "1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-0", "0-1-1", "1-1-1",
    "2-0-0", "0-2-0", "0-0-2", "2-0-2", "2-2-0", "0-2-2", "2-2-2",
    "3-0-0", "0-3-0", "0-0-3", "3-0-3", "3-3-0", "0-3-3", "3-3-3",
    "4-0-0", "0-4-0", "0-0-4", "4-0-4", "4-4-0", "0-4-4", "4-4-4",
    "5-0-0", "0-5-0", "0-0-5", "5-0-5", "5-5-0", "0-5-5", "5-5-5",
    "6-0-0", "0-6-0", "0-0-6", "6-0-6", "6-6-0", "0-6-6", "6-6-6",
];
export const VEHICLE_OPTIONS = ["Single dose", "1 dram", "2 dram", "Sac Lac", "Liquid 15ml", "Liquid 30ml", "Liquid 100ml", "Ointment"];
export const POTENCY_OPTIONS = ["Q (MT)", "3x", "6x", "6c", "30c", "200c", "1M", "10M", "50M", "CM", "LM"];
export const INSTRUCTION_OPTIONS = ["After Food", "Before Food", "Empty Stomach", "Before Sleep"];
export const WITH_OPTIONS = ["Regular Water", "Warm Water", "Milk", "Honey", "Ghee", "External Application"];
export const CONSULTATION_TYPES = ["New Case Consultation", "Follow-up Consultation", "Acute Consultation", "Free"];

export const REGULAR_DURATIONS = ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days", "7 Days", "10 Days", "15 Days", "21 Days", "30 Days", "45 Days", "60 Days", "90 Days", "120 Days"];
export const PANCHKARMA_DURATIONS = Array.from({ length: 30 }, (_, i) => `${i + 1} Days`);

export const PHYSICAL_GENERALS_TEMPLATE = `Appetite : 
Thirst : 
Craving/Desire For Food Or Drinks (If Any) : 
Aversion Of Food Or Drinks (If Any) : 
Taste You Prefer Most : Sweet [ ], Spicy [ ], Sour [ ], Salty [ ]
Thermal : 
Perspiration : 
Bowels : 
Urine : 
Sleep : 
Dreams : 
Fears : `;
