export default {
  name: 'sauce',
  title: 'Sauce',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
        {
          name: 'seoTitle',
          title: 'SEO Title',
          type: 'string',
          validation: Rule => Rule.required(),
        },
              {
          name: 'seoDescription',
          title: 'SEO Description',
          type: 'string',
          validation: Rule => Rule.required(),
        },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96),
        isUnique: (value, context) => {
          const { document } = context
          return context.defaultIsUnique(value, context)
        },
      },
    },
    {
      name: 'snippet',
      title: 'Snippet',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      validation: Rule => Rule.max(8),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            title: 'Alt text',
            type: 'string'
          },
          {
            name: 'caption',
            title: 'Caption',
            type: 'string'
          }
        ]
        }
      ]
    },
    {
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
    },
    {
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',       // ← array, not object
      of: [
        {
          type: 'object',  // each ingredient is an object
          fields: [
            {
              name: 'amount',
              title: 'Amount',
              type: 'string',
            },
            {
              name: 'measurement',
              title: 'Measurement',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Ingredient Name',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'string' }],
    },

    {
      name: 'isGlutenFree',
      title: 'Gluten Free',
      type: 'boolean',
    },
    {
      name: 'isLowCarb',
      title: 'Low Carb',
      type: 'boolean',
    },
        {
      name: 'isVegan',
      title: 'Vegan',
      type: 'boolean',
    },
        {
      name: 'isVegetarian',
      title: 'Vegatarian',
      type: 'boolean',
    },
  ],
}
