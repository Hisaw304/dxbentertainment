import React from "react";
import bgGif from "/bg.gif";

export default function SiteClosed() {
  return (
    <section className="page-404">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div
            className="four-zero-four-bg"
            style={{ backgroundImage: "url(/bg.gif)" }}
          >
            <h1>404</h1>
          </div>

          <div className="content-box-404">
            <h2>Website Temporarily Unavailable</h2>

            <p>
              This website is currently offline due to pending project
              completion requirements.
            </p>

            <p className="mt-4">
              Please contact the developer to restore access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
