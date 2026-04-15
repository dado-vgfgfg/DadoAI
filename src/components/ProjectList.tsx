import { StudioProject } from '../types';

interface Props {
  projects: StudioProject[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <section className="panel">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Saved Projects (SQLite)</h2>
      <div className="max-h-40 space-y-2 overflow-auto">
        {projects.map((project) => (
          <div key={project.id} className="rounded-md bg-slate-800/60 p-2 text-sm">
            <p className="font-semibold">{project.name}</p>
            <p className="text-xs text-slate-400">{project.type} · {new Date(project.updatedAt).toLocaleString()}</p>
          </div>
        ))}
        {!projects.length && <p className="text-sm text-slate-400">No projects yet.</p>}
      </div>
    </section>
  );
}
