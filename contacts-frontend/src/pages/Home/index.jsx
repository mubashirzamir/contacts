import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import ContactsList from '@/pages/Home/ContactsList.jsx'
import ContactsSearch from '@/pages/Home/ContactsSearch.jsx'
import {FloatButton} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {NEW_CONTACT} from '@/helpers/constants.jsx'
import ContactsService from '@/services/ContactsService.jsx'
import {genericNetworkError} from '@/helpers/utils.jsx'
import {useMessage} from '@/components/MessageProvider/MessageProvider.jsx'
import {useModal} from '@/components/ModalProvider/ModalProvider.jsx'
import ContactFormModal from '@/pages/Home/ContactFormModal.jsx'

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [paginationState, setPaginationState] = useState({
        page: parseInt(searchParams.get('page')) || 1,
        per_page: parseInt(searchParams.get('per_page')) || 10
    })
    const [paginatedContacts, setPaginatedContacts] = useState([])
    const [contact, setContact] = useState(null)
    const [loading, setLoading] = useState(false)
    const messageApi = useMessage()
    const modal = useModal()

    useEffect(() => {
        loadContacts()
    }, [paginationState])

    useEffect(() => {
        const handler = setTimeout(() => {
            setPaginationState(prev => ({...prev, page: 1})) // Reset to page 1
            updateURL({page: 1, search}) // Update URL when search changes
        }, 500)

        return () => clearTimeout(handler)
    }, [search])

    const loadContacts = () => {
        setLoading(true)
        ContactsService.all({...paginationState, search})
            .then(res => setPaginatedContacts(res.data))
            .catch(e => genericNetworkError(messageApi, e))
            .finally(() => setLoading(false))
    }

    const deleteContact = (item) => {
        return modal.confirm({
            width: 500,
            title: `Are you sure you want to delete ${item.first_name} ${item.surname}?`,
            content: 'This action cannot be undone.',
            okButtonProps: {danger: true},
            okText: 'Delete',
            onOk: () => {
                return ContactsService.remove(item.id)
                    .then((res) => {
                        setLoading(true)
                        messageApi.success(res.message)

                        // If there is only one item in the current page and it's deleted, go back one page
                        if (paginatedContacts.data.length === 1 && paginatedContacts.current_page > 1) {
                            setPaginationState(prev => {
                                const newPage = prev.page - 1
                                updateURL({page: newPage}) // Update URL
                                return {...prev, page: newPage}
                            })
                        } else {
                            // Trigger useEffect by updating state
                            setPaginationState(prev => ({...prev}))
                        }
                    })
                    .catch((e) => {
                        genericNetworkError(messageApi, e)
                        return Promise.reject() // Prevent modal from closing
                    })
                    .finally(() => setLoading(false))
            }
        })
    }

    const updateURL = (updates) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    newParams.set(key, value)
                } else {
                    newParams.delete(key)
                }
            })
            return newParams
        })
    }

    const setSearchWithUrl = (value) => {
        setSearch(value)
        updateURL({search: value})
    }

    const setPaginationWithUrl = (value) => {
        setPaginationState(value)
        updateURL(value)
    }

    return <>
        <ContactsSearch search={search} setSearch={setSearchWithUrl}/>
        <ContactsList
            paginatedData={paginatedContacts}
            setContact={setContact}
            loading={loading}
            onDelete={deleteContact}
            setPaginationState={setPaginationWithUrl}
        />
        <ContactFormModal contact={contact} setContact={setContact} onDelete={deleteContact}
                          loadContacts={loadContacts}/>
        <FloatButton type="primary" icon={<PlusOutlined/>} onClick={() => setContact(NEW_CONTACT)}/>
    </>
}

export default Home
