export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      options: {
        hotspot: true,
      },
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
  name: 'categories',
  title: 'Categories',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Quick Dinner', value: 'Quick Dinner' },
      { title: 'Lunch', value: 'Lunch' },
      { title: 'No Cooking', value: 'No Cooking' },
      { title: 'Breakfast', value: 'Breakfast' },
      { title: 'Sweet Treat', value: 'Sweet Treat' },
      { title: 'Kid Friendly', value: 'Kid Friendly' },
      { title: 'Beginner', value: 'Beginner' },
      { title: 'Experienced Cook', value: 'Experienced Cook' },
    ],
    layout: 'checkbox', // ← checkbox layout goes here
  },
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
    {
  name: 'goesWellWith',
  title: 'Goes Well With',
  type: 'array', // use array if multiple sauces can be referenced
  of: [
    {
      type: 'reference',
      to: [{ type: 'sauce' }], // replace 'sauce' with the actual schema name of your sauces
    },
  ],
}

  ],
}
