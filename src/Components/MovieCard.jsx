function MovieCard({ movie, onDeleteMovie, onEditMovie }) {
  const filledStars = Math.round(Number(movie.rating) / 2)
  const emptyStars = 5 - filledStars

  return (
    <div style={cardStyle}>
      <div style={cardGlow} />

      <div style={cardTop}>
        <div style={{ flex: 1 }}>
          <div style={titleRow}>
            <h3 style={titleStyle}>{movie.title}</h3>
            <span
              style={{
                ...statusBadge,
                background: movie.watched
                  ? 'rgba(16, 185, 129, 0.18)'
                  : 'rgba(245, 158, 11, 0.18)',
                color: movie.watched ? '#86efac' : '#fcd34d',
              }}
            >
              {movie.watched ? 'İzlendi' : 'İzlenmedi'}
            </span>
          </div>

          <p style={directorStyle}>Yönetmen: {movie.director}</p>
        </div>
      </div>

      <div style={metaRow}>
        <div style={chipStyle}>{movie.category}</div>
        <div style={ratingBox}>
          <span style={ratingLabel}>Puan</span>
          <strong style={ratingValue}>{movie.rating}/10</strong>
        </div>
      </div>

      <div style={starsRow}>
        {Array.from({ length: filledStars }).map((_, index) => (
          <span key={`filled-${index}`} style={starFilled}>
            ★
          </span>
        ))}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} style={starEmpty}>
            ★
          </span>
        ))}
      </div>

      <div style={buttonRow}>
        <button onClick={() => onEditMovie(movie)} style={editButtonStyle}>
          Düzenle
        </button>

        <button onClick={() => onDeleteMovie(movie.id)} style={deleteButtonStyle}>
          Sil
        </button>
      </div>
    </div>
  )
}

const cardStyle = {
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(15,23,42,0.72))',
  border: '1px solid rgba(148, 163, 184, 0.16)',
  borderRadius: 24,
  padding: 20,
  color: 'white',
  backdropFilter: 'blur(14px)',
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.30)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
}

const cardGlow = {
  position: 'absolute',
  width: 140,
  height: 140,
  borderRadius: '50%',
  background: 'rgba(59, 130, 246, 0.12)',
  filter: 'blur(40px)',
  top: -30,
  right: -30,
  pointerEvents: 'none',
}

const cardTop = {
  position: 'relative',
  zIndex: 1,
  marginBottom: 16,
}

const titleRow = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}

const titleStyle = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
}

const directorStyle = {
  marginTop: 10,
  marginBottom: 0,
  color: '#cbd5e1',
  fontSize: 14,
}

const statusBadge = {
  padding: '7px 11px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: 'nowrap',
  border: '1px solid rgba(255,255,255,0.06)',
}

const metaRow = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  alignItems: 'center',
  marginBottom: 14,
}

const chipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '9px 12px',
  borderRadius: 999,
  background: 'rgba(99, 102, 241, 0.16)',
  color: '#c7d2fe',
  fontWeight: 700,
  fontSize: 13,
  border: '1px solid rgba(129, 140, 248, 0.14)',
}

const ratingBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}

const ratingLabel = {
  color: '#94a3b8',
  fontSize: 12,
}

const ratingValue = {
  fontSize: 16,
}

const starsRow = {
  display: 'flex',
  gap: 4,
  marginBottom: 18,
  fontSize: 20,
}

const starFilled = {
  color: '#fbbf24',
  textShadow: '0 0 16px rgba(251, 191, 36, 0.28)',
}

const starEmpty = {
  color: 'rgba(148, 163, 184, 0.35)',
}

const buttonRow = {
  display: 'flex',
  gap: 10,
}

const editButtonStyle = {
  padding: '11px 14px',
  borderRadius: 14,
  border: 'none',
  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 700,
  flex: 1,
  boxShadow: '0 10px 20px rgba(37, 99, 235, 0.22)',
}

const deleteButtonStyle = {
  padding: '11px 14px',
  borderRadius: 14,
  border: 'none',
  background: 'linear-gradient(135deg, #dc2626, #ef4444)',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 700,
  flex: 1,
  boxShadow: '0 10px 20px rgba(220, 38, 38, 0.22)',
}

export default MovieCard