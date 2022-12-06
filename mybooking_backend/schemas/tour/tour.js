export default {
    name : 'tour',
    title : 'Tour',
    type : 'document',
    fields : [
        {
            name :'title',
            title : 'Tiêu đề tour',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name :'topic',
            title : 'Chủ đề',
            type : 'reference',
            to :{ type : 'topic'},
            validation: Rule => Rule.required()
        },
        {
            name :'destination',
            title : 'Điểm đến',
            type : 'array',
            of : [
                {
                    type :'reference',
                    to : {type :'location'}
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'time_departure',
            title : 'Thời gian đi',
            type : 'date',
            validation: Rule => Rule.required()
        },
        {
            name : 'time',
            title : 'Số ngày đi',
            type : 'string'
        },
        {
            name : 'vehicle',
            title : 'Phương tiện',
            type : 'string'
        },
        {
            name : 'price',
            title : 'Giá',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name : 'schedule',
            title : 'Lich trình',
            type :  'blockContent',
        },
        {
            name : 'background',
            title : 'Ảnh Chính',
            type : 'image',
            validation: Rule => Rule.required()
        },
        {
            name : 'image',
            title : 'Hình ảnh chi tiết',
            type : 'array',
            of : [
                {
                    type:'image'
                }
            ]
        },
        {
            name : 'highlights',
            title : 'Điểm nổi bật',
            type : 'blockContent'
        },
        {
            name : 'introduces',
            title : 'Giới thiệu tour',
            type : 'blockContent'
        },
        {
            name : 'departure',
            title : 'Nơi đón khách',
            type : 'string'
        }
    ]
}