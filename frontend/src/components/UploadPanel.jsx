function UploadPanel({ setHtml }) {

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setHtml(event.target.result);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Upload HTML
      </h2>

      <input
        type="file"
        accept=".html"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default UploadPanel;