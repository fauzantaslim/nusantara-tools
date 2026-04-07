"use client";

import { useState, useCallback, useMemo } from "react";
import {
  AssetType,
  AssetGroup,
  DepreciationMethod,
  DepreciationResult,
  ASSET_GROUPS,
  calculateDepreciation,
  getAssetGroupDetail,
} from "../utils";

function getCurrentMonthStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function useDepresiasi() {
  const [assetType, setAssetType] = useState<AssetType>("tangible");
  const [assetGroup, setAssetGroup] = useState<AssetGroup>("group1");
  const [method, setMethod] = useState<DepreciationMethod>("straight_line");
  const [cost, setCost] = useState("");
  const [startDate, setStartDate] = useState(getCurrentMonthStr);
  const [result, setResult] = useState<DepreciationResult | null>(null);
  const [error, setError] = useState("");

  const availableGroups = useMemo(() => {
    return ASSET_GROUPS[assetType];
  }, [assetType]);

  const selectedGroupDetail = useMemo(() => {
    return getAssetGroupDetail(assetType, assetGroup);
  }, [assetType, assetGroup]);

  // When switching asset type, reset group to first available
  const handleSetAssetType = useCallback(
    (type: AssetType) => {
      setAssetType(type);
      const firstGroup = ASSET_GROUPS[type][0];
      setAssetGroup(firstGroup.id);
      // Building assets can only use straight line
      if (
        (firstGroup.id === "building_permanent" ||
          firstGroup.id === "building_nonpermanent") &&
        method === "declining_balance"
      ) {
        setMethod("straight_line");
      }
      setResult(null);
    },
    [method],
  );

  const handleSetAssetGroup = useCallback(
    (group: AssetGroup) => {
      setAssetGroup(group);
      // Building assets can only use straight line
      if (
        (group === "building_permanent" || group === "building_nonpermanent") &&
        method === "declining_balance"
      ) {
        setMethod("straight_line");
      }
      setResult(null);
    },
    [method],
  );

  const handleSetMethod = useCallback((m: DepreciationMethod) => {
    setMethod(m);
    setResult(null);
  }, []);

  const isBuilding =
    assetGroup === "building_permanent" ||
    assetGroup === "building_nonpermanent";

  const calculate = useCallback(() => {
    setError("");

    const numCost = Number(cost) || 0;
    if (numCost <= 0) {
      setError("Masukkan nilai perolehan aset terlebih dahulu.");
      return;
    }

    if (!startDate) {
      setError("Masukkan tanggal perolehan aset.");
      return;
    }

    const res = calculateDepreciation({
      cost: numCost,
      type: assetType,
      group: assetGroup,
      method,
      startDate,
    });

    if (!res) {
      setError("Terjadi kesalahan dalam perhitungan. Periksa kembali input.");
      return;
    }

    setResult(res);
  }, [cost, assetType, assetGroup, method, startDate]);

  const reset = useCallback(() => {
    setCost("");
    setStartDate(getCurrentMonthStr());
    setResult(null);
    setError("");
  }, []);

  return {
    assetType,
    setAssetType: handleSetAssetType,
    assetGroup,
    setAssetGroup: handleSetAssetGroup,
    method,
    setMethod: handleSetMethod,
    cost,
    setCost,
    startDate,
    setStartDate,
    result,
    error,
    availableGroups,
    selectedGroupDetail,
    isBuilding,
    calculate,
    reset,
  };
}
