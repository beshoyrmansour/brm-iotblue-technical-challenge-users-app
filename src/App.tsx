import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Typography } from 'antd';


import './App.css';
import Home from './features/users/Home';
import UserDetails from './features/users/UserDetails';

function App() {
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;

  return (
    <div className="App">
      <Layout className="app-layout">
        <Header className="app-header">
          <Title className="app-title" type="warning" id="app_title">DUMMY</Title>
          <div className="logo" />
        </Header>
        <Content className="app-content">
          <Router>
            <Routes>
              <Route path="/" caseSensitive={false} element={<Home />} />
              <Route path="/:userId" caseSensitive={false} element={<UserDetails />} />
            </Routes>
          </Router>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Lorem ipsum ©2022 by Beshoy R. Mansour</Footer>
      </Layout>
    </div>
  );
}

export default App;
