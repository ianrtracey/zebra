import Document, { Head, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../styletron";
class StyleTronDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <html
        style={{
          maxWidth: "100%",
          overflowX: "hidden"
        }}
      >
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body
          style={{
            margin: 0,
            padding: 0,
            maxWidth: "100%",
            overflowX: "hidden"
          }}
        >
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default StyleTronDocument;
