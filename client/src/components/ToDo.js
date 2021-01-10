import React, { Component } from 'react';
import { Layout, Form, Input, Divider, Button, message } from 'antd';
import Bucket from './Bucket';
import ToDoList from './ToDoList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToDo, createToDo } from '../actions/toDoAction';

const { Header, Footer, Sider, Content } = Layout;

class ToDo extends Component {
    constructor(props){
        super(props);
        this.state = {
            bucketName: '',
            label: ''
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount(){
        await this.props.getToDo();
    }
    async onSubmit(){
        console.log(this.state.bucketName, this.state.label);

        if (!this.state.bucketName){
            message.error({
                content: 'Bucket Name is Required',
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            });
            return;
        }
        await this.props.createToDo(this.state.bucketName, this.state.label);
    }
    render(){
        return (
        <Layout>
                <Header style={{ background:'#1DA1F2', textAlign: 'center'}}>To-Do List</Header>
            <Layout>
                    <Sider theme='light' width={400} style={{ padding: '20px', borderRight: '1px solid #1DA1F2'}}>
                    <Form>
                        <Form.Item name="bucketName" label="Name">
                            <Input name="bucketName" onChange={(e) => this.onChange(e)} value={this.state.bucketName} allowClear={true}/>
                        </Form.Item>
                        <Form.Item name="label" label="Label">
                            <Input name="label" onChange={(e) => this.onChange(e)} value={this.state.label} allowClear={true}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" style={{float: 'right'}} onClick={() => this.onSubmit()}>Create Bucket</Button>
                        </Form.Item>
                    </Form>
                    <Divider>Task Buckets</Divider>
                    <Bucket/>
                </Sider>
                <Content style={{minHeight: '100vh', textAlign: 'center', padding: '20px'}}>
                    <ToDoList />
                </Content>
            </Layout>
            <Footer style={{ padding: 0, textAlign: 'center', background: 'yellow'}}>&copy; {new Date().getFullYear()}</Footer>
        </Layout>
        )
    }
}

ToDo.propTypes = {
    getToDo: PropTypes.func.isRequired,
    createToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    toDo: state.toDo,
});

export default connect(mapStateToProps, { getToDo, createToDo })(ToDo);