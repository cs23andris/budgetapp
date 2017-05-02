//Balances
var accountBalance = 200000;
var cashBalance = 15000;
var creditCardBalance = 30000;


//Categories
var incomeCategories = [
    "Jövedelem",
    "Ajándék",
    "Egyéb"
]

var expenseCategories = [
    "Élelmiszer",
    "Szórakozás",
    "Drogéria",
    "Közlekedés",
    "Ajándék",
    "Rezsi"
]

//Today's date
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;


//Execute on load
$(document).ready(function() {       
    //Setting default date value
    $("#dateInput").attr("value", today);
    $("#accountBalance").text(accountBalance);
    $("#cashBalance").text(cashBalance);
    $("#creditCardBalance").text(creditCardBalance);
});

//TODO
//Category selection
$("select[name='type']").change(function() {
    //Bevétel categories
    if ($("select[name='type']").val() === "Bevétel") {
        $("select[name='category']").empty();
        var optionsAsString = "";
        for(var i = 0; i < incomeCategories.length; i++) {
            optionsAsString += "<option value='" + incomeCategories[i] + "'>" + incomeCategories[i] + "</option>";
        }
        $("select[name='category']").attr("disabled", false);
        $("select[name='asset']").attr("disabled", false);
        $("select[name='category']").append(optionsAsString);
    }
    else if ($("select[name='type']").val() === "Kiadás") {
        $("select[name='category']").empty();
        var optionsAsString = "";
        for(var i = 0; i < expenseCategories.length; i++) {
            optionsAsString += "<option value='" + expenseCategories[i] + "'>" + expenseCategories[i] + "</option>";
        }
        $("select[name='category']").attr("disabled", false);
        $("select[name='asset']").attr("disabled", false);
        $("select[name='category']").append(optionsAsString);
    }
    //Pénzfelvétel
    else {
        console.log("ATM");
        $("select[name='category']").attr("disabled", true);
        $("select[name='asset']").attr("disabled", true);
    }
})    


//Deleting record
$("table").on("click", ".delete",  function(){
    $(this).parent().parent().fadeOut(500, function(){
        $(this).remove();
    });
})

//TODO
//Editing record
$("table").on("click", ".edit",  function(){
    $("tr").prop('contenteditable', true); 
})

//Submitting record
$(".submit").on("click", function(){
    console.log("Submitted");
    var formData = $("form").serializeArray();
    console.log($("form").serializeArray());
    
    var item        = new Object();
    item.date       = formData[0].value;
    item.amount     = formData[1].value;
    item.type       = formData[2].value;
    item.asset		= formData[3].value;
    item.category   = formData[4].value;
    
    $(".table")
       .append("<tr scope='row'><td>" + item.date +   "</td><td>" + item.amount + "</td><td>" + item.type +   "</td><td>" + item.asset +   "</td><td>" + item.category + "</td><td><span class='action delete'><i class='fa fa-trash' aria-hidden='true'></i></span> <span class='action edit'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></span></td></tr>");
    
    $("input[type='date']").val("");
    $("input[type='number']").val("");
    $("#dateInput").val(today);
})

