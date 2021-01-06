import React,{useState,useEffect} from "react";
import { useSelector} from "react-redux";
import ItemList from "./ItemList/ItemList";
import Skeleton from 'react-loading-skeleton';
// import SkeletonLoading from 'Components/SkeletonLoading/SkeletonLoading'
import Fuse from "fuse.js";
import "./Items.scss";

const Items = () => {
  const view = useSelector((state) => state.sort.view);
  const spec=useSelector(state=>state.sort.specific)
  const keyword = useSelector((state) => state.sort.sort);
  const db = useSelector((state) => state.items);
  let data = [];
  if (view !== "custom") {
    data = db.filter((e) => {
      if (view === "all") return true;
      else if (view === e.tag && spec==='all') return true;
      else if(view===e.tag && spec===e.specific) return true;
      else return false
    });
    
  } else {
    const options = {
      shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0,
  location: 0,
  distance: 0,
  maxPatternLength: 32,
  minMatchCharLength: 2,
      keys: ["name",'description'],
    };

    // Create a new instance of Fuse
    const fuse = new Fuse(db, options);

    // Now search for 'Man'
    data = fuse.search(keyword.trim() +' ').map(e=>e.item);
 
  }

  return (
    <div className="Items">
      {data.length===0 ? (
        <h1>not found</h1>
      ) : data[0].name? (
        data.map((e) => <ItemList key={e._id} item={e} />)
      ):([1,2,3,4].map((e,i)=><ItemList key={i*111222} item={{}}/>))}
    </div>
  );
};

export default Items;
