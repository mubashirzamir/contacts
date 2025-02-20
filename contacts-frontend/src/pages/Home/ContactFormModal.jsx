import React from 'react'
import {Button, Form, Input, Modal} from 'antd'
import AvatarUpload from '@/components/AvatarUpload/AvatarUpload.jsx'
import PhoneInput from 'antd-phone-input'
import {NEW_CONTACT} from '@/helpers/constants.jsx'

const formItemLayout = {
    requiredMark: true,
    colon: false,
}

const ContactFormModal = ({open, setOpen, contact}) => {
    const [form] = Form.useForm()
    const createMode = contact === NEW_CONTACT
    const editMode = !createMode
    const modalTitle = editMode ? 'Edit Contact' : 'Add Contact'

    const handleOk = () => {
        form.validateFields().then(values => {
            console.log('values', values)
            setOpen(false)
        }).catch(error => {
            console.log('error', error)
        })
    }

    const handleCancel = () => {
        setOpen(false)
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
        <Modal width="50%" footer={getModalFooter} title={modalTitle} open={open} onOk={handleOk}
               onCancel={handleCancel}>
            <ContactsForm form={form} contact={contact}/>
        </Modal>
    </>

}

const ContactsForm = ({form, contact}) => {
    if (contact) {
        form.setFieldsValue(contact)
    }

    return <Form {...formItemLayout} form={form}>
        <AvatarUpload/>

        <Form.Item name="firstName" rules={[{required: true, message: 'First name is required.'}]}>
            <Input placeholder="First name"/>
        </Form.Item>

        <Form.Item name="surname">
            <Input placeholder="Surname"/>
        </Form.Item>

        <Form.Item name="phoneNumber" rules={[{required: true, message: 'A valid phone number is required.'}]}>
            <PhoneInput placeholder="Phone Number"/>
        </Form.Item>

        <Form.Item name="email" rules={[{type: 'email', message: 'A valid email is required.'}]}>
            <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item name="addressLine01">
            <Input placeholder="Address Line 01"/>
        </Form.Item>

        <Form.Item name="addressLine02">
            <Input placeholder="Address Line 02"/>
        </Form.Item>

        <Form.Item name="addressLine03">
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