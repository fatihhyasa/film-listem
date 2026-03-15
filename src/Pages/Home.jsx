import { useEffect, useMemo, useState } from 'react'
import MovieForm from '../Components/MovieForm.jsx'
import MovieCard from '../Components/MovieCard.jsx'

function Home() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies')

    if (savedMovies) {
      return JSON.parse(savedMovies).map((movie) => ({
        id: movie.id || crypto.randomUUID(),
        title: movie.title || '',
        director: movie.director || '',
        category: movie.category || 'Bilim Kurgu',
        rating: movie.rating || 0,
        watched: movie.watched || false,
      }))
    }

    return [
      {
        id: crypto.randomUUID(),
        title: 'Inception',
        director: 'Christopher Nolan',
        category: 'Bilim Kurgu',
        rating: 9,
        watched: true,
      },
      {
        id: crypto.randomUUID(),
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        category: 'Aksiyon',
        rating: 10,
        watched: true,
      },
      {
        id: crypto.randomUUID(),
        title: 'Interstellar',
        director: 'Christopher Nolan',
        category: 'Bilim Kurgu',
        rating: 10,
        watched: false,
      },
    ]
  })

  const [editingMovie, setEditingMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [sortType, setSortType] = useState('newest')

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [newMovie, ...prevMovies])
  }

  const handleDeleteMovie = (movieId) => {
    const confirmed = window.confirm('Bu filmi silmek istediğine emin misin?')
    if (!confirmed) return

    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    )

    if (editingMovie && editingMovie.id === movieId) {
      setEditingMovie(null)
    }
  }

  const handleEditMovie = (movie) => {
    setEditingMovie(movie)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUpdateMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    )
    setEditingMovie(null)
  }

  const handleCancelEdit = () => {
    setEditingMovie(null)
  }

  const categories = useMemo(() => {
    const allCategories = movies.map((movie) => movie.category || 'Diğer')
    return ['Tümü', ...new Set(allCategories)]
  }, [movies])

  const filteredMovies = useMemo(() => {
    let result = [...movies]

    result = result.filter((movie) => {
      const search = searchTerm.toLowerCase()

      const titleMatch = (movie.title || '').toLowerCase().includes(search)
      const directorMatch = (movie.director || '').toLowerCase().includes(search)
      const categoryMatch = (movie.category || '').toLowerCase().includes(search)

      const matchesSearch = titleMatch || directorMatch || categoryMatch
      const matchesCategory =
        activeCategory === 'Tümü' || movie.category === activeCategory

      return matchesSearch && matchesCategory
    })

    if (sortType === 'az') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    }

    if (sortType === 'za') {
      result.sort((a, b) => (b.title || '').localeCompare(a.title || ''))
    }

    if (sortType === 'ratingHigh') {
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    }

    if (sortType === 'ratingLow') {
      result.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0))
    }

    if (sortType === 'watchedFirst') {
      result.sort((a, b) => Number(b.watched) - Number(a.watched))
    }

    return result
  }, [movies, searchTerm, activeCategory, sortType])

  const watchedCount = movies.filter((movie) => movie.watched).length
  const unwatchedCount = movies.length - watchedCount
  const averageRating =
    movies.length > 0
      ? (
          movies.reduce((total, movie) => total + Number(movie.rating || 0), 0) /
          movies.length
        ).toFixed(1)
      : '0.0'

  return (
    <div style={pageStyle}>
      <div style={glowOne} />
      <div style={glowTwo} />

      <div style={containerStyle}>
        <div style={heroCard}>
          <div style={heroLeft}>
            <div style={brandRow}>
              <div style={logoCircle}>🎬</div>

              <div>
                <p style={heroBadge}>React Film Katalog Uygulaması</p>
                <h1 style={heroTitle}>Film Listem</h1>
              </div>
            </div>

            <p style={heroText}>
              Film ekleyebileceğin, düzenleyebileceğin, silebileceğin ve
              arayabileceğin modern görünümlü bir katalog arayüzü.
            </p>
          </div>

          <div style={heroRight}>
            <div style={miniInfoCard}>
              <span style={miniInfoLabel}>Katalog Durumu</span>
              <strong style={miniInfoValue}>
                {movies.length > 0 ? 'Aktif' : 'Boş'}
              </strong>
            </div>
          </div>
        </div>

        <div style={statsGrid}>
          <StatCard title="Toplam Film" value={movies.length} />
          <StatCard title="Arama Sonucu" value={filteredMovies.length} />
          <StatCard title="İzlendi" value={watchedCount} />
          <StatCard title="İzlenmedi" value={unwatchedCount} />
          <StatCard title="Ortalama Puan" value={averageRating} />
        </div>

        <div style={searchBox}>
          <label style={searchLabel}>Film Ara</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Film adı, yönetmen veya kategori ile ara..."
            style={searchInput}
          />

          <div style={{ marginTop: 18 }}>
            <p style={subLabel}>Kategoriler</p>
            <div style={filterRow}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    ...filterButton,
                    ...(activeCategory === category ? activeFilterButton : {}),
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <p style={subLabel}>Sıralama</p>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              style={searchInput}
            >
              <option value="newest">En Yeni Eklenen</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
              <option value="ratingHigh">Puana Göre Azalan</option>
              <option value="ratingLow">Puana Göre Artan</option>
              <option value="watchedFirst">İzlenenler Önce</option>
            </select>
          </div>
        </div>

        <div style={responsiveGridStyle}>
          <div style={{ minWidth: 0 }}>
            <MovieForm
              onAddMovie={handleAddMovie}
              editingMovie={editingMovie}
              onUpdateMovie={handleUpdateMovie}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div style={{ minWidth: 0 }}>
            <h2 style={listTitle}>Film Listesi</h2>

            {filteredMovies.length === 0 ? (
              <div style={emptyBox}>
                <h3 style={{ marginTop: 0 }}>Film bulunamadı</h3>
                <p style={{ marginBottom: 0, color: '#94a3b8' }}>
                  Arama, filtre veya sıralama sonucunda eşleşen kayıt yok.
                </p>
              </div>
            ) : (
              <div style={cardsGrid}>
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onDeleteMovie={handleDeleteMovie}
                    onEditMovie={handleEditMovie}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div style={statCard}>
      <p style={statTitle}>{title}</p>
      <h3 style={statValue}>{value}</h3>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background:
    'linear-gradient(180deg, #020617 0%, #0b1120 55%, #020617 100%)',
  padding: '40px 20px',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}

const glowOne = {
  position: 'absolute',
  width: 340,
  height: 340,
  borderRadius: '50%',
  background: 'rgba(59, 130, 246, 0.18)',
  filter: 'blur(90px)',
  top: -40,
  left: -70,
}

const glowTwo = {
  position: 'absolute',
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'rgba(168, 85, 247, 0.16)',
  filter: 'blur(90px)',
  top: 120,
  right: -60,
}

const containerStyle = {
  maxWidth: 1240,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}

const heroCard = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
  flexWrap: 'wrap',
  marginBottom: 28,
  padding: 24,
  borderRadius: 28,
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.14)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 18px 40px rgba(0,0,0,0.24)',
}

const heroLeft = {
  flex: '1 1 500px',
  minWidth: 260,
}

const heroRight = {
  flex: '0 0 auto',
}

const brandRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
}

const logoCircle = {
  width: 64,
  height: 64,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  boxShadow: '0 16px 30px rgba(59, 130, 246, 0.3)',
}

const heroBadge = {
  display: 'inline-block',
  margin: 0,
  marginBottom: 10,
  padding: '8px 12px',
  borderRadius: 999,
  background: 'rgba(59, 130, 246, 0.14)',
  color: '#bfdbfe',
  fontSize: 13,
  fontWeight: 800,
  border: '1px solid rgba(96, 165, 250, 0.18)',
}

const heroTitle = {
  marginTop: 0,
  marginBottom: 0,
  fontSize: 'clamp(34px, 6vw, 58px)',
  lineHeight: 1,
  letterSpacing: '-0.03em',
}

const heroText = {
  margin: '16px 0 0 0',
  maxWidth: 720,
  color: '#94a3b8',
  fontSize: 17,
  lineHeight: 1.7,
}

const miniInfoCard = {
  padding: '16px 18px',
  borderRadius: 20,
  background: 'rgba(2, 6, 23, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.14)',
  minWidth: 150,
}

const miniInfoLabel = {
  display: 'block',
  fontSize: 13,
  color: '#94a3b8',
  marginBottom: 8,
}

const miniInfoValue = {
  fontSize: 20,
}

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16,
  marginBottom: 28,
}

const statCard = {
  background: 'rgba(15, 23, 42, 0.66)',
  border: '1px solid rgba(148, 163, 184, 0.14)',
  borderRadius: 20,
  padding: 18,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 14px 36px rgba(0,0,0,0.22)',
}

const statTitle = {
  margin: 0,
  color: '#94a3b8',
  fontSize: 14,
}

const statValue = {
  margin: '10px 0 0 0',
  fontSize: 28,
}

const searchBox = {
  marginBottom: 24,
  background: 'rgba(15, 23, 42, 0.66)',
  border: '1px solid rgba(148, 163, 184, 0.14)',
  borderRadius: 22,
  padding: 20,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 14px 36px rgba(0,0,0,0.22)',
}

const searchLabel = {
  display: 'block',
  marginBottom: 10,
  color: '#dbeafe',
  fontWeight: 700,
  fontSize: 14,
}

const subLabel = {
  marginTop: 0,
  marginBottom: 10,
  color: '#cbd5e1',
  fontWeight: 700,
  fontSize: 14,
}

const searchInput = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 14,
  border: '1px solid rgba(148, 163, 184, 0.22)',
  background: 'rgba(2, 6, 23, 0.85)',
  color: 'white',
  outline: 'none',
  fontSize: 15,
}

const filterRow = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
}

const filterButton = {
  padding: '10px 14px',
  borderRadius: 999,
  border: '1px solid rgba(148, 163, 184, 0.16)',
  background: 'rgba(2, 6, 23, 0.65)',
  color: '#cbd5e1',
  cursor: 'pointer',
  fontWeight: 700,
}

const activeFilterButton = {
  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  color: 'white',
  boxShadow: '0 10px 24px rgba(59, 130, 246, 0.25)',
}

const responsiveGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 24,
  alignItems: 'start',
}

const listTitle = {
  marginTop: 0,
  marginBottom: 18,
  fontSize: 28,
}

const emptyBox = {
  background: 'rgba(15, 23, 42, 0.66)',
  border: '1px dashed rgba(148, 163, 184, 0.28)',
  borderRadius: 18,
  padding: 28,
  color: '#cbd5e1',
  backdropFilter: 'blur(12px)',
}

const cardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 16,
}

export default Home