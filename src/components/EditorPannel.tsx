"use client";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

import { cssCode, editorFontSize, htmlCode, jsCode } from "@/store";
import { useAtom } from "jotai";

export function JsPannel() {
  const [code, setCode] = useAtom(jsCode);
  const [style] = useAtom(editorFontSize);

  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={"dark"}
      extensions={[javascript()]}
      className="editor-view"
      onChange={(value) => setCode(value)}
      // @ts-ignore
      style={style}
    />
  );
}
export function HtmlPannel() {
  const [code, setCode] = useAtom(htmlCode);

  const [style] = useAtom(editorFontSize);
  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={"dark"}
      extensions={[html()]}
      className="editor-view"
      onChange={(value) => setCode(value)}
      // @ts-ignore
      style={style}
    />
  );
}
export function CssPannel() {
  const [code, setCode] = useAtom(cssCode);

  const [style] = useAtom(editorFontSize);
  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={"dark"}
      extensions={[css()]}
      className="editor-view"
      onChange={(value) => setCode(value)}
      // @ts-ignore
      style={style}
    />
  );
}
