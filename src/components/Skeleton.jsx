export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-ink-800 border border-ink-600 overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-6 w-32 skeleton rounded" />
        <div className="h-10 w-full skeleton rounded-lg" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex-shrink-0 w-40 rounded-2xl bg-ink-800 border border-ink-600 p-4">
      <div className="aspect-square skeleton rounded-xl mb-3" />
      <div className="h-4 w-full skeleton rounded" />
    </div>
  );
}
