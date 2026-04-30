import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <Link to={"/home"}><FaHome/></Link>
  )
}

export default Home