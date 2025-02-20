import {Button, Form, Input, Modal} from 'antd'
import PhoneInput from 'antd-phone-input'
import {NEW_CONTACT} from '@/helpers/constants.jsx'
import ContactsService from '@/services/ContactsService.jsx'
import {genericNetworkError} from '@/helpers/utils.jsx'
import {useMessage} from '@/components/MessageProvider/MessageProvider.jsx'
import {useState} from 'react'

const formItemLayout = {
    colon: false,
}

const ContactFormModal = ({setContact, contact, onDelete, loadContacts}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const createMode = contact === NEW_CONTACT
    const editMode = !createMode
    const modalTitle = editMode ? 'Edit Contact' : 'Add Contact'
    const service = createMode ? ContactsService.create : ContactsService.update
    const messageApi = useMessage()

    const handleOk = () => {
        form.validateFields().then(values => {
            setLoading(true)
            service(values)
                .then(() => {
                    messageApi.success('Contact saved successfully')
                    closeModal()
                    loadContacts()
                })
                .catch(error => genericNetworkError(messageApi, error))
                .finally(() => setLoading(false))
        })
    }

    const closeModal = () => setContact(null)

    const handleCancel = () => closeModal()

    const handleDelete = () => onDelete(contact).then((action) => action && closeModal())

    const getModalFooter = () => {
        return [
            <Button loading={loading} danger key="delete" onClick={handleDelete}>
                Delete
            </Button>,
            <Button loading={loading} key="cancel" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button loading={loading} key="submit" type="primary" onClick={handleOk}>
                Save
            </Button>
        ]
    }

    return <Modal destroyOnClose width="50%" footer={getModalFooter} title={modalTitle}
                  open={!!contact} onOk={handleOk}
                  onCancel={handleCancel}>
        <ContactsForm form={form} contact={contact} loading={loading}/>
    </Modal>
}

const ContactsForm = ({form, contact, loading}) => {
    return <Form disabled={loading} {...formItemLayout} form={form} initialValues={contact} preserve={false}>
        <Form.Item hidden name="id">
        </Form.Item>

        <Form.Item name="first_name" rules={[{required: true, message: 'First name is required.'}]}>
            <Input placeholder="First name"/>
        </Form.Item>

        <Form.Item name="surname">
            <Input placeholder="Surname"/>
        </Form.Item>

        <Form.Item name="phone" rules={[{required: true, message: 'A valid phone number is required.'}]}>
            <PhoneInput disabled={loading} distinct enableSearch placeholder="Phone Number"/>
        </Form.Item>

        <Form.Item name="email" rules={[{type: 'email', message: 'A valid email is required.'}]}>
            <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item name="address_line_01">
            <Input placeholder="Address Line 01"/>
        </Form.Item>

        <Form.Item name="address_line_02">
            <Input placeholder="Address Line 02"/>
        </Form.Item>

        <Form.Item name="address_line_03">
            <Input placeholder="Address Line 03"/>
        </Form.Item>

        <Form.Item name="city">
            <Input placeholder="City"/>
        </Form.Item>

        <Form.Item name="postcode">
            <Input placeholder="Postcode"/>
        </Form.Item>
    </Form>
}

export default ContactFormModal