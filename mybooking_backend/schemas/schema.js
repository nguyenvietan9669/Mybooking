// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
// import category from './category'
// import product from './product'
// import vendor from './vendor'
// import productVariant from './productVariant'
import ticket from './ticket/ticket'
import flight from './ticket/flight'
import plane from './plane/plane'
import seat from './plane/seat'
import seatDetail from './plane/seatDetail'
import brand from './plane/brand'
import location from './location/location'
import flightclass from './plane/flightclass'
import flighttime from './ticket/flighttime'
import customer from './customer'
import airport from './ticket/airport'
import tour from './tour/tour'
import receiptTour from './tour/receiptTour'
import combo from './combo/combo'
import receiptCombo from './combo/receiptCombo'
import topic from './tour/topic'
import visa from './visa/visa'
import receiptVisa from './visa/receiptVisa'
import nation from './location/nation'
import support from './support'
import sale from './sale/sale'
import typeSale from './sale/typeSale'
import typeVisa from './visa/typeVisa'
import content from './content/content'
import contentDetail from './content/contentDetail'
import hotel from './hotel/hotel'
import address from './hotel/address'
import policy from './hotel/policy'
import room from './hotel/room'
import utilities from './hotel/utilities'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // product,
    // vendor,
    // category,
    ticket,
    seat,
    brand,
    plane,
    flight,
    location,
    flightclass,
    flighttime,
    seatDetail,
    customer,
    blockContent,
    tour,
    receiptTour,
    airport,
    topic,
    nation,
    visa,
    receiptVisa,
    typeVisa,
    sale,
    typeSale,
    content,
    contentDetail,
    support,
    combo,
    receiptCombo,
    hotel,
    address,
    policy,
    room,
    utilities
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    
  ]),
})
