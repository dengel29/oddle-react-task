import styled, {keyframes} from 'styled-components';

const flicker = keyframes`
  0%, 100% {
    opacity: 1;
    border-radius: 50%
  }
  50% {
    opacity: 0.0;
    border-radius: 0%
  }
`
const StyledLoader = styled.div`
  // display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius:10%;
  // background-color:whitesmoke;
  div {
  position: absolute;
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background: darkslateblue;
  animation: ${flicker} 2.2s ease-out infinite;  
  };
  div:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
div:nth-child(2) {
  top: 10%;
  left: 40%;
  animation-delay: -0.4s;
}
div:nth-child(3) {
  top: 10%;
  left: 70%;
  animation-delay: -0.8s;
}
div:nth-child(4) {
  top: 40%;
  left: 10%;
  animation-delay: -0.4s;
}
div:nth-child(5) {
  top: 40%;
  left: 40%;
  animation-delay: -0.8s;
}
div:nth-child(6) {
  top: 40%;
  left: 70%;
  animation-delay: -1.2s;
}
div:nth-child(7) {
  top: 70%;
  left: 10%;
  animation-delay: -0.8s;
}
div:nth-child(8) {
  top: 70%;
  left: 40%;
  animation-delay: -1.2s;
}
div:nth-child(9) {
  top: 70%;
  left: 70%;
  animation-delay: -1.6s;
}
}`

let ContainerDiv = styled.div`
  height: 3.2em;
  width: 3.2em;
  margin: 0 auto;
  margin-top: 1em;
`


const Loader = () => {
  return (
    <ContainerDiv>
      <StyledLoader>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoader>
    </ContainerDiv>
  )
}

export default Loader;