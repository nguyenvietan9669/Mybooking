export default {
    name : 'location',
    title : 'Địa điểm',
    type : 'document',
    fields : [
        {
            name : 'nation',
            title : 'Quốc gia',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'city',
            title : 'Thành phố',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'image',
            title : 'Ảnh địa điểm',
            type : 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
          title: 'city',
          nation : 'nation'
        },
    },
    prepare: ({ title,nation }) => {     
        return {
            title : `${title}  -  ${nation}`,
        }
    }
    
}