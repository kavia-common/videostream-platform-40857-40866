import React from "react";
import { DotsIcon } from "./Icon";
import "../theme.css";

// PUBLIC_INTERFACE
export default function ResultItem({ item }) {
  /** Video result list item with thumbnail, meta, and actions. */
  return (
    <article className="resultItem" aria-label="Search result">
      <a className="thumbnail" href="#" title={item.title}>
        <img src={item.thumbnail} alt={item.title} />
        <span className="overlayLabel">Preview</span>
      </a>
      <div className="videoMeta">
        <div className="videoTitleRow">
          <a className="videoTitle" href="#">
            {item.title}
          </a>
        </div>
        <div className="videoInfo">
          {item.channel} • {item.views} • {item.time}
        </div>
        <p className="videoDesc">{item.description}</p>
      </div>
      <button className="moreBtn" aria-label="More actions">
        <DotsIcon />
      </button>
    </article>
  );
}
