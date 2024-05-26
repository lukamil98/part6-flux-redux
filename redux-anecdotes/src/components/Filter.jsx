import PropTypes from "prop-types"
import { useState } from "react" // Import useState

const Filter = ({ setFilter }) => {
  const [inputValue, setInputValue] = useState("") // State to store input value

  const handleChange = (event) => {
    const value = event.target.value
    setInputValue(value) // Update input value state
    setFilter(value) // Call setFilter with the input value
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={inputValue} onChange={handleChange} />{" "}
      {/* Bind input value and onChange handler */}
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default Filter
