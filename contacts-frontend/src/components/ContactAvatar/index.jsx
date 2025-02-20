import {Avatar} from 'antd'
import {generateColor} from '@/helpers/utils.jsx'

const UserAvatar = ({contact}) => {
    return <Avatar style={{backgroundColor: generateColor(contact.first_name)}} size={64}
                   alt="Avatar">{contact?.first_name?.charAt(0)}</Avatar>
}

export default UserAvatar