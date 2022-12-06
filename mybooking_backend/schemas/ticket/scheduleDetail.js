export default {
    name : 'scheduleDetail',
    title : 'Chi tiết lịch trình',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tiêu đề',
            type : 'string',
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'blockContent',
        }
    ]
}