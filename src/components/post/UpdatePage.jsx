import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Form, Button } from 'react-bootstrap';

const UpdatePage = () => {

    const [form, setForm] = useState({
        title: '',
        body: ''
    })
    const navi = useNavigate();
    const db = getFirestore(app);
    const params = useParams();
    const { id } = params;

    const getPost = async () => {
        const snapshot = await getDoc(doc(db, 'post', id));
        console.log(snapshot.data());
        const post = snapshot.data();
        setForm({ ...post, preTitle: post.title, preBody: post.body });

    }

    const { title, body, preTitle, preBody, email, date } = form;

    useEffect(() => {
        getPost();
    }, [])

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onReset = () => {
        if (window.confirm('정말 취소하시겠습니까?!')) {
            getPost();
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('정말 수정하시겠습니까?!')) {
            const post = { title, body, email, date }
            await setDoc(doc(db, 'post', id), post);
            navi(-1);
        }
    }

    return (
        <div>
            <h1 className='my-4 text-center'>게시글수정</h1>
            <Row className='justify-content-center'>
                <Col md={10}>
                    <Form onReset={onReset} onSubmit={onSubmit}>
                        <Form.Control
                            value={title}
                            name='title' onChange={onChange}
                            className='mb-2' />
                        <Form.Control
                            value={body}
                            name='body' onChange={onChange}
                            as='textarea' rows={10} />
                        <div className='text-center mt-3'>
                            <Button
                                type='submit'
                                disabled={title === preTitle && body === preBody}
                                size='sm' className='px-5 mx-2'
                                variant='outline-dark'>저장</Button>
                            <Button
                                type='reset'
                                disabled={title === preTitle && body === preBody}
                                size='sm' className='px-5'
                                variant='secondary'>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}

export default UpdatePage
