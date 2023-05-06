function FirstToSecond(){
    const first = document.getElementById("list1");
    const second = document.getElementById("list2");
    const selectedItemFirstList = first.selectedIndex;
    const element = first[selectedItemFirstList];
    second.appendChild(element);
}

function SecondToFirst(){
    const first = document.getElementById("list1");
    const second = document.getElementById("list2");
    const selectedItemSecondList = second.selectedIndex;
    const element = second[selectedItemSecondList];
    first.appendChild(element);
}

