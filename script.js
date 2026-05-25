// Add Task

function getAndUpdate() {

    let tit = document.getElementById("title").value.trim();

    let desc = document.getElementById("description").value.trim();

    if (tit === "" || desc === "") {

        alert("Please fill all fields!");

        return;

    }

    let itemJsonArray =
        JSON.parse(localStorage.getItem("itemsJson")) || [];

    itemJsonArray.push({

        title: tit,
        desc: desc,
        completed: false

    });

    localStorage.setItem(
        "itemsJson",
        JSON.stringify(itemJsonArray)
    );

    document.getElementById("title").value = "";

    document.getElementById("description").value = "";

    update();

}

// Update Table

function update() {

    let itemJsonArray =
        JSON.parse(localStorage.getItem("itemsJson")) || [];

    let tableBody = document.getElementById("tableBody");

    let str = "";

    itemJsonArray.forEach((element, index) => {

        str += `

        <tr>

            <th scope="row">
                ${index + 1}
            </th>

            <td>
                ${element.title}
            </td>

            <td>
                ${element.desc}
            </td>

            <td>

                ${
                    element.completed

                    ? '<span class="badge badge-success">Completed</span>'

                    : '<span class="badge badge-warning">Pending</span>'
                }

            </td>

            <td>

                <button
                    class="btn btn-success btn-sm"
                    onclick="toggleComplete(${index})">

                    ✓

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleted(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    tableBody.innerHTML = str;

}

// Add Button Event

document.getElementById("add")
.addEventListener("click", getAndUpdate);

// Enter Key Support

document.getElementById("title")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        getAndUpdate();

    }

});

// Delete Task

function deleted(itemIndex) {

    if (!confirm("Delete this task?")) {

        return;

    }

    let itemJsonArray =
        JSON.parse(localStorage.getItem("itemsJson"));

    itemJsonArray.splice(itemIndex, 1);

    localStorage.setItem(
        "itemsJson",
        JSON.stringify(itemJsonArray)
    );

    update();

}

// Toggle Complete

function toggleComplete(index) {

    let itemJsonArray =
        JSON.parse(localStorage.getItem("itemsJson"));

    itemJsonArray[index].completed =
        !itemJsonArray[index].completed;

    localStorage.setItem(
        "itemsJson",
        JSON.stringify(itemJsonArray)
    );

    update();

}

// Clear All Tasks

function clearStorage() {

    if (confirm("Do you really want to clear all tasks?")) {

        localStorage.clear();

        update();

    }

}

// Typed Animation

var typed = new Typed(".typing", {

    strings: [
        "Welcome To Your TODO List",
        "Manage Your Daily Tasks",
        "Stay Productive 🚀"
    ],

    typeSpeed: 70,
    backSpeed: 40,
    loop: true

});

// Initial Load

update();