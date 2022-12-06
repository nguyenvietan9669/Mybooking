export default  {
    name :'ticket',
    title : 'Khách đặt vé',
    type : 'document',
    fields : [
        {
            name : 'customer',
            title : 'Khách hàng',
            type : 'reference',
            to: {type:'customer'},
        },
        {
            name : 'brand',
            title : 'Hãng',
            type : 'string',
        },
        {
            name : 'departure',
            title : 'Sân bay đi',
            type : 'string',
        },
        {
            name : 'destination',
            title : 'Sân bay đến',
            type : 'string',
        },
        {
            name : 'time',
            title : 'Thời gian đi',
            type : 'string',
        },  
        {
            name : 'time_Return',
            title : 'Thời gian quay về',
            type : 'string',
        },      
        {
            name : 'seat',
            title : 'Loại ghế',
            type : 'string',
        },
        {
            name : 'flightClass',
            title : 'Hạng chuyến bay',
            type : 'string',
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number',
        }

    ],
    preview: {
        select : {
            customer : 'customer.name',
            departure : 'departure',
            destination : 'destination'
        },
        prepare: ({ customer,departure,destination }) => {     
            return {
                title : customer,
                subtitle : `${departure} -> ${destination}`,
            }
          }
    }
}