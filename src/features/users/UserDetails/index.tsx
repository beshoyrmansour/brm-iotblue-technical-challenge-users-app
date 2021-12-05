import React, { useEffect, useState } from 'react'
import { Card, Avatar, Row, Col, Skeleton, Space, List, Typography, Button } from 'antd';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';

import { fetchUserDetails, fetchUserPosts } from '../../../api'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { GetUserDetailsResponse, GetUserPostsResponse } from '../../../Types/User';
import { setIsLoading, setMoreUserPostsList, setUserDetails, setUserPostsList } from '.././usersSlice';
import './UserDetails.css'
import UserSkeleton from '../../../components/Users/UserSkeleton';
import UserDetailsCard from '../../../components/Users/UserDetailsCard';
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const { Title } = Typography;
    let { userId } = useParams();
    let navigate = useNavigate();

    const user = useAppSelector((state) => state.users.SelectedUser);
    const userPostsList = useAppSelector((state) => state.users.userPosts);
    const loading = useAppSelector((state) => state.users.isLoading);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10)
    const [loadingPosts, setLoadingPosts] = useState(true)


    const goBack = () => {
        navigate('/')
    }

    const loadMoreUsers = () => {
        setLoadingPosts(true)
        fetchUserPosts(userId as string, limit, page + 1, total).then((response: AxiosResponse<GetUserPostsResponse>) => {
            const { data: { data: userPostsData, limit, page, total } } = response;
            setPage(page);
            setTotal(total);
            setLimit(limit);
            setLoadingPosts(false)
            dispatch(setMoreUserPostsList(userPostsData))
        })
    }


    useEffect(() => {
        if (userId) {
            dispatch(setIsLoading(true));
            fetchUserDetails(userId, page, total, limit).then((response: AxiosResponse<GetUserDetailsResponse>) => {
                const { data: usersData } = response;
                dispatch(setUserDetails({ ...usersData }))
                fetchUserPosts(userId as string, page + 1, total, limit).then((response: AxiosResponse<GetUserPostsResponse>) => {
                    const { data: { data: userPostsData, limit, page, total } } = response;
                    setPage(page);
                    setTotal(total);
                    setLimit(limit);
                    setLoadingPosts(false)
                    dispatch(setUserPostsList(userPostsData))
                })
            })
        }
    }, [])
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" align="top">
            <Col xs={24} sm={8}>
                {loading ? (<UserSkeleton imgHeight="400px" contentHeight="200px" />) : user && (
                    <UserDetailsCard user={user} />)
                }
            </Col>
            <Col xs={24} sm={12}>
                <Card className="posts-list" title={<Row justify="start" style={{ alignItems: "baseline" }} >
                    <Button type="ghost" shape="circle" icon={<LeftOutlined />} size="large" onClick={goBack} />
                    <Title level={2} className="padd" style={{ marginLeft: 10 }}>
                        {/* <span>Posts</span> */}
                        Posts
                    </Title></Row>}>

                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={userPostsList}
                        loadMore={<Row gutter={[48, 48]} justify="center" align="middle">
                            <Button className="load-more-btn" type="primary" shape="round" size="large" onClick={loadMoreUsers} disabled={loadingPosts} loading={loadingPosts}>
                                Load More
                            </Button>
                        </Row>}
                        renderItem={post => (
                            <List.Item key={post.id} >
                                <Skeleton loading={loadingPosts} active avatar>
                                    <List.Item.Meta
                                        avatar={<Avatar src={post.owner.picture} />}
                                        title={`${post.owner.firstName} ${post.owner.lastName}`}
                                        description={post.text}
                                    />
                                    <img
                                        className="post-image"
                                        alt="post Image"
                                        src={post.image}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
        </Row >
    )
}

export default UserDetails
