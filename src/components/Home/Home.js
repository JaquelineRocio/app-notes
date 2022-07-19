import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const logout = async () => {
        setAuth({});
        navigate('/login');
    }
  return (
    <section>
        <h1>Home</h1>
        <br />
        <p>Estas en la pagina!</p>
        <br />
        <div className="flexGrow">
            <button onClick={logout}>Sign Out</button>
        </div>
    </section>
  )
}

export default Home