function FilterBar({ filterCategory, setFilterCategory, statusFilter, setStatusFilter }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Kategoriye Göre Filtrele
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
        >
          <option value="Tümü">Tümü</option>
          <option value="Aksiyon">Aksiyon</option>
          <option value="Bilim Kurgu">Bilim Kurgu</option>
          <option value="Dram">Dram</option>
          <option value="Komedi">Komedi</option>
          <option value="Gerilim">Gerilim</option>
          <option value="Korku">Korku</option>
          <option value="Animasyon">Animasyon</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          İzlenme Durumu
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
        >
          <option value="Tümü">Tümü</option>
          <option value="İzlendi">İzlendi</option>
          <option value="İzlenmedi">İzlenmedi</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar