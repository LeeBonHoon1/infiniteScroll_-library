import axios from 'axios';
import React, {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const Test = () => {

  const [items, setItems] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2)

  useEffect(() => {
    const getData = async() => {
      const res = await axios.get('http://localhost:4000/comments?$_page=1&_limit=20')
         const data = res.data
         setItems(data)
    };
    getData();
  }, []);
  console.log(items)
  const fetchComments = async() => {
    const res = await axios.get(`http://localhost:4000/comments?_page=${page}=1&_limit=20`)
      const data = res.data
      return data
  }

  const fetchData = async() => {
    const commentsFormServer = await fetchComments()
    setItems([...items, ...commentsFormServer])
    if(commentsFormServer.length === 0 || commentsFormServer.length < 20){
      setnoMore(false)
    }
    setPage(page + 1)
  }



  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={noMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {
        items.map((item,index) => {
          return (
            <div key={index} style={{marginBottom:"50px"}}>
              <div>id : {item.id}</div>
              <div>email : {item.email}</div>
              <div>comment: {item.comment}</div>
            </div>
          )
        })
      }
    </InfiniteScroll>
  )
}

export default Test