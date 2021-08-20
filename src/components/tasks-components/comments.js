import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comentarios' : 'comentario'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={3} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Comentar
            </Button>
        </Form.Item>
    </>
);

const Comments = () => {

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
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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
            setValue(e.target.value)
        }
    }



    return (
        <div className='commentsContainer' >
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
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