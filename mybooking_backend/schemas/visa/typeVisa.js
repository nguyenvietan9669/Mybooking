export default {
    name : 'typeVisa',
    title : 'Loại visa',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Loại visa',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'description',
            title : 'Mô tả',
            type :'string'
        },
        {
            name : 'price',
            title : 'Giá',
            type :'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'file',
            title : 'Hồ sơ cần',
            type : 'blockContent',
        },
        {
            name : 'note',
            title : 'Lưu ý',
            type : 'blockContent',
        }
    ]
}