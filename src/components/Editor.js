import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/moxer.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import minimizeWhite from "../icons/minimize-white.svg";
import minimizeBlack from "../icons/minimize-black.svg";
import maximizeWhite from "../icons/maximize-white.svg";
import maximizeBlack from "../icons/maximize-black.svg";

let toggleFold = 1;
export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange,
  } = props
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }
  const fold = () => {
    toggleFold = !toggleFold;
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title" style={{ color: props.mode ? 'white' : 'black', }}>
        {displayName}
        <button
          type="button"
          className="fold-btn"
          onClick={fold}
        >
          <img src={(props.mode && toggleFold) ? minimizeWhite : (props.mode && !toggleFold) ? maximizeWhite : (!props.mode && toggleFold) ? minimizeBlack : (!props.mode && !toggleFold) ? maximizeBlack : null} alt='icon' />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: props.mode ? 'moxer' : 'neat',
          lineNumbers: true
        }}
      />
    </div>
  )
}
