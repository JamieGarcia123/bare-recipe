import { defineConfig } from 'sanity'
import recipe from './recipes'
import sauce from './sauce'
import cookingTips from './cookingTips'

export const schemaTypes = [recipe, sauce, cookingTips]


export default defineConfig({
  projectId: 'jvie9x8w',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
