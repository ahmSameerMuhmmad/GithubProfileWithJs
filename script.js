const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingElementEl = document.getElementById("loadingElement");


const generateProfile = (profile) => {
    return `
    <div class="profile-box">
    <div class="top-section">
        <div class="left">
            <div class="avatar">
                <img src="${profile.avatar_url}" alt="avatar">
            </div>
            <div class="self">
                <h1>${profile.name}</h1>
                <h1>${profile.login}</h1>
            </div>
        </div>
        <a href="${profile.html_url}" target="_blank">
        <button class="primary-btn">Check Profile</button>
        </a>
    </div>
    <div class="about">
        <h2>About</h2>
        <p>
        ${profile.bio}
        </p>
    </div>
    <div class="status">
        <div class="status-item">
            <h3>Followers</h3>
            <p>${profile.followers}</p>
        </div>
        <div class="status-item">
            <h3>Following</h3>
            <p>${profile.following}</p>
        </div>
        <div class="status-item">
            <h3>Repositories</h3>
            <p>${profile.public_repos}</p>
        </div>
    </div>
</div>`
}


const fetchProfile = async () => {
  const username = searchInputEl.value;
  loadingElementEl.innerHTML="loading....";
  loadingElementEl.style.color="black";

  try {
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();

    if(data.bio){
        loadingElementEl.innerHTML="";
        profileContainerEl.innerHTML=generateProfile(data);
    }
    else{
        loadingElementEl.innerHTML=data.message;
        loadingElementEl.style.color="red";
    }
    console.log("data", data);
    generateProfile(data);
  } 
  catch (error) {
    console.log(error);
  }
};
searchButtonEl.addEventListener('click',fetchProfile);
