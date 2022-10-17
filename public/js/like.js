let likes = document.querySelectorAll(".likes")

//const likeBtn = document.querySelectorAll('.likeBtn')


const likeClickHandler = async(event) => {
    event.preventDefault();
    let id = event.target.id;
    console.log(id)
    
let like = handlebars
like++
    console.log('Liked')

    await fetch(`/api/posts/like`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            like: like
        }),
        headers: {
          "Content-Type": "application/json",
        },
    });
};

likes.forEach((like) => {
    //console.log(like)
    like.addEventListener("click", likeClickHandler);
})

// document.querySelectorAll(".like").addEventListener("click", likeClickHandler);