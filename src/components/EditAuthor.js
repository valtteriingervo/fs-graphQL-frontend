import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables:
      {
        name: author,
        setBornTo: born
      }
    })

    console.log('edit author...')

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            // Need to change String to Int for GraphQL
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor