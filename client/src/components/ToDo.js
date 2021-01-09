import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class ToDo extends Component {
    render(){
        return (
        <Layout>
                <Header style={{ background:'#1DA1F2', textAlign: 'center'}}>To-Do List</Header>
            <Layout>
                <Sider theme='light'>Sider</Sider>
                <Content style={{minHeight: '100vh'}}>Content</Content>
            </Layout>
            <Footer style={{height: '5px'}}>Footer</Footer>
        </Layout>
        )
    }
}

export default ToDo;