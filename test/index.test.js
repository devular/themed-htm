const { useThemedHtm, renderThemedHtm } = require("../src/index");
const glamor = require("glamor");

const theme = {
  colors: {
    red: "hsl(0, 80%, 61%)",
    blue: "hsl(210, 100%, 12%)",
  },
  fontFamily: {
    body: "Georgia",
    heading: "system-ui",
  },
  fontSize: [12, 16, 20, 24, 32],
  spacing: [4, 8, 12, 16, 20],
};

const html = useThemedHtm({ theme });

describe("themed-htm", () => {
  afterEach(() => glamor.flush());
  test("empty", () => {
    expect(html``).toEqual(undefined);
  });
  test("h1 tag", () => {
    expect(renderThemedHtm(html`<h1>hello</h1>`)[0]).toEqual("<h1>hello</h1>");
  });
  test("css generation", () => {
    expect(
      renderThemedHtm(html`<h1 sx=${{ color: "green" }}>hello</h1>`)[1]
    ).toContain("color:green;");
  });
  test("css generation with theme values", () => {
    expect(
      renderThemedHtm(html`<h1 sx=${{ color: "red" }}>hello</h1>`)[1]
    ).toContain("color:hsl(0, 80%, 61%)");
  });
});
