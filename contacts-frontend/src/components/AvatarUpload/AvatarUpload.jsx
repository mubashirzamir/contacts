import React, {useState} from 'react'
import {Avatar, Button, Form, Upload} from 'antd'
import {UploadOutlined, UserOutlined} from '@ant-design/icons'

const AvatarUpload = () => {
    const [imageUrl, setImageUrl] = useState(null)

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            setImageUrl(URL.createObjectURL(info.file.originFileObj)) // Display the uploaded image
        }
    }

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
            alert('You can only upload image files!')
        }
        return isImage
    }

    return <Form.Item
        className="flex justify-center items-center"
        name="avatar"
        style={{textAlign: 'center'}}
    >
        <div>
            <div className="mb-2">
                <Avatar icon={<UserOutlined/>} size={128} src={imageUrl} alt="Avatar"/>
            </div>
            <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                <Button icon={<UploadOutlined/>}>Upload</Button>
            </Upload>
        </div>
    </Form.Item>

}

export default AvatarUpload
