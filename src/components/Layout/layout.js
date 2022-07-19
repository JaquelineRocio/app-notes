import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <section>
                <header>App Notes</header>
                <Outlet />
            </section>
            
        </main>
    )
}

export default Layout