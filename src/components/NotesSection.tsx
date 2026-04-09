import { useState } from 'react';
import { format } from 'date-fns';
import {
  Save,
  Trash2,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Note {
  id: string;
  dateRange: {
    start: string;
    end: string;
  };
  content: string;
}

interface NotesSectionProps {
  dateRange: DateRange;
  notes: Note[];
  onSaveNote: (content: string) => void;
  onDeleteNote: (id: string) => void;
}

function NotesSection({ dateRange, notes, onSaveNote, onDeleteNote }: NotesSectionProps) {
  const [noteContent, setNoteContent] = useState('');

  const handleSave = () => {
    if (noteContent.trim() && dateRange.start) {
      onSaveNote(noteContent);
      setNoteContent('');
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      return format(startDate, 'MMM d, yyyy');
    }
    return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  return (
    <div className="bg-card/72 rounded-[28px] border border-white/35 shadow-card p-6 flex flex-col gap-5 backdrop-blur-2xl transition-all duration-300 hover:shadow-card-hover">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-semibold text-card-foreground">Notes</h2>
        {dateRange.start && (
          <div className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg text-sm font-medium text-accent-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>
              {dateRange.end
                ? formatDateRange(dateRange.start.toISOString(), dateRange.end.toISOString())
                : format(dateRange.start, 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={dateRange.start ? "Write your note here..." : "Select a date or range to add notes"}
          disabled={!dateRange.start}
          className={cn(
            "w-full min-h-[100px] p-4 border-2 border-border rounded-xl font-sans text-sm leading-relaxed text-foreground resize-vertical transition-all duration-300",
            "focus:outline-none focus:border-primary focus:ring-4 focus:ring-ring/10",
            "disabled:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground",
            "placeholder:text-muted-foreground"
          )}
        />
        <Button
          onClick={handleSave}
          disabled={!dateRange.start || !noteContent.trim()}
          className="w-full gap-2"
        >
          <Save className="w-4 h-4" />
          Save Note
        </Button>
      </div>

      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground">
            <FileText className="w-8 h-8 opacity-30" />
            <p className="text-sm">No notes yet. Select dates and start writing!</p>
          </div>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="relative p-4 bg-secondary rounded-xl border-2 border-border transition-all duration-300 hover:border-primary hover:bg-accent animate-fade-in group"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatDateRange(note.dateRange.start, note.dateRange.end)}
              </div>
              <div className="text-sm leading-relaxed text-card-foreground pr-8 break-words">
                {note.content}
              </div>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesSection;
