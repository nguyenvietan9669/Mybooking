import  sanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
import {PROJECT_ID,API_VERSION,TOKEN} from '@env'


const client = sanityClient({
    projectId : PROJECT_ID,
    dataset : 'production',
    useCdn : true,
    apiVersion : API_VERSION,
    token: TOKEN
})

const builder  = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
export default client;