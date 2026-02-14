"use client";

interface TemperatureSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function TemperatureSlider({ value, onChange }: TemperatureSliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-phoro-text">
          Temperatur
        </label>
        <span className="text-sm font-semibold text-phoro-primary">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-phoro-divider accent-phoro-primary"
      />
      <div className="mt-1 flex justify-between text-[10px] text-phoro-text/40">
        <span>Präzise (0.0)</span>
        <span>Kreativ (1.0)</span>
      </div>
    </div>
  );
}
