

// プルダウンメニューの要素を取得
const courseSelect = document.getElementById('courseSelect');
const teacherSelect = document.getElementById('teacherSelect');
const facultySelect = document.getElementById('facultySelect');
const departmentSelect = document.getElementById('departmentSelect');

// 検索処理
function search() {
    const selectedCourse = courseSelect.value;
    const selectedTeacher = teacherSelect.value;
    const selectedFaculty = facultySelect.value;
    const selectedDepartment = departmentSelect.value;

    // CSVファイルの読み込み
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(data => {
            // CSVデータを配列に変換
            const csvRows = data.split('\n');
            const headers = csvRows[0].split(',');
            const resultArea = document.getElementById('resultArea');
            // 検索結果の表示エリアをクリア
            resultArea.innerHTML = '';

            // データ行の処理
            for (let i = 1; i < csvRows.length; i++) {
                const values = csvRows[i].split(',');
                const rowObject = {};

                // キーと値を結びつける
                for (let j = 0; j < headers.length; j++) {
                    rowObject[headers[j]] = values[j];
                }

                // 検索条件に合致する場合に結果を表示
                if (
                    (selectedCourse === '' || rowObject['授業名'] === selectedCourse) &&
                    (selectedTeacher === '' || rowObject['先生名'] === selectedTeacher) &&
                    (selectedFaculty === '' || rowObject['学部'] === selectedFaculty) &&
                    (selectedDepartment === '' || rowObject['学科'] === selectedDepartment)
                ) {
                    const resultItem = document.createElement('div');
                    resultItem.textContent = JSON.stringify(rowObject);
                    resultArea.appendChild(resultItem);
                }
            }
        })
        .catch(error => console.error('Error fetching CSV file:', error));
}

// プルダウンメニューのオプションを動的に生成するための関数
function populateDropdownOptions(columnIndex, selectElement) {
    // CSVファイルの読み込み
    fetch(csvFileUrl)
        .then(response => response.text())
        .then(data => {
            // CSVデータを配列に変換
            const csvRows = data.split('\n');
            const headers = csvRows[0].split(',');

            // 対象の列の値を収集
            const values = [];
            for (let i = 1; i < csvRows.length; i++) {
                const value = csvRows[i].split(',')[columnIndex];
                if (!values.includes(value)) {
                    values.push(value);
                }
            }

            // プルダウンメニューにオプションを追加
            values.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching CSV file:', error));
}

// プルダウンメニューのオプションを生成
populateDropdownOptions(0, courseSelect); // 0は「授業名」の列のインデックス
populateDropdownOptions(1, teacherSelect); // 1は「先生名」の列のインデックス
populateDropdownOptions(2, facultySelect); // 2は「学部」の列のインデックス
populateDropdownOptions(3, departmentSelect); // 3は「学科」の列のインデックス