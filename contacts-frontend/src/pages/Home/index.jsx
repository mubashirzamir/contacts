import {useState} from 'react'
import ContactsList from '@/pages/Home/ContactsList.jsx'
import ContactsSearch from '@/pages/Home/ContactsSearch.jsx'
import {FloatButton} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import ContactFormModal from '@/pages/Home/ContactFormModal.jsx'
import {NEW_CONTACT} from '@/helpers/constants.jsx'

const Home = () => {
    const [contact, setContact] = useState(null)

    return <>
        <ContactsSearch/>
        <ContactsList setContact={setContact}/>
        <ContactFormModal setContact={setContact} contact={contact}/>
        <FloatButton type="primary" icon={<PlusOutlined/>} onClick={() => setContact(NEW_CONTACT)}/>
    </>
}

export default Home