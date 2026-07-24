
export default {
  name: 'cookingTips',
  title: 'Cooking Tips',
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
      fields: [
          {
            name: 'alt',
            title: 'Alt text',
            type: 'string'
          },
        ]
    },
    {
      title: 'Date',
      name:'Date',
       type: 'date',
  options: {
    dateFormat: 'DD-MM-YYYY',
    calendarTodayLabel: 'Today'
  }
    },
  /*Rich text editor*/
{
  title: 'Content', 
  name: 'content',
  type: 'array', 
  of: [{type: 'block'}]
}

  ],
}
