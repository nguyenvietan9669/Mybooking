export default {
    name : 'combo',
    title : 'Combo',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên Combo',
            type : 'string',
            validation: Rule => Rule.required()

        }, 
        {
            name : 'description',
            title : 'Mô tả',
            type : 'string'
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'blockContent'
        },
        {
            name : 'image',
            title : 'Ảnh nền',
            type : 'image',
            option : {hotspot : true},
            validation: Rule => Rule.required()
        },
        {
            name : 'flight',
            title : 'Chuyến bay',
            type : 'reference',
            to : {
                type : 'flight'
            },
        },
        {
            name : 'visa',
            title : 'Visa',
            type : 'reference',
            to : {
                type : 'visa'
            },
        },
        {
            name : 'tour',
            title : 'Tour',
            type : 'reference',
            to : {
                type : 'tour'
            },
        },
        {
            name : 'hotel',
            title : 'Khách sạn',
            type : 'reference',
            to : {
                type : 'hotel'
            },
        },
        {
            name : 'price',
            title : 'Giá',
            type : 'number',
            validation: Rule => Rule.required()
        }
    ]
}