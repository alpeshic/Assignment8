/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

var employee_list;

var addEmployee = function ()
{
    "use strict";
    var isFormValid = true;
    $("empNameError").innerHTML = "";
    $("empTitleError").innerHTML = "";
    $("empExtensionError").innerHTML = "";
    if($("empName").value.trim() === "")
    {
        isFormValid = false;
        $("empNameError").innerHTML = "Name is required";
    }
    if($("empTitle").value.trim() === "")
    {
        isFormValid = false;
        $("empTitleError").innerHTML = "Title is required";
    }
    if($("empExtension").value.trim() === "")
    {
        isFormValid = false;
        $("empExtensionError").innerHTML = "Extension is required";
    }
    if(isFormValid)
    {
        $("empNameError").innerHTML = "";
        $("empTitleError").innerHTML = "";
        $("empExtensionError").innerHTML = "";
        employee_list.push(new Array($("empName").value, $("empTitle").value, $("empExtension").value));
        createEmpTable(employee_list);
        $("empName").value = "";
        $("empTitle").value = "";
        $("empExtension").value = "";
    }
}

window.addEventListener("load", function () {
    "use strict";
    $("btnAddEmployee").addEventListener("click", addEmployee);
    employee_list = [["John Miller", "Software Developer", 2323],
                      ["Matt John", "Accountant", 2239],
                      ["Brown Rex", "Project Manager", 3699],
                      ["Mike hasell", "Solutions Architect", 1214],
                      ["Scott Hanselman", "Chief Financial Officer", 5499]];

    createEmpTable(employee_list);

 
});

function addDeleteEmpListener()
{
    var deleteEmpButton = window.document.getElementsByClassName("btnDeleteEmp");
    for (var i = 0; i < deleteEmpButton.length; i++) {
        deleteEmpButton[i].addEventListener('click', function(e) {
            e.preventDefault();
            var empName = e.target.parentElement.parentElement.getElementsByClassName("empName")[0].innerHTML;
            var empTitle = e.target.parentElement.parentElement.getElementsByClassName("empTitle")[0].innerHTML;
            var empExtension = e.target.parentElement.parentElement.getElementsByClassName("empExtension")[0].innerHTML;
            
            for( var i = 0; i < employee_list.length; i++) {
            
                if(employee_list[i][0] === empName && employee_list[i][1] === empTitle && employee_list[i][2] == empExtension)
                    {            
                        employee_list.splice(i,1);
                        createEmpTable(employee_list);
                        console.log(e.target.parentElement.parentElement.getElementsByClassName("empName")[0].innerHTML);
                        break;
                    }
            }
            //console.log(e.target.parentElement.parentElement.getElementsByClassName("empName")[0].innerHTML);
        }, false);
    }
}

function createEmpTable (employee_list){
    if(employee_list.length > 0){
        var html = "<h5>Showing " + employee_list.length + " Employess</h5>";
        html +="<table id='tblEmpList'><tr><td>Name</td><td>Title</td><td>Extension</td><td></td></tr></<tr>";
        for( var i = 0; i < employee_list.length; i++) {
            html += "<tr><td class='empName'>" + employee_list[i][0] + "</td>" ;
            html += "<td class='empTitle'>" + employee_list[i][1] + "</td>";
            html += "<td class= 'empExtension'>" + employee_list[i][2] + "</td>";
            html += "<td><input type='button' value='Delete' class='btnDeleteEmp'></td>";
            html += "</tr>";
            }
        html += "</table>";
        document.getElementById("dvEmployeeList").innerHTML =  html;
        addDeleteEmpListener();
    } else {
        document.getElementById("dvEmployeeList").innerHTML = "<h5>No Employees found.</h5>";
    }
}