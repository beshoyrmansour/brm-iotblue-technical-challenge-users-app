import React from 'react'
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../../Types/User'
import './UserDetailsCard.css'

interface UserDetailsCardProps {
    user: User
}

const UserDetailsCard = (props: UserDetailsCardProps) => {
    const { user } = props;
    const { Text } = Typography;
    const { Meta } = Card;

    const userAge = (userDateOfBirth: string) => {
        return new Date().getFullYear() - new Date(userDateOfBirth).getFullYear()
    }
    return (
        <Card
            className="user-details-card"
            cover={user.picture ? <img className="user-details-card-img" alt={`${user.title}. ${user.firstName} ${user.lastName}`} src={user.picture} /> : <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
                icon={<UserOutlined />}
            />}>
            <Meta title={<p className="text-capitalize" >{`${user.title}. ${user.firstName} ${user.lastName}`}</p>} description={
                <div className="user-details">
                    {user.email && <p>
                        <Text type="secondary" style={{ paddingRight: 10 }}>
                            Email:
                        </Text>
                        <Text >
                            {user.email}
                        </Text>
                    </p>}
                    {user.phone && <p>
                        <Text type="secondary" style={{ paddingRight: 10 }}>
                            phone:
                        </Text>
                        <Text >
                            {user.phone}
                        </Text>
                    </p>}
                    {user.location && <p>
                        <Text type="secondary" style={{ paddingRight: 10 }}>
                            location:
                        </Text>
                        <Text >
                            {user.location?.city}, {user.location?.country}
                        </Text>
                    </p>}
                    {user.dateOfBirth && <p>
                        <Text type="secondary" style={{ paddingRight: 10 }}>
                            Age:
                        </Text>
                        <Text >
                            {userAge(user.dateOfBirth)}
                        </Text>
                    </p>}
                </div>
            } />
        </Card>
    )
}

export default UserDetailsCard
