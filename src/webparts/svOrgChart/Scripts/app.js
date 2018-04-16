async function getPersons(el, allText, filter) {
    return new Promise(function (resolve) {
        getJson(myURL + "OrgChart/_api/web/lists/getbytitle('Persons')/items", function (data) {
            myPeople = data.d.results.map(Person => [`${Person.Id}`, `${Person.FullName1}`, `${Person.Department1Id}`]);
            myPeopleArray = data.d.results.map(Person => ({
                "ID": `${Person.Id}`,
                "Name": `${Person.FullName1}`,
                "Title": `${Person.Title}`,
                "Department": `${Person.Department1Id}`,
                "Picture": `${Person.Photo.Url}`,
                "Email": `${Person.Email}`,
                "Phone": `${Person.OfficePhone}`,
                "Mobile": `${Person.MobilePhone1}`,
                "Parent": (Person.ParentId) ? `${Person.ParentId}` : "0"
            }));
            var output = `<option value='0' selected='selected'>${allText}</option>`;

            for (var i = 0; i < myPeople.length; i++) {
                if (`${myPeople[i][2]}` == filter || !filter) {
                    output += `<option value='${myPeople[i][0]}'>${myPeople[i][1]}</option>`;
                }
            };

            if (output == `<option value='0' selected='selected'>${allText}</option>`) { output += `<option value='0' selected='selected'>None</option>`;}

            $(`#${el}`).html(output);
            resolve();

        }, logError);
    });
}   //  getPersons

async function getDepartments(el, allText, filter) {
    return new Promise(function (resolve) {
        getJson(myURL + "OrgChart/_api/web/lists/getbytitle('Departments')/items", function (data) {
            myDepartments = data.d.results.map(Department => [`${Department.Id}`, `${Department.Title}`]);
            var output = `<option value='0' selected='selected'>${allText}</option>`;

            for (var i = 0; i < myDepartments.length; i++) {
                if (`${myDepartments[i][2]}` == filter || !filter) {
                    output += `<option value='${myDepartments[i][0]}'>${myDepartments[i][1]}</option>`;
                }
            };

            $(`#${el}`).html(output);
            resolve();

        }, logError);
    });
}   //  getDepartments

function getDepartmentName(deptID) {
    for (var i = 0; i < myDepartments.length; i++) {
        if (myDepartments[i][0] == deptID) { return myDepartments[i][1]; }
    }
}   //  getDepartmentName

function getPersonName(personID) {
    for (var i = 0; i < myPeople.length; i++) {
        if (myPeople[i][0] == personID) { return myPeople[i][1]; }
    }
}   //  getPersonName

function getPersonParentID(personID) {
    var obj = myPeopleArray.find(function (obj) { return obj.ID == personID; });
    return obj.Parent;
}   //  getPersonParentID

function getDeptRootID(deptID) {
    var obj = myPeopleArray.filter((obj) => obj.Department == deptID);
    if (obj.length == 1) {
        return obj[0].ID;
    } else {
        for (let i = 0; i < obj.length; i++) {
            if (myPeopleArray.filter((el) => el.ID == obj[i].Parent)[0].Department != deptID) {
                return obj[i].ID;
            }
        }
    }
}   //  getDeptRootID

function getPersonDept(personID) {
    var obj = myPeopleArray.filter(function (obj) { return obj.ID == personID; });
    return obj.Department
}

function getJson(endpointUrl, success, failure) {
    $.ajax({
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        url: endpointUrl,
        success: success,
        failure: failure
    });
}   //  getJson

function logError(error) {
    console.log(JSON.stringify(error));
}   //  logError

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}  // String.format