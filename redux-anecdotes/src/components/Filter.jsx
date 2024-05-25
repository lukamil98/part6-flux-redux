// src/components/Filter.js

import PropTypes from "prop-types"

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default Filter
