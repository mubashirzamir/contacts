import DarkModeToggle from '@/components/DarkMode/DarkModeToggle.jsx'
import {Layout, theme, Typography} from 'antd'
import {ContactsTwoTone} from '@ant-design/icons'

const {Title} = Typography
const {Header} = Layout

const AppHeader = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken()

    return <Header
        className="sticky top-0 z-10 w-full flex items-center"
        style={{backgroundColor: colorBgContainer}}
    >
        <Title level={2} className="!mb-0 flex items-center">
            <ContactsTwoTone className="mr-4"/>
            Contacts
        </Title>
        <div className="ml-auto">
            <DarkModeToggle/>
        </div>
    </Header>
}

export default AppHeader