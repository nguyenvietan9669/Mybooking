export default {
    name : 'support',
    title : 'Thông tin hỗ trợ khách hàng',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên mục hỗ trợ',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'icon',
            title : 'Icon',
            type : 'image',
            options: {hotspot: true},
            validation: Rule => Rule.required()
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'array',
            of:[
                {
                    title : 'Mục nội dung',
                    type : 'contentDetail'
                }
            ]
        }
    ]
}