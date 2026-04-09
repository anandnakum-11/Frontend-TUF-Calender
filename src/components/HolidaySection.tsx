import { format } from 'date-fns';
import { Sparkles, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Holiday } from '@/utils/calendarData';

interface HolidaySectionProps {
  holidays: Holiday[];
  currentDate: Date;
  onSelectDate?: (date: Date) => void;
}

function HolidaySection({ holidays, currentDate, onSelectDate }: HolidaySectionProps) {
  const sortedHolidays = [...holidays].sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date();

  return (
    <div className="bg-card/72 rounded-[28px] border border-white/35 shadow-card p-6 flex flex-col gap-4 backdrop-blur-2xl transition-all duration-300 hover:shadow-card-hover">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-holiday" />
        <h2 className="font-display text-xl font-semibold text-card-foreground">
          Holidays — {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

      {sortedHolidays.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
          <CalendarDays className="w-8 h-8 opacity-30" />
          <p className="text-sm">No holidays this month</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar-thin pr-1">
          {sortedHolidays.map((holiday, idx) => {
            const holidayDate = new Date(holiday.date + 'T00:00:00');
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const holidayStart = new Date(holidayDate.getFullYear(), holidayDate.getMonth(), holidayDate.getDate());
            const isPast = holidayStart.getTime() < todayStart.getTime();
            const isToday = holidayStart.getTime() === todayStart.getTime();

            return (
              <button
                key={idx}
                onClick={() => onSelectDate?.(holidayDate)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border border-border transition-all duration-200 text-left group",
                  isPast && "opacity-50",
                  isToday && "border-holiday bg-holiday/10",
                  !isPast && !isToday && "bg-secondary hover:border-holiday/40 hover:bg-holiday/5"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0",
                  isToday ? "bg-holiday text-holiday-foreground" : "bg-holiday/10 text-holiday"
                )}>
                  <span className="text-xs font-semibold leading-none">{format(holidayDate, 'MMM')}</span>
                  <span className="text-sm font-bold leading-none mt-0.5">{format(holidayDate, 'd')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">{format(holidayDate, 'EEEE')}</p>
                </div>
                {isToday && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-holiday text-holiday-foreground uppercase tracking-wider shrink-0">
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HolidaySection;
