function addToFavourites (id){
    axios.post('/api/blogs/add', {id}).then(data =>{
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}

function deleteFromFavourites (id){
    axios.delete(`/api/blogs/add/${id}`).then(data =>{
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}
