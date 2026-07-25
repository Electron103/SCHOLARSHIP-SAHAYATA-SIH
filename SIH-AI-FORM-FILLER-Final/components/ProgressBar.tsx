import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const getWidthClass = (percentage: number) => {
  const p = Math.max(0, Math.min(100, Math.round(percentage)));
  const bucket = Math.round(p / 10) * 10; // 0,10,20,...,100
  switch (bucket) {
    case 0: return 'w-0';
    case 10: return 'w-[10%]';
    case 20: return 'w-[20%]';
    case 30: return 'w-[30%]';
    case 40: return 'w-[40%]';
    case 50: return 'w-[50%]';
    case 60: return 'w-[60%]';
    case 70: return 'w-[70%]';
    case 80: return 'w-[80%]';
    case 90: return 'w-[90%]';
    case 100:
    default:
      return 'w-full';
  }
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const safe = Math.max(0, Math.min(100, Math.round(percentage)));
  const widthClass = getWidthClass(safe);

  return (
    <div
      className="w-full bg-white p-4 border-b border-slate-200 sticky top-16 z-40"
      role="region"
      aria-label="Form completion progress"
      title="Form completion progress"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-semibold text-indigo-700 uppercase">
            Form Completion
          </span>
          <span className="text-xs font-bold text-indigo-700">{safe}%</span>
        </div>

        {/* The element with role="progressbar" must have numeric aria-valuemin/max/now and a name */}
        <div
          className="w-full bg-slate-200 rounded-full h-2.5"
          role="progressbar"
          aria-label="Form completion"
          title="Form completion"
          aria-valuemin={0}            // <-- numeric
          aria-valuemax={100}          // <-- numeric
          aria-valuenow={safe}         // <-- numeric
          aria-valuetext={`${safe}% complete`}
        >
          <div
            className={`bg-indigo-600 h-2.5 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)] ${widthClass}`}
          />
        </div>

        {safe === 100 && (
          <p className="text-center text-xs text-emerald-600 font-bold mt-2 animate-pulse">
            Ready for Submission!
          </p>
        )}
      </div>
    </div>
  );
};
export default ProgressBar;
