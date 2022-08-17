import styled from 'styled-components';

export const Whole = styled.div`
      width: 100%;
    padding-top: 56.98px;
      @media (max-width: 991px) {
    /* padding: 0.75rem 0; */
    padding-top: 159px;
  }
`

export const Body = styled.nav`
  padding: 0.375rem 1rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: #FFFEFC;
  z-index: 100;
  box-shadow: 4px 2px 3px rgb(0 0 0 / 14%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #FFFEFC;
  z-index: 100;
  flex-flow: row nowrap;
  justify-content: flex-start;
    /* padding: 0.375rem 4.2rem; */
  /* @media only screen and (min-width: 992px) {
} */
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    /* -webkit-align-items: center; */
    /* -webkit-box-align: center; */
    -ms-flex-align: center;
    /* align-items: center; */
    /* -webkit-box-pack: justify; */
    /* -webkit-justify-content: space-between; */
    -ms-flex-pack: justify;
    /* justify-content: space-between; */
    /* background: #FFFEFC; */
    /* z-index: 100; */
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
`

export const StyledA = styled.a`
  color: black;
  padding-top: 0;
  padding-bottom: 0;
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;

`

export const LogoImg = styled.img`
  display: block;
  border-style: none;
  width: 81.26px;
  height: 34px;
`

export const NavCollapse = styled.div`
  /* @media only screen and (min-width: 992px) {
    display: flex !important;
    flex-basis: auto;
  }
  @media (max-width: 991px) {
    padding: 0;
  } */
   display: flex !important;
    flex-basis: auto;
    padding: 0;
  /* flex-basis: 100%; */
  flex-grow: 1;
  align-items: center;
`

export const NavUl = styled.ul`
 /* @media only screen and (min-width: 992px) {
}
  @media (max-width: 991px) {
  } */
  padding: 0.75rem 0;
  flex-direction: row;
  margin-left: auto !important;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  padding-left: 0;
  list-style: none;
`

export const NavLi = styled.li`
  font-size: 18px;
  letter-spacing: -0.009em;
  line-height: 1.6;
  list-style: none;

  .login__a {

    :hover {
     background-color: #f8f8f9;
    }
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    color: rgb(99, 114, 131);
    height: 33px;
    border-radius: 5px;
    margin-right: 10px;
    padding-left: 18px;
    padding-right: 18px;
    background-color: rgb(255, 255, 255);
    display: inline-flex;
    position: relative;
    font-size: 13px;
    box-sizing: border-box;
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    flex-shrink: 0;
    -webkit-box-pack: center;
    justify-content: center;
    box-shadow: rgb(0 0 0 / 2%) 0px 1px 2px 0px, rgb(0 0 0 / 10%) 0px 0px 0px 1px inset;
    vertical-align: middle;
    @media only screen and (max-width: 991px) and (max-width: 767px) {
    font-size: 13px;
    line-height: 1.5;
    padding-right: 1.3rem;
    padding-left: 1.3rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    }
    @media only screen and (min-width: 992px) {
    padding-right: 1.3rem;
    padding-left: 1.3rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  }

.signup__a {

    :hover {
    /* background-color: rgb(12, 36, 59, 0.9); */
    opacity: 90%;
    }
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    color: rgb(255, 255, 255);
    height: 33px;
    border-radius: 4px;
    padding-left: 11px;
    padding-right: 11px;
    background-color: rgb(12, 36, 59);
    display: inline-flex;
    position: relative;
    font-size: 13px;
    box-sizing: border-box;
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    flex-shrink: 0;
    -webkit-box-pack: center;
    justify-content: center;
    box-shadow: rgb(0 0 0 / 4%) 0px 1px 3px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px inset;
    vertical-align: middle;
    margin-right: 0.3rem;
    @media only screen and (max-width: 991px) and (max-width: 767px) {
    font-size: 13px;
    line-height: 1.5;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    }
    @media only screen and (min-width: 992px) {
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-right: 1rem;
    
  }
  }

`