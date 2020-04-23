import htm from "htm";
import css from "@styled-system/css";
import Preact from "preact";
import render from "preact-render-to-string";
import { css as gcss } from "glamor";
import { renderStatic } from "glamor/server";

const useFancyPony = function ({ theme }) {
  function h(type, props, ...children) {
    if (props && props.sx) {
      const styling = css(props.sx)({ theme });
      const classRule = gcss(styling);
      delete props.sx;
      props.className = classRule;
    }
    return Preact.createElement(type, props, children);
  }
  return htm.bind(h);
};

const renderFancyPony = function (TopLevelComponent) {
  let output = renderStatic(function () {
    return render(TopLevelComponent);
  });
  return [output.html, output.css];
};

export { useFancyPony, renderFancyPony };
