export default {
    name : 'flighttime',
    title : 'Thời gian',
    type : 'document',
    fields : [
        {
            name:'hour',
            title :'giờ',
            type : 'number',
            validation: Rule => Rule.required()
        },
        {
            name: 'miunite',
            title : 'Phút',
            type : 'number',
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
          title: 'hour'
        },
      },
}