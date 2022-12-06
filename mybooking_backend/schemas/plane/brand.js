export default {
    name: 'brand',
    title : 'Hãng máy bay',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên hãng',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'logo',
            title : 'Logo',
            type : 'image',
            validation: Rule => Rule.required()
        }
    ]
}