
/////////  >>>>>>>>>>>>>>>>>>>>  on page load -  ScriptManager.RegisterOnSubmitStatement(Page, Page.GetType(), "val", "HighlightControlToValidate();");
/////////  >>>>>>>>>>>>>>>>>>>>  validate all required fields
/////////  >>>>>>>>>>>>>>>>>>>>    $(document).ready(function () {
/////////  >>>>>>>>>>>>>>>>>>>>        HighlightControlToValidate();
/////////  >>>>>>>>>>>>>>>>>>>>     });
/////////  >>>>>>>>>>>>>>>>>>>>    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(HighlightControlToValidate);

function HighlightControlToValidate() {
    for (var i = 0; i < Page_Validators.length; i++) {
        var val = Page_Validators[i];
        var ctrl = document.getElementById(val.controltovalidate);
        if (ctrl != null && ctrl.style != null && !ctrl.disabled) {
            if (!val.isvalid) {
                ctrl.style.borderColor = '#FF0000';
            }
            else {
                ctrl.style.borderColor = '';
            }
        }
        $('#' + Page_Validators[i].controltovalidate).bind("blur", HighlightControlToValidate)
    }
}


/////////////// Check required field validator and validate
function Validate_HighLightControl(ValGrp) {
    var Flag;
    if (Page_Validators.length > 0) {
        for (var i = 0; i < Page_Validators.length; i++) {
            var val = Page_Validators[i];
            var ctrl = document.getElementById(val.controltovalidate);
            if (ctrl != null && ctrl.style != null && !ctrl.disabled) {
                if (ctrl.value == "" && (ctrl.getAttribute('style') != 'display: none;') && (ctrl.getAttribute('style') != 'border: 1px solid red; display: none;')) {
                    if (Page_Validators[i].validationGroup == ValGrp) {
                        ctrl.style = "border: 1px solid red";
                        Flag = 1;
                    }
                }
                else {
                    ctrl.style.borderColor = '';
                }
            }
        }
    }
    if (Flag == 1) {
        return false;
    }
    else {
        return true;
    }
}


/////////////******************* -------------------------------------------------------------------------------------


function EnableDisable_TreeviewNodes(TrViewCssClass) {
    var tree = $find("." + TrViewCssClass + "")
    for (var i = 0; i < tree.get_allNodes().length; i++) {
        if (tree.get_allNodes()[i]._hasChildren() == true) {
            tree.get_allNodes()[i].set_enabled(false)
        }
    }
}
///////// >>>>>>>>>>>>>>>>>>>>    $(document).ready(function () {EnableDisableTreeView();}); Sys.Application.add_load(EnableDisableTreeView);
/////////  >>>>>>>>>>>>>>>>>>>>    function EnableDisableTreeView() { EnableDisable_TreeviewNodes('MyTreeView'); }

// Check treeview node and sub-nodes

function Check_UnCheck_TreeviewNodes(TrViewCssClass) {
    $("." + TrViewCssClass + "").find(":checkbox").change(function () {
        //check or uncheck childs
        var nextele = $(this).closest("table").next()[0];
        if (nextele && nextele.tagName == "DIV") {
            $(nextele).find(":checkbox").prop("checked", $(this).prop("checked"));
        }
        //check nodes all with the recursive method
        CheckChildNodes($("." + TrViewCssClass + "").find(":checkbox").first());
    });
}

//method check filial nodes
function CheckChildNodes(Parentnode) {
    var nextele = $(Parentnode).closest("table").next()[0];
    if (nextele && nextele.tagName == "DIV") {

        $(nextele).find(":checkbox").each(function () {
            CheckChildNodes($(this));
        });

        if ($(nextele).find("input:checked").length == 0) {
            $(Parentnode).removeAttr("checked");
        }
        if ($(nextele).find("input:checked").length > 0) {
            $(Parentnode).prop("checked", "checked");
        }
    }
    else {
        return;
    }
}



///////// >>>>>>>>>>>>>>>>>>>>    $(document).ready(function () {CheckUnCheckTreeView();}); Sys.Application.add_load(CheckUnCheckTreeView);
/////////  >>>>>>>>>>>>>>>>>>>>    function CheckUnCheckTreeView() { Check_UnCheck_TreeviewNodes('MyTreeView'); }

// All_Treeview checkbox with master Checkbox

function Check_UnCheck_Treeview_All_Checkbox(mstCheckboxid, TrViewCssClass) {
    var isChecked = false;
    if ($('#' + mstCheckboxid).is(":checked")) {
        isChecked = true;
    }
    $(".TrViewCssClass input[type=checkbox]").each(function () {
        if (isChecked) {
            $(this).attr("checked", "checked");
        } else {
            $(this).removeAttr("checked");
        }
    });
}

///////// >>>>>>>>>>>>>>>>>>>>  CheckUncheck_AllCheckBoxes(this,'parent control id in stataic')
/////////  >>>>>>>>>>>>>>>>>>>>    function CheckUnCheckTreeView() { Check_UnCheck_TreeviewNodes('MyTreeView'); }
function CheckUncheck_AllCheckBoxes(chk, CheckParentID) {
    $('[id*=' + CheckParentID + ']').find("input:checkbox").each(function () {
        if (this != chk) {
            this.checked = chk.checked;
        }
    });
    return false;
}

// only backspace and delete button allowed >>>>>>> onkeypress="return Back_Del_Only(event);"
function Back_Del_Only(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        return true;
    }
    else {
        return false;
    }
}
// only numeric key is allowed on keypress >>>>>> onkeypress="return isNumberKey(this,event);"
function isNumberKey(thi, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 && charCode == 127) {
        if (thi.value.indexOf('.') === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    }
}
// Alpha numeric key is allowed on keypress >>>>>> onkeypress="return isNumberKey(event,this.id);"

function CheckNumeric_Alpha(event, id) {
    var tval = $('#' + id).val();
    var exps1 = /^\d+$/
    if (tval != "") {
        var ftxt = tval.charAt(0);
        if (exps1.test(ftxt)) {
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57) && (event.which != 8) && (event.which != 46)) {
                event.preventDefault();
            }
        }
        else {
            if ((event.which < 97 || event.which > 122) && (event.which != 8) && (event.which != 46)) {
                event.preventDefault();
            }
        }
    }
}

///  textarea_Maxlenght on keypress  onkeypress="return textarea_Maxlenght_keypress(this,'200',event)

function textarea_Maxlenght_keypress(thi, len, evnt) {

    var ignore = [8, 37, 38, 39, 40, 46];
    if ($(thi).val().length == parseFloat(len) && $.inArray(evnt.keyCode, ignore) == -1) { return false; }
    else {
        return true;
    }
}

////////// Check and validate uploaded file type
///////// FileType=Selected file type(pdf,jpeg,png), FileId=uploader id
function Validate_FileType(FileId, FileType) {

    var extension = $('#' + FileId).val().split('.').pop().toLowerCase();
    var fileExtension = FileType.split(",");
    if ($.inArray(extension, fileExtension) == -1) {
        $('#' + FileId).val('');
        alert("Only " + FileType + " formats are allowed.");
        return false;
    }
}

////////// Check and validate uploaded file type and size
/////////  maxFsizeKB=Max file sixe, FileType=Selected file type(pdf,jpeg,png), FileId=uploader id

function Validate_FileType_Size(FileId, FileType, maxFsizeKB) {

    var extension = $('#' + FileId).val().split('.').pop().toLowerCase();
    var validFileExtensions = FileType.split(",");
    if ($.inArray(extension, validFileExtensions) == -1) {
        $('#' + FileId).val('');
        alert("Only " + FileType + " formats are allowed.");
        return false;
    }
    else {
        var FS = maxFsizeKB * (1024);
        if ($('#' + FileId).get(0).files[0].size > (FS)) {
            $('#' + FileId).val('');
            alert("Sorry!! Max allowed file size is " + maxFsizeKB + " kb");
            return false;
        }
    }
}


///////// <asp:FileUpload runat="server" CssClass="upload" ID="UPloadPhoto" Style="width: 78px;" accept=".jpg, .jpeg" onchange="showimagepreview(this,'img_photo','P','cssUPloadPhoto');" />
///////// img_photo= image preview id, p= type for size,cssUPloadPhoto=text for lable css

function showimagepreview(input, id, F, lblcss) {

    if (input.files && input.files[0]) {
        var filerdr = new FileReader();
        var fileval = $(input).val();
        var fname = fileval;
        var ext = fileval.substring(fileval.lastIndexOf('.') + 1).toLowerCase();
        if (ext == "jpg" || ext == "jpeg") {
            filerdr.onload = function (e) {
                var size = parseFloat(input.files[0].size / 1024).toFixed(2);
                if (size > 100 && F == "P") {
                    $(input).val('');
                    alert('Please ensure file size is not more than 100 KB');
                }
                else if (size > 20 && F == "S") {
                    $(input).val('');
                    alert('Please ensure file size is not more than 20 KB');
                }
                else {
                    if (lblcss != '') {
                        $('.' + lblcss).text(fname);
                    }
                    else {
                        $('.' + lblcss).text('');
                    }
                    $('[id*=' + id + ']').attr('src', e.target.result);
                }
            }
            filerdr.readAsDataURL(input.files[0]);
        }
        else {
            $('.' + lblcss).text('');
            $(input).val('');
            alert("Please ensure file type is in .jpg, .jpef format");
        }
        return false;
    }
}



//$.fn.FixedTableHeader = function (options) {
//    var settings = $.extend({
//        fontStyle: "bold",
//        backgroundColor: "yellow"
//    }, options);
//};

///////  $(document).ready(function () {Fixed_table_Headers();});            
///////  Sys.WebForms.PageRequestManager.getInstance().add_endRequest(Fixed_table_Headers);
///////  function Fixed_table_Headers() { $(".fixed-tableHead").TableFixedHeader({ fontStyle: "italic", backgroundColor: "green", height: 380 }); }

(function ($) {
    $.fn.TableFixedHeader = function (options) {
        var settings = $.extend({
            fontStyle: "bold",
            fontSize: "12px",
            height: "200px"
        }, options);
        return $(this).find("tbody").css({
            'height': settings.height
        });
    };
}(jQuery));



/////////////////////////  <asp:TextBox runat="server" ID="Startdate" AutoComplete="off"  class="form-control"  ClientIDMode="Static" placeholder="dd/mm/yyyy" onkeypress="return Back_Del_Only(event);"/>
/////////////////////////  $(function () { Set_Date_Cal('Startdate', false); });



function Set_Date_Cal(txtids, IsMinMax) {
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $('#' + txtids).datepicker({
        format: "dd/mm/yyyy",
        beforeShowDay: function (date) {
            if (IsMinMax == true) {
                return date.valueOf() >= now.valueOf();
            }
        },
        autoclose: true
    });
}

////////////////////////// $(function () { Set_Date_Cal_EndDate('Startdate', 'EndDate'); });
function Set_Date_Cal_MaxDTOday(txtids) {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if ($('[id$=' + txtids + ']').val() == "") {
        var dv = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
        $('[id$=' + txtids + ']').val(dv);
    }

    $('[id$=' + txtids+']').datepicker({
        format: "dd/mm/yyyy",
        endDate: 'now',
        autoclose: true,
        todayHighlight: true,
        setDate: today
    });
}

function Set_Date_Cal_MaxDTOday_Mnth_Year(txtids) {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if ($('#' + txtids).val() == "") {
        var dv = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        //$('#' + txtids).val(dv);
    }

    $('#' + txtids).datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        endDate: 'now',
        autoclose: true,
        todayHighlight: true,
        //setDate: today
    });
}




function Set_Start_EndDate(txtFDate, txtTDate) {
    $('#' + txtFDate).datepicker({
        format: "dd/mm/yyyy",
        endDate: 'now',
        autoclose: true
    });
    $('#' + txtTDate).datepicker({
        format: "dd/mm/yyyy",
        endDate: 'now',
        autoclose: true
    });

    $("#" + txtFDate).datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $("#" + txtTDate).datepicker('setStartDate', minDate);
    });
}

function Set_Date_Cal_EndDate_Years(txtFDate, txtTDate) {
    $('#' + txtFDate).datepicker({ format: "dd/mm/yyyy", autoclose: true, endDate: 'now', useCurrent: false });
    $('#' + txtTDate).datepicker({
        format: "dd/mm/yyyy", useCurrent: false, //Important! See issue #1075
        autoclose: true,
        endDate: 'now'
    });

    $("#" + txtFDate).datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $("#" + txtTDate).datepicker('setStartDate', minDate);
    });

    $('#' + txtTDate).datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $("#" + txtFDate).datepicker('setEndDate', minDate);
    });

}
//function Set_Date_Cal_EndDate_Years(txtFDate, txtTDate, DFormat) {

//    $('#' + txtFDate).datepicker({ format: DFormat, viewMode: 'years', autoclose: true, endDate: 'now', useCurrent: false });
//    $('#' + txtTDate).datepicker({ format: DFormat, viewMode: 'years', autoclose: true, endDate: 'now', useCurrent: false });

//    $("#" + txtFDate).datepicker().on('changeDate', function (selected) {
//        var minDate = new Date(selected.date.valueOf());
//        $("#" + txtTDate).datepicker('setStartDate', minDate);
//        $("#" + txtTDate).val($(this).val());
//    });

//    $('#' + txtTDate).datepicker().on('changeDate', function (selected) {
//        var minDate = new Date(selected.date.valueOf());
//        $("#" + txtFDate).datepicker('setEndDate', minDate);
//    });

//}

function Set_Date_Cal_EndDate(txtFDate, txtTDate, DFormat) {
    $('#' + txtFDate).datepicker({ format: DFormat, viewMode: 'years', autoclose: true, endDate: 'now', useCurrent: false });
    $('#' + txtTDate).datepicker({ format: DFormat, viewMode: 'years', autoclose: true, endDate: 'now', useCurrent: false });

    $("#" + txtFDate).datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $("#" + txtTDate).datepicker('setStartDate', minDate);
        $("#" + txtTDate).val($(this).val());
    });

    $('#' + txtTDate).datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $("#" + txtFDate).datepicker('setEndDate', minDate);
    });
}
////////////////////////////

function Date_Range(tFrID, tToID, IsStartDate) {
    var setMinDate = "";
    if (IsStartDate == true) {
        setMinDate = 'now';
    }
    $('#' + tFrID + ',#' + tToID + '').datepicker({
        format: "dd/mm/yyyy",
        useCurrent: false,
        autoclose: true,
        startDate: setMinDate
    });
    $('#' + tFrID).datepicker().on('changeDate', function (e) {
        var minDate = new Date(e.date);
        $('#' + tToID).datepicker('setStartDate', minDate);
        $('#' + tToID).val($(this).val());
    });
}
function Date_Range(tFrID, tToID, IsStartDate, IsEndDate, InsDecMonths) {
    var setMinDate = "", setMaxDate = "";
    if (IsStartDate == true) {
        setMinDate = 'now';
    }
    if (IsEndDate == true) {
        setMaxDate = 'now';
    }
    $('#' + tFrID + ',#' + tToID + '').datepicker({
        format: "dd/mm/yyyy",
        useCurrent: false,
        autoclose: true,
        startDate: setMinDate,
        endDate: setMaxDate
    });
    $('#' + tFrID).datepicker().on('changeDate', function (e) {
        var minDate = new Date(e.date);
        minDate.setMonth(minDate.getMonth() + InsDecMonths);
        $('#' + tToID).datepicker('setEndDate', minDate);
        $('#' + tToID).datepicker('setStartDate', e.date);
        $('#' + tToID).val($(this).val());
    });

    $('#' + tFrID).datepicker().on('changeDate', function (e) {
        var minDate = new Date(e.date);
        minDate.setMonth(minDate.getMonth() + InsDecMonths);
        $('#' + tToID).datepicker('setEndDate', minDate);
        $('#' + tToID).datepicker('setStartDate', e.date);
        $('#' + tToID).val($(this).val());
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////// text area char count
/////onkeyup="return txt_area_Charc(this, 'txtCCountChar', 10)"
function txt_area_Charc(val, txtcid, mval) {
    var len = val.value.length;
    if (len >= mval) {
        val.value = val.value.substring(0, mval);
        if (len == mval && txtcid != "") {
            $('#' + txtcid).text((mval - (len)) + " Character Left");
        }
        return false;
    } else {
        if (txtcid != "") {
            $('#' + txtcid).text((mval - (len)) + " Character Left");
        }
    }
}

///onkeyup="return validateLimit(this, 'lblMsg1', 10)"
function validateLimit(obj, divID, maxchar) {
    objDiv = get_object(divID);
    if (this.id) obj = this;
    var remaningChar = maxchar - trimEnter(obj.value).length;
    if (objDiv.id) {
        objDiv.innerHTML = remaningChar + " Characters Left";
    }
    if (remaningChar <= 0) {
        obj.value = obj.value.substring(maxchar, 0);
        if (objDiv.id) {
            objDiv.innerHTML = "0 Characters Left";
        }
        return false;
    }
    else { return true; }
}

function get_object(id) {
    var object = null;
    if (document.layers) {
        object = document.layers[id];
    } else if (document.all) {
        object = document.all[id];
    } else if (document.getElementById) {
        object = document.getElementById(id);
    }
    return object;
}
function trimEnter(dataStr) {
    return dataStr.replace(/(\r\n|\r|\n)/g, "");
}

////////////  validate mobile No
function Validate_MobileNo(id) {
    debugger;
    var msg = "";
    var x = $('[id$=' + id + ']').val();
    if (x.length != 10) {
        $('[id$=' + id + ']').val('');
        $('[id$=' + id + ']').focus();
        msg = 'Please enter atleast 10 digit';
    }
    else if (x.charAt(0) != 9 && x.charAt(0) != 8 && x.charAt(0) != 7 && x.charAt(0) != 6) {
        $('[id$=' + id + ']').val('');
        $('[id$=' + id + ']').focus();
        msg = "Contact No. should start with 9 or 8 or 7 or 6";
    }
    return msg;
}

//////////// validate Email-id
function Validate_EmailID(id) {
    var msg = "";
    var sEmail = $('#' + id).val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        msg = "";
    }
    else {
        $('[id$=' + id+']').val('');
        msg = "Please enter valid Email Id";
    }
    return msg;
}

function isValidEmailAddress(emailAddress, txtid, lblid) {
    $('[id$=' + lblid + ']').text('');
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    if (!pattern.test(emailAddress)) {
        $('[id$=' + txtid + ']').val();
        $('[id$=' + lblid + ']').focus();
        $('[id$=' + lblid + ']').text("Please enter valid Email Id");
        return false;
    }
};

/////////////////////// Check Password
function Validate_Password(id) {
    var str = $('[id$=' + id + ']').val();
    var msg = "";
    if (str.length < 8) {
        msg = "Password Minimum 8 character";
    }
    else if (str.length > 20) {
        msg = "Password Maximum 20 character";
    }
    else if (str.search(/\d/) == -1) {
        msg = "Atleast one numeric in Password";
    }
    else if (str.search(/[a-z]/) == -1) {
        msg = "Atleast one Lower case alphabet in Password";
    }
    else if (str.search(/[A-Z]/) == -1) {
        msg = "Atleast one upper case alphabet in Password";
    }

    if (msg != "") {
        $('[id*=lbl_msgConfPwd]').text = ('');
        $('[id$=' + id + ']').val('');
        $('[id$=' + id + ']').focus();
    }
    return msg;
}


///////////////////// Drag Div on page

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function ZoomChartPopup_Model(ChrtDivID, ImgcontainerID, ModalPopUpID) {
    debugger;
    var modalwidth;
    var wrapper = document.getElementById(ChrtDivID);

    var value = wrapper.value;
    if (parseFloat(value) == NaN) {
        wrapper.style.border = '2px solid red';
        wrapper.style.backgroundColor = 'rgb(255, 125, 115)';
    } else {
        //wrapper.style.border = 'none';
        //wrapper.style.backgroundColor = 'rgb(255, 255, 255)';
        var styleEl = document.createElement('style');
        styleEl.innerHTML = 'g[class$=creditgroup] {display:none !important;}';
        wrapper.append(styleEl);
    }
    var svgString = new XMLSerializer().serializeToString(wrapper.querySelector("svg"));
    var canvas = document.createElement('canvas');
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function () {
        canvas.width = img.width;
        modalwidth = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        document.querySelector('#' + ImgcontainerID).innerHTML = '<img style="width:120%;" src="' + png + '"/>';
        DOMURL.revokeObjectURL(png);
        ////////////// Set modal popup width
        var wimdl = "45";
        if (modalwidth <= 350) {
            wimdl = "45";
        }
        else if (modalwidth >= 350 && modalwidth <= 550) { wimdl = "60"; }
        else if (modalwidth >= 550 && modalwidth <= 850) { wimdl = "70"; }
        else if (modalwidth >= 850 && modalwidth <= 1024) { wimdl = "80"; }
        else if (modalwidth >= 1024) { wimdl = "90"; }
        $(".modal-dialog").css({ "min-width": "" + wimdl + "%" });

    };
    img.src = url;


    $("#" + ModalPopUpID).modal({
        backdrop: 'static'
    });
}

///////////////////////////// Single Decimal allowed

$('.SingleDecimal').keypress(function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 8 || charCode == 37) {
        return true;
    } else if (charCode == 46 && $(this).val().indexOf('.') != -1) {
        return false;
    } else if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
///////////////////////////// Single Decimal allowed
$('.roundUp-2').blur(function () {
    var value = parseFloat($(this).val());
    if (!isNaN(value)) {
        $(this).val(parseFloat(value).toFixed(2));
    }
});


///////////////////////////// New Ajax Function 20200925
function Show_overlayWaitmadiv() {
    $('.overlayWaitmadiv').show();
}
function Hide_overlayWaitmadiv() {
    $('.overlayWaitmadiv').hide();
}
function showAlert(msg) {
    Hide_overlayWaitmadiv();
    $('[id*="lbl_msgAlert"]').text(msg);
    $find("ModalAlertB").show();
    return false;
}
function _Fill_ComboBox_Json(ddlid, LocURL, ZeroIndex, ConditionID, Bool_Is_ControlID) {
    Show_overlayWaitmadiv();
    let ddls
    if (!Bool_Is_ControlID) { ddls = $('.' + ddlid); }
    else { ddls = $('[id*=' + ddlid + ']'); }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: LocURL,
        async: false,
        data: JSON.stringify(ConditionID),
        success: function (data) {
            ddls.empty();
            if (data.d.length > 0) {
                if (ZeroIndex != "")
                    ddls.append('<option selected="true"  value="">--' + ZeroIndex + '--</option>');

                $.each(data.d, function (index, row) {
                    ddls.append($('<option></option>').val(row.Value).html(row.Text));
                });
            }
            else {
                var indx = "Data not found";
                ddls.append('<option selected="true" value="">--' + indx + '--</option>');
            }
            Hide_overlayWaitmadiv();
        },
        error: function (result) {
            Hide_overlayWaitmadiv();
            alert(result.error);
        }
    });
}
function _Get_Result_Json(LocURL, ConditionID, IsStr) {
    Show_overlayWaitmadiv();
    var result;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        url: LocURL,
        async: false,
        data: JSON.stringify(ConditionID),
        success: function (data) {
            Hide_overlayWaitmadiv();
            if (IsStr)
                result = data.d;
            else
                retresult = data.d;
        },
        error: function (res) {
            Hide_overlayWaitmadiv();
            result = res.error;
        }
    });
    return result;
}
function download_image(CnvIDs, imgFlName) {

    var canvas = document.getElementById(CnvIDs);
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = imgFlName;
    link.href = image;
    link.click();

}

function Show_ModalAlert_Popups(msg, txtHead) {
    if (msg == "" || msg == "undefined") {
        msg = "Alert";
    }

    $('.ModalAlert-title').html("<i class='glyphicon glyphicon-alert mr-4'></i>" + txtHead);
    $('.ModalAlert-body').html(" <p>" + msg + "</p>");
    $('#ModalAlert').show(500);
}
function getPDF(divcls, flDwnName) {

    html2canvas($('#' + divcls + '')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("" + flDwnName + ".pdf");
        }
    });

}
function showCHDnowloads(did) {
    if ($('#' + did).is(":visible"))
        $('#' + did).hide(500);
    else
        $('#' + did).show(500);
}

function ShowGRPDownload(CanvasID, CanvasParentDivID, dwnFilesNames) {

    var idvID = "'pngdiv" + CanvasID + "'";
    var dwPfnIDs = "'" + CanvasParentDivID + "','" + dwnFilesNames + ".pdf'",
        dwPngIDs = "'" + CanvasID + "','" + dwnFilesNames + ".png'",
        dwJpgIDs = "'" + CanvasID + "','" + dwnFilesNames + ".jpeg'",
        dwCsvIDs = "'" + CanvasID + "','" + dwnFilesNames + ".csv'";
    var dwnBtnVar = '';

    dwnBtnVar = '<a id="Anch' + CanvasID + '" class="btn btn-grp-download pull-right" onclick="showCHDnowloads(' + idvID + ')" style="top: -454px; right: 13px;"><i class="fa fa-download"></i></a>' +
        '<div class="DivChDwnBtn" id="pngdiv' + CanvasID + '">' +
        '<a class="dropdown-item " href="javascript:void(0);" onclick="getPDF(' + dwPfnIDs + ')"><i class="fa fa-angle-double-right"></i>PDF</a>' +
        ' <a class="dropdown-item " href="javascript:void(0);" onclick="download_image(' + dwPngIDs + ');"><i class="fa fa-angle-double-right"></i>PNG</a>' +
        ' <a class="dropdown-item " href="javascript:void(0);" onclick="download_image(' + dwJpgIDs + ');"><i class="fa fa-angle-double-right"></i>JPG</a>' +
        //  '<a class="dropdown-item " href="javascript:void(0);" onclick="download_CSV(' + dwCsvIDs + ')"><i class="fa fa-angle-double-right"></i>CSV</a>' +
        '</div>';
    $('#' + CanvasParentDivID).parent().append(dwnBtnVar);


}
function Set_DatesInputs(sData, eData, IsCtrlID, IsStartToday, IsEndToDay, IsValidateBoth) {
    Update_DatePickerFormat();

    var StrID, EndID;
    if (IsCtrlID) {
        StrID = $("#" + sData);
        EndID = $("#" + eData);
    }
    else {
        StrID = $("." + sData);
        EndID = $("." + eData);
    }

    var start = new Date();
    if (!IsStartToday)
        start = 0;

    var end = new Date();
    if (!IsEndToDay)
        end = 0;
    $(StrID).datepicker({
        startDate: start,
        endDate: end,
    }).on("change", function () {
        $(EndID).datepicker("clearDates");
        // var startDate = new moment($(dateA).val(), "DD/MM/YYYY").format();
        var startDate = new moment($(this).val(), "DD/MM/YYYY").format();
        $(EndID).datepicker("setStartDate", new Date(startDate));
    });
    $(EndID).datepicker({
        startDate: start,
        endDate: end
    });
    if (IsValidateBoth) {
        $(EndID).datepicker({
            startDate: start,
            endDate: end,
        }).on("change", function () {
            $(StrID).datepicker("clearDates");
            // var startDate = new moment($(dateA).val(), "DD/MM/YYYY").format();
            var startDate = new moment($(this).val(), "DD/MM/YYYY").format();
            $(StrID).datepicker("setStartDate", new Date(startDate));
        });
    }
}
function Update_DatePickerFormat() {
    $.fn.datepicker.defaults.autoclose = true;
    $.fn.datepicker.defaults.todayHighlight = true;
    $.fn.datepicker.defaults.clearBtn = true;
    $.fn.datepicker.defaults.format = "dd/mm/yyyy";
}

function GetMultiSelectString(ddlids, IsControlID, IsIdString) {
    var ids = "";
    if (IsControlID) { ids = "[id*=" + ddlids + "]" }
    else { ids = "." + ddlids }
    var idsCmn = "";
    $(ids + " option:selected").each(function () {
        if (IsIdString) {
            idsCmn += "'" + $(this).val() + "',";
        }
        else {
            idsCmn += $(this).val() + ",";
        }
    });
    idsCmn = (idsCmn.length > 0 ? idsCmn.slice(0, (idsCmn.length - 1)) : "");
    return idsCmn;
}



function PostFormData(txtValid, ValidID, ActionURL, IsNewTab) {
    ///////     PostFormData('ValidID#ValidID1', loc + "#" + Dist, 'DashbordGwLocation.aspx',true);
    var $form = $("<form/>").attr("id", "data_form").attr("action", ActionURL).attr("method", "post");
    $("body").append($form);

    ////////Append the values to be send.
    var txtarr = txtValid.split('#');
    var valID = ValidID.split('#');
    for (var i = 0; i < txtarr.length; i++) {
        if (txtarr != "")
            AddParameter($form, "" + txtarr[i] + "", "" + valID[i] + "");
    }
    if (IsNewTab) {
        //////// if Open new tab
        $form[0].target = "_blank";
    }
    ////////Send the Form.
    $form[0].submit();
}
function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden").attr("name", name).attr("value", value);
    form.append($input);
}

function _Fill_ComboBox_With_Json(ddlid, Bool_Is_ControlID, JsonData, ZeroIndex) {
    let ddls
    if (!Bool_Is_ControlID) { ddls = $('.' + ddlid); }
    else { ddls = $('[id*=' + ddlid + ']'); }
    ddls.empty();
    if (JsonData.length > 0) {
        if (ZeroIndex != "")
            ddls.append('<option selected="true"  value="">--' + ZeroIndex + '--</option>');

        $.each(JsonData, function (index, row) {
            ddls.append($('<option></option>').val(row.Value).html(row.Text));
        });
    }
    else {
        var indx = "Data not found";
        ddls.append('<option selected="true" value="">--' + indx + '--</option>');
    }
}


function Set_Date_Cal(txtids, IsMin, IsMax) {
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $('[id$=' + txtids + ']').datepicker({
        format: "dd/mm/yyyy",
        beforeShowDay: function (date) {
            if (IsMin == true) {
                return date.valueOf() >= now.valueOf();
            }
            if (IsMax == true) {
                return date.valueOf() <= now.valueOf();
            }
        },
        autoclose: true
    });
}

function Set_Date_Cal_MaxDTOday_Year(txtids) {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if ($('[id$=' + txtids + ']').val() == "") {
        var dv = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        //$('#' + txtids).val(dv);
    }

    $('[id$=' + txtids+']').datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        endDate: 'now',
        autoclose: true,
        todayHighlight: true,
        //setDate: today
    });
}