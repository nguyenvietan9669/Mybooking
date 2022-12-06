export default {
    name : 'receiptTour',
    title : 'Khách đặt Tour',
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
            name : 'tour',
            title : 'tour được đặt',
            type : 'reference',
            to : {
                type : 'tour'
            }
        },
        {
            name : 'count',
            title : 'Số lượng',
            type : 'number'
        }
    ], preview: {
        select : {
            customer : 'customer.name',
            tour : 'tour.title',
            count : 'count'
        },
        prepare: ({ customer,tour,count }) => {     
            return {
                title : customer,
                subtitle : `${tour} | Số lượng: ${count}`,
            }
          }
    }
}