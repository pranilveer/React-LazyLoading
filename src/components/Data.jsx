import React, { useEffect, useState } from "react";
import "./Data.css";

const Data = () => {
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const dataFetched = await response.json();
        setFetchData(dataFetched);
        console.log(dataFetched);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h3>Hello My name is Pranil</h3>
      <ul>{fetchData.length>0?(
         fetchData.map((item) =>(
            <li key={item.id}><h3> {item.title} </h3>
            <p>{item.body}</p></li>
        ))
      ):(
        <li>No data Available</li>
      )}</ul>
    </div>
  );
};

export default Data;
