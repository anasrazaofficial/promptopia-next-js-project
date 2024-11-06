"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => { }




  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="peer search_input"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>


      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed