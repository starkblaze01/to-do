import React, {Component} from 'react';
import { Switch, Card, Modal, Button, Divider, Input, Typography, message } from 'antd';
import {connect} from 'react-redux';
import { updateToDo } from '../actions/toDoAction'
import PropTypes from 'prop-types';

const { Title } = Typography;
class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            addModal: false,
            editModal: false,
            newToDo: '',
            editToDo: '',
            editId: '',
            editIndex: '',
        }
    }
    showModal() {
        this.setState({addModal:true});
    };
    async handleOk() {
        if (!this.state.newToDo) {
            message.error({
                content: 'Task Description is Required',
                style: {
                    marginTop: '20vh',
                },
            });
            return;
        }
        this.setState({ addModal: false });
        let list = [{ description: this.state.newToDo, done: false }].concat(this.props.toDo.currentBucket.list)
        console.log(list)
        await this.props.updateToDo(this.props.toDo.currentBucket._id, list);
        this.setState({ newToDo: '' });
    };
    handleCancel() {
        this.setState({ addModal: false });
    };

    showEditModal() {
        this.setState({ editModal: true });
    }
    async handleEditOk() {
        if (!this.state.editToDo) {
            message.error({
                content: 'Task Description is Required',
                style: {
                    marginTop: '20vh',
                },
            });
            return;
        }
        this.setState({ editModal: false });
        const list = this.props.toDo.currentBucket.list;
        list[this.state.editIndex].description = this.state.editToDo;
        await this.props.updateToDo(this.state.editId, list);
        console.log(list);
        this.setState({ editToDo: '', editId: '', editIndex: '' });
        
    };
    handleEditCancel() {
        this.setState({ editModal: false });
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async delete(_id, index){
        let list = this.props.toDo.currentBucket.list;
        list.splice(index,1);
        console.log(list)
        await this.props.updateToDo(_id, list)
    }

    async setFalse(_id, index){
        console.log(this.props.toDo)
        const list = this.props.toDo.currentBucket.list
        list[index].done = !list[index].done;
        console.log(list)
        await this.props.updateToDo(_id, list);
    }
    render(){
        const {toDo} = this.props;
        const list = (toDo.currentBucket.list && toDo.currentBucket.list.length) ? toDo.currentBucket.list.map(el => 
            el.description ? <Card key={toDo.currentBucket.list.indexOf(el)} title={el.description} bordered={true} style={{border: '1px solid grey', margin: '2px'}} hoverable={true}>
                <Switch checkedChildren="Completed" unCheckedChildren="Pending" checked={el.done} onClick={() => this.setFalse(toDo.currentBucket._id, toDo.currentBucket.list.indexOf(el))}/>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button style={{ background: '#fcba03' }} type="text" onClick={() => this.setState({ editModal: true, editToDo: el.description, editId: toDo.currentBucket._id, editIndex: toDo.currentBucket.list.indexOf(el) })}>
                        Edit
                    </Button>
                    <Button danger onClick={() => this.delete(toDo.currentBucket._id, toDo.currentBucket.list.indexOf(el))}>Delete</Button>
                </div>
            </Card> : ''
        ) : ''
        return (
            <div>
                {toDo.currentBucket.list ? <Title level={3}> Selected Bucket: {toDo.currentBucket.bucketName }</Title>: ''}
                <Divider />
                {toDo.currentBucket.list ? <Button onClick={() => this.setState({addModal: true})} type="primary">Add New Task</Button> : 'Select any Bucket'}
                <Divider/>
                <div style={{ margin: 'auto' }}>
                    {list}
                </div>
                <Modal title="Add New Task" visible={this.state.addModal} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
                    <Input name="newToDo" value={this.state.newToDo} onChange={(e) => this.onChange(e)} placeholder="Task Description"/>
                </Modal>
                <Modal title="Edit the Task" visible={this.state.editModal} onOk={() => this.handleEditOk()} onCancel={() => this.handleEditCancel()}>
                    <Input name="editToDo" value={this.state.editToDo} onChange={(e) => this.onChange(e)} placeholder="Task Description"/>
                </Modal>                    
            </div>
        );
    }
}

ToDoList.propTypes = {
    updateToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    toDo: state.toDo,
});

export default connect(mapStateToProps, {updateToDo})(ToDoList);