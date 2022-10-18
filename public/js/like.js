let likes = document.querySelectorAll(".likes")

//const likeBtn = document.querySelectorAll('.likeBtn')


const likeClickHandler = async(event) => {
    event.preventDefault();
    let id = event.target.id;
    console.log(id)


    await fetch(`/api/posts/like`, {
        method: "PUT",
        body: JSON.stringify({
            id: id
            
        }),
        headers: {
          "Content-Type": "application/json",
        },
    });
};

[].forEach.call(likes, (like) => {

    //console.log(like)
    like.addEventListener("click", likeClickHandler);
})

// document.querySelectorAll(".like").addEventListener("click", likeClickHandler);
