import client from '../sanity'


const ApiCall = {
    
    getFlightForeign : (seatId) => {
        const now = new Date()
        const dateNow = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
        // const dateNow = '2022' + '-' + '11' + '-' + '22'
        return client.fetch(`
            *[_type == 'flight' 
            && 
            (!(departure -> location -> nation match 'việt nam') 
            || 
            !(destination -> location -> nation match 'việt nam')) 
            && date_departure == '${dateNow}'
            && (
                seat[0].name._ref == '${seatId}'
                  && seat[0].remain >= ${1}
                  ||
                  seat[1].name._ref == '${seatId}'
                  && seat[1].remain >= ${1}
                  ||
                  seat[2].name._ref == '${seatId}'
                  && seat[2].remain >= ${1}
                  ||
                  seat[3].name._ref == '${seatId}'
                  && seat[3].remain >= ${1}
                )
        ]{
                ...,
                departure -> {
                    ...,
                    location -> {
                        city
                    }
                },
                destination -> {
                    ...,
                    location -> {
                        city,
                        image
                    }
                },
                plane -> {
                    brand -> {
                        ...
                    }
                }
            }
        `)
    },
    getFlightInland  : (seatId) => {

        const now = new Date()
        // const dateNow = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
        const dateNow = '2022' + '-' + '11' + '-' + '30'

        return client.fetch(`
            *[_type == 'flight' &&
                departure -> location -> nation match 'việt nam'&& 
                destination -> location -> nation match 'việt nam'  
                && date_departure == '${dateNow}'
                && 
                (
                    seat[0].name._ref == '${seatId}'
                    && seat[0].remain >= ${1}
                    ||
                    seat[1].name._ref == '${seatId}'
                    && seat[1].remain >= ${1}
                    ||
                    seat[2].name._ref == '${seatId}'
                    && seat[2].remain >= ${1}
                    ||
                    seat[3].name._ref == '${seatId}'
                    && seat[3].remain >= ${1}
                )
            ]{
                ...,
                departure -> {
                    ...,
                    location -> {
                        city
                    }
                },
                destination -> {
                    ...,
                    location -> {
                        city,
                        image
                    }
                },
                plane -> {
                    brand -> {
                        ...
                    }
                }
            }
        `)
    },
    searchFlightWithReturn : (departureId,destinationId,fromDate,returnDate,seatId,count) => {
        return client.fetch(
            `*[_type == 'flight'
            && departure._ref == '${departureId}' 
            && destination._ref == '${destinationId}'
            && date_departure == '${fromDate}'
            && date_return == '${returnDate}'
            && (
                seat[0].name._ref == '${seatId}'
                  && seat[0].remain >= ${count}
                  ||
                  seat[1].name._ref == '${seatId}'
                  && seat[1].remain >= ${count}
                  ||
                  seat[2].name._ref == '${seatId}'
                  && seat[2].remain >= ${count}
                  ||
                  seat[3].name._ref == '${seatId}'
                  && seat[3].remain >= ${count}
                )
            ]{
                _id,
                date_departure,
                note,
                time_departure,
                date_return,
                departure -> {
                    _id,
                    code,
                    name,
                    location -> {
                        nation,
                        city
                    },
                },
                destination -> {
                    _id,
                    code,
                    name,
                    location -> {
                        nation,
                        city
                    },
                },
                flightTime{
                    hour,
                    miunite
                },
                plane -> {
                    brand -> {
                        name,
                        logo
                    }
                }
        }`)
    },
    searchFlight : (departureId,destinationId,fromDate,seatId,count) => {
        return client.fetch(
            `*[_type == 'flight'
            && departure._ref == '${departureId}' 
            && destination._ref == '${destinationId}'
            && date_departure == '${fromDate}'
            && (
                seat[0].name._ref == '${seatId}'
                  && seat[0].remain >= ${count}
                  ||
                  seat[1].name._ref == '${seatId}'
                  && seat[1].remain >= ${count}
                  ||
                  seat[2].name._ref == '${seatId}'
                  && seat[2].remain >= ${count}
                  ||
                  seat[3].name._ref == '${seatId}'
                  && seat[3].remain >= ${count}
                )
            ]{
                _id,
                date_departure,
                date_return,
                note,
                time_departure,
                departure -> {
                    _id,
                    code,
                    name,
                    location -> {
                        nation,
                        city
                    },
                },
                destination -> {
                    _id,
                    code,
                    name,
                    location -> {
                        nation,
                        city
                    },
                },
                flightTime{
                    hour,
                    miunite
                },
                plane -> {
                    brand -> {
                        name,
                        logo
                    }
                }
        }`)
    },
    searchFlightDetail : (id) => {
        return client.fetch(`
        *[_type == 'flight'
            && _id == '${id}'
        ]{
            _id,
            date_departure,
            note,
            time_departure,
            date_return,
            departure -> {
                _id,
                code,
                name,
                location -> {
                    nation,
                    city
                },
            },
            destination -> {
                _id,
                code,
                name,
                location -> {
                    nation,
                    city
                },
            },
            flightTime{
                hour,
                miunite
            },
            flightclass[] ->,
            seat[],
            plane -> {
                brand -> {
                    name,
                    logo
                }
            }      
        }[0]`)
    },  
    getEconomyId : () => {
        return client.fetch(`
        *[_type == 'seat' && name == 'Economy'
            ]{
                ...           
            }[0]
        `)
    },
    searchContent : (value = '') => {
        return client.fetch(`
        *[_type == 'content' && title match '${value}'] 
        | order(title) [0...15]{
            ..., 
            location -> {
                ...         
            }
        }
        `)
    },
    createCustomer : (name,phone,email) => {
        return client.create({
            _type: 'customer',
            name : name,
            phone : phone,
            email : email
        })
    },
    createReceiptTour : (customerId,tourId,count) => {
        return client.create({
            _type : 'receiptTour',
            customer : {
                _type : 'reference',
                _ref : customerId
            },
            tour : {
                _type : 'reference',
                _ref : tourId
            },
            count : parseInt(count)
        })
    },
    setTourCount : (id,count) => {
        return client.fetch(
            `*[_type == "tour" && _id == '${id}' ]`
            ).then(data => {
            client.patch(data[0]._id)
            .set({
                count : count,
            })
            .commit()
        })
    },
    createReceiptVisa : (customerId,visaName,count) => {
        return client.create({
            _type : 'receiptVisa',
            customer : {
                _type : 'reference',
                _ref : customerId
            },
            title : visaName,
            count: parseInt(count)
        })
    },
    searchCombo : (inputText) => {
        return client.fetch(`
            *[_type == 'combo' && title match '${inputText}' ] |
             order(_updatedAt) [0...10]{
                ...,
            }  
        `)
    },
    getCombo : () => {
        return client.fetch(`
        *[_type == 'combo'] | order(_updatedAt) [0...10]{
            ...,
            flight -> {
                ...,
                departure -> {
                    ...
                },
                destination -> {
                    ...
                },
                plane -> {
                    ...,
                    brand -> {
                        ...
                    }
                }
            },
            visa -> {
                ...,
                type[] ->
            },
            tour -> {
                ...,
                destination[] -> {
                    ...,
                },
                image[],
            },
            hotel -> {
                ...,
                utilities[] -> {
                    ...,
                },
                address -> {
                    ...,
                    location -> {
                    ...,
                    }
                },           
                policy[] -> {
                    ...,
                }
            }

        }  
    `)
    },
    createReceiptCombo : (customerID,comboId,count) => {
        return client.create({
            _type : 'receiptCombo',
            customer : {
                _type : 'reference',
                _ref : customerID
            },
            combo : {
                _type : 'reference',
                _ref : comboId
            },
            count : parseInt(count)
        })
    },
    getContentWithId : (id,first,perPage) => {
        return client.fetch(`
        *[_type == 'content' && 
            location._ref == '${id}']| 
            order(_updatedAt) [${first}...${first + perPage}]{
                ...,
            }  
    `)
    },
    getMoreContent : (id) => {
        return client.fetch(`
        *[_type == 'content' && _id != '${id}']| order(_updatedAt) [0...15]{
            ...,
          } 
        `)
    },
    getSupport : () => {
        return client.fetch(`
        *[_type == 'support' ]| order(_updatedAt) []{
            ...,
          }  
        `)
    },
    getAirPort : () => {
        return client.fetch(`*[_type == 'airport']{
            _id,
            code,
            name,
            location ->{
                nation,
                city
            },
        }`)
    },
    getSeat : () => {
        return client.fetch(`*
            [_type == 'seat']{
                _id,
                name,
                description
            }`)
    },
    getLocation : () => {
        return client.fetch(`
        *[_type == 'location']| order(city) [0...7]{
            ...,
            _id,
            city
        }
        `)
    },
    getContentWithSale : () => {
        return client.fetch(`
        *[_type == 'content'  && typeContent match 'khuyến mãi'  ]| order(_updatedAt) []{
            ...,
        }  
    `)
    },
    getContentWithLocation : () => {
        return client.fetch(`
        *[_type == 'content' && typeContent match 'điểm du lịch'  ]| order(_updatedAt) []{
            ...,
        }  
    `)
    },
    searchTourWithId : (id) => {
        return  client.fetch(`
        *[_type == 'tour' && 
        ('${id}' in destination[]._ref) ]{
            background,
            departure,
            destination[]->,
            highlights,
            image[],
            title,
            price,
            introduces,
            schedule,
            time,
            time_departure,
            vehicle,
            _id,
        }
    `)
    },
    getVisaForeign : () => {
        return  client.fetch(`
        *[_type == 'visa' && !(nation.name match 'việt nam')] | order(_id) [0...10]{
            ...,
            type[] ->
        }
    `)
    },
    getVisaDomestic : () => {
        return client.fetch(`
        *[_type == 'visa' && nation.name match 'việt name'] | order(_id) [0...10]{
            ...
        }
    `)
    },
    getTourDomestic : (first,perPage) => {
        return client.fetch(`
        *[_type == 'tour' && 'Việt Nam' in destination[] -> nation ]|
         order(_updatedAt) [${first}...${first + perPage}]{
            ...,
            destination[] -> {
                ...,
            },
            image[],
        }
        `)
    },
    getComboDomestic : (first,perPage) => {
        return client.fetch(`
        *[_type == 'combo'  && 
        flight -> destination -> location -> nation match 'việt nam' ]
        | order(_updatedAt) [${first}...${first + perPage}]{
            ...,
            flight -> {
                ...,
                departure -> {
                    ...
                },
                destination -> {
                    ...,
                    location -> {
                        ...,
                    }
                },
                plane -> {
                    ...,
                    brand -> {
                        ...
                    }
                }
            },
            visa -> {
                ...,
                type[] ->
            }
        }
        `)
    },
    getHotelDomestic : (first,perPage) => {
        return client.fetch(`*[_type == 'hotel' && address -> location -> nation match 'việt nam'  ]
        | order(_updatedAt) [${first}...${first + perPage}]{
            ...,
            utilities[] -> {
                ...,
            },
            address -> {
                ...,
                location -> {
                ...,
                }
            },           
            policy[] -> {
                ...,
            }
        }`)
    },
    getHotelFiveStar : (id) => {
        return  client.fetch(`
        *[_type == 'hotel'  && 
        address -> location -> _id == '${id}' &&
        rank >= 4
        ]| order(_updatedAt) []{
            ...,
            utilities[] -> {
                ...,
            },
            address -> {
                ...,
                location -> {
                ...,
                }
            },           
            policy[] -> {
                ...,
            }
        }
        `)
    },
    searchHotel : (value) => {
        return client.fetch(`
        *[_type == 'hotel'
            && (address -> name match '${value}'
            || title match '${value}' 
            || address -> location -> city match '${value}'  )
            ]{
                ...,
                utilities[] -> {
                    ...,
                },
                address -> {
                    ...,
                    location -> {
                    ...,
                    }
                },           
                policy[] -> {
                    ...,
                }
            }
        `)
    },
    getUtilities : (id) => {
        return client.fetch(`
            *[_type == 'utilities' && _id == '${id}' ]{
                ...,
            }       
        `)
    },
    createReceiptHotel : (customerId,name,address,room,count) => {
        return client.create({
            _type : 'receiptHotel',
            customer : {
                _type : 'reference',
                _ref : customerId
            },
            hotel  :name,
            address: address,
            room   : room,
            count  : parseInt(count)
        })
    }
}

export default ApiCall