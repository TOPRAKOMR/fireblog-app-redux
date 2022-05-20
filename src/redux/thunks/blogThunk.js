import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    query,
    remove,
    update,
  } from "firebase/database";


import { currentBlogAction } from "../actions/blogActions";

export const addBlog=(blog)=>{
    const db= getDatabase();
    const userRef=ref(db,"baglanti");
    const newUserRef =push(userRef);
    set(newUserRef,blog);
}

export const getBlog=(id,currentBlogs)=>{
    const result=currentBlogs?.filter((item)=>item.id===id);
    return result;

}

export const deleteBlog=(id)=>{
    const db=getDatabase();
    remove(ref(db,"baglanti/"+id));

}

export const updateBlog=(id,data)=>{
    const db =getDatabase();
    const updates={};
    updates["baglanti/"+id]=data;
    return update(ref(db),updates)
}

//! 

export const getBlogs=()=>{
    return(dispatch)=>{
        const db = getDatabase();
        const blogRef = ref(db, "baglanti");
        onValue(query(blogRef), (snapshot) => {
          const blogs = snapshot.val();
          const blogL = [];
          for (let id in blogs) {
            blogL.push({ id, ...blogs[id] });
          }
          dispatch(currentBlogAction(blogL));
        });
      };
}