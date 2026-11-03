import React, { useState } from 'react';

interface AdminSiteContentProps {
  siteContent?: any;
  onSaveContent?: (content: any) => void;
}

export default function AdminSiteContent({ siteContent = {}, onSaveContent }: AdminSiteContentProps) {
  const [content, setContent] = useState({
    announcementText: siteContent?.announcementText || '',
    newsletter: siteContent?.newsletter || { title: 'STAY IN THE LOOP', subtitle: 'Be the first to know about new arrivals, exclusive offers, and more.' }
  });
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      if (onSaveContent) {
        onSaveContent({ ...siteContent, ...content });
      }
      setSaving(false);
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-wide text-black uppercase">SITE CONTENT</h1>
          <p className="mt-2 text-sm text-gray-600">Manage announcement bar and global text blocks.</p>
        </div>
        <div>
          <button
            type="button"
            disabled={saving}
            onClick={save}
            className="rounded-lg bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-60 cursor-pointer uppercase"
          >
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6">
        {/* Announcement Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="text-sm font-medium tracking-wide text-black uppercase">ANNOUNCEMENT BAR</div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Display Text</label>
              <input
                value={content.announcementText}
                onChange={(e) =>
                  setContent((p) => ({
                    ...p,
                    announcementText: e.target.value,
                  }))
                }
                placeholder="e.g. FREE SHIPPING ON ORDERS OVER $200"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors text-black bg-white"
              />
            </div>
            {/* Live Preview */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-800 mb-2">Live Preview</label>
              <div className="p-4 bg-black text-white text-[10px] font-mono font-bold tracking-widest uppercase text-center rounded">
                {content.announcementText || 'NO ANNOUNCEMENT'}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="text-sm font-medium tracking-wide text-black uppercase">NEWSLETTER SECTION</div>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Title</label>
              <input
                value={content.newsletter.title}
                onChange={(e) =>
                  setContent((p) => ({
                    ...p,
                    newsletter: { ...p.newsletter, title: e.target.value },
                  }))
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Subtitle</label>
              <input
                value={content.newsletter.subtitle}
                onChange={(e) =>
                  setContent((p) => ({
                    ...p,
                    newsletter: { ...p.newsletter, subtitle: e.target.value },
                  }))
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors text-black bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
