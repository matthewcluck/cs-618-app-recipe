import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({
  name,
  description,
  ingredients,
  instructions,
  image,
  author,
}) {
  return (
    <article>
      <h3>{name}</h3>
      <div>{description}</div>
      <div>{ingredients}</div>
      <div>{instructions}</div>
      <div>{image}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  ingredients: PropTypes.string,
  instructions: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
}
