import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [token] = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [image, setImage] = useState('')

  const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () =>
      createRecipe(token, {
        name,
        description,
        ingredients,
        instructions,
        image,
      }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to share a recipe and/or vote.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-name'>Recipe Name: </label>
        <input
          type='text'
          name='create-name'
          id='create-name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <textarea value={image} onChange={(e) => setImage(e.target.value)} />

      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!name || createRecipeMutation.isPending}
      />

      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe shared successfully!
        </>
      ) : null}
    </form>
  )
}
