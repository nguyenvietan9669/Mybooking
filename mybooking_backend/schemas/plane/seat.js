export default {
    name : 'seat',
    title : 'Hạng ghế',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'description',
            title : 'Mô tả',
            type : 'string'
        },
    ]
}