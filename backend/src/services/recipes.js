import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(
  userId,
  { name, description, ingredients, instructions, image },
) {
  const recipe = new Recipe({
    name,
    author: userId,
    description,
    ingredients,
    instructions,
    image,
  })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

// export async function listRecipesByTag(tags, options) {
//   return await listPosts({ tags }, options)
// }

export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}

export async function updateRecipe(
  userId,
  recipeId,
  { name, description, ingredients, instructions, image },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { name, description, ingredients, instructions, image } },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
