export default {
    name : 'room',
    title : 'Tên phòng',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên phòng',
            type : 'string'
        }, 
        {
            name : 'area',
            title : 'Diện tích',
            type : 'string'
        },
        {
            name : 'direction',
            title : 'Hướng',
            type : 'string'
        }, 
        {
            name : 'bed',
            title : 'Giường',
            type : 'string'
        },
        {
            name : 'guestNumber',
            title : 'Số lượng khách ở',
            type : 'number'
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
            title : 'Dịch vụ thêm',
            type : 'blockContent'
        },
        {
            name : 'price',
            title : 'Giá phòng trên 1 đêm',
            type : 'number'
        }
    ]
}