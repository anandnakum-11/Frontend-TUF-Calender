import { useState } from 'react';
import { format } from 'date-fns';
import {
  X,
  Plus,
  Clock,
  Flag,
  Trash2,
  AlertTriangle,
  Minus,
  ArrowUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ScheduleEvent } from '@/utils/calendarData';

interface DayModalProps {
  date: Date;
  events: ScheduleEvent[];
  onClose: () => void;
  onAddEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  onDeleteEvent: (id: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const priorityConfig = {
  high: { label: 'High', icon: AlertTriangle, className: 'bg-priority-high text-destructive-foreground' },
  medium: { label: 'Medium', icon: Minus, className: 'bg-priority-medium text-warning-foreground' },
  low: { label: 'Low', icon: ArrowUp, className: 'bg-priority-low text-success-foreground' },
};

function DayModal({ date, events, onClose, onAddEvent, onDeleteEvent }: DayModalProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedHour, setSelectedHour] = useState(9);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [description, setDescription] = useState('');

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

  const formatHour = (h: number) => {
    if (h === 0) return '12 AM';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-card-hover w-full max-w-lg max-h-[85vh] flex flex-col animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-semibold text-card-foreground">
              {format(date, 'EEEE, MMMM d')}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">{format(date, 'yyyy')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setShowForm(!showForm)} variant={showForm ? "secondary" : "default"}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-4 border-b border-border bg-secondary/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event title"
                className="w-full px-3 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <div className="flex gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedHour}
                    onChange={e => setSelectedHour(Number(e.target.value))}
                    className="flex-1 px-2 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary"
                  >
                    {HOURS.map(h => (
                      <option key={h} value={h}>{formatHour(h)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Flag className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                    className="flex-1 px-2 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary"
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
                className="w-full px-3 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground resize-none focus:outline-none focus:border-primary transition-colors"
              />
              <Button onClick={handleAdd} disabled={!title.trim()} className="w-full">
                Add Event
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="divide-y divide-border">
            {HOURS.map(hour => {
              const hourEvents = getEventsForHour(hour);
              const isWorkHour = hour >= 8 && hour <= 18;
              return (
                <div
                  key={hour}
                  className={cn(
                    "flex min-h-[48px] transition-colors",
                    !isWorkHour && "opacity-50"
                  )}
                >
                  <div className="w-16 shrink-0 flex items-start justify-end pr-3 pt-2.5 text-xs font-medium text-muted-foreground">
                    {formatHour(hour)}
                  </div>
                  <div className="flex-1 border-l border-border py-1.5 px-2 flex flex-col gap-1">
                    {hourEvents.map(ev => {
                      const pc = priorityConfig[ev.priority];
                      const Icon = pc.icon;
                      return (
                        <div
                          key={ev.id}
                          className="flex items-start gap-2 p-2 rounded-lg bg-accent animate-fade-in group"
                        >
                          <span className={cn("mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0", pc.className)}>
                            <Icon className="w-3 h-3" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{ev.title}</p>
                            {ev.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{ev.description}</p>
                            )}
                          </div>
                          <button
                            onClick={() => onDeleteEvent(ev.id)}
                            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayModal;
