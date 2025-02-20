import request from '@/request.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL + '/contacts'

const all = (params = {}) => {
    return request.get(`${baseUrl}`, {
        params
    })
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
export default {all, create, update, remove}


