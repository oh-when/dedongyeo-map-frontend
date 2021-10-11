import React from 'react';
import styled from 'styled-components';

const PageUl = styled.ul`
  float:left;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:black;
  padding:1px;
  background-color: white;
  display:flex;
  alignItems:center;
`;

const PageLi = styled.li`
  display:inline-block;
  font-size:15px;
  padding:5px;
  border-radius:20px;
  width: 30px;
  color: gray;
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#FD476D;
  }
  &:focus::after{
    color:black;
    background-color:#FD476D;
    font-weight:600;
  }
`;

const FocusedPageLi = styled.li`
  display:inline-block;
  font-size:15px;
  padding:5px;
  border-radius:20px;
  width: 30px;
  color: black;
  font-weight:bold;
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{marginTop:24, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <nav>
                <PageUl className="pagination">
                    <button onClick={()=>{}}>
                        <img src={'prev_page.png'} style={{width:15, height:15, marginRight:5}}/>
                    </button>
                    {pageNumbers.map(number => (
                        currentPage===number?
                            <FocusedPageLi key={number} className="page-item">
                                <span onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </span>
                            </FocusedPageLi>
                        :
                            <PageLi key={number} className="page-item">
                                <span onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </span>
                            </PageLi>
                    ))}
                    <button onClick={()=>{}}>
                        <img src={'next_page.png'} style={{width:15, height:15, marginLeft:5}}/>
                    </button>
                </PageUl>
            </nav>
        </div>
    );

};

export default Pagination;