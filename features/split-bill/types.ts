export type SplitMode = "manual" | "ocr";

export interface Person {
  id: string;
  name: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  assignedTo: string[]; // array of Person IDs
}

export interface SplitState {
  mode: SplitMode;
  people: Person[];
  items: ReceiptItem[];
  subTotal: number; // For manual mode it's user input, for OCR mode it's sum of items
  taxPercent: number; // Example: 11
  servicePercent: number; // Example: 5
}

export interface BillBreakdown {
  personId: string;
  personName: string;
  itemsCost: number; // Sum of partial item costs assigned to this person
  taxAmount: number; // Proportional
  serviceAmount: number; // Proportional
  totalAmount: number; // Grand total for this person
}
