const Header = () => {
    const logoSrc = 'https://bowiebearsnews.com/wp-content/uploads/2018/11/TRavel.png'
    return (
        <div className="Header">
            <header className="App-header">
                <img src={logoSrc} className="App-logo" width="100" height="100" alt="logo"/>
            </header>
        </div>
    )
}
export default Header