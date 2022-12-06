export default {
    name : 'seatDetail',
    title : 'Hạng ghế',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên hạng ghế',
            type : 'reference',
            to: {type : 'seat'},
            validation: Rule => Rule.required()
        },
        {
            name : 'amount',
            title : 'Số lượng',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'remain',
            title : 'Số lượng còn lại',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'price',
            title : 'Giá hạng ghế',
            type : 'number',
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
          title: 'name.name',
        },
      },
}