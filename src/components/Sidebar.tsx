import { ModuleType } from '../types';
import { CreditCard, CalendarHeart, UtensilsCrossed, FolderKanban } from 'lucide-react';

interface Props {
  selected: ModuleType;
  onSelect: (module: ModuleType) => void;
}

const items = [
  { id: 'loyalty' as const, label: 'Loyalty Cards', icon: CreditCard },
  { id: 'invitation' as const, label: 'Invitations', icon: CalendarHeart },
  { id: 'menu' as const, label: 'QR Menus', icon: UtensilsCrossed }
];

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950/80 p-4">
      <h1 className="mb-6 flex items-center gap-2 text-xl font-bold text-cyan-300">
        <FolderKanban className="h-5 w-5" /> F-Web Studio
      </h1>
      <div className="space-y-2">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${
              selected === id ? 'bg-cyan-500/20 text-cyan-200' : 'hover:bg-slate-800'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
