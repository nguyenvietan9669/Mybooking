export default {
    name : 'typeSale',
    title : 'Mảng sale',
    type : 'document',
    fields : [
       {
        name : 'title',
        title : 'Tên mảng',
        type : 'string',
        validation: Rule => Rule.required()
       },
       {
        name : 'price',
        title : 'Giảm giá',
        type : 'string'
       }
    ],preview: {
        select: {
          title: 'title',
          price : 'price'
        },
        prepare: ({title,price }) => {     
            return {
                title : `${title}  - Giảm ${price}`,
            }
          }
      },
}