let highestMarks = 0;
let topperName = "";

function addStudent() {

    let name = document.getElementById("name").value;
    let phy = Number(document.getElementById("phy").value);
    let chem = Number(document.getElementById("chem").value);
    let math = Number(document.getElementById("math").value);
    let bio = Number(document.getElementById("bio").value);

    let total = phy + chem + math + bio;
    let percentage = total / 4;

    let table = document.getElementById("resultTable");

    table.innerHTML += `
    <tr>
        <td>${name}</td>
        <td>${phy}</td>
        <td>${chem}</td>
        <td>${math}</td>
        <td>${bio}</td>
        <td>${total}</td>
        <td>${percentage.toFixed(2)}%</td>
    </tr>
    `;

    if (total > highestMarks) {
        highestMarks = total;
        topperName = name;
    }

    document.getElementById("topper").innerHTML =
        "Topper : " + topperName + " (" + highestMarks + " Marks)";

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("phy").value = "";
    document.getElementById("chem").value = "";
    document.getElementById("math").value = "";
    document.getElementById("bio").value = "";
}