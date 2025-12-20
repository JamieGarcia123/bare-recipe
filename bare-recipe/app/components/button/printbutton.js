"use client"

export default function PrintButton() {
  return (
    <button className="printBtn" onClick={() => window.print()}>
      Print Recipe
    </button>
  );
}