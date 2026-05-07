import { useState } from "react";

import UploadPanel from "./components/UploadPanel";
import EditorCanvas from "./components/EditorCanvas";
import PropertiesPanel from "./components/PropertiesPanel";
import AIPrompt from "./components/AIPrompt";
import Editor from "@monaco-editor/react";
import ToolsPanel from "./components/ToolsPanel";

function App() {
  const [viewMode, setViewMode] = useState("preview");

  const [html, setHtml] = useState("");

  const [activePanel, setActivePanel] = useState("properties");

  const [selectedElement, setSelectedElement] =
    useState(null);

  return (
    <div className="h-screen flex bg-gray-100">


      {/* LEFT */}
      <div className="w-1/5 bg-white border-r p-4">

        <UploadPanel setHtml={setHtml} />

      </div>

      {/* CENTER */}
      <div className="flex-1 flex flex-col p-4 gap-4 min-h-0">

        <AIPrompt
          html={html}
          selectedElement={selectedElement}
          setHtml={setHtml}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        <div className="flex-1 min-h-0">

          {
  viewMode === "preview" ? (

    <EditorCanvas
        html={html}
        setSelectedElement={
          setSelectedElement
        }
      />

    ) : (

      <div className="h-full rounded overflow-hidden">

  <Editor
    height="100%"
    defaultLanguage="html"
    value={html}
    theme="vs-dark"

    onChange={(value) =>
      setHtml(value || "")
    }

    options={{
      minimap: {
        enabled: false,
      },

      fontSize: 14,

      wordWrap: "on",

      automaticLayout: true,

      formatOnPaste: true,

      formatOnType: true,
    }}
  />

</div>
  )
}

        </div>

      </div>

      {/* RIGHT */}
      <div
  className="
    w-1/5
    bg-white
    border-l
    flex
    flex-col
  "
>

  {/* TOP MENU */}
  <div
    className="
      flex
      border-b
    "
  >

    <button
      onClick={() =>
        setActivePanel("properties")
      }

      className={`
        flex-1
        p-3
        font-semibold
        transition

        ${
          activePanel === "properties"
            ? "bg-black text-white"
            : "bg-white"
        }
      `}
    >
      Properties
    </button>

    <button
      onClick={() =>
        setActivePanel("tools")
      }

      className={`
        flex-1
        p-3
        font-semibold
        transition

        ${
          activePanel === "tools"
            ? "bg-black text-white"
            : "bg-white"
        }
      `}
    >
      Tools
    </button>

  </div>

  {/* CONTENT */}
  <div className="flex-1 p-4 overflow-y-auto">

    {
      activePanel === "properties" ? (

        <PropertiesPanel
          selectedElement={selectedElement}
          setHtml={setHtml}
        />

      ) : (

        <ToolsPanel />

      )
    }

  </div>

</div>

    </div>
  );
}

export default App;