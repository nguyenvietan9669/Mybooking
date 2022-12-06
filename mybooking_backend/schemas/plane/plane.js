export default {
    name : 'plane',
    title : 'Máy bay',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên máy bay',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'brand',
            title : 'Hãng',
            type : 'reference',
            to :{ type : 'brand'},
            validation: Rule => Rule.required()
        }   
    ],preview: {
        select : {
            title : 'name',
            brand : 'brand.name',
        },
        prepare: ({ title,brand }) => {     
            return {
                title : title,
                subtitle : brand,
            }
          }
    }
}