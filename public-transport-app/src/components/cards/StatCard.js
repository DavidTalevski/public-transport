const StatCard = ({ title, value, color, children }) => (
    <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        ':hover': { transform: 'translateY(-2px)' }
    }}>
        <h3 style={{ margin: '0 0 10px', color: '#666' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
            }}>
                {value}
            </div>
            {children}
        </div>
    </div>
);

export default StatCard;