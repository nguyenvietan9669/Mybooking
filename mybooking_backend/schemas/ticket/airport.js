export default {
    name : 'airport',
    title : 'Sân bay',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên sân bay',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'code',
            title : 'Mã sân bay',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'location',
            title : 'Địa điểm',
            type : 'reference',
            to : {
                type : 'location'
            },
            validation: Rule => Rule.required()
        }
    ]
}