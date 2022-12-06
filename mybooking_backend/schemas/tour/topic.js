export default {
    name : 'topic',
    title : 'Chủ đề Tour',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên chủ đề',
            type : 'string',
            validation: Rule => Rule.required()
        }
    ]
}