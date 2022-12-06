export default {
    name : 'flight',
    title :'Chuyến bay',
    type : 'document',
    fields : [
        {
            name : 'plane',
            title : 'Máy bay',
            type : 'reference',
            to : {type : 'plane'},
            validation: Rule => Rule.required()
        }, 
        {
            name : 'departure',
            title : 'Điểm khởi hành',
            type : 'reference',
            to : {type : 'airport'},
            validation: Rule => Rule.required()
        }, 
        {
            name : 'destination',
            title : 'Điểm đến',
            type : 'reference',
            to : {type : 'airport'},
            validation: Rule => Rule.required()
        },
        {
            name : 'date_departure',
            title : 'Ngày khởi hành',
            type : 'date',
            options: {
                dateFormat: 'DD-MM-YYYY',
            },
            validation: Rule => Rule.required()
        } ,
        {
            name : 'date_return',
            title : 'Ngày quay về',
            type : 'date',
            options: {
                dateFormat: 'DD-MM-YYYY',
            }
        } ,
        {
            name : 'time_departure',
            title : 'Giờ khởi hành',
            type : 'datetime',
            options: {
                dateFormat: 'DD-MM-YYYY',
                timeFormat: 'HH:mm',
            },
            validation: Rule => Rule.required()
        },
        {
            name :'flightTime',
            title : 'Thời gian bay',
            type : 'flighttime',
            validation: Rule => Rule.required()
        },
        {
            name : 'note',
            title : 'Ghi chú',
            type : 'string'
        },
        {
            name : 'seat',
            title : 'Loại ghế',
            type : 'array',
            of : [  
               {    
                    name: 'seatDetail',
                    title: 'Chi tiết ghế',
                    type: 'seatDetail'
               }
            ],
            validation: Rule => Rule.required()
        },
        {
            name : 'flightclass',
            title : 'Hạng chuyến bay',
            type : 'array',
            of : [
                {
                    type : 'reference',
                    to : {type: 'flightclass'}
                }
            ]
        },
        
    ]
    ,preview: {
        select: {
          title: 'date_departure',
          brand : 'plane.brand.name',
          departure : 'departure.name',
          destination : 'destination.name',
          image : 'plane.brand.logo'
        },
        prepare: ({ title,brand,departure,destination,image }) => {     
            return {
                title : `${title}  |  ${brand}`,
                subtitle : `${departure} -> ${destination}`,
                media : image
            }
        }
      },
}