import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize'
import { app } from '../../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import moment from 'moment/moment';
import ReplyList from './ReplyList';

// addDoc, getDoc, setDoc, deleteDoc

const ReplyPage = ({ id }) => {

    const db = getFirestore(app);
    const email = sessionStorage.getItem('email');
    const [contents, setContentes] = useState('');

    const onWrite = async () => {
        const reply = {
            pid: id,
            email,
            contents,
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
        await addDoc(collection(db, 'reply'), reply);
        setContentes('')
    }

    return (
        <div className='my-5'>
            {email ?
                <Row className='justify-content-center'>
                    <Col md={10}>
                        <TextareaAutosize
                            onChange={(e) => setContentes(e.target.value)}
                            value={contents}
                            placeholder='내용을 입력하세요!'
                            className='textarea' />
                        <Button disabled={contents === ''}
                            onClick={onWrite}
                            size='sm' variant='dark'>등록</Button>
                    </Col>
                </Row>
                :
                <Row className='justify-content-center'>
                    <Col md={10}>
                        <Button className='w-100' variant='dark'>로그인</Button>
                    </Col>
                </Row>
            }
            <ReplyList pid={id} />
        </div>
    )
}

export default ReplyPage
