import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, notification, Button } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsLoading, setUsersList, setMoreUsersList } from '.././usersSlice';
import { AxiosResponse } from 'axios';
import { GetUsersResponse, User } from '../../../Types/User';
import './Home.css';
import { Link } from 'react-router-dom';
import { fetchUsersList } from '../../../api';
import UserSkeleton from '../../../components/Users/UserSkeleton';
import AddNewUserDrawer from '../../../components/Users/AddNewUserDrawer';
const Home = () => {

    const { Meta } = Card;

    const [showAddNewUserDrawer, setShowAddNewUserDrawer] = useState(false);
    /**
     * Yes this is AWESOME 🤩
     * Now we can easily get the value from redux and also use the power of typescript types
     */
    const usersList = useAppSelector((state) => state.users.users);
    const loading = useAppSelector((state) => state.users.isLoading);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isLoadingMore, setIsLoadingMore] = useState(false);


    const getUsersList = () => {
        dispatch(setIsLoading(true))

        fetchUsersList(page, total, limit).then((response: AxiosResponse<GetUsersResponse>) => {
            const { data: { data: usersData, limit, page, total } } = response;
            setPage(page);
            setTotal(total);
            setLimit(limit);
            dispatch(setUsersList(usersData))
        })
    }

    const handleCloseAddNewUserDrawer = (shouldRefresh: boolean) => {
        if (shouldRefresh) {
            getUsersList();
            notification.open({
                message: 'Created Successfully',
                description:
                    'The new user was created Successfully',
            });
        }
        setShowAddNewUserDrawer(false)
    }
    const handleOpenAddNewUserDrawer = () => {
        setShowAddNewUserDrawer(true)
    }
    const Skeletons = () => {
        let SkeletonsArr = []
        for (var i = 0; i < limit; i++) {
            SkeletonsArr.push(
                <Col xs={24} sm={8} md={8} lg={6} xl={4} xxl={3} key={i}>
                    <UserSkeleton imgHeight="100px" />
                </Col>)
        }
        return SkeletonsArr
    }

    const loadMoreUsers = () => {
        setIsLoadingMore(true);
        fetchUsersList(page + 1, total, limit).then((response: AxiosResponse<GetUsersResponse>) => {
            const { data: { data: usersData, limit, page, total } } = response;
            setPage(page);
            setTotal(total);
            setLimit(limit);
            setIsLoadingMore(false);
            dispatch(setMoreUsersList(usersData))
        })
    }

    useEffect(() => {
        getUsersList()
    }, [])

    return (
        <>
            <Row gutter={[48, 48]} justify="center" align="middle">
                {loading ? Skeletons()
                    :
                    usersList.map((user: User) =>
                        <Col xs={24} sm={8} md={8} lg={6} xl={4} xxl={3} key={user.id}>
                            <Link to={`/${user.id}`}>
                                <Card
                                    hoverable
                                    cover={user.picture ? <img alt={`${user.title}. ${user.firstName} ${user.lastName}`} src={user.picture} /> : <Avatar
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
                                        icon={<UserOutlined />}
                                    />}
                                >
                                    <Meta className="text-capitalize" title={`${user.title}. ${user.firstName}`} />
                                </Card>
                            </Link>
                        </Col>
                    )}

                <Button className="add-new-btn" type="primary" shape="round" icon={<UserAddOutlined />} size="large" onClick={handleOpenAddNewUserDrawer}>
                    Add New New
                </Button>
                <AddNewUserDrawer visible={showAddNewUserDrawer} onClose={handleCloseAddNewUserDrawer} />
            </Row>
            <Row gutter={[48, 48]} justify="center" align="middle">
                <Button className="load-more-btn" type="primary" shape="round" size="large" onClick={loadMoreUsers} disabled={isLoadingMore} loading={isLoadingMore}>
                    Load More
                </Button>
            </Row>
        </>
    )
}
export default Home
