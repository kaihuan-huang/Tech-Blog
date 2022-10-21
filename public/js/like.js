let likes = document.querySelectorAll(".likes")

// const likeNum = document.querySelectorAll('#likeNum')


const likeClickHandler = async(event) => {
    event.preventDefault();
    let id = event.target.id;
    let likeNum = parseInt(event.target.nextElementSibling.innerHTML)

    console.log(id)
    console.log(event.target.nextElementSibling.innerHTML)


// let likeNum = event.target.nextElementSibling()


    await fetch(`/posts/like`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            like: likeNum + 1
        }),
        headers: {
          "Content-Type": "application/json",
        },
    });
    document.location.reload()
};

[].forEach.call(likes, (like) => {

    //console.log(like)
    like.addEventListener("click", likeClickHandler);
})

// document.querySelectorAll(".like").addEventListener("click", likeClickHandler);
