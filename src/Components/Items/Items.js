import React from "react";
import { useSelector } from "react-redux";
import ItemList from "./ItemList/ItemList";

import Fuse from "fuse.js";
import "./Items.scss";

const Items = () => {
  const view = useSelector((state) => state.sort.view);
  const keyword = useSelector((state) => state.sort.sort);
  const db = useSelector((state) => state.items);
  let data = [];
  if (view !== "custom") {
    data = db.filter((e) => {
      if (view === "all") return true;
      else if (view === e.tag) return true;
      else return false;
    });
  } else {
    const options = {
      includeScore: false,
      shouldSort:true,
      minMatchCharLength: 2,
      keys: ["name",'tag','description'],
    };

    // Create a new instance of Fuse
    const fuse = new Fuse(db, options);

    // Now search for 'Man'
    data = fuse.search(keyword).map(e=>e.item);
    
  }

  return (
    <div className="Items">
      {data.length === 0 ? (
        <h2
          style={{
            marginLeft: "50px",
            color: "#f0df4d",
            textShadow: "1px 1px 5px black",
          }}
        >
          Loading!
        </h2>
      ) : (
        data.map((e) => <ItemList key={e._id} item={e} />)
      )}
    </div>
  );
};

export default Items;
