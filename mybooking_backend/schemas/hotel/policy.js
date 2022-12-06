export default {
    name : 'policy',
    title : 'Chính sách lưu trú',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên chính sách',
            type : 'string'
        },
        {
            name : 'icon',
            title : 'Icon',
            type : 'image'
        },
        {
            name : 'description',
            title : 'Mô tả',
            type : 'blockContent'
        }
    ]
}