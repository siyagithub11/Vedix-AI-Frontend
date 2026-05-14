import { Plus } from 'lucide-react';

export default function AdminToolsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[40px] font-semibold text-white tracking-[-0.8px] mb-2">Tools Directory</h1>
          <p className="text-[15px] text-[#8B8FA8]">Add and curate the AI tools ecosystem.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Tool
        </button>
      </div>
      <div className="card-dark text-center py-20 text-[#5A5E7A]">
        Connect the backend API to manage tools here.
      </div>
    </div>
  );
}
