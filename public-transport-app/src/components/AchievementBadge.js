
const AchievementBadge = ({ icon, title, description, unlocked }) => (
    <div style={{
      minWidth: '160px',
      padding: '15px',
      margin: '12px',
      background: unlocked ? '#f8f9fa' : '#e9ecef',
      borderRadius: '8px',
      textAlign: 'center',
      opacity: unlocked ? 1 : 0.5,
      filter: unlocked ? 'none' : 'grayscale(100%)'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{description}</div>
    </div>
  );

  export default AchievementBadge;