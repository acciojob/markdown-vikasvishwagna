import { marked } from 'marked';
import React, { useEffect, useState } from 'react'

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState('hello **vikas**, enter the text..');
  const [previewHtmlText, setPreviewHtmlText] = useState('');
  const [isLoading, setIsloading] = useState(false);
  
  const handleChange = (e)=>{
    setMarkdownText(e.target.value);
  }

  useEffect(()=>{
    setIsloading(true);

    const timer = setTimeout(() => {
      try{
        setPreviewHtmlText(marked.parse(markdownText));
      }catch(error){
        console.error(error);
        setPreviewHtmlText("<p style='color:red'>error rendering markdown</p>")
      }finally{
        setIsloading(false)
      }
    }, 100);

    return ()=> clearTimeout(timer);
  },[markdownText])

  

  return (
      <div className='markdown-container'>
        <div className='input-section'>
          <h1>Markdown</h1>
          <textarea className='textarea' placeholder='Enter text' value={markdownText}
          onChange={handleChange}/>
        </div>
        
        <div className='preview-section'>
          <h1>preview</h1>
          {/* {isLoading ? <p>loading...</p> :  <div dangerouslySetInnerHTML={{ __html: previewHtmlText}} />} */}

          {isLoading ? <p>loading...</p> : <div dangerouslySetInnerHTML={{ __html: previewHtmlText}} />}
        </div>

         
      </div>

  )
}

export default MarkdownEditor