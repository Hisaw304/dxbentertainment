import React from "react";

export default function SiteClosed() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="text-center">
          <div className="four_zero_four_bg">
            <h1>404</h1>
          </div>

          <div className="contant_box_404">
            <h3>Website Temporarily Unavailable</h3>

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
