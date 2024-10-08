import { FaUsers } from "react-icons/fa";


const Card = ({ name, value }) => {
  return (
    <div className="cards">

      <div className="content">
        <h2>{name}</h2>
        <span>{value}</span>
      </div>
      <div className="logo">
        <span><FaUsers />
        </span>
      </div>
    </div>
  )
}

export default Card