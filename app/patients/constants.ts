export const DOSAGE_OPTIONS = [
    "SOS", "1 Dose", "2 Doses", "3 Doses",
    "1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-0", "0-1-1", "1-1-1",
    "2-0-0", "0-2-0", "0-0-2", "2-0-2", "2-2-0", "0-2-2", "2-2-2"
];
export const VEHICLE_OPTIONS = ["Pills", "Globules", "Distilled Water", "Sugar of Milk", "Tablet", "Ointment", "Drop"];
export const POTENCY_OPTIONS = ["Q (Mother Tincture)", "3x", "6x", "6c", "30c", "200c", "1M", "10M", "50M", "CM"];
export const INSTRUCTION_OPTIONS = ["After Food", "Before Food", "Empty Stomach", "Before Sleep"];
export const WITH_OPTIONS = ["Regular Water", "Warm Water", "Milk", "Honey", "Ghee", "External Application"];

export const REGULAR_DURATIONS = ["7 Days", "10 Days", "15 Days", "21 Days", "30 Days", "45 Days", "60 Days", "90 Days", "120 Days"];
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
