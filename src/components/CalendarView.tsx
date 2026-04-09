import { useEffect, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  isBefore,
  isToday,
} from 'date-fns';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Leaf,
  Snowflake,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getDailyQuote,
  getHolidays,
  getMonthFact,
  getMonthImage,
  getMonthTheme,
} from '@/utils/calendarData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import NotesSection from './NotesSection';
import ReminderPanel from './ReminderPanel';
import DayDetailPanel from './DayDetailPanel';
import MonthYearPicker from './MonthYearPicker';
import HolidaySection from './HolidaySection';
import DayModal from './DayModal';
import type { Holiday, Reminder, ScheduleEvent } from '@/utils/calendarData';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Note {
  id: string;
  dateRange: { start: string; end: string };
  content: string;
}

const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const seasonIconMap = {
  Winter: Snowflake,
  Spring: Flower2,
  Summer: SunMedium,
  Autumn: Leaf,
};

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useLocalStorage<DateRange>('calendar-dateRange', { start: null, end: null });
  const [notes, setNotes] = useLocalStorage<Note[]>('calendar-notes', []);
  const [scheduleEvents, setScheduleEvents] = useLocalStorage<ScheduleEvent[]>('calendar-events', []);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('calendar-reminders', []);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [modalDay, setModalDay] = useState<Date | null>(null);

  const parsedRange: DateRange = {
    start: dateRange.start ? new Date(dateRange.start as unknown as string) : null,
    end: dateRange.end ? new Date(dateRange.end as unknown as string) : null,
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const currentMonthImage = getMonthImage(currentDate.getMonth());
  const currentTheme = getMonthTheme(currentDate.getMonth());
  const staticHolidays = getHolidays(currentDate.getFullYear(), currentDate.getMonth());
  const dailyQuote = selectedDay ? getDailyQuote(selectedDay.getDate(), selectedDay.getMonth()) : getDailyQuote(new Date().getDate(), currentDate.getMonth());
  const monthFact = getMonthFact(currentDate.getMonth());
  const SeasonIcon = seasonIconMap[currentTheme.season];

  useEffect(() => {
    const year = currentDate.getFullYear();
    const controller = new AbortController();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : [])
      .then((data: Array<{ date: string; localName: string }>) => {
        const month = currentDate.getMonth();
        const filtered = data
          .filter(h => new Date(h.date).getMonth() === month)
          .map(h => ({ date: h.date, name: h.localName }));
        setPublicHolidays(filtered);
      })
      .catch(() => setPublicHolidays([]));
    return () => controller.abort();
  }, [currentDate]);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme.variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [currentTheme]);

  const allHolidays = [
    ...staticHolidays,
    ...publicHolidays.filter(ph =>
      !staticHolidays.some(sh => sh.date === ph.date || sh.name === ph.name)
    ),
  ].filter((h, i, arr) => arr.findIndex(x => x.date === h.date && x.name === h.name) === i);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handlePrevMonth = () => {
    setAnimationDirection('left');
    setIsAnimating(true);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setAnimationDirection('right');
    setIsAnimating(true);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDay(date);
    if (!parsedRange.start || (parsedRange.start && parsedRange.end)) {
      setDateRange({ start: date as never, end: null });
    } else if (isBefore(date, parsedRange.start)) {
      setDateRange({ start: date as never, end: parsedRange.start as never });
    } else {
      setDateRange({ start: parsedRange.start as never, end: date as never });
    }
  };

  const handleDateDoubleClick = (date: Date) => {
    setModalDay(date);
  };

  const isDateInRange = (date: Date): boolean => {
    if (!parsedRange.start) return false;
    if (!parsedRange.end) return isSameDay(date, parsedRange.start);
    return isWithinInterval(date, { start: parsedRange.start, end: parsedRange.end });
  };

  const isStartDate = (date: Date) => parsedRange.start ? isSameDay(date, parsedRange.start) : false;
  const isEndDate = (date: Date) => parsedRange.end ? isSameDay(date, parsedRange.end) : false;
  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();
  const getHolidayForDate = (date: Date) => allHolidays.find(h => isSameDay(new Date(h.date + 'T00:00:00'), date));

  const getEventsForDate = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return scheduleEvents.filter(e => e.date === key);
  };

  const getRemindersForDate = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return reminders.filter(r => r.date === key && !r.completed);
  };

  const handleSaveNote = (content: string) => {
    if (!parsedRange.start) return;
    const newNote: Note = {
      id: Date.now().toString(),
      dateRange: {
        start: parsedRange.start.toISOString(),
        end: parsedRange.end ? parsedRange.end.toISOString() : parsedRange.start.toISOString(),
      },
      content,
    };
    setNotes(prev => [...prev, newNote]);
  };

  const handleDeleteNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id));

  const handleAddEvent = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEvent: ScheduleEvent = { ...event, id: Date.now().toString() };
    setScheduleEvents(prev => [...prev, newEvent]);
  };

  const handleDeleteEvent = (id: string) => setScheduleEvents(prev => prev.filter(e => e.id !== id));

  const handleAddReminder = (reminder: Omit<Reminder, 'id' | 'completed'>) => {
    const newReminder: Reminder = { ...reminder, id: Date.now().toString(), completed: false };
    setReminders(prev => [...prev, newReminder]);
  };

  const handleDeleteReminder = (id: string) => setReminders(prev => prev.filter(r => r.id !== id));

  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleMonthJump = (date: Date) => {
    setAnimationDirection('right');
    setIsAnimating(true);
    setCurrentDate(date);
  };

  const handleSelectDayFromPanel = (date: Date) => {
    setSelectedDay(date);
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();
    if (dateMonth !== currentDate.getMonth() || dateYear !== currentDate.getFullYear()) {
      setAnimationDirection('right');
      setIsAnimating(true);
      setCurrentDate(new Date(dateYear, dateMonth, 1));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background p-4 transition-colors duration-700 md:p-6 lg:p-8">
      <div className="absolute inset-0">
        <img
          src={currentMonthImage}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-20 blur-2xl transition-all duration-700"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.effects.glowSoft} 0%, rgba(255,255,255,0.5) 34%, rgba(255,255,255,0.18) 100%)`,
          }}
        />
        <div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl animate-float-slow"
          style={{ background: currentTheme.effects.orbA }}
        />
        <div
          className="absolute right-[-4rem] top-1/4 h-80 w-80 rounded-full blur-3xl animate-float-delayed"
          style={{ background: currentTheme.effects.orbB }}
        />
        <div
          className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full blur-3xl animate-float-slower"
          style={{ background: currentTheme.effects.orbC }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `linear-gradient(${currentTheme.effects.line} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.effects.line} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at center, black 42%, transparent 92%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/35 bg-card/60 p-6 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.32)] backdrop-blur-2xl">
          <div
            className="absolute inset-0 opacity-95"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.effects.heroFrom} 0%, ${currentTheme.effects.heroTo} 100%)`,
            }}
          />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-white/10 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div className="text-left text-primary-foreground">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] backdrop-blur-md"
                  style={{ background: currentTheme.effects.badge }}
                >
                  <SeasonIcon className="h-4 w-4" />
                  {currentTheme.season} Theme
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em]">
                  <Sparkles className="h-4 w-4" />
                  {currentTheme.accentLabel}
                </span>
              </div>
              <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {format(currentDate, 'MMMM')} arrives with a fully changing seasonal atmosphere.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/88 sm:text-base">
                {currentTheme.atmosphere}. The image, colors, glow, and surrounding visual tone now shift automatically each time you move to a new month.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/22 bg-white/14 p-4 text-left text-primary-foreground backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">Mood</p>
                <p className="mt-2 font-display text-2xl font-semibold">{currentTheme.mood}</p>
              </div>
              <div className="rounded-3xl border border-white/22 bg-white/14 p-4 text-left text-primary-foreground backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">Season</p>
                <p className="mt-2 text-lg font-semibold">{currentTheme.season}</p>
              </div>
              <div className="rounded-3xl border border-white/22 bg-white/14 p-4 text-left text-primary-foreground backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">Month View</p>
                <p className="mt-2 text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-[28px] border border-white/35 bg-card/72 shadow-card backdrop-blur-2xl transition-all duration-500 hover:shadow-card-hover">
            <div className="relative h-[160px] w-full overflow-hidden sm:h-[200px] md:h-[240px]">
              <img
                src={currentMonthImage}
                alt={format(currentDate, 'MMMM yyyy')}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${currentTheme.effects.heroTo} 52%, ${currentTheme.effects.heroFrom} 100%)`,
                }}
              />
              <div
                className="absolute -right-10 top-6 h-28 w-28 rounded-full blur-3xl"
                style={{ background: currentTheme.effects.glow }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/90 backdrop-blur-md">
                    {format(currentDate, 'yyyy')}
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/85 backdrop-blur-md">
                    {currentTheme.season}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[0.18em] text-primary-foreground sm:text-4xl md:text-5xl">
                  {format(currentDate, 'MMMM').toUpperCase()}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-primary-foreground/82">
                  {currentTheme.mood} with {currentTheme.accentLabel.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-border/70 bg-white/20 px-4 py-4 sm:px-6">
              <button
                onClick={handlePrevMonth}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/80 text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-95"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowMonthPicker(true)}
                className="flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2 text-base font-semibold text-foreground transition-colors hover:bg-accent/80 hover:text-primary"
              >
                <CalendarDays className="h-4 w-4 text-primary" />
                {format(currentDate, 'MMMM yyyy')}
              </button>
              <button
                onClick={handleNextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/80 text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-95"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div
              className={cn(
                'p-3 sm:p-5',
                isAnimating && animationDirection === 'right' && 'animate-slide-in-right',
                isAnimating && animationDirection === 'left' && 'animate-slide-in-left',
              )}
            >
              <div className="mb-2 grid grid-cols-7 gap-1.5">
                {shortDayNames.map(day => (
                  <div key={day} className="py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {allDays.map((day, idx) => {
                  const holiday = getHolidayForDate(day);
                  const inRange = isDateInRange(day);
                  const start = isStartDate(day);
                  const end = isEndDate(day);
                  const currentMo = isCurrentMonth(day);
                  const today = isToday(day);
                  const dayEvents = getEventsForDate(day);
                  const dayReminders = getRemindersForDate(day);
                  const hasActivity = dayEvents.length > 0 || dayReminders.length > 0;
                  const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDateClick(day)}
                      onDoubleClick={() => handleDateDoubleClick(day)}
                      className={cn(
                        'relative aspect-square overflow-hidden rounded-2xl border border-transparent text-sm font-medium transition-all duration-200',
                        'flex flex-col items-center justify-center',
                        !currentMo && 'opacity-20',
                        currentMo && 'bg-secondary/55 hover:border-primary/30 hover:bg-accent/90 hover:shadow-sm',
                        inRange && !start && !end && 'border-range bg-range text-range-foreground',
                        (start || end) && 'border-primary bg-primary font-bold text-primary-foreground shadow-md',
                        today && !start && !end && 'ring-2 ring-primary ring-offset-2 ring-offset-card',
                        isSelected && !start && !end && 'border-primary/50 bg-accent shadow-sm',
                        holiday && !start && !end && 'border-holiday/20 bg-holiday/5',
                      )}
                      aria-label={format(day, 'MMMM d, yyyy')}
                      title={holiday ? holiday.name : undefined}
                    >
                      <span className="z-10 text-xs leading-none sm:text-sm">{format(day, 'd')}</span>
                      <div className="mt-1 flex h-1.5 gap-0.5">
                        {holiday && (
                          <span className="h-1.5 w-1.5 rounded-full bg-holiday animate-pulse-dot" />
                        )}
                        {hasActivity && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:sticky lg:top-8">
            {selectedDay && (
              <DayDetailPanel
                date={selectedDay}
                events={getEventsForDate(selectedDay)}
                holiday={getHolidayForDate(selectedDay)}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                dailyQuote={dailyQuote}
                monthFact={monthFact}
                onSelectDate={handleSelectDayFromPanel}
              />
            )}

            <NotesSection
              dateRange={{ start: parsedRange.start, end: parsedRange.end }}
              notes={notes}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
            />

            <HolidaySection
              holidays={allHolidays}
              currentDate={currentDate}
              onSelectDate={handleSelectDayFromPanel}
            />

            <ReminderPanel
              reminders={reminders}
              onAdd={handleAddReminder}
              onDelete={handleDeleteReminder}
              onToggle={handleToggleReminder}
            />
          </div>
        </div>
      </div>

      {showMonthPicker && (
        <MonthYearPicker
          currentDate={currentDate}
          onSelect={handleMonthJump}
          onClose={() => setShowMonthPicker(false)}
        />
      )}

      {modalDay && (
        <DayModal
          date={modalDay}
          events={getEventsForDate(modalDay)}
          onClose={() => setModalDay(null)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
}

export default CalendarView;
