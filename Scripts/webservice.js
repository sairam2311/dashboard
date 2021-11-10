$(document).ready(function () {
    debugger;
    Getdet();
    //var data = "hello";
    //$.get("http://tracgis.telangana.gov.in/agriculturepoints/WebService1.asmx/HelloWorld", function (response) {
    //    debugger;
    //    data = response;
    //    alert(data);
    //}).error(function () {
    //    alert("Sorry could not proceed");
    //});
    //var TextBox1 = $("#txt");
    //TextBox1.change(function (e) //calling Jquery function on Textbox change event  
    //{
    //    var Name = TextBox1.val(); //getting the value from text box  
    //    if (Name != -1) {
    //        Getdet(Name); //ing the Input parameter to javascript method Named Getdet from user with the help of text box by Name variable.  
    //    }
    //});
});

function Getdet() {
    debugger;
    $.ajax({
        type: "GET",
        url: "http://tracgis.telangana.gov.in/agriculturepoints/WebService1.asmx/HelloWorld", // add web service Name and web service Method Name
       // data: "{'Custname':'" + Name + "'}", //web Service method Parameter Name and ,user Input value which in Name Variable.  
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        crossDomain: true,
        success: function (response) {
           // $("#spnGetdet").html(response.d); //getting the Response from JSON  

            alert(response.d);
        },
        failure: function (msg) {
            alert(msg);
        }
            
    });
}