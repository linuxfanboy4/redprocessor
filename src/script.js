let isHtmlMode = false;
let monacoEditor;

require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs" } });

require(["vs/editor/editor.main"], function () {
    monacoEditor = monaco.editor.create(document.getElementById("html-editor"), {
        value: "<h1>Hello, World!</h1>",
        language: "html",
        theme: "vs-dark",
        automaticLayout: true
    });
});

function formatText(command) {
    document.execCommand(command, false, null);
}

function changeFont(font) {
    document.getElementById("editor").style.fontFamily = font;
}

function changeFontSize(size) {
    document.getElementById("editor").style.fontSize = size;
}

function changeColor(color) {
    document.getElementById("editor").style.color = color;
}

function toggleHTMLMode() {
    isHtmlMode = !isHtmlMode;
    document.getElementById("editor").style.display = isHtmlMode ? "none" : "block";
    document.getElementById("html-editor").style.display = isHtmlMode ? "block" : "none";

    if (isHtmlMode) {
        monacoEditor.setValue(document.getElementById("editor").innerHTML);
        monacoEditor.layout();
    } else {
        document.getElementById("editor").innerHTML = monacoEditor.getValue();
    }
}

function executeHTMLCode() {
    const htmlContent = isHtmlMode ? monacoEditor.getValue() : document.getElementById("editor").innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    iframe.srcdoc = htmlContent;
    document.body.appendChild(iframe);
}

function downloadFile(type) {
    let content = isHtmlMode ? monacoEditor.getValue() : document.getElementById("editor").innerHTML;
    let blob;
    
    if (type === "html") {
        blob = new Blob([content], { type: "text/html" });
    } else if (type === "txt") {
        content = content.replace(/<\/?[^>]+(>|$)/g, ""); 
        blob = new Blob([content], { type: "text/plain" });
    }

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "document." + type;
    a.click();
                                          }
