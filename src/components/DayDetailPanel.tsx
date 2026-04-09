import { format, getDay } from 'date-fns';
import {
  Calendar,
  Clock,
  Sunrise,
  Sunset,
  Star,
  Plus,
  Trash2,
  Flag,
  AlertTriangle,
  Minus,
  ArrowUp,
  Quote,
  Sparkles,
  MapPin,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ScheduleEvent, Holiday } from '@/utils/calendarData';
import { useState } from 'react';

interface DayDetailPanelProps {
  date: Date;
  events: ScheduleEvent[];
  holiday: Holiday | undefined;
  onAddEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
  dailyQuote: string;
  monthFact: string;
  onSelectDate?: (date: Date) => void;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const seasonInfo: Record<number, { label: string; icon: typeof Sunrise }> = {
  0: { label: 'Winter', icon: Star },
  1: { label: 'Winter', icon: Star },
  2: { label: 'Spring', icon: Sunrise },
  3: { label: 'Spring', icon: Sunrise },
  4: { label: 'Spring', icon: Sunrise },
  5: { label: 'Summer', icon: Sunset },
  6: { label: 'Summer', icon: Sunset },
  7: { label: 'Summer', icon: Sunset },
  8: { label: 'Autumn', icon: MapPin },
  9: { label: 'Autumn', icon: MapPin },
  10: { label: 'Autumn', icon: MapPin },
  11: { label: 'Winter', icon: Star },
};

const priorityConfig = {
  high: { label: 'High', icon: AlertTriangle, className: 'bg-priority-high/15 text-priority-high border-priority-high/30' },
  medium: { label: 'Medium', icon: Minus, className: 'bg-priority-medium/15 text-priority-medium border-priority-medium/30' },
  low: { label: 'Low', icon: ArrowUp, className: 'bg-priority-low/15 text-priority-low border-priority-low/30' },
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function formatHour(h: number) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function DayDetailPanel({ date, events, holiday, onAddEvent, onDeleteEvent, dailyQuote, monthFact, onSelectDate }: DayDetailPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedHour, setSelectedHour] = useState(9);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(format(date, 'yyyy-MM-dd'));

  const dayOfWeek = dayNames[getDay(date)];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const weekNumber = Math.ceil(dayOfYear / 7);
  const season = seasonInfo[date.getMonth()];
  const SeasonIcon = season.icon;

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddEvent({
      date: format(date, 'yyyy-MM-dd'),
      hour: selectedHour,
      title: title.trim(),
      priority,
      description: description.trim() || undefined,
    });
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const getEventsForHour = (hour: number) => events.filter(e => e.hour === hour);
  const hasEvents = events.length > 0;

  return (
    <div className="bg-card/72 rounded-[28px] border border-white/35 shadow-card overflow-hidden flex flex-col backdrop-blur-2xl transition-all duration-300 hover:shadow-card-hover">
      <div className="bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground">
        <p className="text-xs font-semibold tracking-[3px] uppercase opacity-80">{dayOfWeek}</p>
        <h2 className="font-display text-3xl font-bold mt-1">{format(date, 'd')}</h2>
        <p className="text-sm opacity-80 mt-0.5">{format(date, 'MMMM yyyy')}</p>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-2.5 bg-secondary rounded-xl">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Week</span>
            <span className="text-sm font-bold text-foreground">{weekNumber}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 bg-secondary rounded-xl">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Day</span>
            <span className="text-sm font-bold text-foreground">{dayOfYear}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 bg-secondary rounded-xl">
            <SeasonIcon className="w-4 h-4 text-primary" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Season</span>
            <span className="text-sm font-bold text-foreground">{season.label}</span>
          </div>
        </div>

        {holiday && (
          <div className="flex items-center gap-3 p-3 bg-holiday/10 border border-holiday/20 rounded-xl">
            <Sparkles className="w-4 h-4 text-holiday shrink-0" />
            <span className="text-sm font-medium text-holiday">{holiday.name}</span>
          </div>
        )}

        <div className="p-3 bg-accent/50 rounded-xl border border-border">
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-foreground leading-relaxed italic">{dailyQuote}</p>
          </div>
        </div>

        <div className="p-3 bg-secondary/70 rounded-xl border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-foreground leading-relaxed">{monthFact}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <h3 className="font-display text-base font-semibold text-foreground">Schedule</h3>
          <div className="flex items-center gap-1.5">
            <Button size="sm" onClick={() => setShowDatePicker(!showDatePicker)} variant={showDatePicker ? "secondary" : "outline"} className="h-7 text-xs px-2.5">
              <Calendar className="w-3.5 h-3.5" />
              Select Date
            </Button>
            <Button size="sm" onClick={() => setShowForm(!showForm)} variant={showForm ? "secondary" : "default"} className="h-7 text-xs px-2.5">
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>
        </div>

        {showDatePicker && (
          <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl border border-border animate-fade-in">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <input
              type="date"
              value={pickerDate}
              onChange={e => setPickerDate(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <Button
              size="sm"
              className="h-7 text-xs px-3"
              onClick={() => {
                if (pickerDate && onSelectDate) {
                  const d = new Date(pickerDate + 'T00:00:00');
                  onSelectDate(d);
                  setShowDatePicker(false);
                }
              }}
            >
              Go
            </Button>
          </div>
        )}

        {showForm && (
          <div className="flex flex-col gap-2.5 p-3 bg-secondary/50 rounded-xl border border-border animate-fade-in">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 flex-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={selectedHour}
                  onChange={e => setSelectedHour(Number(e.target.value))}
                  className="flex-1 px-2 py-1.5 border border-border rounded-lg text-xs bg-card text-foreground focus:outline-none focus:border-primary"
                >
                  {HOURS.map(h => (
                    <option key={h} value={h}>{formatHour(h)}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5 flex-1">
                <Flag className="w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="flex-1 px-2 py-1.5 border border-border rounded-lg text-xs bg-card text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
            />
            <Button onClick={handleAdd} disabled={!title.trim()} size="sm" className="w-full">
              Save Event
            </Button>
          </div>
        )}

        {!hasEvents && !showForm && (
          <div className="flex flex-col items-center gap-2 py-4 text-muted-foreground">
            <Clock className="w-5 h-5 opacity-30" />
            <p className="text-xs">No events scheduled</p>
          </div>
        )}

        {hasEvents && (
          <div className="flex flex-col gap-1.5">
            {HOURS.filter(h => getEventsForHour(h).length > 0).map(hour => (
              <div key={hour} className="flex gap-2 items-start">
                <span className="text-[10px] font-medium text-muted-foreground w-12 text-right pt-2 shrink-0">{formatHour(hour)}</span>
                <div className="flex-1 flex flex-col gap-1">
                  {getEventsForHour(hour).map(ev => {
                    const pc = priorityConfig[ev.priority];
                    const Icon = pc.icon;
                    return (
                      <div key={ev.id} className={cn("flex items-center gap-2 p-2 rounded-lg border animate-fade-in group", pc.className)}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{ev.title}</p>
                          {ev.description && <p className="text-[10px] opacity-70 truncate">{ev.description}</p>}
                        </div>
                        <button
                          onClick={() => onDeleteEvent(ev.id)}
                          className="w-5 h-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DayDetailPanel;
