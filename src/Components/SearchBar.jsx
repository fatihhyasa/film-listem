function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Film Ara
      </label>
      <input
        type="text"
        placeholder="Film adı veya yönetmen ile ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
      />
    </div>
  )
}

export default SearchBar