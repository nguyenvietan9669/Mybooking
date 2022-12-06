export default {
    name : 'visa',
    title : 'Visa',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Tên visa',
            type : 'string',
            validation: Rule => Rule.required()
        },
        {
            name : 'type',
            title : 'Loại visa',
            type : 'array',
            of: [
                {
                    type :'reference',
                    to : {
                        type : 'typeVisa'
                    }
                }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'nation',
            title : 'Quốc gia',
            type : 'reference',
            to : { type : 'nation' },
            validation: Rule => Rule.required()
        },
        {
            name : 'procedure',
            title : 'Quy trình',
            type : 'blockContent',
        }, 
        {
            name : 'introdus',
            title : 'Giới thiệu',
            type : 'blockContent',
        }
    ]
}