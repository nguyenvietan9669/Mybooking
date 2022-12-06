export default {
    name : 'nation',
    title : 'Quốc gia',
    type : 'document',
    fields : [
        {
            name: 'name',
            title : 'Tên quốc gia',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'image',
            title : 'Hình ảnh',
            type : 'image',
            options: {hotspot: true},
            validation: Rule => Rule.required()
        }
    ]
}