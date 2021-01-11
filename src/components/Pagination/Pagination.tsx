import React from "react"
import styled from "styled-components"

type PaginationProps = {
  currentPage: number,
  totalUsers: number | null,
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
  /**
   * [] shows current page
   * [] next and back buttons:
   * [] next sends message to cockpit to call to {currentUrl}&page={currentPage + 1};
   * [] back sends message to cockpit to call to {currentUrl}&page={currentPage - 1} || cached response?;
   */
  return (
      <HorizontalSpacingDiv >
        {
          (props?.totalUsers === 0) ? <em>Looks like no users match that search</em> : 
        
         props.currentPage === -1 ? <em>Have a search</em> :
        <React.Fragment>
          { props.currentPage === 1 ? <div></div> :
            <PaginationButton direction="back" onClick={props.backClicked}>Back</PaginationButton>
          }
          <p>{props.currentPage}</p>
          {
            (props?.totalUsers) ?
              (props.totalUsers < (30 * props.currentPage + 1)) ? <div></div> :
              <PaginationButton direction="next" onClick={props.nextClicked}>Next</PaginationButton>
            : null
          }
        </React.Fragment>
    }
    </HorizontalSpacingDiv>    
  )
}

export default Pagination