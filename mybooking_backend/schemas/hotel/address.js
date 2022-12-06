export default {
    name : 'address',
    title : 'Địa chỉ',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Địa chỉ',
            type : 'string'
        },
        {
            name : 'location',
            title : 'Địa điểm',
            type : 'reference',
            to : [
                {type : 'location'}
            ]
        }
    ]
}