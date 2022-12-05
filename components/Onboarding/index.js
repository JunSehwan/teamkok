import React, { useState, useRef, useCallback } from 'react';
import First from './First';
import Second from './Second';
import Third from './Third';
import Fourth from './Fourth';
import Fifth from './Fifth';
import Sixth from './Sixth';
import Seventh from './Seventh';
import Eightth from './Eightth';
import Nineth from './Nineth';
import Eleven from './Eleven';
import Twelve from './Twelve';
import Thirteen from './Thirteen';
import Fourteen from './Fourteen';
import LeftBar from './LeftBar';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styled from 'styled-components';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';

const Container = styled.section`
      width: 100%;
      height: 100%;
      background: transparent;
      transition: opacity 500ms, transform 500ms;

       // enter from
      &.fade-enter {
        opacity: 0;
        transform: translateY(100%);
      }

      // enter to
      &.fade-enter-active {
        opacity: 1;
        transform: translateY(0%);
      }

      // exit from
      &.fade-exit {
        opacity: 1;
        transform: translateY(0%);
      }

      // exit to
      &.fade-exit-active {
        opacity: 0;
        transform: translateY(-100%);
      }`


const index = () => {
  const [stage, setStage] = useState(1);
  const helloRef = React.useRef(null);
  const goodbyeRef = React.useRef(null);
  const nodeRef = stage == 1 ? helloRef : goodbyeRef;
  const goNextStage = useCallback(() => {
    setStage(prev => prev + 1);
  }, [])
  const goPrevStage = useCallback(() => {
    setStage(prev => prev - 1);
  }, [])
  const goCertStage = useCallback((stage) => {
    setStage(stage);
  }, [])
  const goDashboard = useCallback(() => {
    Router.push("/dashboard");
  }, [])
  const goProfile = useCallback(() => {
    Router.push("/profile");
  }, [])
  const goFriends = useCallback(() => {
    Router.push("/friends");
  }, []);
  const goNews = useCallback(() => {
    Router.push("/news");
  }, [])

  return (
    <>
      <div className='w-full min-h-[100vh]'>
        <div className='flex flex-row w-full'>
          {/* 좌측바 */}
          <LeftBar />

          <div className='main w-full'>
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={stage}
                nodeRef={nodeRef}
                addEndListener={(done) => {
                  nodeRef.current.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
                <Container ref={nodeRef} className="button-container">
                  <div>
                    {stage === 1 ?
                      <First
                        goNextStage={goNextStage}
                        goNews={goNews}
                      /> :
                      stage === 2 ?
                        <Second
                          goNextStage={goNextStage}
                          goNews={goNews}
                          goPrevStage={goPrevStage}
                          goCertStage={goCertStage}
                        /> :
                        stage === 3 ?
                          <Third
                            goNextStage={goNextStage}
                            goNews={goNews}
                            goPrevStage={goPrevStage}
                            goCertStage={goCertStage}
                          /> :
                          stage === 4 ?
                            <Fourth
                              goNextStage={goNextStage}
                              goNews={goNews}
                              goPrevStage={goPrevStage}
                              goCertStage={goCertStage}
                            /> :
                            stage === 5 ?
                              <Fifth
                                goNextStage={goNextStage}
                                goNews={goNews}
                                goPrevStage={goPrevStage}
                                goCertStage={goCertStage}
                              /> :
                              stage === 6 ?
                                <Sixth
                                  goNextStage={goNextStage}
                                  goNews={goNews}
                                  goPrevStage={goPrevStage}
                                  goCertStage={goCertStage}
                                /> :
                                stage === 7 ?
                                  <Seventh
                                    goNextStage={goNextStage}
                                    goNews={goNews}
                                    goPrevStage={goPrevStage}
                                    goCertStage={goCertStage}
                                  /> :
                                  stage === 8 ?
                                    <Eightth
                                      goNextStage={goNextStage}
                                      goNews={goNews}
                                      goPrevStage={goPrevStage}
                                      goCertStage={goCertStage}
                                    /> :
                                    stage === 9 ?
                                      <Nineth
                                        goNextStage={goNextStage}
                                        goNews={goNews}
                                        goPrevStage={goPrevStage}
                                        goCertStage={goCertStage}
                                        goProfile={goProfile}
                                      /> :
                                      stage === 11 ?
                                        <Eleven
                                          goNextStage={goNextStage}
                                          goFriends={goFriends}
                                          goPrevStage={goPrevStage}
                                          goCertStage={goCertStage}
                                        /> :
                                        stage === 12 ?
                                          <Twelve
                                            goNextStage={goNextStage}
                                            goFriends={goFriends}
                                            goPrevStage={goPrevStage}
                                            goCertStage={goCertStage}
                                          /> :
                                          stage === 13 ?
                                            <Thirteen
                                              goNextStage={goNextStage}
                                              goFriends={goFriends}
                                              goPrevStage={goPrevStage}
                                              goCertStage={goCertStage}
                                            /> :
                                            stage === 14 ?
                                              <Fourteen
                                                goNextStage={goNextStage}
                                                goDashboard={goDashboard}
                                                goPrevStage={goPrevStage}
                                                goCertStage={goCertStage}
                                                goProfile={goProfile}
                                                goFriends={goFriends}
                                              /> :
                                              null
                    }
                  </div>
                </Container>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default index;