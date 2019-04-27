var makeDate = function () {
    var d = new Date();
    var formattedDate = "";
//add +1 because js starts month array at 0 for January
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate += d.getFullYear();

    return formattedDate;

};

module.exports = makeDate;