function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}




// drag and drop 

// Selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; // This is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); // If user clicks on the button then the input is also clicked
}

input.addEventListener("change", function () {
    // Getting user selected file and [0] means if user selects multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); // Calling function
});

// If user drags file over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // Preventing default behavior
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// If user leaves dragged file from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

// If user drops file on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); // Preventing default behavior
    // Getting user selected file and [0] means if user selects multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); // Calling function
});

function showFile() {
    let fileType = file.name.split('.').pop(); // Getting file extension
    if (fileType === 'exe') { // If user selected file is an exe file
        let fileReader = new FileReader(); // Creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; // Passing user file source in fileURL variable
            let exeTag = `<p>${file.name}</p>`; // Creating a p tag and passing user selected file name inside
            dropArea.innerHTML = exeTag; // Adding that created p tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Please select a .exe file!"); // Alerting user to select a .exe file
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}

// glowing
document.addEventListener('DOMContentLoaded', function () {
    var homeSection = document.getElementById('first');
    var productSection = document.getElementById('second');
    var homeButton = document.getElementById('homeButton');
    var productButton = document.getElementById('productButton');
    var activeButton = null;

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && rect.bottom >= 0
        );
    }

    function toggleGlowing(button, section) {
        if (isElementInViewport(section)) {
            if (activeButton && activeButton !== button) {
                activeButton.classList.remove('glowing');
            }
            button.classList.add('glowing');
            activeButton = button;
        }
    }

    homeButton.addEventListener('click', function () {
        if (activeButton !== homeButton) {
            if (activeButton) {
                activeButton.classList.remove('glowing');
            }
            homeButton.classList.add('glowing');
            activeButton = homeButton;
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    productButton.addEventListener('click', function () {
        if (activeButton !== productButton) {
            if (activeButton) {
                activeButton.classList.remove('glowing');
            }
            productButton.classList.add('glowing');
            activeButton = productButton;
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', function () {
        if (isElementInViewport(homeSection)) {
            toggleGlowing(homeButton, homeSection);
        } else if (isElementInViewport(productSection)) {
            toggleGlowing(productButton, productSection);
        } else if (activeButton) {
            activeButton.classList.remove('glowing');
            activeButton = null;
        }
    });
});
