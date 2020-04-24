const htm = require("htm");
const css = require("@styled-system/css").css;
const Preact = require("preact");
const render = require("preact-render-to-string");
const gcss = require("glamor").css;
const renderStatic = require("glamor/server").renderStatic;

const useThemedHtm = function ({ theme }) {
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

const renderThemedHtm = function (TopLevelComponent) {
  let output = renderStatic(function () {
    return render(TopLevelComponent);
  });
  return [output.html, output.css];
};

module.exports = {
  useThemedHtm,
  renderThemedHtm,
};
