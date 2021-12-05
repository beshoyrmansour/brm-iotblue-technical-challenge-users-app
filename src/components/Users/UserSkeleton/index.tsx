import { Skeleton, Space } from 'antd'
import React from 'react'
import './UserSkeleton.css'

interface UserSkeletonProps {
    imgHeight?: string;
    contentHeight?: string;
}
const UserSkeleton = (props: UserSkeletonProps) => {
    const { imgHeight, contentHeight } = props
    return (
        <Space direction="vertical" className="user-skeleton-wrapper">
            <Skeleton.Image style={{ width: '100%', height: imgHeight || 'auto', }} />
            <Skeleton.Input style={{ width: '100%', height: contentHeight || '30px', }} active size="large" />
        </Space>
    )
}

export default UserSkeleton
