import React from 'react';
import { Whole, Body, StyledA, LogoImg, NavCollapse, NavUl, NavLi } from './styles';
import Link from 'next/link';
import PropTypes from 'prop-types';

const index = ({ children }) => {
  return (
    <>
      <Body className="nav__body">
        <Link href="/about">
          <StyledA>
            <LogoImg src="/logo/teamz.png" alt="" />
          </StyledA>
        </Link>
        <NavCollapse>
          <NavUl>
            <NavLi>
              <Link href="/about"><a className="signup__a">넥스트퍼스 소개</a></Link>
            </NavLi>
            <NavLi>
              <Link href="/about/Service"><a className="login__a">이용약관</a></Link>
            </NavLi>
            <NavLi>
              <Link href="/about/Privacy"><a className="login__a">개인정보 취급방침</a></Link>
            </NavLi>
            {/* <NavLi>
            <Link href="/login"><a>쿠키정책</a></Link>
          </NavLi>
          <NavLi>
            <Link href="/login"><a>저작권 정책</a></Link>
          </NavLi> */}
          </NavUl>
        </NavCollapse>
      </Body>
      <Whole>
        {children}
      </Whole>
    </>
  );
};

index.propTypes = {
  children: PropTypes.node,
};

export default index;