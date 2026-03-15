function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
      <h3 className="text-xl font-semibold text-slate-100">Henüz film bulunamadı</h3>
      <p className="mt-2 text-slate-400">
        Arama veya filtre sonucunda kayıt bulunamadı. Yeni bir film ekleyebilirsin.
      </p>
    </div>
  )
}

export default EmptyState