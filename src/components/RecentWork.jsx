import React from "react";
// import { GROUPS } from "../data/recentWorkImages";
import { getCloudinaryGroup } from "../utils/cloudinary";

const groupA = getCloudinaryGroup("groupA");
const groupB = getCloudinaryGroup("groupB");
const groupC = getCloudinaryGroup("groupC");

const Row = ({ images, direction, speed }) => {
  return (
    <div
      className={`rw-row ${direction}`}
      style={{ animationDuration: `${30 / speed}s` }}
    >
      {[...images, ...images].map((img, i) => (
        <div className="rw-card" key={i}>
          <img src={img} alt="Recent work" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

const RecentWork = () => {
  return (
    <section className="recent-work">
      <div className="rw-header">
        <h2>Recent Work</h2>
        <p>
          Highlights from our latest dance classes, live shows, private events,
          and stage performances across Dubai.
        </p>
      </div>

      <div className="rw-wrapper">
        <Row images={groupA} direction="left" speed={1} />
        <Row images={groupB} direction="right" speed={0.7} />
        <Row images={groupC} direction="left" speed={0.85} />
      </div>
    </section>
  );
};

export default RecentWork;
