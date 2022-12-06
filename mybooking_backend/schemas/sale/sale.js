export default {
    name : 'sale',
    title : 'Khuyến mãi',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tiêu đề sale',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'subtitle',
            title : 'Phụ đề',
            type : 'string'
        },
        {
            name : 'time',
            title : 'Thời gian sale',
            type : 'string'
        },
        {
            name : 'description',
            title : 'Mô tả',
            type : 'string'
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'string'
        },
        {
            name : 'image',
            title : 'Ảnh',
            type : 'image',
            validation: Rule => Rule.required()
        },
        {
            name : 'listSale',
            title : 'Mảng sale',
            type : 'array',
            of : [
                {   
                    title : 'Mảng sale',
                    type : 'reference',
                    to : {
                        type : 'typeSale'
                    }
                }
            ]
        }
    ]
}