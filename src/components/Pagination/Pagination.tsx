import React from "react"
import styled from "styled-components"

type PaginationProps = {
  currentPage: number,
  totalUsers: number | null,
  usersOnPageCount: number |null,
  nextClicked: React.MouseEventHandler,
  backClicked: React.MouseEventHandler
}

const HorizontalSpacingDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  margin: 0 auto;
  @media (max-width: 600px) {
   content: {
   }
  }
`

const PaginationButton = styled.button<{direction: string}>`
  cursor:pointer;
  padding: 0.2em;
  font-size: 0.6rem;
  letter-spacing:0.04em;
  font-weight:600;
  border-radius: 4px;
  outline: none;
  border: none;
  box-shadow: 0px 3px 1px darkslateblue;
  }
`


const Pagination = (props: PaginationProps) => {
  const UserMessage = () => {
    if (props?.totalUsers === 0) {
      return <em>Looks like no users match that search</em>
    } else if (props?.totalUsers === -1) {
      return <em>Have a search</em>
    } else {
     
    }
  }
  return (
      <HorizontalSpacingDiv >
        { props.totalUsers && props.totalUsers <= 0 ? UserMessage() :
        <React.Fragment>
          { props.currentPage === 1 ? <div></div> :
            <PaginationButton direction="back" onClick={props.backClicked}>Back</PaginationButton>
          }
          <p>{props.currentPage}</p>
          {
            (props?.totalUsers && props?.usersOnPageCount) ?
              (props.totalUsers < (30 * props.currentPage + 1)) || props.usersOnPageCount < 30 ? <div></div> :
              <PaginationButton direction="next" onClick={props.nextClicked}>Next</PaginationButton>
            : null
          }
        </React.Fragment>
        }
      </HorizontalSpacingDiv>    
  )
}

export default Pagination