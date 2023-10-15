"use client";
import { CssPannel, HtmlPannel, JsPannel } from "@/components/EditorPannel";
import { EditorNavbar } from "@/components/navbar/EditorNavbar";
import { cn } from "@/lib/utils";
import { cssCode, htmlCode, jsCode } from "@/store";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";

const Lol = ({ currentView }: { currentView: string }) => {
  if (currentView === "js") return <JsPannel />;
  if (currentView === "css") return <CssPannel />;
  return <HtmlPannel />;
};

const EditorPage = () => {
  const handleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState({ "--width": "200px" });
  const [hidden, setHidden] = useState(false);
  const [currentView, setCurrentView] = useState("html");
  const [full, setFull] = useState(false);
  const [fontSize, setFontSize] = useState({
    "--e-font-size": "calc(1rem + 0px )",
  });
  const [src, setSrc] = useState("");
  const [html] = useAtom(htmlCode);
  const [css] = useAtom(cssCode);
  const [js] = useAtom(jsCode);

  useEffect(() => {
    setSrc(`
          <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
          </html>
      `);
  }, [html, css, js]);

  const handleWindowMouseMove = useCallback((event: any) => {
    /* Calculate new width */
    if (!editorRef.current) throw Error("Regrence Error for resizing");
    if (!handleRef.current) throw Error("Refrence error resingn");

    let newWid =
      editorRef.current.offsetWidth +
      (event.clientX - handleRef.current?.offsetLeft);

    setWindowWidth({ "--width": `${newWid}px` });
    // newWid = null;
  }, []);

  const hadnleMouseDown = () => {
    setHidden(true);
    window.addEventListener("mousemove", handleWindowMouseMove);
  };

  function hadnleMouseUp() {
    setHidden(false);
    window.removeEventListener("mousemove", handleWindowMouseMove);
  }

  //   async function handleSave() {
  //     try {
  //       const res = await updateOneProjectCode(code, projectId);
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   async function handleLoad() {
  //     try {
  //       const res = await getOneProject(projectId);
  //       setCode({
  //         html: res.data.project.html,
  //         css: res.data.project.css,
  //         js: res.data.project.js,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   useEffect(() => {
  //     handleLoad();
  //   }, []);

  return (
    <>
      <EditorNavbar projId="0000" />
      <div className="editor-container">
        {/* Pannel 1 */}
        <div
          ref={editorRef}
          // @ts-ignore
          style={windowWidth}
          onMouseUp={hadnleMouseUp}
          className="editorpan"
        >
          {/* Tabs */}
          <ul className="list-none flex cursor-pointer justify-between bg-gray-800 text-gray-300 font-bold">
            <li
              // className={`${currentView === "html" ? "selected" : ""}`}
              className={cn(
                "flex-1 text-center py-2 b border border-gray-500",
                {
                  "border-gray-100": currentView === "html",
                }
              )}
              onClick={() => setCurrentView("html")}
            >
              html
            </li>
            <li
              className={cn(
                "flex-1 text-center py-2 b border border-gray-500",
                {
                  "border-gray-100": currentView === "css",
                }
              )}
              onClick={() => setCurrentView("css")}
            >
              css
            </li>
            <li
              className={cn(
                "flex-1 text-center py-2 b border border-gray-500",
                {
                  "border-gray-100": currentView === "js",
                }
              )}
              onClick={() => setCurrentView("js")}
            >
              js
            </li>
          </ul>

          {/* Editor */}
          {/* <div className="test"> */}

          <Lol currentView={currentView} />

          {/* </div> */}
        </div>
        {/* divider between pannels */}
        <div
          ref={handleRef}
          className="handle"
          onMouseDown={hadnleMouseDown}
          onMouseUp={hadnleMouseUp}
        ></div>
        {/* Pannel-2  */}
        <div
          className={`frame  ${full ? "full-screen" : ""}`}
          onMouseUp={hadnleMouseUp}
          onMouseDown={hadnleMouseDown}
        >
          <iframe
            className={hidden ? "hide" : ""}
            srcDoc={src}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default EditorPage;
