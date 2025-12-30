import { defineConfig } from 'sanity'
import {deskTool} from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './app/schemas/index'

export default defineConfig({
  name: 'default',
  title: 'Sanity Studio',

  projectId: 'jvie9x8w', // from your query URL
  dataset: 'production',
  
  plugins: [visionTool(), deskTool()],

  schema: {
    types: schemaTypes,
  },
})
