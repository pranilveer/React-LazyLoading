import React, { useEffect, useState, useRef } from "react";
import "./Data.css";

const Data = () => {
  const [fetchData, setFetchData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const postsPerLoad = 10;
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const dataFetched = await response.json();

        // Simulate >1000 posts
        const simulatedPosts = [];
        for (let i = 0; i < 10; i++) {
          simulatedPosts.push(
            ...dataFetched.map((post) => ({
              ...post,
              id: post.id + i * 100,
            }))
          );
        }

        setFetchData(simulatedPosts);
        setDisplayedData(simulatedPosts.slice(0, postsPerLoad));
      } catch (error) {
        setError(error.message);
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
    }, 500);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Hello, my name is Pranil</h3>
      <ul>
        {displayedData.length > 0 ? (
          displayedData.map((item) => (
            <li key={item.id}>
              <h6>ID: {item.id}</h6>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))
        ) : loading ? (
          <li>Loading initial posts...</li>
        ) : (
          <li>No data available</li>
        )}
      </ul>
      {loading && displayedData.length > 0 && <div>Loading more posts...</div>}
      {!loading && hasMore && (
        <div ref={loaderRef} style={{ height: "20px" }}></div>
      )}
      {!hasMore && displayedData.length > 0 && <div>No more posts to load</div>}
    </div>
  );
};

export default Data;