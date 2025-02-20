import React, {useEffect, useState} from 'react'
import {Avatar, Button, List} from 'antd'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {contacts} from '@/helpers/data.jsx'

const pagination = {
    position: 'bottom',
    align: 'end',
    pageSize: 50,
}

const ContactsList = ({setContact}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(contacts)

    useEffect(() => {
        const loadContacts = () => {

        }

        loadContacts()
    }, [])

    const onEdit = (item) => {
        setContact(item)
    }

    const onDelete = (id) => {
    }

    const getListActions = (item) => {
        return [
            <Button key="edit" type="text" danger icon={<DeleteOutlined/>} onClick={() => onDelete(item.id)}/>,
            <Button key="delete" type="link" icon={<EditOutlined/>} onClick={() => onEdit(item)}/>,
        ]
    }

    return (
        <div className="px-4 py-4">
            <List
                dataSource={data}
                pagination={pagination}
                renderItem={(item) => (
                    <List.Item
                        className="hover:underline cursor-pointer"
                        onClick={() => onEdit(item)} key={item.email} actions={getListActions(item)}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={`${item.firstName} ${item.surname}`}
                            description={item.email}
                        />
                        <div>{item.phoneNumber}</div>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ContactsList