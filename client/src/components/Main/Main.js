import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';
import Navbar from '../Navbar/Navbar';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <>
    <Navbar />
    <div className="container hompage">
        <div className="join-section">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="roomName">Room Name</label>
            <Input id="roomName" type='text' ref={roomRef} placeholder='ex. Myspace'/>
          </div>
          <div className="form-group">
          <Label htmlFor="userName">User Name</Label>
          <Input type="text" id="userName" ref={userRef} placeholder='ex. Rajiv' />
          </div>
          <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
        </div>
        {/* <MainContainer>
      
      
      <Row>
        <Label htmlFor="roomName">Room Name</Label>
        <Input type="text" id="roomName" ref={roomRef} />
      </Row>
      <Row>
        <Label htmlFor="userName">User Name</Label>
        <Input type="text" id="userName" ref={userRef} />
      </Row>
      <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer> */}
        </div>
        <div className="info-section">
        <div>
          <h2>XYZ Meet</h2>
          <h4>Free Video Conference/Video Chat</h4>
        </div>
          <div className="info-offers">
          <h5>Offers:</h5>
          <ul>
            <li>create rooms</li>
            <li>group video chat</li>
            <li>group text chat</li>
            <li>screen sharing</li>
            <li>screen recording</li>
          </ul>
          
          </div>
          
        </div>
      </div>
    
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;

`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label`
text-align:right;
`;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  float: left;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 5px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 20px;
  font-weight: 500;
  text-align: center;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
  :active{
    transform: scale(0.98)
  }
`;

export default Main;
