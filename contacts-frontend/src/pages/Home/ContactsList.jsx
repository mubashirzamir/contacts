import React, {useEffect, useState} from 'react'
import {Avatar, Button, List} from 'antd'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import ContactsService from '@/services/ContactsService.jsx'
import {genericNetworkError} from '@/helpers/utils.jsx'

const pagination = {
    position: 'bottom',
    align: 'end',
    pageSize: 5,
}

const ContactsList = ({setContact}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const loadContacts = () => {
            setLoading(true)
            ContactsService.get()
                .then(setData)
                .catch(genericNetworkError)
                .finally(() => setLoading(false))
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
                loading={loading}
                dataSource={data}
                pagination={pagination}
                renderItem={(item) => (
                    <List.Item
                        className="hover:underline cursor-pointer"
                        onClick={() => onEdit(item)} key={item.email} actions={getListActions(item)}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
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