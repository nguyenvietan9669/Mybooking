export default {
    name : 'contentDetail',
    title : 'Nội dung từng mục của bài viết',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tiêu đề',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'blockContent'
        }
    ]
}