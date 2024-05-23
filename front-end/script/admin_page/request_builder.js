/*
<tr class="request-box">
<td class="request-date">2024-05-23</td>
<td class="request-bearer"></td>
<td class="request-user">Anakalin</td>
<td class="request-accept"></td>
<td class="request-deny"></td>
</tr>

CREATE TABLE "Request" (
	"id"	INTEGER NOT NULL UNIQUE,
	"receipt"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("receipt") REFERENCES "Roster"("id")
)
*/
var table = getDiv('request-table');
socket.emit('requestRequestsData');

socket.on('buildTable', (data) => {
    console.log(data);
    buildTable(data);
    
});


function buildTable(data) {
    const currentDate = new Date();

    // Get the day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const year = currentDate.getFullYear();

    // Format the date in dd/mm/yyyy format
    const today = `${day}/${month}/${year}`;

    for (let i = 0; i < data.length; i++) {
        //Create the row and cells
        var requestBox = document.createElement("tr");
        var requestDate = document.createElement("td");
        var requestBearer = document.createElement("td");
        var requestUser = document.createElement("td");
        var requestValidity = document.createElement("td");

        //Add style
        requestBox.classList.add("request-box");
        requestDate.classList.add("request-date");
        requestBearer.classList.add("request-bearer");
        requestUser.classList.add("request-user");

        if (isValid(data[i]['buydate'],today)) {
            requestValidity.classList.add("request-valid");   
            requestValidity.addEventListener('click', () => {
                window.alert("valid");
            });
        } else {
            requestValidity.classList.add("request-invalid");
            requestValidity.addEventListener('click', () => {
                window.alert("not valid");
            });
        }
        

        //Add id for interaction

        //Insert values
        requestDate.innerHTML = data[i]['buydate'];
        requestBearer.innerHTML = data[i]['char'];
        requestUser.innerHTML = data[i]['player'];

        //Append to each cell to row, then table
        requestBox.appendChild(requestUser);
        requestBox.appendChild(requestBearer);
        requestBox.appendChild(requestDate);
        requestBox.appendChild(requestValidity);
        
        table.appendChild(requestBox);    
    }
}

function isValid(date, today) {
    var dateRegex = /\d+/g;
    var date1Array = date.match(dateRegex);
    var date2Array = today.match(dateRegex);

    // calculate month difference by converting doing calcs in milliseconds and then converting them into months (31 to include 30)
    // -1 to months because Date for "reasons" saves month and days in different ways
    var startDate = new Date(date1Array[0], date1Array[1]-1, date1Array[2]);
    var endDate = new Date(date2Array[2], date2Array[1]-1, date2Array[0]);
    var diffResult = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    var months = Math.floor(diffResult / 31);
    return months == 0;
}