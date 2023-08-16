import React, {useEffect, useState} from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {

  /*Name on the tab of the website */
  document.title=`CodePen | CodeEditor`
  /*usage of local storage in order to save the code whenever come back or refresh the page */
  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDoc,setSrcDoc] =useState('')

  /*in order to have some delay in showing up the code in the display part - use time out of 500ms that will display the content in when you will have pause of 500ms*/
  useEffect( () => {
    const timeout = setTimeout(() => {
      /*boiler plate having string templates - `..` */
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    },500)

    return () => clearTimeout(timeout) /*it clears the previous timeout and crate a brand new timeout when ever we create */
  },[html,css,js])


  return (
    <>
      <div className="pane top-pane">
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml}/>
        <Editor language="css" displayName="CSS" value={css} onChange={setCss}/>
        <Editor language="javascript" displayName="JAVASCRIPT" value={js} onChange={setJs}/>
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
