export default {
    name : 'hotel',
    title : 'Khách sạn',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên khác sạn',
            type : 'string',
        },
        {
            name : 'rank',
            title : 'Đánh giá theo sao',
            type : 'number'
        },
        {
            name : 'type',
            title : 'Loại hình',
            type : 'string'
        },
        {
            name : 'address',
            title : 'Địa chỉ',
            type : 'reference',
            to : [
                {
                    type : 'address'
                }
            ]
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
            ]
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

            ]
        },
        {
            name : 'background',
            title : 'Ảnh nền',
            type : 'image'
        },
        {
            name : 'image',
            title : 'Ảnh chi tiết',
            type : 'image'
        },
        {
            name : 'room',
            title : 'Phòng',
            type : 'array',
            of : [
                {
                    title : 'Danh sách phòng',
                    type : 'reference',
                    to : [
                        {
                            type : 'room'
                        }
                    ]
                }
            ]
        }
    ]
}