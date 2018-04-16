import { Version } from "@microsoft/sp-core-library";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import {
  SPHttpClient,
  SPHttpClientResponse
} from "@microsoft/sp-http";

import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from "SvOrgChartWebPartStrings";

import MyDefaultTemplate from "./DefaultTemplate";

import styles from "./SvOrgChartWebPart.module.scss";

import * as jQuery from "jquery";
import "jqueryui";

export interface ISvOrgChartWebPartProps {
  description: string;
}

//  declare ISPDepartmentList as object with key/value pair "value" = an array of ISPDepartmentItems
interface ISPDepartmentList {
  value: ISPDepartmentItem[];
}

//  declare ISPPersonList as object with key/value pair "value" = an array of ISPPersonItems
interface ISPPersonList {
  value: ISPPersonItem[];
}

//  declare ISPDepartmentItem as an object
interface ISPDepartmentItem {
  Title: string;
  Id: number;
}

//  declare ISPPersonItem as an object
interface ISPPersonItem {
  Title: string;
  Id: number;
  FullName: string;
  FirstName: string;
  LastName: string;
  DepartmentId: number;
  Photo: object;
  Url: string;
  Email: string;
  OfficePhone: string;
  MobilePhone: string;
  ParentId: number;
}

interface IPersonItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Title: string;
  Department: number;
  Email: string;
  Phone: string;
  Mobile: string;
  Picture: object;
  Parent: number;
  Children: object;
}

//  declare array to hold Persons from Persons list
//  populated on getPersons call
let myPeopleArray: object[] = new Array();

export default class SvOrgChartWebPart extends BaseClientSideWebPart<ISvOrgChartWebPartProps> {

  public constructor() {
    super();

    SPComponentLoader.loadCss("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
    SPComponentLoader.loadCss("//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css");
  }

  public render(): void {
    let appScript:any = require("./Scripts/app.js");
    let defaultScript:any = require("./Scripts/Default.js");
    let jOrgChart:any = require("./Scripts/jOrgChart.js");

    this.domElement.innerHTML =  MyDefaultTemplate.templateHtml;

    this.getDepartments();
    this.getPersons();
    this.setButtonsEventHandlers();

    jQuery("#org").jOrgChart({ chartElement: "#chart", dragAndDrop: false });

  } //  render

  //  sets event handlers for buttons on toolbar
  private setButtonsEventHandlers(): void {
    const webPart: SvOrgChartWebPart = this;
    this.domElement.querySelector("#newPerson").addEventListener("click", () => { webPart.openNewPersonDialog(); });
    this.domElement.querySelector("#newPhoto").addEventListener("click", () => { webPart.openNewPhotoDialog(); });
    this.domElement.querySelector("#notifications").addEventListener("click", () => { webPart.openAlertsDialog(); });
    this.domElement.querySelector("#help").addEventListener("click", () => { webPart.openHelpDialog(); });
    this.domElement.querySelector("#list").addEventListener("click", () => { webPart.openListDialog(); });
    this.domElement.querySelector("#settings").addEventListener("click", () => { webPart.openSettingsDialog(); });
  } //  setButtonsEventHandlers

  //  executes on #newPerson (on toolbar) click
  private openNewPersonDialog(): void {
    //  execute initPersons() to clear the #Dialog--Person pop-up
    this.initPersons();

    //  execute jQuery UI method to configure the #Dialog--Person pop-up
    $("#Dialog--Person").dialog({
      width: 350,
      title: "Add New Person",
      autoOpen: false,
      resizable: false,
      modal: true,
      buttons: {
        //  adds "Add" button for adding a new perons
        "Add": (): void => {
            //  executes checkPersonFormValidation() to verify form validation before proceeding
            if (this.checkPersonFormValidation()) {
                //  unhide loading overlay
                document.getElementById("overlay").style.display = "block";
                //  upload the photo to the Photos library if one is specified
                if ($("#personPhoto").val()) {
                    // this.uploadFile(myFormDigest, "#personPhoto", $("#personPhoto").val().replace(/^.*[\\\/]/, ""), "Add");
                } else {
                    //  execute addNewPerson() to add a Person to the Persons list
                    this.addNewPerson();
                }
            }
        }
      }
    }); //  $("#Dialog--Person").dialog

    //  execute jQuery UI method to open the #Dialog--Person pop-up
    $("#Dialog--Person").dialog("open");

  } //  openNewPersonDialog

  //  executes on #newPhoto (on toolbar) click
  private openNewPhotoDialog(): void {
    alert("New Photo Dialog coming soon!");
  } //  openNewPhotoDialog

  //  executes on #notifications (on toolbar) click
  private openAlertsDialog(): void {
    alert("Alerts Dialog coming soon!");
  } //  openAlertsDialog

  //  executes on #help (on toolbar) click
  private openHelpDialog(): void {
    alert("Help Dialog coming soon!");
  } //  openHelpDialog

  //  executes on #list (on toolbar) click
  private openListDialog(): void {
    alert("List Dialog coming soon!");
  } //  openListDialog

  //  executes on #settings (on toolbar) click
  private openSettingsDialog(): void {
    alert("Settings Dialog coming soon!");
  } //  openSettingsDialog

  //  performs field initiation for the Dialog--Persons pop-up
  private initPersons(): void {
    $("#personName").val("");
    $("#personTitle").val("");
    $("#personDepartment").val("0");
    $("#personPhone").val("");
    $("#personMobile").val("");
    $("#personEmail").val("");
    $("#personSup").val("0");
    $("#personPic > a").attr("href", "");
    $("#personPic > a > img").attr("src", "https://dikuw.sharepoint.com/sites/develop_apps/SVAssets/NoImage.png");
    $("#personPhoto").val("");
  }   //  initPersons

  //  performs user enter validation on the Dialog--Persons pop-up
  private checkPersonFormValidation(): boolean {
    //  alerts user and returns false if #personTitle is fasley
    if (!$("#personTitle").val() || $("#personTitle").val() === 0) {
        alert("Please enter a title and try again.");
        return false;
    }
    //  alerts user and returns false if #personDepartment is fasley
    if (!$("#personDepartment").val() || $("#personDepartment").val() === 0) {
        alert("Please select a department and try again.");
        return false;
    }
    //  if #personTitle and #personDepartment are truthy, returns true
    return true;
  }   //  checkPersonsFormValidation

  //  gets Department data from the Departments list by calling getDepartmentsListData() and then populates the
  //    #filterDepartments (main filter) and #personDepartment (dropdown on Dialog--Persons pop-up) dropdowns
  private getDepartments(): void {
    //  first call getDepartmentsListData then...
    this.getDepartmentsListData().then((response) => {
      //  initiate html string
      let html: string = `<option value='0' selected='selected'>All Departments</option>`;
      //  for each value (Department) in the response, add an option
      response.value.forEach((item: ISPDepartmentItem) => {
        html += `<option value='${item.Id}'>${item.Title}</option>`;
      });
      //  set #filterDepartments (main filter) inner HTML to the HTML generated
      var listContainer: Element = this.domElement.querySelector("#filterDepartments");
      listContainer.innerHTML = html;
      //  set #personDepartment (dropdown on Dialog--Persons pop-up) inner HTML to the HTML generated
      listContainer = this.domElement.querySelector("#personDepartment");
      listContainer.innerHTML = html;
    });
  }

  //  get the Departments data from the Departments list, sorted by SortOrder
  //    note: by design this request only returns 100 items. Need to decide how to handle instances with > 100 departments
  //    e.g. /_api/web/lists/GetByTitle('Departments')/Items?$top=1000&?$orderby=SortOrder will return 1,000 departments
  private async getDepartmentsListData(): Promise<ISPDepartmentList> {
    //  get HTTP request
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
                                          + `/_api/web/lists/GetByTitle('Departments')/Items?$orderby=SortOrder`,
                                           SPHttpClient.configurations.v1)
    //  if request is successful
    .then((response: SPHttpClientResponse) => {
      // resolve promise
      return response.json();
    });
  } //  getDepartmentsListData

  //  gets Person data from the Persons list by calling getPersonsListData() and then populates the
  //    #filterPersons (main filter) and #personSup (dropdown on Dialog--Persons pop-up) dropdowns
  private getPersons(): void {
    //  first call getPersonsListData then...
    this.getPersonsListData().then((response) => {
      let html: string = `<option value='0' selected='selected'>All People</option>`;
      //  loop from response values (Person)
      response.value.forEach((item: ISPPersonItem) => {
        //  for each value (Person) in the response, add an option
        html += `<option value='${ item.Id }'>${ item.FullName }</option>`;
        //  for each value (Person) in the response, add an object to myPeopleArray
        myPeopleArray.push(
          {
            ID: item.Id,
            FirstName: item.FullName,
            LastName: item.LastName ? item.LastName : "",
            Title: item.Title,
            Department: item.DepartmentId,
            Picture: item.Photo,
            Email: item.Email,
            Phone: item.OfficePhone,
            Mobile: item.MobilePhone,
            Parent: (item.ParentId) ? item.ParentId : 0
          }
        );
      });
      //  set #filterPersons (main filter) inner HTML to the HTML generated
      var listContainer: Element = this.domElement.querySelector("#filterPersons");
      listContainer.innerHTML = html;
      //  set #personSup (dropdown on Dialog--Persons pop-up) inner HTML to the HTML generated
      listContainer = this.domElement.querySelector("#personSup");
      listContainer.innerHTML = html;
      //  call
      myPeopleArray = this.getNestedChildren(myPeopleArray, 0);
    });
  } //  getPersons

  //  get the Persons data from the Persons list, sorted by LastName, FirstName
  //    note: by design this request only returns 100 items. Need to decide how to handle instances with > 100 persons
  //    e.g. /_api/web/lists/GetByTitle('Persons')/Items?$top=1000&?$orderby=LastName,FirstName will return 1,000 persons
  private async getPersonsListData(): Promise<ISPPersonList> {
    //  get HTTP request
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl
                                          + `/_api/web/lists/GetByTitle('Persons')/Items?$orderby=LastName,FirstName`,
                                           SPHttpClient.configurations.v1)
    //  if request is successful
    .then((response: SPHttpClientResponse) => {
      // resolve promise
      return response.json();
    });
  } //  getPersonsListData

  //  add a new person to the Persons list using data from the Dialog--Person form
  private addNewPerson(): Promise<ISPPersonList> {
    //  building JSON request from Dialog--Person form fields
    const body: string = JSON.stringify({
      "__metadata": {
        "type": "SP.Data.PersonsListItem"
      },
      "FullName": $("#personName").val(),
      "Title": $("#personTitle").val(),
      "DepartmentId": parseInt($("#personDepartment").val(), 10),
      "OfficePhone": $("#personPhone").val(),
      "MobilePhone": $("#personMobile").val(),
      "Email": $("#personEmail").val(),
      "ParentId": parseInt($("#personSup").val(), 10)
    });
    //  post HTTP request
    return this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl +
                                             `/_api/web/lists/getbytitle('Persons')/items`,
                                                SPHttpClient.configurations.v1,
          {
            headers: {
              "Accept": "application/json;odata=nometadata",
              "Content-type": "application/json;odata=verbose",
              "odata-version": ""
            },
            body: body
    })
    //  if request is successful
    .then((response: SPHttpClientResponse) => {
      // hide loading overlay
      document.getElementById("overlay").style.display = "none";
      // resolve promise
      return response.json();
    //  if request fails
    }, (error: any): void => {
      // hide loading overlay
      document.getElementById("overlay").style.display = "none";
      //  alert user
      alert("Error while creating the item: " + error);
    });
  } //  addNewPerson

  //  takes an array of Persons and embeds the children within each parent, starting at the specified parent
  private getNestedChildren(arr:object[], parent:number):object[] {
    //  create a new empty array to serve as the output array
    let out: object[] = new Array();
    //  loop through the array specified in the function call
    arr.forEach((item:IPersonItem) => {
      //  if the parent of the Person is that specified in the function call, proceed
      if (item.Parent === parent) {
        //  create a new array for the childern
        let children: object[] = new Array();
        //  populate the children array recursively
        children = this.getNestedChildren(arr, item.ID);
        //  set the array to the parents children value if it is not empty
        if (children.length) {
          item.Children = children;
        }
        //  add the array item to the output array
        out.push(item);
      }
    });
    //  return the output array
    return out;
  } //  getNestedChildren
  /*
  private genList(arr:IPersonItem, myRoot?:number):void {
    let maxLevel:number = 6;   //  this will be a user setting <-- need to add code to stop a x levels of recursion
    if (!myRoot) { myRoot = 0;}

    if ($("#filterPersons").val() !== "0") {
      arr = arr.filter(function (item) {
            return item.ID == $("#filterPersons").val();
        });
    }

    private getList(arr:IPersonItem, parent?:number):string {
        let myHTML:string = "<ul>";
        for (var x in arr) {

            if (arr[x].Parent === parent) {
                myHTML += "<li>" + `
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
                    myHTML += this.getList(arr[x].children, arr[x].ID);
                }
                myHTML += "</li>";
            }
        }
        return myHTML + "</ul>";
    }

    myHTML = this.getList(arr, myRoot);
    myHTML = myHTML.slice(4);
    myHTML = myHTML.slice(0, myHTML.length - 5);
    $("#org").html(myHTML);
    $("#org").jOrgChart({ chartElement: '#chart', dragAndDrop: false });

  }   //  genList
  */
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
          header: { description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
