import request from '@/request.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL + '/contacts'

const get = () => {
    return request.get(`${baseUrl}`)
}
const create = (contact) => {
    return request.post(`${baseUrl}`, contact)
}

const update = (contact) => {
    return request.put(`${baseUrl}/${contact.id}`, contact)
}

const remove = (id) => {
    return request.delete(`${baseUrl}/${id}`)
}
export default {get, create, update, remove}


