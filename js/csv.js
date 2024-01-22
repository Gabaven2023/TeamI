
    /*function readFile() {
        var fileInput = document.getElementById('fileInput');
        var csvTable = document.getElementById('csvTable');

        var file = fileInput.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var csvData = e.target.result;
                displayCSV(csvData);
            };

            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        }
    }

    function displayCSV(csvData) {
        // CSVデータを改行で分割
        var rows = csvData.split("\n");

        // 行ごとにループして表に追加
        var table = document.getElementById("csvTable");
        table.innerHTML = '';

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(",");
            var row = table.insertRow(-1);
            for (var j = 0; j < cells.length; j++) {
                if(j == 1 || j == 3 || j == 4 || j == 5 || j==7|| j== 8||j==9||j==10||j==11){
                var cell = row.insertCell(-1);
                cell.innerHTML = cells[j];
            }}
        }
    }*/
    function readFile() {
        var fileInput = document.getElementById('fileInput');
        var csvTable = document.getElementById('cardsContainer');

        var file = fileInput.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var csvData = e.target.result;
                displayCSV(csvData);
                populateDropdownOptions(2, document.getElementById('facultySelect'));
            };

            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        }
    }

    function displayCSV(csvData) {
        var rows = csvData.split("\n");
        var cardsContainer = document.getElementById("cardsContainer");
        cardsContainer.innerHTML = '';

        var headers = rows[0].split(","); // ヘッダーの取得

        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].split(",");
            var card = document.createElement('div');
            card.className = 'card';

            var cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            for (var j = 0; j < cells.length; j++) {
                var cardText = document.createElement('p');
                cardText.className = 'card-text';

                // ヘッダーとセルの内容を結びつける
                cardText.innerHTML = headers[j] + ': ' + cells[j];
                
                cardBody.appendChild(cardText);
            }

            card.appendChild(cardBody);
            cardsContainer.appendChild(card);
        }
    }

    function applyFilter() {
        var facultySelect = document.getElementById('facultySelect');
        var courseNameInput = document.getElementById('courseName');
        var teacherNameInput = document.getElementById('teacherName');

        var selectedFaculty = facultySelect.value.toLowerCase();
        var selectedCourseName = courseNameInput.value.toLowerCase();
        var selectedTeacherName = teacherNameInput.value.toLowerCase();

        var cardsContainer = document.getElementById("cardsContainer");
        var cards = cardsContainer.getElementsByClassName('card');

        for (var i = 0; i < cards.length; i++) {
            var faculty = cards[i].getElementsByTagName('p')[2].innerText.toLowerCase();
            var courseName = cards[i].getElementsByTagName('p')[3].innerText.toLowerCase();
            var teacherName = cards[i].getElementsByTagName('p')[4].innerText.toLowerCase();

            var facultyMatch = selectedFaculty === '' || faculty.includes(selectedFaculty);
            var courseNameMatch = courseName.includes(selectedCourseName);
            var teacherNameMatch = teacherName.includes(selectedTeacherName);

            if (facultyMatch && courseNameMatch && teacherNameMatch) {
                cards[i].style.display = ''; // フィルタに合致する場合は表示
            } else {
                cards[i].style.display = 'none'; // フィルタに合致しない場合は非表示
            }
        }
    }

    function populateDropdownOptions(columnIndex, selectElement) {
        var cardsContainer = document.getElementById("cardsContainer");
        var cards = cardsContainer.getElementsByClassName('card');
        var values = [];

        for (var i = 0; i < cards.length; i++) {
            var cardText = cards[i].getElementsByTagName('p')[columnIndex];
            var value = cardText ? cardText.innerText.toLowerCase() : '';
            if (!values.includes(value)) {
                values.push(value);
            }
        }

        selectElement.innerHTML = '<option value="">All</option>';
        values.forEach(value => {
            var option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            selectElement.appendChild(option);
        });
    }

