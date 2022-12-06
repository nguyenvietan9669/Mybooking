const formatTitle = (string,length) => {
    let title = string
    if(string.length > length){
        title = string.slice(0,length) + '...'
    }
    return title
}

export default formatTitle