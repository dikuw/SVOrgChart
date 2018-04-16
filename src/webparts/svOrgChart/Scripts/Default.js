var myID;
/*  
$(function () {

    getFormDigest;

    getDepartments("personDepartment", "Select a Department");
    getPersons("personSup", "Select a Person");

    (async () => {
        await getDepartments("filterDepartments", "Select a Department");
        await getPersons("filterPersons", "Select a Person");
        genList();
    })()

    
    $(document).on("change", "#filterDepartments", function () {
        let output = "<option value='0' selected='selected'>Select a Person</option>";
        let myRoot = "0";

        if ($("#filterDepartments").val() != "0") {
            let myFilteredPeople = myPeople.filter((el) => (el[2] == $("#filterDepartments").val()));

            if (myFilteredPeople.length === 0) {
                output = `<option value='0' selected='selected'>None </option>`;
            } else {
                for (var i = 0; i < myFilteredPeople.length; i++) {
                    output += `<option value='${myFilteredPeople[i][0]}'>${myFilteredPeople[i][1]}</option>`;
                };

                $(`#filterPersons`).html(output);
                $("#filterPersons").val(getDeptRootID($("#filterDepartments").val()));

                myRoot = getPersonParentID(getDeptRootID($("#filterDepartments").val()));

            }
        } else {

            for (var i = 0; i < myPeople.length; i++) {
                output += `<option value='${myPeople[i][0]}'>${myPeople[i][1]}</option>`;
            };

            $(`#filterPersons`).html(output);
        }

        $(".jOrgChart").remove();
        genList(myRoot);
        
    });

    $(document).on("change", "#filterPersons", function () {
        if ($("#filterPersons").val() != "0") {
            $(".jOrgChart").remove();
            genList(getPersonParentID($("#filterPersons").val()));
        }
    });

    $("#chart").on("click", ".fa-plus-circle", function (e) {

        initPersons();

        openNewPersonDialog()

        $("#personSup").val(parseInt(this.dataset.id));
        $("#personDepartment").val(parseInt(this.dataset.dept));

    }); //   $("#chart").on("click", ".fa-plus-circle"

    $("#chart").on("click", ".fa-envelope-o", function (e) {
        window.location.href = 'mailto:' + this.dataset.email;
    }); //   $("#chart").on("click", ".fa-envelope-o"

    $("#chart").on("click", ".fa-phone", function (e) {
        window.location.href = 'tel:' + this.dataset.phone;
    }); //   $("#chart").on("click", ".fa-phone"

    $("#chart").on("click", ".fa-mobile", function (e) {
        window.location.href = 'tel:' + this.dataset.mobile;
    }); //   $("#chart").on("click", ".fa-mobile"

    $("#chart").on("click", ".fa-arrows-v", function (e) {
        var $this = $(this);
        var $tr = $this.closest("tr");

        if ($tr.hasClass('contracted')) {
            $tr.removeClass('contracted').addClass('expanded');
            $tr.nextAll("tr").css('visibility', '');
        } else {
            $tr.removeClass('expanded').addClass('contracted');
            $tr.nextAll("tr").css('visibility', 'hidden');
        }
    }); //  $("#chart").on("click", ".fa-arrows-v"

    $("#chart").on("click", ".fa-ellipsis-h", function (e) {
        myID = this.dataset.id;
        $(".context")
            .toggle()
            .css({
                top: e.pageY,
                left: e.pageX
            });
    }); //   $("#chart").on("click", ".fa-ellipsis-h"

    $("#contextMenu").on("click", ".inner_item", function (e) {
        $(".context").hide();
        switch (this.innerText) {
            case "Delete":
                if (confirm("Are you sure you want to delete " + getPersonName(myID) + "?")) {
                    document.getElementById("overlay").style.display = "block";
                    deletePerson(myID);
                }
                break;
            case "Edit":

                myPeopleArray.forEach(function (item) {
                    if (item.ID == myID) {
                        $('#personName').val(item.Name);
                        $('#personTitle').val(item.Title);
                        $('#personDepartment').val(parseInt(item.Department));
                        $('#personPhone').val(item.Phone);
                        $('#personMobile').val(item.Mobile);
                        $('#personEmail').val(item.Email);
                        $('#personSup').val(parseInt(item.Parent));
                        $('#personPic > a').attr("href", item.Picture);
                        $('#personPic > a > img').attr("src", item.Picture);
                    }
                });

                $("#Dialog--Person").dialog({
                    width: 350,
                    title: "Edit Person",
                    autoOpen: false,
                    resizable: false,
                    modal: true,
                    buttons: {
                        "Update": function () {
                            if (checkPersonFormValidation()) {
                                document.getElementById("overlay").style.display = "block";
                                if ($('#personPhoto').val()) {
                                    uploadFile(myFormDigest, '#personPhoto', $("#personPhoto").val().replace(/^.*[\\\/]/, ''), "Edit");
                                } else {
                                    UpdatePerson(myID);
                                }
                            }
                        }
                    }
                }); //  $("#Dialog--Person").dialog

                $("#Dialog--Person").dialog("open");

                break;
            default:
            //	do nothing
        }
    }); //   $("#contextMenu").on("click"

    const newPersonButton = document.querySelector('#newPerson');
    const newPhotoButton = document.querySelector('#newPhoto');
    const helpButton = document.querySelector('#help');
    const listButton = document.querySelector('#list');
    const settingsButton = document.querySelector('#settings');

    newPersonButton.addEventListener('click', openNewPersonDialog);
    newPhotoButton.addEventListener('click', openNewPhotoDialog);
    helpButton.addEventListener('click', openHelpDialog);
    listButton.addEventListener('click', openListDialog);
    settingsButton.addEventListener('click', openSettingsDialog);

});
*/
function openNewPersonDialog() {

    initPersons();

    $("#Dialog--Person").dialog({
        width: 350,
        title: "Add New Person",
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Add": function () {
                if (checkPersonFormValidation()) {
                    document.getElementById("overlay").style.display = "block";
                    if ($('#personPhoto').val()) {
                        uploadFile(myFormDigest, '#personPhoto', $("#personPhoto").val().replace(/^.*[\\\/]/, ''), "Add");
                    } else {
                        addNewPerson();
                    }
                }
            }
        }
    }); //  $("#Dialog--Person").dialog

    $("#Dialog--Person").dialog("open");

}   //  openNewPersonDialog

function openNewPhotoDialog() {
    window.location.href = myURL + "OrgChart/Lists/Pictures";
}   //  openNewPhotoDialog
    
function openHelpDialog() {
    $("#Dialog--help").dialog({
        minWidth: 650
    });
}   //  openHelpDialog

function openListDialog() {

    window.location.href = myURL + "OrgChart/Lists/Persons";
    
}

function openSettingsDialog() {
    $("#Dialog--settings").dialog();
}   //  openSettingsDialog

function genList(myRoot) {
    let maxLevel = 6;   //  this will be a user setting <-- need to add code to stop a x levels of recursion
    if (!myRoot) { myRoot = 0;}
    //let myRoot = 0;     //  this will be a user setting

    let myArray = getNestedChildren(myPeopleArray, myRoot);

    if ($("#filterPersons").val() != "0") {
        myArray = myArray.filter(function (item) {
            return item.ID == $("#filterPersons").val();
        });
    } 

    function getList(arr, parent) {
        var myHTML = '<ul>';
        for (var x in arr) {

            if (arr[x].Parent == parent) {
                myHTML += '<li>' + `
                    <div class="card">
	                    <div class="attributes">
		                    <div>${arr[x].Name}</div>
		                    <div>${arr[x].Title}</div>
		                    <div>${getDepartmentName(arr[x].Department)}</div>
	                    </div>
	                    <div class="photo">
		                    <div><img src=${arr[x].Picture} /></div>
	                    </div>
	                    <div class="cardFooter">
		                    <i class="fa fa-plus-circle" data-id="${arr[x].ID}" data-dept="${arr[x].Department}" title="Add new underneath"></i>
		                    <i class="fa fa-envelope-o" data-email="${arr[x].Email}" title="Email: ${arr[x].Email}"></i>
		                    <i class="fa fa-phone" data-phone="${arr[x].Phone}" title="Call: ${arr[x].Phone}"></i>
		                    <i class="fa fa-mobile" data-mobile="${arr[x].Mobile}" title="Call: ${arr[x].Mobile}"></i>
		                    <i class="fa fa-arrows-v" title="Expand/Collapse children"></i>
		                    <i class="fa fa-ellipsis-h" data-id="${arr[x].ID}" title="Open context menu"></i>
	                    </div>
	                </div>
                        `;
                if (arr[x].children) {
                    myHTML += getList(arr[x].children, arr[x].ID);
                }
                myHTML += '</li>';
            }
        }
        return myHTML + '</ul>';
    }

    myHTML = getList(myArray, myRoot);
    myHTML = myHTML.slice(4);
    myHTML = myHTML.slice(0, myHTML.length - 5);
    $("#org").html(myHTML);
    $("#org").jOrgChart({ chartElement: '#chart', dragAndDrop: false });

}   //  genList

function getNestedChildren(arr, parent) {
    var out = [];
    arr.forEach(function (item) {
        if (item.Parent == parent) {
            var children = getNestedChildren(arr, item.ID);

            if (children.length) {
                item.children = children;
            }
            out.push(item);
        }
    });
    return out
} //    getNestedChildren

function initPersons() {

    $('#personName').val('');
    $('#personTitle').val('');
    $('#personDepartment').val('0');
    $('#personPhone').val('');
    $('#personMobile').val('');
    $('#personEmail').val('');
    $('#personSup').val('0');
    $('#personPic > a').attr("href", "");
    $('#personPic > a > img').attr("src", myURL + "OrgChart/Content/NoImage.png");
    $('#personPhoto').val('');

}   //  initPersons

function checkPersonFormValidation() {
    if (!$('#personTitle').val() || $('#personTitle').val() == 0) {
        alert("Please enter a title and try again.");
        return false;
    }
    if (!$('#personDepartment').val() || $('#personDepartment').val() == 0) {
        alert("Please select a department and try again.");
        return false;
    }
    return true;
}   //  checkPersonsFormValidation

function addNewPerson() {
    var endpointUrl = myURL + "OrgChart/_api/web/lists/getbytitle('Persons')/items";
    var myPicURL = $("#personPhoto").val();

    if (!myPicURL) {
        myPicURL = myURL + "OrgChart/Content/NoImage.png";  //  make this a user setting? 
    } else {
        myPicURL = myURL + "OrgChart/Lists/Pictures/" + $("#personPhoto").val().replace(/^.*[\\\/]/, '');
    }

    call;

    var call = $.ajax({
        url: endpointUrl,
        type: "POST",
        data: JSON.stringify({
            "__metadata": { type: "SP.Data.PersonsListItem" },
            FullName1: $('#personName').val(),
            Title: $('#personTitle').val(),
            Department1Id: parseInt($('#personDepartment').val()),
            OfficePhone: $('#personPhone').val(),
            MobilePhone1: $('#personMobile').val(),
            Email: $('#personEmail').val(),
            ParentId: parseInt($('#personSup').val()),
            Photo: { Url: myPicURL }
        }),
        headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": myFormDigest
        }
    });

    call.done(function (data, textStatus, jqXHR) {
        (async () => {
            await getPersons("personSup", "Select a Person");
            await getPersons("filterPersons", "Select a Person");
            $(".jOrgChart").remove();
            genList();
            document.getElementById("overlay").style.display = "none";
            alert("Item added successfully.");
            $("#Dialog--Person").dialog("close");
            initPersons();
        })()
    });

    call.fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById("overlay").style.display = "none";
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        console.log(message);
        alert("Error: " + message);
    });

}   //  addNewPerson

function UpdatePerson(myID) {
    var endpointUrl = myURL + "OrgChart/_api/web/lists/getbytitle('Persons')/items(" + myID + ")";
    var myData = {
        "__metadata": { type: "SP.Data.PersonsListItem" },
        FullName1: $('#personName').val(),
        Title: $('#personTitle').val(),
        Department1Id: parseInt($('#personDepartment').val()),
        OfficePhone: $('#personPhone').val(),
        MobilePhone1: $('#personMobile').val(),
        Email: $('#personEmail').val(),
        ParentId: parseInt($('#personSup').val())
    }

    if ($("#personPhoto").val()) {
        myData.Photo = { Url: myURL + "OrgChart/Lists/Pictures/" + $("#personPhoto").val().replace(/^.*[\\\/]/, '') };
    }

    call;

    var call = $.ajax({
        url: endpointUrl,
        type: "POST",
        data: JSON.stringify(myData),
        headers: {
            "X-RequestDigest": myFormDigest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
        }
    });

    call.done(function (data, textStatus, jqXHR) {
        (async () => {
            await getPersons("personSup", "Select a Person");
            await getPersons("filterPersons", "Select a Person");
            $(".jOrgChart").remove();
            genList();
            document.getElementById("overlay").style.display = "none";
            alert("Item updated successfully.");
            $("#Dialog--Person").dialog("close");
            initPersons();
        })()
    });

    call.fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById("overlay").style.display = "none";
        var response = JSON.parse(jqXHR.responseText);
        var message = response ? response.error.message.value : textStatus;
        console.log(message);
        alert("Error: " + message);
    });
}

function deletePerson(myID) {
    var endpointUrl = myURL + "OrgChart/_api/web/lists/getbytitle('Persons')/items(" + myID + ")";

    $.ajax({
        url: endpointUrl,
        type: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": myFormDigest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            (async () => {
                await getPersons("personSup", "Select a Person");
                await getPersons("filterPersons", "Select a Person");
                $(".jOrgChart").remove();
                genList();
                document.getElementById("overlay").style.display = "none";
                alert("Item deleted successfully.");
            })()
        },
        failure: function (data) {
            document.getElementById("overlay").style.display = "none";
            var response = JSON.parse(jqXHR.responseText);
            var message = response ? response.error.message.value : textStatus;
            console.log(message);
            alert("Error: " + message);
        }
    });
}   //  deletePerson

function uploadFile(FormDigest, FileInput, fileName, opType) {
    var serverRelativeUrlToFolder = 'Lists/Pictures';
    var fileInput = jQuery(FileInput);

    var serverUrl = myURL + "OrgChart";

    var getFile = getFileBuffer();

    getFile.done(function (arrayBuffer) {

        var addFile = addFileToFolder(arrayBuffer);
    });

    getFile.fail(onError);

    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }   //  getFileBuffer

    function addFileToFolder(arrayBuffer) {

        var fileCollectionEndpoint = String.format(
            "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
            "/add(overwrite=true, url='{2}')",
            serverUrl, serverRelativeUrlToFolder, fileName);

        resize(function (dataurl) {

            dataurl = dataurl.substring(dataurl.indexOf(',') + 1);
            var buffer = _base64ToArrayBuffer(dataurl);
            return jQuery.ajax({
                url: fileCollectionEndpoint,
                type: "POST",
                data: buffer,
                processData: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": FormDigest,
                    "content-length": buffer.byteLength
                },
                success: function (data) {
                    if (opType == "Add") {
                        addNewPerson();
                    } else {
                        UpdatePerson(myID);
                    }
                    
                }
            });

        });

    }   //  addFileToFolder

    function resize(callback) {
        var file = $("#personPhoto")[0].files[0];
        var dataURL = "x";
        var reader = new FileReader();
        reader.onloadend = function () {

            var tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function () {

                var MAX_WIDTH = 50;
                var MAX_HEIGHT = 50;
                var tempW = tempImg.width;
                var tempH = tempImg.height;
                if (tempW > tempH) {
                    if (tempW > MAX_WIDTH) {
                        tempH *= MAX_WIDTH / tempW;
                        tempW = MAX_WIDTH;
                    }
                } else {
                    if (tempH > MAX_HEIGHT) {
                        tempW *= MAX_HEIGHT / tempH;
                        tempH = MAX_HEIGHT;
                    }
                }

                var canvas = document.createElement('canvas');
                canvas.width = tempW;
                canvas.height = tempH;
                var ctx = canvas.getContext("2d");
                if (document.documentElement.clientWidth < 674) {
                    canvas.width = tempH;
                    canvas.height = tempW;
                    var ctx = canvas.getContext("2d");
                    ctx.translate(tempH, 0);
                    ctx.rotate(90 * Math.PI / 180);
                }
                ctx.drawImage(this, 0, 0, tempW, tempH);
                dataURL = canvas.toDataURL("image/jpeg");
                callback(dataURL);
            };

        };
        reader.readAsDataURL(file);

        return dataURL;
    }

    function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function onError(error) {
        alert(error.responseText);
    }   //  onError

}   //  uploadFile
