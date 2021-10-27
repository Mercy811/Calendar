function todayRed(){
    const currentDate = new Date().toISOString().split('T')[0];
    currentCell = document.getElementById(currentDate);
    currentCell.style.backgroundColor = "#d9ff2b";
}