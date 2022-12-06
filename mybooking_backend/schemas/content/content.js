export default {
    name : 'content',
    title : 'Bài viết',
    type : 'document',
    fields : [
        {
            name :'title',
            title : 'Tiêu đề content',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name :'typeContent',
            title : 'Loại bài viết',
            type : 'string',
            options: {
                list :[
                    {value : 'điểm du lịch', title : 'Điểm du lịch'},
                    {value : 'tips du lịch', title : 'Tips du lịch'},
                    {value : 'khuyến mãi', title : 'Khuyến mãi'}
                ]
            },
        },
        {
            name : 'description',
            title : 'Mô tả ngắn',
            type : 'blockContent'
        },
        {
            name : 'image',
            title : 'Ảnh bìa',
            type : 'image',
            options : {
                hotspot :true
            },
            validation: Rule => Rule.required()
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'array',
            of: [
                {
                    type : 'contentDetail',
                }
            ]
        },
        {
            name : 'location',
            title : 'Địa điểm',
            type : 'reference',
            to : {
                type : 'location'
            },
        }
    ]
}