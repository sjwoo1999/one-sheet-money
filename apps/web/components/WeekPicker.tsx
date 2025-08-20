"use client";
import React from "react";

interface WeekPickerProps {
  date: Date; // any day within the selected week
  onChange: (nextDate: Date) => void;
  rangeLabel: string; // formatted "YYYY-MM-DD ~ MM-DD"
}

export function WeekPicker({ date, onChange, rangeLabel }: WeekPickerProps) {
  function addDays(base: Date, days: number) {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  }
  function handlePrev() { onChange(addDays(date, -7)); }
  function handleNext() { onChange(addDays(date, 7)); }

  return (
    <div className="flex items-center justify-between" aria-label="주 선택" role="group">
      <button
        type="button"
        onClick={handlePrev}
        className="px-3 py-1.5 rounded-xl border border-border"
        aria-label="이전 주"
      >
        ←
      </button>
      <div className="text-sm" aria-live="polite">{rangeLabel}</div>
      <button
        type="button"
        onClick={handleNext}
        className="px-3 py-1.5 rounded-xl border border-border"
        aria-label="다음 주"
      >
        →
      </button>
    </div>
  );
}


