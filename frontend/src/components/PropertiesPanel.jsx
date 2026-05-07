import { useEffect, useState } from "react";

function PropertiesPanel({
  selectedElement,
  setHtml,
}) {

  const [text, setText] = useState("");

  const [styles, setStyles] = useState({
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "16",
    width: "",
    height: "",
    padding: "0",
    borderRadius: "0",
  });

  // GET ELEMENT
  const getElement = () => {

    if (!selectedElement) return null;

    const document =
      selectedElement.iframe.contentDocument;

    return document.querySelector(
      `[data-editor-id="${selectedElement.id}"]`
    );

  };

  // LOAD VALUES
  useEffect(() => {

    if (!selectedElement) return;

    const element = getElement();

    if (!element) return;

    const computed =
      window.getComputedStyle(element);

    setText(element.innerText);

    setStyles({
      backgroundColor:
        rgbToHex(computed.backgroundColor),

      color:
        rgbToHex(computed.color),

      fontSize:
        parseInt(computed.fontSize),

      width:
        parseInt(computed.width),

      height:
        parseInt(computed.height),

      padding:
        parseInt(computed.padding),

      borderRadius:
        parseInt(computed.borderRadius),
    });

  }, [selectedElement]);

  // UPDATE HTML
  const syncHtml = () => {

    const document =
      selectedElement.iframe.contentDocument;

    setHtml(
      document.documentElement.outerHTML
    );

  };

  // TEXT UPDATE
  const updateText = (value) => {

    setText(value);

    const element = getElement();

    if (!element) return;

    element.innerText = value;

    syncHtml();

  };

  // STYLE UPDATE
  const updateStyle = (
    property,
    value,
    unit = ""
  ) => {

    const element = getElement();

    if (!element) return;

    element.style[property] =
      value + unit;

    setStyles((prev) => ({
      ...prev,
      [property]: value,
    }));

    syncHtml();

  };

  // RGB TO HEX
  const rgbToHex = (rgb) => {

    const result =
      rgb.match(/\d+/g);

    if (!result) return "#ffffff";

    return (
      "#" +
      result
        .slice(0, 3)
        .map((x) =>
          parseInt(x)
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
    );

  };

  if (!selectedElement) {
    return <p>No element selected</p>;
  }

  return (
    <div className="space-y-5 overflow-y-auto h-full">

      <h2 className="text-2xl font-bold">
        Properties
      </h2>

      {/* TAG */}
      <div>
        <p className="font-semibold">
          Tag
        </p>

        <p>{selectedElement.tag}</p>
      </div>

      {/* TEXT */}
      <div>

        <p className="font-semibold mb-1">
          Text
        </p>

        <input
          type="text"
          value={text}
          onChange={(e) =>
            updateText(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

      </div>

      {/* BACKGROUND */}
      <div>

        <p className="font-semibold mb-1">
          Background Color
        </p>

        <input
          type="color"
          value={styles.backgroundColor}
          onChange={(e) =>
            updateStyle(
              "backgroundColor",
              e.target.value
            )
          }
        />

      </div>

      {/* TEXT COLOR */}
      <div>

        <p className="font-semibold mb-1">
          Text Color
        </p>

        <input
          type="color"
          value={styles.color}
          onChange={(e) =>
            updateStyle(
              "color",
              e.target.value
            )
          }
        />

      </div>

      {/* FONT SIZE */}
      <div>

        <p className="font-semibold mb-1">
          Font Size
        </p>

        <input
          type="range"
          min="8"
          max="72"
          value={styles.fontSize}
          onChange={(e) =>
            updateStyle(
              "fontSize",
              e.target.value,
              "px"
            )
          }
        />

        <p>{styles.fontSize}px</p>

      </div>

      {/* WIDTH */}
      <div>

        <p className="font-semibold mb-1">
          Width
        </p>

        <input
          type="range"
          min="50"
          max="1000"
          value={styles.width}
          onChange={(e) =>
            updateStyle(
              "width",
              e.target.value,
              "px"
            )
          }
        />

        <p>{styles.width}px</p>

      </div>

      {/* HEIGHT */}
      <div>

        <p className="font-semibold mb-1">
          Height
        </p>

        <input
          type="range"
          min="20"
          max="600"
          value={styles.height}
          onChange={(e) =>
            updateStyle(
              "height",
              e.target.value,
              "px"
            )
          }
        />

        <p>{styles.height}px</p>

      </div>

      {/* PADDING */}
      <div>

        <p className="font-semibold mb-1">
          Padding
        </p>

        <input
          type="range"
          min="0"
          max="100"
          value={styles.padding}
          onChange={(e) =>
            updateStyle(
              "padding",
              e.target.value,
              "px"
            )
          }
        />

        <p>{styles.padding}px</p>

      </div>

      {/* BORDER RADIUS */}
      <div>

        <p className="font-semibold mb-1">
          Border Radius
        </p>

        <input
          type="range"
          min="0"
          max="100"
          value={styles.borderRadius}
          onChange={(e) =>
            updateStyle(
              "borderRadius",
              e.target.value,
              "px"
            )
          }
        />

        <p>{styles.borderRadius}px</p>

      </div>

    </div>
  );
}

export default PropertiesPanel;