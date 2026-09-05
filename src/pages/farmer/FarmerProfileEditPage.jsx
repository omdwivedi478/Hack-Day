import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

export const FarmerProfileEditPage = () => {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name || 'Rajesh Patel',
    farmName: user.farmName || 'Rajesh Organic Farms',
    location: user.location || 'Bhopal, Madhya Pradesh',
    state: user.state || 'Madhya Pradesh',
    acres: user.acres || 12,
    experienceYears: user.experienceYears || 15,
    bio: user.bio || 'Pioneering organic soil stewardship in the Bhopal countryside for over 15 years. We harness solar irrigation, vermicomposting, and multi-cropping to deliver pure, pesticide-free produce straight to urban households and B2B buyers.',
    certifications: 'India Organic (NPOP), Jaivik Bharat, PGS-India Green',
    bankSettlement: user.bankSettlement || 'State Bank of India (Ending in 4092)'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: formData.name,
      farmName: formData.farmName,
      location: formData.location,
      acres: Number(formData.acres),
      experienceYears: Number(formData.experienceYears),
      bio: formData.bio,
      bankSettlement: formData.bankSettlement
    }));
    showToast('Producer Farm Profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
      <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Producer Farm Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Public credentials, farm certifications, and accreditation details shown to institutional buyers.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Farm Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Farmer Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Farm / Collective Name
              </label>
              <input
                type="text"
                required
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Farm Location (City, State)
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Acreage (Acres)
                </label>
                <input
                  type="number"
                  value={formData.acres}
                  onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Years Farming
                </label>
                <input
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Farm Story & Practices
              </label>
              <textarea
                rows="4"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Certifications (Comma separated)
              </label>
              <input
                type="text"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Settlement Bank Account
              </label>
              <input
                type="text"
                value={formData.bankSettlement}
                onChange={(e) => setFormData({ ...formData, bankSettlement: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Farm Profile
          </Button>
        </div>
      </form>
    </div>
  );
};
