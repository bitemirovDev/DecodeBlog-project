function blockUser(id){
    axios.post('/api/admin/block', {id})
    location.reload()
}

function unblockUser(id){
    axios.post('/api/admin/unblock', {id})
    location.reload()
}

function deleteUser(id){
    axios.delete(`/api/admin/deleteUser/${id}`)
    location.reload()
}