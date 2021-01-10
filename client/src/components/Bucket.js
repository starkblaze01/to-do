import React, { Component } from 'react';
import { List, Divider, Button } from 'antd';
import {connect} from 'react-redux';
import { setToDo, deleteBucket } from '../actions/toDoAction';
import PropTypes from 'prop-types';


class Bucket extends Component {
    onChange(e){
        console.log(e);
    }
    async onClick(_id){
        await this.props.deleteBucket(_id);
    }

    render() {
        const {toDo} = this.props;
        return (
            <List
                dataSource={toDo.buckets}
                bordered={true}
                renderItem={ item =>
                    <List.Item
                        key={item._id}
                        style={{ cursor: 'pointer', border: '0.5px solid black', margin: '2px 0'}}
                        onClick={() => this.props.setToDo(item)}
                    >
                        {item.bucketName}
                        {item.label ? <span style={{ float: 'right', background:'#fcff47', padding: '2px', border: '1px solid black', borderRadius: '0.5em'}}>{item.label}</span> : ''}
                        <Divider />
                        <Button danger onClick={() => this.onClick(item._id)}>Delete Bucket</Button>
                    </List.Item>
                }
            />
        );
    }

}

Bucket.propTypes = {
    setToDo: PropTypes.func.isRequired,
    deleteBucket: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    toDo: state.toDo,
});
export default connect(mapStateToProps, { setToDo, deleteBucket })(Bucket);