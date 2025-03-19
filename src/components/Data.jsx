import React, { useEffect, useState, useRef } from "react"; // Added useRef
import "./Data.css";

const Data = () => {
  const [fetchData, setFetchData] = useState([]); // All posts
  const [displayedData, setDisplayedData] = useState([]); // Displayed posts
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const postsPerLoad = 10;
  const loaderRef = useRef(null); // Ref for scroll trigger

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Network response was not ok");
        const dataFetched = await response.json();

        // Simulate >1000 posts by duplicating data
        const simulatedPosts = [];
        for (let i = 0; i < 10; i++) {
          simulatedPosts.push(
            ...dataFetched.map((post) => ({
              ...post,
              id: post.id + i * 100, // Unique IDs
            }))
          );
        }

        setFetchData(simulatedPosts);
        setDisplayedData(simulatedPosts.slice(0, postsPerLoad)); // Use slice, not splice
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  const loadMorePosts = () => {
    if (displayedData.length >= fetchData.length) {
      setHasMore(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const nextPosts = fetchData.slice(
        displayedData.length,
        displayedData.length + postsPerLoad
      );
      setDisplayedData((prev) => [...prev, ...nextPosts]);
      setLoading(false);
    }, 500); // Simulated delay
  };

  return (
    <div>
      <h3>Hello, my name is Pranil</h3>
      <ul>
        {displayedData.length > 0 ? (
          displayedData.map((item) => (
            <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
      {loading && <div>Loading more posts...</div>}
      {!loading && hasMore && (
        <div ref={loaderRef} style={{ height: "20px" }}></div>
      )}
      {!hasMore && <div>No more posts to load</div>}
    </div>
  );
};

export default Data;