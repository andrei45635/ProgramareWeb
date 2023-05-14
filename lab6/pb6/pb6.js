function updateHTML(data) {
    let tableRow = $('<tr>');
    tableRow.append($('<th>').text('Producator'));
    tableRow.append($('<th>').text('CPU'));
    tableRow.append($('<th>').text('Memorie'));
    tableRow.append($('<th>').text('CapacitateHDD'));
    tableRow.append($('<th>').text('GPU'));
    $('#resultTable').append(tableRow);

    for (let i = 0; i < data.length; i++) {
        tableRow = $("<tr>");
        tableRow.append($("<td>").text(data[i].producator));
        tableRow.append($("<td>").text(data[i].cpu));
        tableRow.append($("<td>").text(data[i].memorie));
        tableRow.append($("<td>").text(data[i].capacitateHdd));
        tableRow.append($("<td>").text(data[i].gpu));
        $("#resultTable").append(tableRow);
    }
}

function getFromServer(){
    let items = getSelectedItems();
    console.log(items);
    $.ajax({
        type: "GET",
        url: "http://localhost/pb6.php",
        data: {items: getSelectedItems()},
        success: function (data) {
            $('#resultTable').empty();
            const parsedData = $.parseJSON(data);
            console.log(parsedData);
            updateHTML(parsedData);
        }
    });
}

function getSelectedItems(){
    let selectedItems = [];
    selectedItems.push($('#prod option:selected').text());
    selectedItems.push($('#cpu option:selected').text());
    selectedItems.push($('#mem option:selected').text());
    selectedItems.push($('#hdd option:selected').text());
    selectedItems.push($('#gpu option:selected').text());
    return selectedItems;
}