import { useState } from 'react';
import { format } from 'date-fns';
import {
  Bell,
  Plus,
  Trash2,
  Check,
  Repeat,
  Clock,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Reminder } from '@/utils/calendarData';

interface ReminderPanelProps {
  reminders: Reminder[];
  onAdd: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const recurringLabels = {
  none: 'Once',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};

function ReminderPanel({ reminders, onAdd, onDelete, onToggle }: ReminderPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState('09:00');
  const [recurring, setRecurring] = useState<Reminder['recurring']>('none');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), date, time, recurring });
    setTitle('');
    setShowForm(false);
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`);
  });

  return (
    <div className="bg-card/72 rounded-[28px] border border-white/35 shadow-card p-6 flex flex-col gap-5 backdrop-blur-2xl transition-all duration-300 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-card-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Reminders
        </h2>
        <Button size="sm" variant={showForm ? "secondary" : "default"} onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      {showForm && (
        <div className="flex flex-col gap-3 p-4 bg-secondary/50 rounded-xl border border-border animate-fade-in">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Reminder title"
            className="w-full px-3 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="px-3 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary"
            />
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="px-3 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-muted-foreground" />
            <select
              value={recurring}
              onChange={e => setRecurring(e.target.value as Reminder['recurring'])}
              className="flex-1 px-2 py-2 border-2 border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-primary"
            >
              <option value="none">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <Button onClick={handleAdd} disabled={!title.trim()} className="w-full">
            Add Reminder
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto scrollbar-thin pr-1">
        {sortedReminders.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
            <Bell className="w-8 h-8 opacity-30" />
            <p className="text-sm">No reminders set</p>
          </div>
        ) : (
          sortedReminders.map(r => (
            <div
              key={r.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border-2 border-border transition-all duration-300 group animate-fade-in",
                r.completed ? "bg-muted opacity-60" : "bg-secondary hover:border-primary"
              )}
            >
              <button
                onClick={() => onToggle(r.id)}
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                  r.completed
                    ? "bg-success border-success text-success-foreground"
                    : "border-border hover:border-primary"
                )}
              >
                {r.completed && <Check className="w-3 h-3" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", r.completed && "line-through text-muted-foreground")}>
                  {r.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(r.date), 'MMM d')} at {r.time}
                  </span>
                  {r.recurring !== 'none' && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                      {recurringLabels[r.recurring]}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDelete(r.id)}
                className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReminderPanel;
