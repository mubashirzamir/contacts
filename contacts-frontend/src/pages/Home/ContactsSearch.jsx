import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons'

const ContactsSearch = ({search, setSearch}) => {
    return (
        <div className="contacts-search">
            <Input
                allowClear
                placeholder="Search contacts by name, email, or phone number."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                prefix={<SearchOutlined/>}
            />
        </div>
    )
}

export default ContactsSearch