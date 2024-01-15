
    function readFile() {
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
    }
