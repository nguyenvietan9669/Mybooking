export default {
    name : 'flightclass',
    title : 'Hạng chuyến bay',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Tên hạng',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'content',
            title : 'Nội dung',
            type : 'array',
            of : [
                { 
                    name: 'name',
                    title: 'name',
                    type : 'string'
                }

            ]
        },
        {
            name : 'pricedifference',
            title : 'Tiền chênh so với Economy',
            type : 'number',
            validation: Rule => Rule.required()
        }
    ]
}