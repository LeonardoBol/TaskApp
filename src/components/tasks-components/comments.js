import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comentarios' : 'comentario'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value, onKeyPress }) => (
    <>
        <Form.Item>
            <TextArea rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onKeyPress={onKeyPress} loading={submitting} onClick={onSubmit} type="primary">
                Comentar
            </Button>
        </Form.Item>
    </>
);

const Comments = () => {

    const {auth_user} = useSelector(state => state.usersReducer)

    const [comments, setComments] = useState([])
    const [submitting, setSubmmiting] = useState(false)
    const [value, setValue] = useState('')



    const handleSubmit = () => {
        if (!value) {
            return;
        }

        setSubmmiting(true)
        setTimeout(() => {

            setSubmmiting(false)
            setValue('')
            setComments([
                ...comments,
                {
                    author: auth_user,
                    avatar: 'http://localhost:5000/avatars/userIcon.png',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                }
            ]);
        }, 100);
    };

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(); 
        }
    }



    return (
        <div className='commentsContainer' >
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={
                    <Avatar
                        src="http://localhost:5000/avatars/userIcon.png"
                        alt={auth_user}
                    />
                }
                content={
                    <Editor
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </div>
    )

}

export default Comments;