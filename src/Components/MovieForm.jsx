import { useEffect, useState } from 'react'

function MovieForm({ onAddMovie, editingMovie, onUpdateMovie, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [category, setCategory] = useState('Bilim Kurgu')
  const [rating, setRating] = useState('')
  const [watched, setWatched] = useState(false)

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title || '')
      setDirector(editingMovie.director || '')
      setCategory(editingMovie.category || 'Bilim Kurgu')
      setRating(editingMovie.rating || '')
      setWatched(editingMovie.watched || false)
    } else {
      setTitle('')
      setDirector('')
      setCategory('Bilim Kurgu')
      setRating('')
      setWatched(false)
    }
  }, [editingMovie])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !director.trim() || !rating) return

    const movieData = {
      title: title.trim(),
      director: director.trim(),
      category,
      rating: Number(rating),
      watched,
    }

    if (editingMovie) {
      onUpdateMovie({
        ...editingMovie,
        ...movieData,
      })
      return
    }

    onAddMovie({
      id: crypto.randomUUID(),
      ...movieData,
    })

    setTitle('')
    setDirector('')
    setCategory('Bilim Kurgu')
    setRating('')
    setWatched(false)
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={{ marginBottom: 24 }}>
        <p style={formBadge}>
          {editingMovie ? 'Düzenleme Modu' : 'Yeni Kayıt'}
        </p>
        <h2 style={formTitle}>
          {editingMovie ? 'Filmi Düzenle' : 'Yeni Film Ekle'}
        </h2>
        <p style={formDesc}>
          Kataloguna yeni film ekle veya seçili kaydı güncelle.
        </p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Film Adı</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: Interstellar"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Yönetmen</label>
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Örn: Christopher Nolan"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option>Bilim Kurgu</option>
          <option>Aksiyon</option>
          <option>Dram</option>
          <option>Gerilim</option>
          <option>Komedi</option>
          <option>Korku</option>
          <option>Macera</option>
          <option>Animasyon</option>
        </select>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Puan</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="1 - 10"
          style={inputStyle}
        />
      </div>

      <label style={checkboxRow}>
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        <span>Bu filmi izledim</span>
      </label>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
        <button type="submit" style={primaryButtonStyle}>
          {editingMovie ? 'Güncelle' : 'Kaydet'}
        </button>

        {editingMovie && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={secondaryButtonStyle}
          >
            İptal
          </button>
        )}
      </div>
    </form>
  )
}

const formStyle = {
  padding: 26,
  borderRadius: 24,
  background: 'rgba(15, 23, 42, 0.72)',
  border: '1px solid rgba(148, 163, 184, 0.16)',
  backdropFilter: 'blur(14px)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
  color: 'white',
}

const formBadge = {
  display: 'inline-block',
  margin: 0,
  marginBottom: 12,
  padding: '8px 12px',
  borderRadius: 999,
  background: 'rgba(99, 102, 241, 0.18)',
  color: '#c7d2fe',
  fontSize: 13,
  fontWeight: 700,
}

const formTitle = {
  margin: 0,
  fontSize: 30,
  lineHeight: 1.1,
}

const formDesc = {
  marginTop: 10,
  marginBottom: 0,
  color: '#94a3b8',
  fontSize: 15,
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  fontWeight: 600,
  color: '#dbeafe',
  fontSize: 14,
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 14,
  border: '1px solid rgba(148, 163, 184, 0.22)',
  background: 'rgba(2, 6, 23, 0.9)',
  color: 'white',
  outline: 'none',
  fontSize: 15,
}

const checkboxRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: '#cbd5e1',
  marginTop: 4,
  fontSize: 14,
}

const primaryButtonStyle = {
  padding: '12px 18px',
  borderRadius: 14,
  border: 'none',
  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 700,
  boxShadow: '0 10px 24px rgba(59, 130, 246, 0.35)',
}

const secondaryButtonStyle = {
  padding: '12px 18px',
  borderRadius: 14,
  border: '1px solid rgba(148, 163, 184, 0.22)',
  background: 'rgba(15, 23, 42, 0.5)',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 700,
}

export default MovieForm