import { marked } from 'marked';
import React, { useEffect, useState } from 'react'

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState(' **Hello**');
  const [previewHtmlText, setPreviewHtmlText] = useState('');
  const [isLoading, setIsloading] = useState(false);
  
  const handleChange = (e)=>{
    setMarkdownText(e.target.value);
  }

  useEffect(()=>{
    setIsloading(true);

    const timer = setTimeout(() => {
      try{
        setPreviewHtmlText(marked.parse(markdownText, { breaks: true }));
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
          <h2>Markdown Input</h2>
          <textarea className='textarea' placeholder='Enter text' value={markdownText}
          onChange={handleChange}/>
        </div>
        
        <div className='preview-section'>
          <h2>Live Preview</h2>
          {isLoading ? (<div className="loading">Loading preview...</div>) : (<div className='preview' dangerouslySetInnerHTML={{ __html: previewHtmlText}} />)
          }
        </div>

         
      </div>

  )
}

export default MarkdownEditor