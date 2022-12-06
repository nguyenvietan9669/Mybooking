export default {
    name : 'receiptCombo',
    title : 'Khách đặt Combo',
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
            name : 'combo',
            title : 'Combo khách đặt',
            type : 'reference',
            to : {
                type : 'combo'
            }
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number'
        }
    ],
    preview: {
        select : {
            customer : 'customer.name',
            combo : 'combo.title',
            count : 'count'
        },
        prepare: ({ customer,combo,count }) => {     
            return {
                title : customer,
                subtitle : `${combo} | Số lượng: ${count}`,
            }
          }
    }
}