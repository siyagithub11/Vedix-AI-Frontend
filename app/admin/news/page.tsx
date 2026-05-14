import { Plus, Search } from 'lucide-react';

export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[40px] font-semibold text-white tracking-[-0.8px] mb-2">News Management</h1>
          <p className="text-[15px] text-[#8B8FA8]">Create, edit, and manage all AI news articles.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      <div className="card-dark">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5E7A]" />
            <input
              type="text"
              placeholder="Search news..."
              className="bg-[#1A1D35] border border-[#2A2D4A] rounded-[8px] pl-10 pr-4 py-2.5 text-[15px] text-white placeholder:text-[#5A5E7A] focus:outline-none focus:border-[#378ADD] w-72 transition-colors"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2A2D4A]">
                {['Title', 'Category', 'Published', 'Guide', 'Actions'].map((h) => (
                  <th key={h} className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] pb-4 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="pt-12 pb-8 text-center text-[#5A5E7A] text-[15px]">
                  Connect the backend API to manage news here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
