import {Button, Form, Input, Modal} from 'antd'
import PhoneInput from 'antd-phone-input'
import {NEW_CONTACT} from '@/helpers/constants.jsx'

const formItemLayout = {
    colon: false,
}

const ContactFormModal = ({setContact, contact}) => {
    const [form] = Form.useForm()
    const createMode = contact === NEW_CONTACT
    const editMode = !createMode
    const modalTitle = editMode ? 'Edit Contact' : 'Add Contact'

    const handleOk = () => {
        form.validateFields().then(values => {
            console.log('values', values)
            setContact(null)
        }).catch(error => {
            console.log('error', error)
        })
    }

    const handleCancel = () => {
        setContact(null)
    }

    const getModalFooter = () => {
        return [
            <Button key="delete" danger onClick={handleOk}>
                Delete
            </Button>,
            <Button key="cancel" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
                Save
            </Button>
        ]
    }

    return <>
        <Modal destroyOnClose width="50%" footer={getModalFooter} title={modalTitle} open={!!contact} onOk={handleOk}
               onCancel={handleCancel}>
            <ContactsForm form={form} contact={contact}/>
        </Modal>
    </>

}

const ContactsForm = ({form, contact}) => {
    return <Form {...formItemLayout} form={form} initialValues={contact} preserve={false}>
        <Input type="hidden" name="id"/>

        <Form.Item name="first_name" rules={[{required: true, message: 'First name is required.'}]}>
            <Input placeholder="First name"/>
        </Form.Item>

        <Form.Item name="surname">
            <Input placeholder="Surname"/>
        </Form.Item>

        <Form.Item name="phone" rules={[{required: true, message: 'A valid phone number is required.'}]}>
            <PhoneInput distinct enableSearch placeholder="Phone Number"/>
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