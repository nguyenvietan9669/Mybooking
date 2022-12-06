export default  {
    name : 'receiptVisa',
    title : 'Khách đặt visa',
    type : 'document',
    fields : [
        {
            name : 'customer',
            title : 'Khách hàng',
            type : 'reference',
            to : {
                type : 'customer'
            }
        },
        {
            name : 'title',
            title : 'Tên visa',
            type : 'string'
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number'
        }
        
    ], preview: {
        select : {
            customer : 'customer.name',
            visa : 'title',
            count : 'count'
        },
        prepare: ({ customer,visa,count }) => {     
            return {
                title : customer,
                subtitle : `${visa} | Số lượng: ${count}`, 
            }
          }
    }
}