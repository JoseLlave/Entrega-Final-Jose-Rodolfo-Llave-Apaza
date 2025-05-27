function Navbar({ logoUrl }) {
    return (
        <nav style={{ backgroundColor: 'black', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '10px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            
            <a href="index.html" style={{ display: 'block' }}>
            <img 
                src={logoUrl} 
                alt="logonuevo" 
                style={{ width: '20vw', maxWidth: '200px', minWidth: '80px', height: 'auto' }} 
            />
            </a>

            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, flexGrow: 1, justifyContent: 'center' }}>
            <li style={{ margin: '0 15px' }}>
                <a href="index.html" style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', position: 'relative', padding: '10px 0', display: 'block' }}>
                Hoy
                </a>
            </li>
            <li style={{ margin: '0 15px' }}>
                <a href="index.html" style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', position: 'relative', padding: '10px 0', display: 'block' }}>
                Próximo fin de semana
                </a>
            </li>
            <li style={{ margin: '0 15px' }}>
                <a href="index.html" style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', position: 'relative', padding: '10px 0', display: 'block' }}>
                Próximos 7 días
                </a>
            </li>
            <li style={{ margin: '0 15px' }}>
                <a href="index.html" style={{ color: '#ffffff', fontWeight: 'bold', textDecoration: 'none', position: 'relative', padding: '10px 0', display: 'block' }}>
                Próximo mes
                </a>
            </li>
            </ul>

        </div>
        </nav>
    )
}

export default Navbar