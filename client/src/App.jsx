import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"


const App = () => {

  const [code, setcode] = useState(``)

  const [reviewCode, setreviewCode] = useState('')

  useEffect(() => {
    prism.highlightAll()
  },[])

  async function  codeReviewer(){
            const response = await axios.post("http://localhost:3000/reviewer",
              {
                code
              }
            )

            setreviewCode(response.data)
  }

  
  
  
  return (
    <Container>
      <div className="main">
        <div className="left">
          <div className="code">
            <Editor 
            value = {code}
            onValueChange={code =>setcode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript,"javascript")}
            padding={10}
            style={
              {
                fontSize:20,
                border:"1px solid #ddd",
                height:"100%",
                width:"100%",
                borderRadius:"5px", 
              }
            }
            />
          </div>
          <div>
          <button onClick={()=>codeReviewer()} className='review'>Review</button>
          </div>
          
        </div>
        <div className="right">
          <Markdown
          rehypePlugins={[rehypeHighlight]}
          >
          {reviewCode}
          </Markdown>
          
        </div>
      </div>
    </Container>
  )
}

export default App

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  .main{
    height: 100vh;
    width: 100%;
    display: flex;
    background-color:grey;
    padding: 1rem;
    gap: 5px;
  }

  .left{
    height: 100%;
    width: 50%;
    background-color: black;
    border-radius: 0.7rem;
    padding: 1rem;
    color: white;
    position: relative;
  }
  .right{
    height: 100%;
    width: 50%;
    background-color: #434343;
    border-radius: 0.7rem;
    padding: 1rem;
  }

  .review{
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
    background-color: #d3d3fc;
    padding: 0.5rem 2rem;
    font-weight: 600;
    font-size: 1.2rem;
    color: black;
    border-radius: 0.5rem;
    user-select: none;
    cursor: pointer;
    border: none;
  }

  .code{
    height: 100% ;
  }

  .right{
    color: white;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    overflow: auto;
  }

`