const LoadingSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="rounded-3xl border border-slate-200/80 bg-slate-100 p-5 shadow-soft animate-pulse dark:border-slate-700 dark:bg-slate-900">
        <div className="h-48 w-full rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-5 space-y-3">
          <div className="h-5 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/2 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
