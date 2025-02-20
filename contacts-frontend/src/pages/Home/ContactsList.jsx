import {Button, List} from 'antd'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import ContactAvatar from '@/components/ContactAvatar/index.jsx'

const pagination = {
    position: 'bottom',
    align: 'end',
    pageSize: 5,
}

const ContactsList = ({data, setContact, onDelete, loading}) => {
    const onEdit = (item) => setContact(item)

    const getListActions = (item) => {
        return [
            <Button key="delete" type="text" danger icon={<DeleteOutlined/>} onClick={() => onDelete(item)}/>,
            <Button key="edit" type="link" icon={<EditOutlined/>} onClick={() => onEdit(item)}/>,
        ]
    }

    return (
        <div className="px-4 py-4">
            <List
                loading={loading}
                dataSource={data}
                pagination={pagination}
                renderItem={(item) => (
                    <List.Item actions={getListActions(item)}>
                        <List.Item.Meta
                            className="cursor-pointer hover:underline"
                            onClick={() => onEdit(item)}
                            avatar={<ContactAvatar contact={item}/>}
                            title={`${item.first_name} ${item.surname}`}
                            description={<div>
                                <div>+{item.phone.countryCode} {item.phone.areaCode} {item.phone.phoneNumber}</div>
                                <div>{item.email}</div>
                            </div>}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ContactsList