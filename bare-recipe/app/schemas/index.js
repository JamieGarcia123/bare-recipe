import { defineConfig } from 'sanity'
import recipe from './recipes'
import sauce from './sauce'

export const schemaTypes = [recipe, sauce]


export default defineConfig({
  projectId: 'jvie9x8w',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
