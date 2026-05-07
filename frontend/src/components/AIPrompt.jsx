import { useState } from "react";
import axios from "axios";

function AIPrompt({
  html,
  setHtml,
  selectedElement,
  viewMode,
  setViewMode,
}) {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleAIEdit = async () => {

    if (!selectedElement) {
      alert("Select an element first");
      return;
    }

    try {

      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:5000/ai-edit",
          {
            prompt,
            selectedElementHtml:
            selectedElement.html,
            }
        );

      const parser = new DOMParser();

const newDoc =
  parser.parseFromString(
    response.data.updatedElement,
    "text/html"
  );

const newElement =
  newDoc.body.firstChild;

const document =
  selectedElement.iframe.contentDocument;

const oldElement =
  document.querySelector(
    `[data-editor-id="${selectedElement.id}"]`
  );

if (oldElement && newElement) {

  newElement.setAttribute(
    "data-editor-id",
    selectedElement.id
  );

  oldElement.replaceWith(newElement);

  setHtml(
    document.documentElement.outerHTML
  );

}

      setPrompt("");

    } catch (error) {

      console.log(error);

      alert("AI edit failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
  className="
    editor-panel
    px-4
    py-3
    flex
    flex-col
    gap-3
  "
>

      <input
        type="text"
        placeholder="Make this button modern..."
        value={prompt}
        onChange={(e) =>
          setPrompt(e.target.value)
        }
        className="flex-1 border p-2 rounded"
      />

      <button
        onClick={handleAIEdit}
        className="bg-black text-white px-5 rounded"
      >

        {loading
          ? "Thinking..."
          : "Generate"}

      </button>
            <div className="flex gap-2">

  <button 
    onClick={() =>
      setViewMode("preview")
    }
    className={`
      px-4 py-2 rounded
      ${
        viewMode === "preview"
          ? "bg-black text-white"
          : "bg-gray-200"
      }
    `}
  >
    Preview
  </button>

  <button
    onClick={() =>
      setViewMode("code")
    }
    className={`
      px-4 py-2 rounded
      ${
        viewMode === "code"
          ? "bg-black text-white"
          : "bg-gray-200"
      }
    `}
  >
    Code
  </button>

</div>
    </div>
  );
}

export default AIPrompt;