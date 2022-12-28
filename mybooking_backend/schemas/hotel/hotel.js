export default {
    name : 'hotel',
    title : 'Khách sạn',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên khác sạn',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'rank',
            title : 'Đánh giá theo sao',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'type',
            title : 'Loại hình',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'address',
            title : 'Địa chỉ',
            type : 'reference',
            to : [
                {
                    type : 'address'
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'description',
            title : 'Mô tả',
            type : 'blockContent'
        },
        {
            name : 'utilities',
            title : 'Tiện ích',
            type : 'array',
            of : [
                {
                    title : 'Tên tiện ích',
                    type : 'reference',
                    to : [
                        {
                            type : 'utilities'
                        }
                    ]
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'policy',
            title : 'Chính sách lưu trú',
            type : 'array',
            of : [
                {
                    title : 'Tên chính sách',
                    type : 'reference',
                    to : [
                        {
                            type :'policy'
                        }
                    ]
                }

            ],
            validation: Rule => Rule.required()

        },
        {
            name : 'background',
            title : 'Ảnh nền',
            type : 'image',
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
            name : 'room',
            title : 'Phòng',
            type : 'array',
            of : [
                {
                    title : 'Danh sách phòng',
                    type : 'room',
                }
            ],
            validation: Rule => Rule.required()
        }
    ]
}