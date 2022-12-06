const formatDate = (date) => {
    const newDate = new Date(date)
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let name = month[newDate.getMonth()];
    return newDate.getDate() + ' - ' + name + ' - ' + newDate.getFullYear() 
}

export default formatDate