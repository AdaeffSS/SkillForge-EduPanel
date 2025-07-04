import React from "react";
import st from "./st.module.sass";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import { jetBrains } from "@/assets/fonts/jetbrains/font";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { PluggableList } from "unified";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "@/assets/styles/code.sass";

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={
        [remarkBreaks, remarkMath, remarkDirective, remarkGfm] as PluggableList
      }
      rehypePlugins={[rehypeKatex, rehypeHighlight] as PluggableList}
      components={{
        br: () => <span className={st.br} />,
        table({ children }) {
          return <table className={st.table}>{children}</table>;
        },
        thead({ children }) {
          return <thead className={st.thead}>{children}</thead>;
        },
        tbody({ children }) {
          return <tbody className={st.tbody}>{children}</tbody>;
        },
        tr({ children }) {
          return <tr className={st.tr}>{children}</tr>;
        },
        th({ children }) {
          return <th className={st.th}>{children}</th>;
        },
        td({ children, ...props }) {
          return <td className={st.td}>{children}</td>;
        },
        img({ src, alt, title, width, height }) {
          return (
            <img
              src={src}
              alt={alt || ""}
              title={title}
              width={width || "auto"}
              height={height || "auto"}
              className={st.customImage}
            />
          );
        },
        h1({ children, ...props }) {
          return <span className={st.h1}>{children}</span>;
        },
        h2({ children, ...props }) {
          return <span className={st.h2}>{children}</span>;
        },
        h3({ children, ...props }) {
          return <span className={st.h3}>{children}</span>;
        },
        hr({ ...props }) {
          return <hr className={st.hr} />;
        },
        p({ children, ...props }) {
          return <p className={st.p}>{children}</p>;
        },
        blockquote({ children, ...props }) {
          return <blockquote className={st.blockquote}>{children}</blockquote>;
        },
        ul({ children, ...props }) {
          return <ul className={st.ul}>{children}</ul>;
        },
        ol({ children, ...props }) {
          return <ol className={st.ol}>{children}</ol>;
        },

        li({ children }) {
          return <li className={st.listItem}>{children}</li>;
        },

        strong({ children }) {
          return <span className={st.strong}>{children}</span>;
        },

        code({ className, children }) {
          const inline = !className?.includes("language-");

          return inline ? (
            <code className={`${jetBrains.className} ${st.inlineCode}`}>
              {children}
            </code>
          ) : (
            <div className={st.codeBlockWrapper}>
              <pre className={st.codeBlock}>
                <code
                  className={`${jetBrains.className} ${className} ${st.codeTextBlock}`}
                >
                  {children}
                </code>
              </pre>
            </div>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
