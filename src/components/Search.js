import React, { useState, useEffect } from "react";
import axios from "axios";

/** 
 * TO REMOVE SPAN TAGS - DOES NOT WORK

const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

<span
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(result.snippet),
  }}
></span>
*/

const Search = () => {
  const [term, setTerm] = useState("abba");
  const [results, setResults] = useState([]);

  //invoke search within useEffect with/without args
  /**
   * [] - run on intial render
   * nothing - initial render + every rerender
   * [data] - initial render + every rerender IF data changes
   * Note: array can contain multiple terms as well. useEffect will be called if any one term changes
   */
  useEffect(() => {
    //define search as sync inside method
    //can never mark parent method async
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      //update state
      setResults(data.query.search);
    };

    //trigger search without delay for first fire
    if (term && !results.length) {
      search();
    } else {
      //trigger search only after timeout
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000);
      //clear timeout if user types within timeout period
      //return mtd is invoked as soon as user starts typing again - useEffect property
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  const renderedResults = results.map((result) => {
    const regex = /(<([^>]+)>)/gi; //NEW
    const cleanSnippet = result.snippet.replace(regex, ""); //NEW

    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org/?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {cleanSnippet}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
