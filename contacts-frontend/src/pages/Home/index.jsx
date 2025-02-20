import {useEffect, useState} from 'react'
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
    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState(null)
    const [loading, setLoading] = useState(false)
    const messageApi = useMessage()
    const modal = useModal()

    useEffect(() => {
        loadContacts()
    }, [])

    const loadContacts = () => {
        setLoading(true)
        ContactsService.get()
            .then(setContacts)
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
                setLoading(true)
                ContactsService.remove(item.id)
                    .then(() => {
                        messageApi.success('Contact deleted successfully')
                        loadContacts()
                    }).catch(e => genericNetworkError(messageApi, e))
                    .finally(() => setLoading(false))
            }
        })
    }

    return <>
        <ContactsSearch/>
        <ContactsList data={contacts} setContact={setContact} loading={loading} onDelete={deleteContact}/>
        <ContactFormModal contact={contact} setContact={setContact} onDelete={deleteContact}
                          loadContacts={loadContacts}/>
        <FloatButton type="primary" icon={<PlusOutlined/>} onClick={() => setContact(NEW_CONTACT)}/>
    </>
}

export default Home