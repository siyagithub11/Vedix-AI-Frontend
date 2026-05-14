import { Plus } from 'lucide-react';

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[40px] font-semibold text-white tracking-[-0.8px] mb-2">Blog Guides</h1>
          <p className="text-[15px] text-[#8B8FA8]">Write and publish long-form how-to guides.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Guide
        </button>
      </div>
      <div className="card-dark text-center py-20 text-[#5A5E7A]">
        Connect the backend API to manage blog posts here.
      </div>
    </div>
  );
}
