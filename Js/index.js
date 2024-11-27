

var listOfBookmarks = [];

if (localStorage.getItem("bookmarks") != null) {
    listOfBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}
var nameInput = document.getElementById("bookmarkName");
    var urlInput = document.getElementById("bookmarkUrl");
    var errorMessage = document.getElementById("errorMessage")

function addSite() {
    var bookmarkName = document.getElementById("bookmarkName").value;
    var bookmarkUrl = document.getElementById("bookmarkUrl").value;
    ;

    var nameRegex = /^\w{3,}(\s+\w+)*$/;
    var urlRegex = /^(https?:\/\/|www\.)\w+\.\w{2,}(:\d{2,5})?(\/\w+)*$/;


    var isValid = true;

    // Validate name format 
    if (!nameRegex.test(bookmarkName)) {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        isValid = false;
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

    // Validate URL format
    if (!urlRegex.test(bookmarkUrl)) {
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
        isValid = false;
    } else {
        urlInput.classList.remove("is-invalid");
        urlInput.classList.add("is-valid");
    }

    // Check if the bookmark name already exists
    if (listOfBookmarks.find(bookmark => bookmark.name === bookmarkName)) {
        alert("Bookmark name already exists.");
        return;
    }

    if (!isValid) {
        errorMessage.classList.add('d-block');
        errorMessage.classList.remove('d-none');
        return;
    } else {
        errorMessage.classList.remove('d-block');
        errorMessage.classList.add('d-none');
    }

    var bookmark = { name: bookmarkName, url: bookmarkUrl };
    listOfBookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(listOfBookmarks));
    displayBookmarks();
    clearInput();
}

function clearInput() {
    document.getElementById("bookmarkName").value = "";
    document.getElementById("bookmarkUrl").value = "";
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
    urlInput.classList.remove("is-invalid");
    nameInput.classList.remove("is-invalid");

}

function displayBookmarks() {
    var cartoona = ``;
    for (var i = 0; i < listOfBookmarks.length; i++) {
        cartoona += `
        <tr>
            <td>${i + 1}</td>
            <td>${listOfBookmarks[i].name}</td>
            <td>
              <button class="btn btn-visit" onclick="visitBookmark('${listOfBookmarks[i].url}')">
                <i class="fa-solid fa-eye pe-1"></i>
                Visit
              </button>
            </td>
            <td>
              <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                <i class="fa-solid fa-trash-can pe-1"></i>
                Delete
              </button>
            </td>
          </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = cartoona;
}

function deleteBookmark(index) {
    listOfBookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(listOfBookmarks));
    displayBookmarks();
}

function visitBookmark(url) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        window.open(url, "_blank");
    } else {
        window.open("https://" + url, "_blank");
    }
}




    

