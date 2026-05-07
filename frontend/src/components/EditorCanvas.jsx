import { useEffect, useRef } from "react";

function EditorCanvas({
  html,
  setSelectedElement,
}) {

  const iframeRef = useRef(null);

  useEffect(() => {

    const iframe = iframeRef.current;

    if (!iframe || !html) return;

    const document = iframe.contentDocument;

    document.open();
    document.write(html);
    document.close();

    setTimeout(() => {

      const allElements =
        document.body.querySelectorAll("*");

      allElements.forEach((element, index) => {

        // ADD UNIQUE ID
        element.setAttribute(
          "data-editor-id",
          index
        );

        element.addEventListener("click", (e) => {

          e.preventDefault();
          e.stopPropagation();

          // REMOVE OLD OUTLINES
          allElements.forEach((el) => {
            el.style.outline = "";
          });

          // OUTLINE CURRENT
          element.style.outline =
            "2px solid red";

          setSelectedElement({
            id: index,
            tag: element.tagName,
            iframe,
          });

        });

      });

    }, 100);

  }, [html]);

  return (
    <div className="w-full h-full bg-white rounded shadow overflow-hidden">

      <iframe
        ref={iframeRef}
        title="editor"
        className="w-full h-full"
      />

    </div>
  );
}

export default EditorCanvas;