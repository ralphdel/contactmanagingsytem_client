import NavBar from "../components/NavBar"
import '../css/home.css'

const Home = () => {
  return (
    <>
     <NavBar/>
    <div className="home">
       <h1 className="home-title">
          RALPHDEL CONTACT MANAGEMENT SYSTEM 
       </h1>
       <p className="home-description">
        Start collecting your contacts in a very smarter way, 
        We provide very efficient and smarter way to handle contacts. 
       </p>
    </div>
    </>
  )
}

export default Home