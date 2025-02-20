import request from '@/request.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL + '/contacts'

const get = () => {
    console.log('findAll')
    return request.get(`${baseUrl}`)
}
const create = (contact) => {
    console.log('create', contact)
    return request.post(`${baseUrl}/register`, contact)
}

const update = (contact) => {
    console.log('update', contact)
    return request.put(`${baseUrl}/${contact.id}`, contact)
}


const remove = (id) => {
    console.log('remove', id)
    return request.delete(`${baseUrl}/${id}`)
}
export default {get, create, update, remove}


