import {Button, List} from 'antd'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import ContactAvatar from '@/components/ContactAvatar/index.jsx'

const ContactsList = ({paginatedData, setContact, onDelete, loading, setPaginationState}) => {
    const onEdit = (item) => setContact(item)

    const getListActions = (item) => {
        return [
            <Button key="delete" type="text" danger icon={<DeleteOutlined/>} onClick={() => onDelete(item)}/>,
            <Button key="edit" type="link" icon={<EditOutlined/>} onClick={() => onEdit(item)}/>,
        ]
    }

    const onPageChange = (page, pageSize) => setPaginationState({page, per_page: pageSize})

    return (
        <div className="px-4 py-4">
            <List
                loading={loading}
                dataSource={paginatedData.data}
                pagination={{
                    current: paginatedData.current_page, // Set current page
                    total: paginatedData.total, // Set total items
                    pageSize: paginatedData.per_page, // Items per page
                    onChange: onPageChange, // Handle page change event
                    position: 'bottom',
                }}
                renderItem={(item) => (
                    <List.Item actions={getListActions(item)}>
                        <List.Item.Meta
                            className="cursor-pointer hover:underline"
                            onClick={() => onEdit(item)}
                            avatar={<ContactAvatar contact={item}/>}
                            title={`${item.first_name} ${item.surname}`}
                            description={
                                <div>
                                    <div>+{item.phone?.countryCode} {item.phone?.areaCode} {item.phone?.phoneNumber}</div>
                                    <div>{item.email}</div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ContactsList
