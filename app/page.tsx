"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("err:", err);
    }
  }
  async function sendQuery() {
    setResult("");
    setQuery("");
    setLoading(true);
    if (!query) return;
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });
      const json = await result.json();
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }
  return (
    <div className="fd-container">
      <div className="fd-row">
        <div className="fd-col">
          <div className="docs-layout-grid-bg docs-layout-grid-bg--color-1">
            <section
              className="fd-section"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {/* <input
                className="text-black px-2 py-1"
                onChange={(e) => setQuery(e.target.value)}
              /> */}

              <div
                className="fd-container fd-form-layout-grid-container fd-form-layout-grid-container--vertical fd-form-group"
                style={{ maxWidth: "600px" }}
              >
                <div className="fd-row fd-form-item">
                  <div className="fd-col">
                    <label className="fd-form-label" htmlFor="textarea-1">
                      Ask the assistant:
                    </label>
                  </div>
                  <div className="fd-col">
                    <textarea
                      className="fd-textarea"
                      id="textarea-1"
                      placeholder="Type your question here. Try to be descriptive and provide the important details."
                      onChange={(e) => setQuery(e.target.value)}
                    ></textarea>{" "}
                  </div>
                  <button
                    className="fd-button fd-button--emphasized"
                    onClick={sendQuery}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </section>
            <section
              className="fd-section"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {loading && <p>Please wait...</p>}
              {result && <p style={{ maxWidth: "600px" }}>{result}</p>}
              {/* consider removing this button from the UI once the embeddings are created ... */}
              {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
