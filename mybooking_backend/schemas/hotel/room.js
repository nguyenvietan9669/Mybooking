export default {
    name : 'room',
    title : 'Tên phòng',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên phòng',
            type : 'string',
            validation: Rule => Rule.required()
        }, 
        {
            name : 'area',
            title : 'Diện tích',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'direction',
            title : 'Hướng',
            type : 'string'
        }, 
        {
            name : 'bed',
            title : 'Giường',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'guestNumber',
            title : 'Số lượng khách ở',
            type : 'number',
            validation: Rule => Rule.required()

        },
        {
            name : 'image',
            title : 'Ảnh chi tiết',
            type : 'array',
            of : [
                {
                    type : 'image'
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'utilities',
            title : 'Tiện ích riêng của phòng',
            type : 'array',
            of : [
                {
                    title : 'Danh sách tiện ích',
                    type : 'reference',
                    to : [
                        {
                            type : 'utilities'
                        }
                    ]
                }
            ]
        },
        {
            name : 'service',
            title : 'Bữa sáng',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'price',
            title : 'Giá phòng trên 1 đêm (chưa tính giảm)',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'discount',
            title : 'Giảm giá (%)',
            type : 'number',
            validation: Rule => Rule.required()
        }
    ]
}