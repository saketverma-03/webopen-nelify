"use client";
import { CssPannel, HtmlPannel, JsPannel } from "@/components/EditorPannel";
import { EditorNavbar } from "@/components/navbar/EditorNavbar";
import { cn } from "@/lib/utils";
import { cssCode, htmlCode, jsCode, projUserType } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import "./../styles.scss";

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
  const [html, setHtml] = useAtom(htmlCode);
  const [css, setCss] = useAtom(cssCode);
  const [js, setJs] = useAtom(jsCode);
  const [, setUserType] = useAtom(projUserType);

  useEffect(() => {
    setSrc(`
          <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
          </html>
      `);
  }, [html, css, js]);

  const { id } = useParams();

  const query = useQuery({
    queryKey: ["editorData"],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${id}`);
      return res?.data;
    },
    onSuccess: (data) => {
      const { htmlCode, cssCode, jsCode } = data.project;
      setHtml(htmlCode);
      setCss(cssCode);
      setJs(jsCode);
      console.log(data);
      setUserType(data.usertype);
    },
  });

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

  return (
    <>
      <EditorNavbar projId={id as string} />
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
