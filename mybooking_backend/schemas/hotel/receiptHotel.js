export default {
    name : 'receiptHotel',
    title : 'Khách đặt Khách sạn',
    type : 'document',
    fields : [
        {
            name : 'customer',
            title : 'Khách hàng',
            type : 'reference',
            to: {
                type : 'customer'
            }
        },
        {
            name : 'hotel',
            title : 'Tên khách sạn',
            type : 'string'
        },
        {
            name : 'address',
            title : 'Địa chỉ khách sạn',
            type : 'string'
        },
        {
            name : 'room',
            title : 'Tên phòng',
            type : 'string'
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number'
        }
    ],preview: {
        select : {
            title : 'customer.name',
            hotel : 'hotel',
            room : 'room'
        },
        prepare: ({ title,hotel,room }) => {     
            return {
                title : `${title} - ${hotel}`,
                subtitle : room,
            }
          }
    }
}