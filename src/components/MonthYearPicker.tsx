import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonthYearPickerProps {
  currentDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function MonthYearPicker({ currentDate, onSelect, onClose }: MonthYearPickerProps) {
  const [year, setYear] = useState(currentDate.getFullYear());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-card-hover w-full max-w-sm animate-scale-in overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button
            onClick={() => setYear(y => y - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-display text-lg font-semibold text-foreground">{year}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setYear(y => y + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">
          {MONTHS.map((m, i) => {
            const isActive = i === currentDate.getMonth() && year === currentDate.getFullYear();
            const isCurrentMonth = i === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <button
                key={m}
                onClick={() => {
                  onSelect(new Date(year, i, 1));
                  onClose();
                }}
                className={cn(
                  "py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : isCurrentMonth
                    ? "bg-accent text-accent-foreground ring-2 ring-primary"
                    : "bg-secondary text-foreground hover:bg-accent"
                )}
              >
                {m}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 p-4 pt-0">
          <button
            onClick={() => {
              const now = new Date();
              onSelect(new Date(now.getFullYear(), now.getMonth(), 1));
              onClose();
            }}
            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonthYearPicker;