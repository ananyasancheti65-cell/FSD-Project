import { useState } from 'react';

const categories = ['All', 'Accessories', 'Audio', 'Bags', 'Home', 'Wearables'];

const FilterSidebar = ({ filters, setFilters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    setLocalFilters({ ...localFilters, [field]: value });
  };

  const reset = () => {
    const resetValues = { category: 'All', minPrice: '', maxPrice: '' };
    setLocalFilters(resetValues);
    setFilters(resetValues);
    onApply(resetValues);
  };

  return (
    <div className="glass-card space-y-4 p-6">
      <h2 className="text-lg font-semibold">Filters</h2>
      <div className="space-y-3">
        <label className="block text-sm text-slate-600 dark:text-slate-300">Category</label>
        <select
          value={localFilters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          {categories.map((category) => (
            <option key={category} value={category}> {category} </option>
          ))}
        </select>
      </div>
      <div className="space-y-3">
        <label className="block text-sm text-slate-600 dark:text-slate-300">Price range</label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-1/2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-1/2 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onApply(localFilters)}
          className="flex-1 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Apply
        </button>
        <button onClick={reset} className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
