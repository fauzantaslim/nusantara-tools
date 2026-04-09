import { useState, useCallback, useMemo } from "react";
import { ReceiptItem, Person, SplitMode, BillBreakdown } from "../types";
import { parseReceiptImage } from "../utils/ocr-utils";

export const useSplitBill = () => {
  const [mode, setMode] = useState<SplitMode>("manual");

  const [people, setPeople] = useState<Person[]>([
    { id: "1", name: "You" },
    { id: "2", name: "Friend 1" },
  ]);

  const [items, setItems] = useState<ReceiptItem[]>([]);

  const [manualSubTotal, setManualSubTotal] = useState<number>(100000);
  const [taxPercent, setTaxPercent] = useState<number>(11);
  const [servicePercent, setServicePercent] = useState<number>(5);

  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // Methods
  const addPerson = useCallback(
    (name: string) => {
      if (people.length >= 50) return; // limit to 50 people
      setPeople((prev) => [...prev, { id: crypto.randomUUID(), name }]);
    },
    [people],
  );

  const removePerson = useCallback((id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    // also remove from any items they were assigned to
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        assignedTo: item.assignedTo.filter((pId) => pId !== id),
      })),
    );
  }, []);

  const clearPeople = useCallback(() => {
    if (!window.confirm("Yakin ingin menghapus semua teman?")) return;
    setPeople([]);
    setItems((prev) => prev.map((item) => ({ ...item, assignedTo: [] })));
  }, []);

  const processReceipt = useCallback(
    async (file: File) => {
      setIsProcessingOcr(true);
      setOcrProgress(0);
      setOcrError(null);
      try {
        const parsedItems = await parseReceiptImage(file, setOcrProgress);
        if (parsedItems.length === 0) {
          setOcrError("No items detected. Please input manually.");
        } else {
          const assignedItems = parsedItems.map((item) => ({
            ...item,
            assignedTo: people.map((p) => p.id),
          }));
          setItems(assignedItems);
          setMode("ocr");
        }
      } catch (err: any) {
        setOcrError(err.message || "Failed to process image.");
      } finally {
        setIsProcessingOcr(false);
      }
    },
    [people],
  );

  const addItem = useCallback(
    (name: string, price: number) => {
      setItems((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name,
          price,
          assignedTo: people.map((p) => p.id),
        },
      ]);
    },
    [people],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateItem = useCallback(
    (id: string, updates: Partial<ReceiptItem>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
    },
    [],
  );

  const toggleItemAssignment = useCallback(
    (itemId: string, personId: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            const assigned = item.assignedTo.includes(personId)
              ? item.assignedTo.filter((id) => id !== personId)
              : [...item.assignedTo, personId];
            return { ...item, assignedTo: assigned };
          }
          return item;
        }),
      );
    },
    [],
  );

  // Recalculations
  const subTotal = useMemo(() => {
    if (mode === "manual") return manualSubTotal;
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [mode, manualSubTotal, items]);

  const taxAmount = (subTotal * taxPercent) / 100;
  const serviceAmount = (subTotal * servicePercent) / 100;
  const grandTotal = subTotal + taxAmount + serviceAmount;

  // Breakdown Calculation
  const breakdown = useMemo<BillBreakdown[]>(() => {
    const defaultBreakdown = people.map((p) => ({
      personId: p.id,
      personName: p.name,
      itemsCost: 0,
      taxAmount: 0,
      serviceAmount: 0,
      totalAmount: 0,
    }));

    if (mode === "manual") {
      // Manual = equal split
      if (people.length === 0) return defaultBreakdown;

      const equalSubTotal = subTotal / people.length;
      const equalTax = taxAmount / people.length;
      const equalService = serviceAmount / people.length;
      const equalTotal = equalSubTotal + equalTax + equalService;

      return defaultBreakdown.map((b) => ({
        ...b,
        itemsCost: equalSubTotal,
        taxAmount: equalTax,
        serviceAmount: equalService,
        totalAmount: equalTotal,
      }));
    }

    // OCR Item-based split
    const result = [...defaultBreakdown];

    // Distribute item costs
    items.forEach((item) => {
      if (item.assignedTo.length === 0) {
        if (people.length > 0) {
          const splitPrice = item.price / people.length;
          result.forEach((r) => {
            r.itemsCost += splitPrice;
          });
        }
        return;
      }

      const splitPrice = item.price / item.assignedTo.length;
      item.assignedTo.forEach((personId) => {
        const pRecord = result.find((r) => r.personId === personId);
        if (pRecord) pRecord.itemsCost += splitPrice;
      });
    });

    // Distribute tax and service proportionally to items cost, or equally if items cost is 0
    const totalAssignedItemsCost = result.reduce(
      (acc, r) => acc + r.itemsCost,
      0,
    );

    result.forEach((r) => {
      if (totalAssignedItemsCost > 0) {
        const ratio = r.itemsCost / totalAssignedItemsCost;
        r.taxAmount = taxAmount * ratio;
        r.serviceAmount = serviceAmount * ratio;
      } else {
        r.taxAmount = taxAmount / people.length;
        r.serviceAmount = serviceAmount / people.length;
      }
      r.totalAmount = r.itemsCost + r.taxAmount + r.serviceAmount;
    });

    return result;
  }, [people, mode, subTotal, taxAmount, serviceAmount, items]);

  // Handle Share link via Base64 serialization
  const generateShareLink = useCallback(() => {
    const state = {
      m: mode,
      p: people,
      i: items,
      sT: manualSubTotal,
      tax: taxPercent,
      srv: servicePercent,
    };
    try {
      const stateStr = JSON.stringify(state);
      const b64 = btoa(encodeURIComponent(stateStr));
      const url = new URL(window.location.href);
      url.searchParams.set("s", b64);
      return url.toString();
    } catch {
      return null;
    }
  }, [mode, people, items, manualSubTotal, taxPercent, servicePercent]);

  const loadFromShareLink = useCallback((b64: string) => {
    try {
      const str = decodeURIComponent(atob(b64));
      const state = JSON.parse(str);
      // Basic validation
      if (state.m) setMode(state.m);
      if (state.p) setPeople(state.p);
      if (state.i) setItems(state.i);
      if (state.sT !== undefined) setManualSubTotal(state.sT);
      if (state.tax !== undefined) setTaxPercent(state.tax);
      if (state.srv !== undefined) setServicePercent(state.srv);
    } catch (e) {
      console.error("Failed to load state from link", e);
    }
  }, []);

  return {
    mode,
    setMode,
    people,
    addPerson,
    removePerson,
    items,
    addItem,
    removeItem,
    updateItem,
    toggleItemAssignment,
    manualSubTotal,
    setManualSubTotal,
    taxPercent,
    setTaxPercent,
    servicePercent,
    setServicePercent,
    subTotal,
    taxAmount,
    serviceAmount,
    grandTotal,
    breakdown,
    processReceipt,
    isProcessingOcr,
    ocrProgress,
    ocrError,
    generateShareLink,
    loadFromShareLink,
    clearPeople,
  };
};
