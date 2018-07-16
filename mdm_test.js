/* ------------------------------------ BEGIN: GLOBAL VARIABLES ------------------------------------ */
var gv_atlas_adres_control = 0;
var checksq = "<i class='fa fa-check-square-o' style='font-size:20px;color:#fc7337;padding-left:50px'></i>";
var GV_MDMNO = GV_KUNNR = GV_LIFNR = GV_TMPID = GV_SYSID = GV_PARAM = GV_PRCUS = GV_CUSVE = GV_TABLE = GV_OTABLE = GV_ROW = GV_ROWID = GV_TABNAME = GV_DATA = GV_LANGU = GV_PTEXT = GV_SRECORD = GV_T004 = GV_LAND1 = GV_TAXCT = GV_REGIO = GV_BUKRS = GV_LAND1 = GV_SPRAS = GV_ATYPE = GV_CTYPE = GV_SAREA = GV_BVTYP = GV_DEPAR = GV_PARTS = GV_SFTCT = GV_CURTY = GV_TSUPP = GV_CGUID = GV_BZIRK = GV_KDGRP = GV_KALKS = GV_LPRIO = GV_VSBED = GV_PLTYP = GV_VERSG = GV_KTGRD = GV_ZTERM = GV_KONDA = GV_STCD1 = GV_TAXA1 = GV_KTOKD = GV_BRSCH = GV_VBUND = GV_EKORG = GV_WAERS = GV_ZUAWA = GV_FDGRV = GV_ZWELS = GV_HBKID = GV_MINDK = GV_GRICD = GV_TAXKD = GV_BANKA = GV_BUSAB = GV_GRIDT = GV_AKONT = GV_VKORG = GV_VKBUR = GV_VKGRP = GV_ZAHLS = GV_ZAHLT = GV_FRGRP = GV_PYMNT = "";
var GV_VADETIM = GV_VADEATLAS = GV_GENELVADE = "";
var GV_ADDBNK = "",
    GV_ACTSYST = "",
    GB_ADRCC = "",
    GV_TEDARIKNUM = "",
    maps_harita = "",
    GV_RFRNC2 = "";
var centerOfficeVkn = "";
var centerOfficeVknSattus = 0;
var GV_RESLST = [];
var GV_ADDBN_BTN_SATUS = 0;
var ctryIndex, ctiyIndex, distIndex = 0;
var gv_selcetVade = gv_txtvade = "";
var GV_ALLBNK = GV_SELBNK = GV_NONBNK = [];
// sreach help
var srctype = "";
var srctype2 = "";
var src_stats = "0";
//Table field array
var GV_FIELDAD = ["", "", "#ANAME", "#ALAND", "#CITY1", "#TOWN1", "#DISTR", "#SUPL1", "#POSTL", "#GEOLA", "#GEOLO"],
    GV_FIELDCT = ["", "", "#LANGU", "#RELPR", "#TELNO", "#FAXNO", "#CEPNO", "#EMAIL", "#LINKN"],
    GV_FIELDBN = ["", "#BANKS", "#BANKA", "#BRNCH", "#BIBAN", "#BANKN", "#SWIFT", "#BVTYP", "#KOINH", "#XEZER"],
    GV_FIELDSP = ["", "#DEPAR", "#PARTS", "#PTERM", "#SFTCT", "#CURRY", "#LIMCR", "#CCURT"],
    GV_FIELCFI = ["", "#CFI_BUKRS", "#CFI_AKONT", "#CFI_ZUAWA", "#CFI_FDGRV", "#CFI_BUSAB", "#CFI_GRIDT", "#CFI_ZTERM", "#CFI_ZWELS", "#CFI_GRICD", "#CFI_EVRNR", "#CFI_PYMNT", "#CFI_ASEND"],
    GV_FIELVFI = ["", "#VFI_BUKRS", "#VFI_AKONT", "#VFI_ZUAWA", "#VFI_FDGRV", "#VFI_BUSAB", "#VFI_GRIDT", "#VFI_ZTERM", "#VFI_ZWELS", "#VFI_KVERM", "#VFI_HBKID", "#VFI_CERDT", "#VFI_MINDK", "#VFI_GRICD", "#VFI_ZAHLS", "#VFI_FRGRP", "#VFI_EVRNR", "#VFI_ASEND"],
    GV_FIELVMM = ["", "#VMM_EKORG", "#VMM_WAERS", "#VMM_ZTERM", "#VMM_ASEND"],
    GV_FIELDSD = ["", "#CSD_VKORG", "#CSD_VKBUR", "#CSD_VKGRP", "#CSD_TAXKD", "#CSD_BZIRK", "#CSD_KTGRD", "#CSD_KDGRP", "#CSD_AWAHR", "#CSD_ZTERM", "#CSD_WAERS", "#CSD_KONDA", "#CSD_KALKS", "#CSD_PLTYP", "#CSD_VERSG", "#CSD_LPRIO", "#CSD_VSBED", "#CSD_ASEND"];
// vade arraylari 
var GV_FIELDVADETIM = ["", "", "#NMTIM", "#OMTIM"],
    GV_FIELDVADEATLAS = ["", "", "#NMATL", "#OMATL"];
var GV_RFRNC = "";
var GV_EVRNR = "";
/* Datatable Post Data Array*/
var addrArr = bankArr = contArr = custFIArr = custSDArr = vendFIArr = vendMMArr = softPMArr = [];
// VADE 
var vadeTim = vadeAtlas = [];
var VadePMTim = VadePMAtlas = "";
var mapsCountry = mapsCtiy = mapsDistrict = "";
/* Datatables*/
var addrDT = contDT = bankDT = custFI = custSD = vendFI = vendMM = softPM = "";
/* ------------------------------------ END: GLOBAL VARIABLES   ------------------------------------ */
function tarihDuzelt(resdt) {
    var year = day = month = "";
    year = resdt.substring(0, 4);
    month = resdt.substring(4, 6);
    day = resdt.substring(6, 8);
    var rtdate = day + "." + month + "." + year;
    return rtdate;
}
/* ------------------------------------ BEGIN: START FUNCTION   ------------------------------------ */
function fStart() {
    //REMOVE URL PARAMETERS
    fRemoveURL();
    //CHOSEN
    fSelectChoosen();
    //TOOLTIP
    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>").addClass("arrow").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
            }
        }
    });
    fSetDynamicBg();
    //SET PAGE TEXT
    fSetPageText();
    //CREATE DATATABLE
    fCreateDatable();
    //SET INITIAL TABS
    var $tabs = $('#tabs').tabs({ show: 'slide', hide: 'slide' });
    var tabsTotal = $(".ui-tabs-panel").length;
    var addButton = function(rel, text) {
        return $("<a>").attr("href", "#tabs").attr("rel", rel).addClass("tab-nav").append(text);
    };
    $(".ui-tabs-panel").each(function(i) {
        if ((i + 1) < tabsTotal) {
            $(this).append(addButton(i + 1, "<div class='next' data-actio='next' style='float:right;'>" + sessionStorage.getItem('00042') + "</div>"));
            $(this).prepend(addButton(i + 1, "<div class='next' data-actio='next' style='float:right;bottom:35px'>" + sessionStorage.getItem('00042') + "</div>"));
        }
        if (i != 0) {
            $(this).append(addButton(i - 1, "<div class='back' data-actio='back' style='float:left;'>" + sessionStorage.getItem('00043') + "</div>"));
            $(this).prepend(addButton(i - 1, "<div class='back' data-actio='back' style='float:left;bottom:35px'>" + sessionStorage.getItem('00043') + "</div>"));
        }
    });
    //UI BUTTONS
    $(".next, .back, #addbk, #addpm, #delbk, #delpm, #submit, #savus, #delus, #crole, #copro, #savro, #delro, #addtx, #savtx, #savpr, .clear, .saverow").button();
    $("#creat, #chang, #viewx, #smail, #rfrnc,#fchan").button();
    GV_LAND1 = $("#LAND1_SH").html();
}
/* ------------------------------------ END: START FUNCTION     ------------------------------------ */
/* ------------------------------------ BEGIN: CREATE DATATABLE ------------------------------------ */
function fCreateDatable() {
    //responsive: true olduğunda autoWidth false olacak 
    /*bFilter: false*/
    var def = { columnDefs: [{ className: "details-control", orderable: false, targets: 0 }], "paging": false, "info": false, "bFilter": false, "bJQueryUI": true, "ordering": false, autoWidth: true /* , responsive: true */ },
        /*bFilter: true*/
        df2 = { columnDefs: [{ className: "details-control", orderable: false, targets: 0 }], "paging": false, "info": false, "bFilter": true, "bJQueryUI": true, "ordering": false, autoWidth: true /* , responsive: true */ };
    addrDT = $('#addrDT').DataTable(def);
    contDT = $('#contDT').DataTable(def);
    bankDT = $('#bankDT').DataTable(def);
    softPM = $('#softPM').DataTable(def);
    custFI = $('#custFI').DataTable(def);
    custSD = $('#custSD').DataTable(df2);
    vendFI = $('#vendFI').DataTable(def);
    vendMM = $('#vendMM').DataTable(def);
    VadePMTim = $('#VadePMTim').DataTable(def);
    VadePMAtlas = $('#VadePMAtlas').DataTable(def);
}
/* ------------------------------------ END: CREATE DATATABLE   ------------------------------------ */
/* ------------------------------------ BEGIN: SET PAGE TEXT    ------------------------------------ */
function fSetPageText() {
    GV_LANGU = $("#ptext").attr("data-id");
    GV_PTEXT = $("#ptext").val();

    $(GV_PTEXT).find('translation').each(function() {
        var id = $(this).attr('id');
        var text = $(this).find(GV_LANGU).text();
        $("." + id).html(text);
        sessionStorage.setItem(id, text);
        $("div").each(function() {
            if ($(this).data("lang") == id) {
                var a = $(this).attr("class");
                if (a) {
                    var b = a.search("ui-dialog");
                    0 == b ? $(this).dialog("option", "title", text) : $(this).attr("title", text)
                }
            }
        });
        $("a").each(function() { var lang = $(this).data("lang"); if (lang == id) $(this).attr('title', text); });
        $("textarea").each(function() { var lang = $(this).data("lang"); if (lang == id) $(this).attr('title', text); });
        $("input").each(function() { var lang = $(this).data("lang"); if (lang == id) $(this).attr('title', text); });
        $("select").each(function() { var lang = $(this).data("lang"); if (lang == id) $(this).attr('title', text); });
        $("i").each(function() { var lang = $(this).data("lang"); if (lang == id) $(this).attr('title', text); });
    });
    $(".ui-dialog-titlebar-close").attr("title", "");
    var cusve = { "": "", "CUST": sessionStorage.getItem('00022'), "VEND": sessionStorage.getItem('00023') };
    $.each(cusve, function(id, value) {
        $('#CUSVE, #CUSVE_SH, #CUSVE_SH2,#CLASS').append($("<option></option>").attr("value", id).text(value));
    });
    $("#CUSVE, #CUSVE_SH,#CUSVE_SH2, #CLASS").trigger('chosen:updated');
    $("#CUSVE, #CUSVE_SH,#CUSVE_SH2, #CLASS").val($("#uclass").val()).trigger('change').trigger('chosen:updated');

    $("#BUKRS_SH2_chosen").css("width", "100%");
    $("#LAND1_SH2_chosen").css("width", "100%");
    $("#CUSVE_SH2_chosen").css("width", "100%");

    if (href == "a012" || href == "a013" || href == "a014" || href == "a015") {
        $("#BUKRS_SH_chosen").css("width", "100%");
        $("#LAND1_SH_chosen").css("width", "100%");
        $("#CUSVE_SH_chosen").css("width", "100%");
    }
    if (GV_LANGU == "T") {
        $(".ch-img-1").css("background-image", "url(img/01_TR.jpg)");
        $(".ch-img-2").css("background-image", "url(img/02_TR.jpg)");
        $(".ch-img-3").css("background-image", "url(img/03_TR.jpg)");
        $(".ch-img-4").css("background-image", "url(img/04_TR.jpg)");
        $(".ch-img-5").css("background-image", "url(img/05_TR.png)");
        $(".ch-img-6").css("background-image", "url(img/06_TR.png)");
        $("#logo").attr("src", "img/logo_tr.png");
        $.datepicker.setDefaults($.datepicker.regional['tr']);
        GV_SRECORD = "Sonuç bulunamadı!"; //select option'da kayıt yok ise
    } else {
        $(".ch-img-1").css("background-image", "url(img/01_EN.jpg)");
        $(".ch-img-2").css("background-image", "url(img/02_EN.jpg)");
        $(".ch-img-3").css("background-image", "url(img/03_EN.jpg)");
        $(".ch-img-4").css("background-image", "url(img/04_EN.jpg)");
        $("#logo").attr("src", "img/logo_en.png");
        $.datepicker.setDefaults($.datepicker.regional['en']);
        GV_SRECORD = "No results!";
    }
}
/* ------------------------------------ END: SET PAGE TEXT      ------------------------------------ */
/* ------------------------------------ BEGIN: SKIP SCREEN      ------------------------------------ */
var href = document.location.href;
href = href.substr(href.lastIndexOf('/') + 1);
href = href.substr(0, 4);
$("#custSkip, #vendSkip").on('click', function() {
    $("#page-wrap").show();
    $("#start").hide();
    var selct = sysid = lv_system = "";
    $(".selCust, .selVend").each(function() {
        lv_system = $(this).attr('alt');
        if (selct) {
            selct = selct.concat(", ", $(this).attr('alt'));
        } else {
            selct = $(this).attr('alt');
        }
        switch ($(this).attr('alt')) {
            case 'SAP':
                sysid = sysid.concat("DS001_");
                break;
            case 'TIM':
                sysid = sysid.concat("DS002_");
                break;
            case 'SOFT':
                sysid = sysid.concat("DS003_");
                break;
            case 'ETA':
                sysid = sysid.concat("DS004_");
                break;
            case 'ATLAS':
                sysid = sysid.concat("DS005_");
                break;
        }
    });
    selct = sessionStorage.getItem("00026").concat(" ").concat(selct);
    $("#selct").html(selct);
    //TIM veya SOFT seçilmediyse alanları gizleniyor..
    var text = $.trim(sysid);
    var findTIM = "DS002_";
    var findSFT = "DS003_";
    if (text.indexOf(findTIM) == -1) $(".tim").remove();
    lv_cari = "";
    if (this.id == 'custSkip') {
        GV_CUSVE = lv_cari = "CUST";
        sysid = "CUST_".concat(sysid);
        if (href == "a002") {
            $("#tabs").find('li:eq(6)').hide();
            $("#tabs").find('li:eq(7)').hide();
            $(".TSUPP").hide();
        }
    } else if (this.id == 'vendSkip') {
        GV_CUSVE = lv_cari = "VEND";
        sysid = "VEND_".concat(sysid);
        if (href == "a002") {
            $("#tabs").find('li:eq(3)').hide();
            $("#tabs").find('li:eq(4)').hide();
            $(".CGUID").hide();
            //$("#tabs").find('li:eq(5)').hide();
        }
    }
    sessionStorage.setItem("selct", this.id);
    sessionStorage.setItem("sysid", sysid);
    if (href == "a002" || href == "a012") {
        $.ajax({ id: "DEFEN", data: { "proce": "DEFEN" } });
    } else if (href == "a009") {
        $.ajax({ id: "VADLT", data: { "proce": "VADLT" } });
    } else {
        $.ajax({ id: "ACTVC", data: { "proce": "ACTVC" } });
    }
    if (GV_PARAM == "CREAT") {
        $.ajax({ id: "AUTHR", data: { "value": lv_system, "value1": "X" } });
    }
});
$(".ch-item").mouseleave(function() {
    $("#customer").find("span").removeClass();
    $("#custSkip").hide();
    $("#vendor").find("span").removeClass();
    $("#vendSkip").hide();
});
/* ------------------------------------ BEGIN: SKIP SCREEN      ------------------------------------ */
/* ------------------------------------ BEGIN: CHECK ZTERM      ------------------------------------ */
//SD ödeme vadesi FI ödeme vadesinden farklı ise uyarı verilecek!!
function fCheckZTERM(arrname, $this, column, bukrs) {
    var data;
    if (arrname == "cstfi") {
        custFIArr = [];
        custFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
            custFIArr.push(this.data());
        });
        data = {
            cstfi: custFIArr,
            zterm: $this.val(),
            vkorg: $("#CSD_VKORG" + GV_ROWID).val()
        };
    } else {
        custSDArr = [];
        custSD.rows().every(function(rowIdx, tableLoop, rowLoop) {
            custSDArr.push(this.data());
        });
        data = {
            cstsd: custSDArr,
            zterm: $this.val(),
            bukrs: bukrs
        };
    }
    var flag = $.ajax({ id: "ZTERM", data: data });
    if (flag.responseJSON.messtyp == "E") {
        $("#message").html(flag.responseJSON.message).dialog("open");
    }
    return true;
}
/* ------------------------------------ END: CHECK ZTERM        ------------------------------------ */
/* ------------------------------------ BEGIN: SAVE FUNCTION    ------------------------------------ */
function save(val) {
    var flag2 = [];
    addrArr = [];
    addrDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        addrArr.push(this.data());
    });
    bankArr = [];
    bankDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        bankArr.push(this.data());
    });
    contArr = [];
    contDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        contArr.push(this.data());
    });
    softArr = [];
    softPM.rows().every(function(rowIdx, tableLoop, rowLoop) {
        softArr.push(this.data());
    });
    vadeAtlas = [];
    VadePMAtlas.rows().every(function(rowIdx, tableLoop, rowLoop) {
        vadeAtlas.push(this.data());
    });
    vadeTim = [];
    VadePMTim.rows().every(function(rowIdx, tableLoop, rowLoop) {
        vadeTim.push(this.data());
    });
    vadeTim = jsonReplace(vadeTim);
    vadeAtlas = jsonReplace(vadeAtlas);
    addrArr = jsonReplace(addrArr);
    bankArr = jsonReplace(bankArr);
    contArr = jsonReplace(contArr);
    softArr = jsonReplace(softArr);

    function jsonReplace(data) {
        for (var roll in data) {
            for (var row in data[roll]) {
                data[roll][row] = data[roll][row].replace(/\"/g, "");
            }
        }
        return data;
    }
    if (sessionStorage.getItem("selct") == "custSkip") {
        custFIArr = [];
        custFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[12]) custFIArr.push(GV_DATA);
        });
        custSDArr = [];
        custSD.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[17]) custSDArr.push(GV_DATA);
        });
        generalFieldControl('custFI', flag2);
    } else {
        vendFIArr = [];
        vendFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[17]) vendFIArr.push(GV_DATA);
        });
        vendMMArr = [];
        vendMM.rows().every(function(rowIdx, tableLoop, rowLoop) { GV_DATA = this.data(); if (GV_DATA[4]) vendMMArr.push(GV_DATA); });
        generalFieldControl('vendFI', flag2);
    }
    generalFieldControl('allFields', flag2);
    generalFieldControl('stcd2', flag2);
    generalFieldControl('banka', flag2);
    generalFieldControl('vade', flag2);
    var flag_new = [];
    flag_new = fCheckGeneralReq();
    for (var k = 0; k < flag_new.length; k++) {
        flag2.push(flag_new[k]);

    }
    var freturn = flagErrorMessage(flag2);
    if (GV_RFRNC == 'X') {
        $('create').context.forms[0].KTOKD[1].value = $('#KTOKD').val();
        GV_RFRNC = '';
    }
    if (freturn != false) {
        GV_RFRNC2 = "";
        for (var x = 0; x < addrArr.length; x++) {
            if (addrArr[x][4] == "İstanbul" || addrArr[x][4] == "istanbul") {
                addrArr[x][4] = "Istanbul";
            }
        }
        var Vade = [];
        if (vadeTim.length > 0) {
            for (var i = 0; i < vadeTim.length; i++) {
                if (vadeTim[i][2] != null) {
                    vadeTim[i].splice(1, 0, "DS002");
                    Vade.push(vadeTim[i]);
                }
            }
        }
        if (vadeAtlas.length > 0) {
            for (var i = 0; i < vadeAtlas.length; i++) {
                if (vadeAtlas[i][2] != null) {
                    vadeAtlas[i].splice(1, 0, "DS005");
                    Vade.push(vadeAtlas[i]);
                }
            }
        }
        $.ajax({
            id: "SAVCV",
            data: {
                addrar: addrArr,
                bankar: bankArr,
                softar: softArr,
                contar: contArr,
                custfi: custFIArr,
                custsd: custSDArr,
                vendfi: vendFIArr,
                vendmm: vendMMArr,
                pterms: Vade,
                frData: $("#create").serializeArray(),
                value: val
            }
        });

    } else {
        $('#ajaxl, #ajxlo').fadeOut("fast");
    }
}

function generalFieldControl(validType, flag) {
    if (validType == 'banka') {
        /* Begin : Bnaka hesap tipi  tekillleşmesi :  başlangıc : sarslan : 09062017: */
        var hesapTipi = 0;
        for (var x = 0; x < bankArr.length; x++) {
            hesapTipi = 0
            var ibanCount = 0;
            for (var l = 0; l < bankArr.length; l++) {
                if (bankArr[x][4] == bankArr[l][4] && bankArr[l][10] != 'D') {
                    ibanCount++;
                }
            }
            if (ibanCount > 1) {
                flag.push("00338");
            }
            for (var index = 0; index < GV_SELBNK.length; index++) {
                if (bankArr[x][7] == GV_SELBNK[index] && bankArr[x][10] != 'D') {
                    hesapTipi++;
                }
            }
            if (hesapTipi > 1) {
                flag.push("00337");
            }
        }
    }
    /* Begin : Bnaka hesap tipi TRY1 tekillleşmesi :  başlangıc : sarslan : 09062017: */
    else if (validType == 'custFI') {
        var count = 0;
        for (var roll in custFIArr) {
            if (custFIArr[roll][12] != "") { //Müşteri FI Verisi Girilmemiş ise
                if (custFIArr[roll][2] == "") {
                    flag.push("00136");
                    flag.push("00293");
                }
                count = count + 1;
            }
        }
        if (count == 0) {
            flag.push("00136");
            flag.push("00292");
        }
    } else if (validType == 'vendFI') {
        var count = 0;
        for (var roll in vendFIArr) {
            if (vendFIArr[roll][17] != "") { //Satıcı FI Verisi Girilmemiş ise
                if (vendFIArr[roll][2] == "") {
                    flag.push("00136");
                    flag.push("00293"); //Satıcı Finsan Veriler içersindeki Mutabakat Hesabı Boş ise
                }
                /* BEGIN: Satıcı Finansal Verileri içerisindeki Ödeme Koşulu boş ise uyarı veriyor. Amesud 20170210 */
                if (vendFIArr[roll][7] == "") {
                    flag.push("00136");
                    flag.push("00311");
                }
                /* END: Satıcı Finansal Verileri içerisindeki Ödeme Koşulu boş ise uyarı veriyor . Amesud 20170210 */
                count = count + 1;
            }
        }
        if (count == 0) {
            flag.push("00136");
            flag.push("00292");
        }
        /*END: Hesap grubu girilmediyse kaydet butonunda uyarı verildi. Amesud 20170131 */
        /*BEGIN: Banka TR değil ise Şube zorunluluğu kaldırıldı, swift zorunlu yapıldı. Amesud 20170201 */
        var _bcoun = 0;
        var _bankuname = $("#usernameforiban").html();
        var _bankunameyetki = $("#usernamebnk").html();
        var userAccess = 0;
        for (var i in bankArr) {
            if (bankArr[i].length > 10) {
                if (bankArr[i][10] == "D") {
                    _bcoun = _bcoun + 1;
                }
                if ((bankArr[i][1] == "TR /Türkiye") && (bankArr[i][3] == "") && (bankArr[i][10] != "D")) {
                    flag.push("00310");
                }
                if ((bankArr[i][1] != "TR /Türkiye") && (bankArr[i][6] == "") && (bankArr[i][10] != "D")) {
                    flag.push("00309");
                }
            }
        }
        /*BEGIN: Bu kullanıcılar Banka Tanımlamadan Satıcı Oluşturabilecekler. Amesud 20170224 */
        /* BANKA GECME YETKİSİ TABLOYA BAĞLANDI BURDAN KALDIRILACAK  SARSLAN  20170606 */
        if (_bankuname == "MIRSADEY" || _bankuname == "CULAS" || _bankuname == "ZECIL" || _bankuname == "NKALYONCU" || _bankuname == "DUGULER" || _bankuname == "GULDENE" || _bankuname == "EALVER" || _bankuname == "ZINAL" || _bankuname == "GCANIK") {
            userAccess = 1;
        }
        /* YENİ KOD  */
        if (_bankunameyetki == '1') {
            userAccess = 1;
        }
        /*END:   Bu kullanıcılar Banka Tanımlamadan Satıcı Oluşturabilecekler. Amesud 20170224 */
        if ((bankArr.length == _bcoun) && (userAccess == 0)) {
            flag.push("00259");
        }

        /*END: Banka TR değil ise Şube zorunluluğu kaldırıldı, swift zorunlu yapıldı. Amesud 20170201 */

    } else if (validType == 'allFields') {
        var telnocontarr = "";
        for (var roll in contArr) {
            if (isNotEmpty(contArr[roll][7])) {
                if (!isEmail(contArr[roll][7])) {
                    flag.push("00294");
                } else if ((contArr[roll][7] == "" || contArr[roll][7] == null) && GV_CUSVE == 'CUST') {
                    flag.push("00400");
                }
            }
            if (isNotEmpty(contArr[roll][4])) {
                telnocontarr = contArr[roll][4].replace(/\s/g, '');
                if (!isPhone(telnocontarr)) {
                    flag.push("00295");

                }
            }
            if (isNotEmpty(contArr[roll][5])) {
                telnocontarr = contArr[roll][5].replace(/\s/g, '');
                if (!isPhone(contArr[roll][5])) {
                    flag.push("00296");
                }
            }
            if (isNotEmpty(contArr[roll][6])) {
                telnocontarr = contArr[roll][6].replace(/\s/g, '');
                if (!isPhone(contArr[roll][6])) {
                    flag.push("00297");
                }
            }
            if (telnocontarr == "") {
                flag.push("00205");
            }
        }
    } else if (validType == 'stcd2') {
        var _dummyArr = [];
        var _exemp = "",
            _stcd1 = "",
            _stcd2 = "",
            _land1 = "";
        _dummyArr = $("#create").serializeArray();
        for (var i in _dummyArr) {
            if (_dummyArr[i].name == "EXEMP") {
                _exemp = _dummyArr[i].value;
            } else if (_dummyArr[i].name == "STCD1") {
                _stcd1 = _dummyArr[i].value;
            } else if (_dummyArr[i].name == "STCD2") {
                _stcd2 = _dummyArr[i].value;
            } else if (_dummyArr[i].name == "LAND1") {
                _land1 = _dummyArr[i].value;
            } else if ((_dummyArr[i].name == "KTOKD") && (_dummyArr[i].value.length == 0)) {
                flag.push("00308");
            }
        }
        /*BEGIN: Hesap grubu girilmediyse kaydet butonunda uyarı verildi. Amesud 20170131 */
        if (_stcd2.length == 10) {
            if (_stcd1 == "" && _exemp == "" && _land1 == "TR") {
                flag.push("00307");
            }
        }
    } else if (validType == 'vade') {
        var tim_hata = 0;
        var atlas_hata = 0;
        if (vadeTim.length > 0) {
            tim_hata = 2;
            for (var i = 0; i < vadeTim.length; i++) {
                if (vadeTim[i][2] != "") {
                    tim_hata = 1;
                }
            }
        }
        if (vadeAtlas.length > 0) {
            atlas_hata = 2;
            for (var i = 0; i < vadeAtlas.length; i++) {
                if (vadeAtlas[i][2] != "") {
                    atlas_hata = 1;
                }
            }
        }
        if (tim_hata == 2 && GV_CUSVE == 'CUST') {
            flag.push("00404");
        }
        if (atlas_hata == 2 && GV_CUSVE == 'CUST') {
            flag.push("00403");
        }
        $('#message').dialog({
            resizable: false,
            autoOpen: false,
            show: "highlight",
            hide: "blind",
            position: { my: "center", at: "center", of: window },
            open: function(event, ui) {
                setTimeout(function() {
                    $('#message').dialog('close');
                }, 5000);
            }
        });
        return flag
    }
}

function isEmail(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}

function isPhone(phone) {
    if (phone.length >= 6) {
        return true;
    } else {
        return false;
    }
}

function isNotEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? false : true;
}
/* ------------------------------------ END: SAVE FUNCTION      ------------------------------------ */
/* ------------------------------------ BEGIN: CHECK TABS FORM FIELDS ------------------------------ */
function fCheckTabsFormFields($this, pThis) {
    var LV_TABNAME = Number(pThis.attr("rel")) + 1,
        LV_TABID = pThis.attr("rel");
    var flag = [];
    if (GV_PARAM == "VIEWX") return true;
    //sekme geçişlerinde zorunlu alanlar kontrol ediliyor..
    if (GV_PARAM != "admin") {
        switch (LV_TABNAME) {
            case 2:
                flag = fCheckStartReq($this);
                break;
            case 3:
                flag = fCheckGeneralReq();
                break;
            case 4:
                flag = fCheckBankReq();
                break;
            case 5:
                flag = fCheckFIReq();
                break;
            case 8:
                flag = fCheckFIReq();
                break;
            case 6:
                fPrepareLastTab();
                break;
            case 7:
                if (GV_CUSVE == "CUST") {
                    flag = fChecVade();
                }
            case 9:
                fPrepareLastTab();
                break;
        }
    } else {
        return true;
    }
    return flagErrorMessage(flag);
}

function fChecVade() {
    var flag = [];
    var tim_hata = 2;
    var atlas_hata = 2;
    if ($("#timMat").css("display") != "none") {
        tim_hata = 0;
        VadePMTim.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[2] != "")
                tim_hata = 1;
        });
    }
    if ($("#atlasMat").css("display") != "none") {
        atlas_hata = 0;
        VadePMAtlas.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[2] != "")
                atlas_hata = 1;
        });
    }
    if (atlas_hata == 0 && GV_CUSVE == 'CUST') { flag.push("00403"); }
    if (tim_hata == 0 && GV_CUSVE == 'CUST') { flag.push("00404"); }
    return flag;
}

function flagErrorMessage(flag) {

    if (flag[0]) {
        var message = "",
            list = [];
        $.each(flag, function(i, el) {
            if ($.inArray(el, list) === -1) list.push(el);
        });
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                if (sessionStorage.getItem(list[i])) {
                    message += sessionStorage.getItem(list[i]) + '<br/>';
                } else {
                    message += list[i] + '<br/>';
                }
            }
        };
        $("#message").html(message).dialog("open");
        return false;
    } else if ($("#modalVKN").dialog("isOpen")) {
        return false;
    } else {
        return true;
    }
}
/* ------------------------------------ END: CHECK TABS FORM FIELDS -------------------------------- */
/* ------------------------------------ BEGIN: PREPARE LAST TAB ------------------------------ */
function fPrepareLastTab() {
    if (sessionStorage.getItem("selct") == "custSkip") {
        $("#vfi_last, #vmm_last, .vfi_last, .vmm_last").hide();
        custFIArr = [];
        $("#cfi_last").empty();
        custFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[12]) $("#cfi_last").append("<b>" + sessionStorage.getItem("00095") + "</b> " + GV_DATA[1] + "<br />");
        });
        custSDArr = [];
        $("#csd_last").empty();
        custSD.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[17]) $("#csd_last").append("<b>" + sessionStorage.getItem("00096") + "</b> " + GV_DATA[1] + "<br />");
        });
    } else {
        $("#cfi_last, #csd_last, .cfi_last, .csd_last").hide();
        vendFIArr = [];
        $("#vfi_last").empty();
        vendFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[17]) $("#vfi_last").append("<b>" + sessionStorage.getItem("00095") + "</b> " + GV_DATA[1] + "<br />");
        });
        vendMMArr = [];
        $("#vmm_last").empty();
        vendMM.rows().every(function(rowIdx, tableLoop, rowLoop) {
            GV_DATA = this.data();
            if (GV_DATA[4]) $("#vmm_last").append("<b>" + sessionStorage.getItem("00133") + "</b> " + GV_DATA[1] + "<br />");
        });
    }
}
/* ------------------------------------ END: PREPARE LAST TAB ------------------------------ */
/* ------------------------------------ BEGIN: SUB CONTROLS ------------------------------ */
function fCheckStartReq($this) {
    var flag = [];
    var href = document.location.href;
    href = href.substr(href.lastIndexOf('/') + 1);
    href = href.substr(0, 4);

    //ileri butonuna tıklandığında zorunlu alanlar kontrol ediliyor..
    if (href == "a002") {
        if ($this.firstChild.dataset.actio == "next") {
            if ($("#KTOKD").val() == "") {
                flag.push("00136");
                flag.push("00045");
            }
            if ($("#LAND1").val() == "") {
                flag.push("00136");
                flag.push("00036");
            }
            if ($("#NAME1").val() == "") {
                flag.push("00136");
                flag.push("00037");
            }
            if (($("#LAND1").val() == 'TR' || $("#LAND1").val() == 'CY')) {
                if ($("#STCD2").val() == "" && $("#EXEMP").prop("checked") == false) {
                    flag.push("00136");
                    flag.push("00038");
                } else {
                    if (GV_PARAM != "CHANG" && GV_PARAM != "VIEWX" && GV_PARAM != "CSUBS" && $("#LAND1").val() == "TR") {
                        var value = $("#STCD2").val();
                        var lv_return = "";
                        if (value.length == 10) {
                            lv_return = fCheckVKN(value);
                            if (lv_return) {
                                if ($("#KTOKD").val() != "B008") {
                                    $.ajax({ id: "STCD2", data: { "value": value } });
                                } else {
                                    $("#STCD2_SH2").val(value).trigger("change");
                                    centerOfficeVkn = value;
                                    centerOfficeVknSattus = 1;
                                    $.ajax({ id: "CNVKN", data: { "value": value, "value1": GV_CUSVE } });
                                }
                            } else {
                                flag.push("00130");
                            }
                        } else if (value.length == 11) {
                            lv_return = fCheckTCKN(value);
                            if (lv_return) {
                                if ($("#KTOKD").val() != "B008") {
                                    $.ajax({ id: "STCD2", data: { "value": value } });
                                } else {
                                    centerOfficeVkn = value;
                                    centerOfficeVknSattus = 1;
                                    $.ajax({ id: "CNVKN", data: { "value": value, "value1": GV_CUSVE } });
                                }
                            } else {
                                flag.push("00131");
                            }
                        } else {
                            if ($("#EXEMP").prop("checked") == true) {
                                flag.push("00130");
                            }
                        }
                    }
                }
                $("#TAXCT, #STCD1").prop("disabled", false).trigger('chosen:updated');
                $("#STCD3, #STCD4").prop("disabled", true);
                $(".00049, .00050").next("label").addClass("state-disabled");
            } else {
                $("#TAXCT, #STCD1").prop("disabled", true).trigger('chosen:updated');
                $("#STCD3, #STCD4").prop("disabled", false);
                $(".00049, .00050").next("label").removeClass("state-disabled");
                if (GV_RFRNC != 'X') {
                    if (GV_PARAM == "CREAT" || GV_PARAM == "" || GV_PARAM == "ACTDT") {
                        var name1 = $("#NAME1").val();
                        var name2 = $("#NAME2").val();
                        sessionStorage.setItem("NAMEC", true);
                        $.ajax({ id: "NAMEC", data: { "value": name1, "value1": name2 } });
                    } else {
                        sessionStorage.setItem("NAMEC", false);
                    }
                }
            }
        }
    }
    return flag;
}

function telctrl(tel) {
    tel = tel.replace(/\s/g, '');
    if (isNaN(tel) && tel == "") {
        return "1";
    } else {
        return "0";
    }
}

function fCheckGeneralReq() {
    var flag3 = [];
    var addrCheck = contCheck = false;
    contDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[2] || GV_DATA[3] || GV_DATA[4] || GV_DATA[5] || GV_DATA[6] || GV_DATA[7]) {
            contCheck = true;
            var telnochec = "";
            //dil girilmeli
            if (GV_DATA[2] == "") {
                flag3.push("00063");
            } else {
                fCheckReq("CNT", flag3, GV_DATA[2]);
            }
            if ((GV_DATA[7] == "" || GV_DATA[7] == null) && GV_CUSVE == 'CUST') {
                flag3.push("00400");
            }
            if (isNotEmpty(GV_DATA[4])) {
                telnochec = GV_DATA[4].replace(/\s/g, '');
                if (!isPhone(telnochec)) {
                    flag3.push("00295");
                }
            }
            if (isNotEmpty(GV_DATA[5])) {
                telnochec = GV_DATA[5].replace(/\s/g, '');
                if (!isPhone(telnochec)) {
                    flag3.push("00296");
                }
            }
            if (isNotEmpty(GV_DATA[6])) {
                telnochec = GV_DATA[6].replace(/\s/g, '');
                if (!isPhone(telnochec)) {
                    flag3.push("00297");
                }
            }
            if (telnochec == "") {
                contCheck = false;
            }
        }
    });
    addrDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[3] || GV_DATA[4] || GV_DATA[5] || GV_DATA[6] || GV_DATA[7] || GV_DATA[8]) {
            addrCheck = true;
            if (GV_DATA[3] == "") {
                flag3.push("00036");
            } else if (GV_DATA[3] != "TR" && $("#ATLASNO").val().length == 10) {
                if (gv_atlas_adres_control == 0) {
                    flag3.push("00411");
                    gv_atlas_adres_control++;
                } else {}
            } else {
                fCheckReq("CNT", flag3, GV_DATA[2]);
            }
            if (GV_DATA[4] == "") {
                flag3.push("00312");
            }
        }
    });
    if (!addrCheck) flag3.push("00204");
    if (!contCheck) flag3.push("00205");
    if ($("#KTOKD").val() == "B008" && $("#CENOF").val() == "") {
        flag3.push("00362");
    }
    return flag3;
}

function fCheckBankReq() {
    var flag = [],
        bankcheck = false;
    var _bankuname = $("#usernameforiban").html();
    var _bankunameyetki = $("#usernamebnk").html();
    // iban tekleme
    var bankLn = document.getElementById("bankDT").rows.length;
    /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
    bankDT.rows().every(function(rowIdx, tableLoop, rowLoop) {
        var tur = 0;
        bankcheck = true;
        GV_DATA = this.data();
        // iban tekilleştirme
        var ibanLn = 0;;
        for (var k = 1; k < bankLn; k++) {
            if (document.getElementById('bankDT').rows[k].cells[4] && document.getElementById('bankDT').rows[k].style.display != "none") {
                var ibantxt = document.getElementById('bankDT').rows[k].cells[4];
                if (ibantxt != undefined || ibantxt != null) {
                    if (ibantxt.innerHTML == GV_DATA[4] && GV_DATA[10] != 'D') {
                        ibanLn++;
                    }
                }
            }
        }
        if (ibanLn > 1) {
            flag.push("00338");
        }
        //Banka ülkesi TR ise IBAN girilmeli..
        if (GV_DATA[10] != "D") {
            var hesapTipi = 0;
            if (GV_DATA[1] == "TR /Türkiye" && GV_DATA[4] == "") {
                flag.push("00136");
                flag.push("00081");
            }
            if (GV_DATA[1] == "") {
                flag.push("00136");
                flag.push("00036");
            }
            if (GV_DATA[2] == "") {
                flag.push("00136");
                flag.push("00079");
            }
            if (GV_DATA[5] == "") {
                flag.push("00136");
                flag.push("00082");
            }
            if ((GV_DATA[1] != "TR /Türkiye") && (GV_DATA[6] == "")) {
                flag.push("00136");
                flag.push("00309");
            }
            if ((GV_DATA[3] == "") && (GV_DATA[1] == "TR /Türkiye")) {
                flag.push("00136");
                flag.push("00080");
            }
            for (var index = 0; index < GV_SELBNK.length; index++) {
                if (GV_DATA[7] == GV_SELBNK[index]) {
                    hesapTipi++;
                }
            }
            if (hesapTipi > 1) {
                flag.push("00337");
            }
            if (GV_DATA[1] || GV_DATA[2] || GV_DATA[3]) {
                fCheckReq("BNK", flag, "");
            }
            if (GV_DATA[7] != "" && GV_DATA[9] == "") {
                var hesaptipi_ = [];
                hesaptipi_ = GV_DATA[7].split(/(\d+)/).filter(Boolean);
                if (hesaptipi_[1] == "1") {
                    GV_DATA[9] = "<i class='fa fa-check-square-o' style='font-size:20px;color:#fc7337;padding-left:50px'></i>";
                }
            }
        }
    });
    if (sessionStorage.getItem("selct") == "vendSkip" && !bankcheck) {
        // BANKA GECME YETKİSİ TABLOYA BAĞLANDI BURDAN KALDIRILACAK 
        if (_bankuname == "MIRSADEY" || _bankuname == "CULAS" || _bankuname == "ZECIL" || _bankuname == "NKALYONCU" || _bankuname == "DUGULER" || _bankuname == "GULDENE" || _bankuname == "EALVER" || _bankuname == "ZINAL") {} // Bu kullanıcılar Banka Tanımlamadan Satıcı Oluşturabilecekler. ( Acil istendiği için Hardcode kullanıcı ismi kullanıldı )
        else {}

        if (_bankunameyetki == '0') {
            flag.push("00259");
        }
    }
    return flag;
}

function fCheckFIReq() {
    var flag = [];
    //var count = 0;
    custFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        /*if(GV_DATA[10] != ""){
            count = count + 1;
        }*/
        if (GV_DATA[2] == "" && GV_DATA[10]) {
            flag.push("00136");
            flag.push("00088");
        }
        if (GV_DATA[2] && GV_DATA[10])
            fCheckReq("CFI", flag, GV_DATA[1]);
    });
    vendFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        /*if(GV_DATA[16] != ""){
            count = count + 1;
        }*/
        if (GV_DATA[2] == "" && GV_DATA[16]) {
            flag.push("00136");
            flag.push("00088");
        }
        if (GV_DATA[16])
            fCheckReq("CFI", flag, GV_DATA[1]);
    });
    /*if(count == 0){
        flag.push("00136"); flag.push("00292"); 
    }*/
    return flag;
}

function fCheckPhone($this, key) {
    $this.validate(function(valid, elem, $form, errorMess) {
        if (valid) { GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key); return true; } else { GV_OTABLE.fnUpdate("", GV_ROWID, key); return false; }
    });
}
/* ------------------------------------ END: SUB CONTROLS ------------------------------ */
/* ------------------------------------ BEGIN: SET ACTIVE TABS ------------------------------------- */
function fSetActiveTabs($this) {
    var flag = "",
        LV_TABNAME = Number($this.attr("rel")) + 1,
        LV_TABID = $this.attr("rel");
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
    if (GV_PARAM != "admin") {


        if (LV_TABNAME != '1') {
            fSetTabsHeader();
        } else {
            $("#viewTab1").empty().hide();
        }
        // flag = sessionStorage.getItem("softd"); //soft seçimi kontrolü
        if (sessionStorage.getItem('selct') == "custSkip") {
            if (LV_TABNAME == 7) {
                LV_TABID = 8;
                LV_TABNAME = 9;
            }
            // Begin : ileri geri ayarı baslangıc : 20170516 
            if (flag == "X" && LV_TABNAME == 6) {

                /*
                LV_TABID = 8;
                LV_TABNAME = 9;
                */
                // Begin : ileri geri ayarı bitis : 20170516 
            }
            if (LV_TABNAME == 6) {
                if ($('#sapMat').css('display') == 'none' && $('#timMat').css('display') == 'none' && $('#atlasMat').css('display') == 'none' && $('#softMat').css('display') == 'none') {
                    LV_TABID = 8;
                    LV_TABNAME = 9;
                }
            }
            if (LV_TABNAME == 8) {
                // Begin : ileri geri ayarı baslangıc : 20170516 
                /*
                if (flag == 'X') {
                    LV_TABID = 4;
                    LV_TABNAME = 5;
                } 
                   
                 Begin : ileri geri ayarı bitis : 20170516 else {
                 LV_TABID = 5;
                 LV_TABNAME = 6;
                }
                */
                if ($('#sapMat').css('display') == 'none' && $('#timMat').css('display') == 'none' && $('#atlasMat').css('display') == 'none' && $('#softMat').css('display') == 'none') {
                    LV_TABID = 3;
                    LV_TABNAME = 4;
                } else {
                    LV_TABID = 5;
                    LV_TABNAME = 6;
                }
            }
        } else {
            if (LV_TABNAME == 4) {
                if ($('#sapMat').css('display') == 'none' && $('#timMat').css('display') == 'none' && $('#atlasMat').css('display') == 'none' && $('#softMat').css('display') == 'none') {
                    LV_TABID = 6;
                    LV_TABNAME = 7;
                } else {
                    LV_TABID = 5;
                    LV_TABNAME = 6;
                }
            } else if (LV_TABNAME == 6) {
                if ($('#sapMat').css('display') == 'none' && $('#timMat').css('display') == 'none' && $('#atlasMat').css('display') == 'none' && $('#softMat').css('display') == 'none') {
                    LV_TABID = 6;
                    LV_TABNAME = 7;
                } else {
                    LV_TABID = 5;
                    LV_TABNAME = 6;
                }
            } else if ($this[0].firstChild.className == "back" && LV_TABNAME == 7) {
                LV_TABID = 6;
                LV_TABNAME = 7;
            } else if (($(".tab-nav div").attr('data-actio')) && (LV_TABNAME == 6)) {
                LV_TABID = 2;
                LV_TABNAME = 3;
            } else if (LV_TABNAME == 5 && $this[0].firstChild.classList[0] == 'back') {
                LV_TABID = 2;
                LV_TABNAME = 3;
            }
        }
    }
    LV_TABNAME = "#tabs-" + LV_TABNAME;
    $("#tabs").tabs("enable", LV_TABNAME);
    $("#tabs").tabs("option", "active", LV_TABID);
}
/* ------------------------------------ END: SET ACTIVE TABS    ------------------------------------ */
/* ------------------------------------ BEGIN: SET HEADER TABS  ------------------------------------ */
function fSetTabsHeader() {
    var muaf = saptxt = "";

    if ($("#EXEMP").is(':checked')) { muaf = sessionStorage.getItem('00040'); } else { muaf = sessionStorage.getItem('00041'); }
    if (sessionStorage.getItem('selct') == "custSkip") { saptxt = sessionStorage.getItem('00190'); } else { saptxt = sessionStorage.getItem('00191'); }
    var view =
        '<table style="color:white">' +
        '<tr>' +
        '<td class="viewTab1">' + sessionStorage.getItem('00036') + ': </td>' +
        '<td style="padding-left:10px">' + $("#LAND1 option:selected").text() + '</td>' +
        '<td class="viewTab1">' + sessionStorage.getItem('00037') + ' :</td>' +
        '<td style="padding-left:10px">' + $("#NAME1").val() + '</td>' +
        '<td class="viewTab1">' + sessionStorage.getItem('00291') + ' :</td>' +
        '<td style="padding-left:10px">' + $("#NAME2").val() + '</td>' +
        '<td class="viewTab1">' + saptxt + ' :</td>' +
        '<td style="padding-left:10px">' + $("#SAPNO").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td class="viewTab1">' + sessionStorage.getItem('00038') + ' :</td>' +
        '<td style="padding-left:10px">' + $("#STCD2").val() + '</td>' +
        '<td class="viewTab1">' + sessionStorage.getItem('00039') + ' :</td>' +
        '<td style="padding-left:10px">' + muaf + '</td>' +
        '</tr>' +
        '</table>';
    $("#viewTab1").empty().html(view).show();
}
/* ------------------------------------ END: SET HEADER TABS    ------------------------------------ */
/* ------------------------------------ BEGIN: SET BLOCKAGE FIELDS --------------------------------- */
function fSetBlockageFields($this, gblck, type) {
    /* seçilen müşteri veya satıcı hangi şk, hangi sa org. ve hangi sd alanlarında
    genişletilmiş? kullanıcının bu alanlarda değişiklik yapmaya yetkisi var mı? */
    if ($this.value) {

        if (type.length > 0) {
            $.ajax({ id: "BLCHK", data: { "value": type, "value1": $this.value } });
        } else {
            //$.ajax({ id: "", data: { "value": $("#CUSVE").val(), "value1": $this.value } });
        }
    }
    if (type == "CUST") {
        $('#cust_n_3').css('display', 'inherit');
        $('#vend_n_3').css('display', 'none');
    } else if (type == "VEND") {
        $('#vend_n_3').css('display', 'inherit');
        $('#cust_n_3').css('display', 'none');
    }
    $(".bukrs_blk , .sd_blk , .vend_blk_ky , .vend_blk_dl .vend_blk_sd .vend_blk_sddl").find('input:text').val('');
    $(".bukrs_blk , .sd_blk , .vend_blk_ky , .vend_blk_dl .vend_blk_sd .vend_blk_sddl").find("select").val('').trigger('chosen:updated');
    $(".bukrs_blk , .sd_blk , .vend_blk_ky , .vend_blk_dl .vend_blk_sd .vend_blk_sddl").find("input:checkbox").removeAttr('checked');
    $.ajax({ id: "BLCFD", data: { "value": $("#new_blk_sc").serializeArray() } });
    $("#blk_kyt_cust").css("display", "none");
    $("#blk_sd_cust").css("display", "none");
    if (type == "CUST") {
        $("#blk_kyt_cust").css("display", "inherit");
    } else if (type == "VEND") {
        /*
        $('#vend_n_3').css('display', 'inherit');
        $('#cust_n_3').css('display', 'none');
        */
    }
}
/* ------------------------------------ END: SET BLOCKAGE FIELDS ----------------------------------- */
/* ------------------------------------ BEGIN: LAUNCH FULL SCREEN----------------------------------- */
$("#fullScreen").on('click', function() {
    if ($(this).attr('data-click-state') == 0 || $(this).attr('data-click-state') == null) {
        $(this).attr('data-click-state', 1);
        $("body").removeClass("bodybckg");
        launchFullscreen(document.documentElement);
    } else {
        $(this).attr('data-click-state', 0);
        $("body").addClass("bodybckg");
        exitFullscreen();
    }
});

function launchFullscreen(element) {
    if (element.requestFullscreen) { element.requestFullscreen(); } else if (element.mozRequestFullScreen) { element.mozRequestFullScreen(); } else if (element.webkitRequestFullscreen) { element.webkitRequestFullscreen(); } else if (element.msRequestFullscreen) { element.msRequestFullscreen(); }
}

function exitFullscreen() {
    if (document.exitFullscreen) { document.exitFullscreen(); } else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
}
/* ------------------------------------ END: LAUNCH FULL SCREEN ------------------------------------ */
/* ------------------------------------ BEGIN: CHECK TCKN       ------------------------------------ */
function fCheckTCKN(a) {
    if (a.substr(0, 1) == 0 || a.length != 11) {
        return false;
    }
    var i = 9,
        md = '',
        mc = '',
        digit, mr = '';
    while (digit = a.charAt(--i)) {
        i % 2 == 0 ? md += digit : mc += digit;
    }
    if (((eval(md.split('').join('+')) * 7) - eval(mc.split('').join('+'))) % 10 != parseInt(a.substr(9, 1), 10)) {
        if (((eval(md.split('').join('+')) * 7) - ((eval(mc.split('').join('+'))) % 10)) != parseInt(a.substr(9, 1), 10)) {
            return false;
        }
    }
    for (c = 0; c <= 9; c++) {
        mr += a.charAt(c);
    }
    if (eval(mr.split('').join('+')) % 10 != parseInt(a.substr(10, 1), 10)) {
        return false;
    }
    return true;
}
/* ------------------------------------ END: CHECK TCKN         ------------------------------------ */
/* ------------------------------------ BEGIN: CHECK VKN        ------------------------------------ */
function fCheckVKN(kno) {
    var v1 = 0,
        v2 = 0,
        v3 = 0,
        v4 = 0,
        v5 = 0,
        v6 = 0,
        v7 = 0,
        v8 = 0,
        v9 = 0,
        v11 = 0,
        v22 = 0,
        v33 = 0,
        v44 = 0,
        v55 = 0,
        v66 = 0,
        v77 = 0,
        v88 = 0,
        v99 = 0;
    var v_last_digit = 0,
        toplam = 0,
        desen = /[0-9]{10}/;
    v1 = (Number(kno.charAt(0)) + 9) % 10;
    v2 = (Number(kno.charAt(1)) + 8) % 10;
    v3 = (Number(kno.charAt(2)) + 7) % 10;
    v4 = (Number(kno.charAt(3)) + 6) % 10;
    v5 = (Number(kno.charAt(4)) + 5) % 10;
    v6 = (Number(kno.charAt(5)) + 4) % 10;
    v7 = (Number(kno.charAt(6)) + 3) % 10;
    v8 = (Number(kno.charAt(7)) + 2) % 10;
    v9 = (Number(kno.charAt(8)) + 1) % 10;
    v_last_digit = Number(kno.charAt(9));

    v11 = (v1 * 512) % 9;
    v22 = (v2 * 256) % 9;
    v33 = (v3 * 128) % 9;
    v44 = (v4 * 64) % 9;
    v55 = (v5 * 32) % 9;
    v66 = (v6 * 16) % 9;
    v77 = (v7 * 8) % 9;
    v88 = (v8 * 4) % 9;
    v99 = (v9 * 2) % 9;

    if (v1 != 0 && v11 == 0) v11 = 9;
    if (v2 != 0 && v22 == 0) v22 = 9;
    if (v3 != 0 && v33 == 0) v33 = 9;
    if (v4 != 0 && v44 == 0) v44 = 9;
    if (v5 != 0 && v55 == 0) v55 = 9;
    if (v6 != 0 && v66 == 0) v66 = 9;
    if (v7 != 0 && v77 == 0) v77 = 9;
    if (v8 != 0 && v88 == 0) v88 = 9;
    if (v9 != 0 && v99 == 0) v99 = 9;
    toplam = v11 + v22 + v33 + v44 + v55 + v66 + v77 + v88 + v99;

    if (toplam % 10 == 0) toplam = 0;
    else toplam = (10 - (toplam % 10));

    if (toplam == v_last_digit) { return true; } else return false;
}
/* ------------------------------------ END: CHECK VKN          ------------------------------------ */
/* ------------------------------------ BEGIN: SELECT STCD2     ------------------------------------ */
function fSelectSTCD2(value) {
    var vkn = tckn = "";
    if (value.length == 10) { vkn = value; } else { tckn = value }

    for (var key in GV_TAXA1) {
        if (GV_TAXA1[key][0]) {
            var il = "0" + GV_TAXA1[key][0];
            var daire = "0" + GV_TAXA1[key][1];
            var data = "ortakSorgulayanTckno=54850555524&ortakSorgulananVergiNo=" + vkn + "&ortakSorgulananTckno=" + tckn + "&ortakDenemeIl3=" + il + "&ortakSorgulananVd=" + daire + "&sonVergiLevhasiSorgulama=1&cmd=IVD_VERGINO_SORGULA&TOKEN=&LANG=tr";
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });
            xhr.open("POST", "https://intvd.gib.gov.tr/internetvd/dispatch2?_dc=" + (new Date().getTime()));
            xhr.setRequestHeader("host", "intvd.gib.gov.tr");
            xhr.setRequestHeader("origin", "https://intvd.gib.gov.tr");
            xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0");
            xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
            xhr.setRequestHeader("accept-language", "tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3");
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.setRequestHeader("referer", "https://intvd.gib.gov.tr/internetvd/template.jsp?page=IVD_MENU_SORGULAMALAR");
            xhr.setRequestHeader("proxy-authorization", "Digest username=40689016, realm=anonymox.net, nonce=TLMdWAAAAACANp1MG38AAMlp73IAAAAA, uri=intvd.gib.gov.tr:443, response=d7bf06d44393e4fa63e7f9b50683e9f2, qop=auth, nc=0000002b, cnonce=5c188e5e93c111d2");
            xhr.setRequestHeader("connection", "keep-alive");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.setRequestHeader("postman-token", "8310f817-c330-659c-462c-c709c28424ea");

            xhr.send(data);

            //return;           
        }
    }
}
/* ------------------------------------ END: SELECT STCD2       ------------------------------------ */
/* ------------------------------------ BEGIN: DATATABLE FUNCTIONS --------------------------------- */
/*
    1. fModifyTR ---> Satıra tıklandığında bu fonksyiona gelir. 
    2. fRowOpenClose ---> Satırı açar / kapar. 
    3. fChangeChildElement ---> Satırın ilgili sutunundaki metni açılan formdaki elemente set eder.
/* ------------------------------------------------------------------------------------------------ */
/* BEGIN: Formatting function for row details */
/* TRY1 GLABOL BANKA */
var gv_globalBnk = [];
/* TRY1 GLABOL BANKA */
function fModifyTR(table, tableName, thisTR) {
    GV_OTABLE = $("#" + tableName).dataTable();
    GV_TABLE = table;
    GV_TABNAME = tableName;
    GV_ROW = table.row($(thisTR));
    /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
    gv_globalBnk = table;
    /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
    GV_ROWID = table.row(thisTR).index();

    if (GV_ROWID == undefined) GV_ROWID = $(thisTR).prev()[0]._DT_RowIndex;

    //set selected
    if ($(thisTR).hasClass('selected')) {
        $(thisTR).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(thisTR).addClass('selected');
    }

    fRowOpenClose($(thisTR));
    fChangeChildElement();
    if (GV_ROW.length > 9) {
        if (GV_PARAM == "CHANG" && GV_TABNAME == "bankDT" && GV_ROW.data()[10] == "X") {
            $("#BANKS" + GV_ROWID).prop("disabled", true).trigger('chosen:updated');
            $("#BANKA" + GV_ROWID).prop("disabled", true).trigger('chosen:updated');
            $("#BRNCH" + GV_ROWID).prop("disabled", true).trigger('chosen:updated');
            $("#BIBAN" + GV_ROWID).prop("disabled", true).trigger('chosen:updated');
            $("#BANKN" + GV_ROWID).prop("disabled", true).trigger('chosen:updated');
        }
    }
}
/* END: Formatting function for row details */
/* BEGIN: Row Open/Close details */
function fRowOpenClose(tr) {
    if (GV_PARAM == "VIEWX") {
        GV_ROW.child.hide();
        tr.removeClass('shown');
        return;
    }
    if (GV_ROW.child.isShown()) {
        GV_ROW.child.hide();
        tr.removeClass('shown');
    } else {

        GV_ROW.child(openRow()).show();

        //$(".phone").intlTelInput("destroy");
        $(".phone").intlTelInput({
            allowDropdown: true,
            autoPlaceholder: true,
            geoIpLookup: function(callback) {
                //$.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                //var countryCode = (resp && resp.country) ? resp.country : "";
                //callback(countryCode);    
                //});
                callback($("#LAND1").val().toLowerCase());
            },
            initialCountry: "auto",
            nationalMode: true,
            preferredCountries: ["tr", "us", "nl", "kz", "dz", "ae"],
            separateDialCode: false
        });

        $(".clear").attr("title", sessionStorage.getItem('00285')).button();
        $(".saverow").button();
        $(".clear").click(function() {
            switch ($(this).data("name")) {
                case "addrFRM":
                    $.each(GV_FIELDAD, function(i, e) {
                        //if ( !$(e+GV_ROWID).prop("disabled") )
                        $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update");
                    });
                case "contFRM":
                    $.each(GV_FIELDCT, function(i, e) {
                        if (!$(e + GV_ROWID).prop("disabled"))
                            $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update");
                    });
                case "bankFRM":
                    $.each(GV_FIELDBN, function(i, e) {
                        if (!$(e + GV_ROWID).prop("disabled")) {
                            switch (e) {
                                case "#XEZER":
                                    $(e + GV_ROWID).prop("checked", false).trigger("change");
                                    break;
                                default:
                                    $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update");
                            }
                        }
                    });
                case "softFRM":
                    $.each(GV_FIELDSP, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "cfiFRM":
                    $.each(GV_FIELCFI, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "csdFRM":
                    $.each(GV_FIELDSD, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "vfiFRM":
                    $.each(GV_FIELVFI, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "vmmFRM":
                    $.each(GV_FIELVMM, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "timVadeFRM":
                    $.each(GV_FIELDVADETIM, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
                case "atlasVadeFRM":
                    $.each(GV_FIELDVADEATLAS, function(i, e) { if (i > 1 && !$(e + GV_ROWID).prop("disabled")) { $(e + GV_ROWID).val("").trigger("change").trigger("chosen-update"); } });
            }
        });
        $(".cerdt").datepicker();
        fSelectChoosen();
        $.validate({
            modules: 'sepa'
        });
        tr.addClass('shown');
    }

    if (GV_ROW.data()) {
        switch (GV_TABNAME) {
            case "custFI":
                var fisub = $.ajax({ id: "FISUB", data: { "value": GV_ROW.data()[1], "kunnr": $("#SAPNO").val() } });
                var lv_x = false;
                if (fisub.responseJSON.message) {
                    if (fisub.responseJSON.message.message) {
                        GV_ROW.child.hide();
                        tr.removeClass('shown');
                        $("#errMes").html(fisub.responseJSON.message.message).dialog("open");
                    } else {
                        fUpdateRowField(GV_FIELCFI);
                        lv_x = true;
                    }
                } else {
                    fUpdateRowField(GV_FIELCFI);
                    lv_x = true;
                }
                if (lv_x) {
                    if (GV_PARAM == "CREAT") {
                        fSetReadOnly("CFI", GV_ROW.data()[1]);
                        fSetDefault("CFI", GV_ROW.data()[1]);
                    } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                        fSetReadOnly("CFI", GV_ROW.data()[1]);
                    }
                }
                break;
            case "vendFI":
                var fisub = $.ajax({ id: "FISUB", data: { "value": GV_ROW.data()[1], "lifnr": $("#SAPNO").val() } });
                var lv_x = false;
                if (fisub.responseJSON.message) {
                    if (fisub.responseJSON.message.message) {
                        GV_ROW.child.hide();
                        tr.removeClass('shown');
                        $("#errMes").html(fisub.responseJSON.message.message).dialog("open");
                    } else {
                        fUpdateRowField(GV_FIELVFI);
                        lv_x = true;
                    }
                } else {
                    fUpdateRowField(GV_FIELVFI);
                    lv_x = true;
                }
                if (lv_x) {
                    if (GV_PARAM == "CREAT") {
                        fSetReadOnly("VFI", GV_ROW.data()[1]);
                        fSetDefault("VFI", GV_ROW.data()[1]);
                    } else if (GV_PARAM == "CHANG" || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                        fSetReadOnly("VFI", GV_ROW.data()[1]);
                    }
                }
                break;
            case "vendMM":
                fUpdateRowField(GV_FIELVMM);
                if (GV_PARAM == "CREAT") {
                    fSetReadOnly("VMM", GV_ROW.data()[1]);
                    fSetDefault("VMM", GV_ROW.data()[1]);
                } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                    fSetReadOnly("VMM", GV_ROW.data()[1]);
                }
                break;
            case "custSD":
                var sdsub = $.ajax({ id: "SDSUB", data: { "value": GV_ROW.data()[1], "kunnr": $("#SAPNO").val() } });
                var lv_x = false;
                if (sdsub.responseJSON.message) {
                    if (sdsub.responseJSON.message.message) {
                        GV_ROW.child.hide();
                        tr.removeClass('shown');
                        $("#errMes").html(sdsub.responseJSON.message.message).dialog("open");
                    } else {
                        fUpdateRowField(GV_FIELDSD);
                        lv_x = true;
                    }
                } else {
                    fUpdateRowField(GV_FIELDSD);
                    lv_x = true;
                }
                if (lv_x) {
                    if (GV_PARAM == "CREAT") {
                        fSetReadOnly("CSD", GV_ROW.data()[1]);
                        fSetDefault("CSD", GV_ROW.data()[1]);
                    } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                        fSetReadOnly("CSD", GV_ROW.data()[1]);
                    }
                }
                GV_DATA = GV_ROW.data();
                if (!GV_DATA[9]) {
                    custFI.rows().every(function(rowIdx, tableLoop, rowLoop) {
                        var x = this.data();
                        var n = x[1].search(sdsub.responseJSON.BUKRS);
                        if (n > 1) {
                            $("#CSD_ZTERM" + GV_ROWID + " option").filter(function() { return $(this).text() == x[7]; }).prop('selected', true).trigger('chosen:updated');
                            /*BEGIN: FI daki şirket kodunun ödeme koşulu SD aynı şirket koduna gelirken üstteki satıra eklenmiyordu, düzeltildi . Amesud 20170301*/
                            var textZterm = $("#CSD_ZTERM" + GV_ROWID).find('option:selected').text();
                            GV_OTABLE.fnUpdate(textZterm, GV_ROWID, 9);
                            /*END:  FI daki şirket kodunun ödeme koşulu SD aynı şirket koduna gelirken üstteki satıra eklenmiyordu, düzeltildi  . Amesud 20170301*/
                        }
                    });
                }
                break;
            case "addrDT":
                fUpdateRowField(GV_FIELDAD);
                if (GV_PARAM == "CREAT") {
                    fSetReadOnly("ADR", "");
                    fSetDefault("ADR", "");
                } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                    fSetReadOnly("ADR", "");
                }
                break;
            case "bankDT":
                fUpdateRowField(GV_FIELDBN);
                if (GV_PARAM == "CREAT") {
                    fSetReadOnly("BNK", "");
                    fSetDefault("BNK", "");
                } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                    fSetReadOnly("BNK", "");
                }
                break;
            case "softPM":
                fUpdateRowField(GV_FIELDSP);
                /*if ( GV_PARAM == "CREAT" ){
                    fSetReadOnly("BNK", "");
                    fSetDefault("BNK", "");
                }else if ( GV_PARAM == "CHANG" ){
                    fSetReadOnly("BNK", "");
                }*/
                break;
            case "contDT":
                fUpdateRowField(GV_FIELDCT);
                if (GV_PARAM == "CREAT") {
                    fSetReadOnly("CNT", "");
                    fSetDefault("CNT", "");
                } else if ((GV_PARAM == "CHANG") || (GV_PARAM == "CSUBS") || (GV_PARAM == "ACTDT")) {
                    fSetReadOnly("CNT", "");
                }
                break;
            case "VadePMAtlas":
                fUpdateRowField(GV_FIELDVADEATLAS);
                break;
            case "VadePMTim":
                fUpdateRowField(GV_FIELDVADETIM);
                break;

        }
    }
    $(".chosen-select").trigger('chosen:updated');
    $('#gomap' + GV_ROWID).locationpicker({
        //location: {latitude: 38.963745, longitude: 35.243322},
        radius: 300,
        inputBinding: {
            latitudeInput: $('#us3-lat'),
            longitudeInput: $('#us3-lon'),
            radiusInput: $('#us3-radius'),
            locationNameInput: $('#LOCAI' + GV_ROWID)
        },
        enableAutocomplete: true,
        enableAutocompleteBlur: true,
        onchanged: function(currentLocation, radius, isMarkerDropped) {
            var addressComponents = $(this).locationpicker('map').location.addressComponents;
            updateControls(addressComponents, currentLocation);
        },
    });
}
/* END: Row Open/Close details */
/* BEGIN: Change Expand Form Element */
function fChangeChildElement() {
    // addrData..
    $(".addr").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDAD);
        e.stopImmediatePropagation();
    });
    $(".addr").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDAD);
        e.stopImmediatePropagation();
    });
    // contact data..
    $(".cont").focusout(function(e) {
        fUpdateTableRow($(this), GV_FIELDCT);
        e.stopImmediatePropagation();
    });
    $(".cont").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDCT);
        e.stopImmediatePropagation();
    });
    $(".cont").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDCT);
        e.stopImmediatePropagation();
    });
    // Customer FI data..
    $(".fief").change(function(e) {
        fUpdateTableRow($(this), GV_FIELCFI);
        e.stopImmediatePropagation();
    });
    $(".fief").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELCFI);
        e.stopImmediatePropagation();
    });
    // Vendor FI data..
    $(".fivf").change(function(e) {
        fUpdateTableRow($(this), GV_FIELVFI);
        e.stopImmediatePropagation();
    });
    $(".fivf").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELVFI);
        e.stopImmediatePropagation();
    });
    // SD data..
    $(".fies").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDSD);
        e.stopImmediatePropagation();
    });
    $(".fies").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDSD);
        e.stopImmediatePropagation();
    });
    // MM data..
    $(".fivm").change(function(e) {
        fUpdateTableRow($(this), GV_FIELVMM);
        e.stopImmediatePropagation();
    });
    $(".fivm").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELVMM);
        e.stopImmediatePropagation();
    });
    // bank data..
    $(".bank").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDBN);
        e.stopImmediatePropagation();
    });
    $(".bank").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDBN);
        e.stopImmediatePropagation();
    });
    // soft data..
    $(".soft").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDSP);
        e.stopImmediatePropagation();
    });
    $(".soft").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDSP);
        e.stopImmediatePropagation();
    });
    $(".timvade").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDVADETIM);
        e.stopImmediatePropagation();
    });
    $(".timvade").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDVADETIM);
        e.stopImmediatePropagation();
    });
    $(".atlasvade").change(function(e) {
        fUpdateTableRow($(this), GV_FIELDVADEATLAS);
        e.stopImmediatePropagation();
    });
    $(".atlasvade").keypress(function(e) {
        if (e.keyCode == 13 || e.keyCode == 9) fUpdateTableRow($(this), GV_FIELDVADEATLAS);
        e.stopImmediatePropagation();
    });
}
/* END: Change Expand Form Element */
/* BEGIN: Update Table Row Column */
function fUpdateTableRow($this, arr) {
    var idname = $this[0].id.substring(0, 3),
        name = "#" + $this[0].id.substring(0, 5),
        flag = "",
        key = "",
        ibanuname = "",
        ibanyetki = "",
        ibanconfirm = false;

    ibanuname = $("#usernameforiban").html(); // IBAN KONTROLÜNE TAKILMAYACAK KULLANICILAR İÇİN
    ibanyetki = $("#usernameiban").html();
    ibanuname = ibanuname.toUpperCase();
    if (ibanuname == "CULAS" || ibanuname == "MIRSADEY" || ibanuname == "HAGOK" || ibanuname == "EALVER" || ibanuname == "ZECIL" || ibanuname == "NKALYONCU" || ibanuname == "GULDENE") { // IBAN KONTROLÜNE TAKILMAYACAK KULLANICILAR İÇİN ( Acil Olduğu için hardcode kullanıcı adı girildi )
        ibanconfirm = true;
    } else {
        ibanconfirm = false;
    }
    // iban kontrolün 
    if (ibanyetki == "1") { // IBAN KONTROLÜNE TAKILMAYACAK KULLANICILAR İÇİN ( Acil Olduğu için hardcode kullanıcı adı girildi )
        ibanconfirm = true;
    } else {
        ibanconfirm = false;
    }
    if (idname == "CFI" || idname == "CSD" || idname == "VFI" || idname == "VMM")
        name = "#" + $this[0].id.substring(0, 9);
    if ($this[0].className == "bank") {
        if (GV_ROW.context[0].aoData[0]._aData[10] == "X") {
            GV_OTABLE.fnUpdate("U", GV_ROWID, 10);
        }
    }
    $.each(arr, function(i, e) { if (e == name) { key = i; return false; } });
    if (key) {
        if ($this[0].tagName == "INPUT") {
            switch (name) {
                case "#TELNO":
                    fCheckPhone($this, key);
                    break;
                case "#FAXNO":
                    fCheckPhone($this, key);
                    break;
                case "#CEPNO":
                    fCheckPhone($this, key);
                    break;
                case "#BIBAN":
                    var val = $this.val();
                    val = val.replace(/\s/g, '');
                    /*BEGIN:  Iban girildiğinde büyük harfe çeviriyor. Amesud 20170216*/
                    val = val.toUpperCase();
                    /*END:  Iban girildiğinde büyük harfe çeviriyor. Amesud 20170216*/
                    //iban tekleme
                    $this.val(val);

                    var bankLn = document.getElementById("bankDT").rows.length;
                    var ibanLn = 0;
                    for (var k = 1; k < bankLn; k++) {
                        if (document.getElementById('bankDT').rows[k].cells[4] && document.getElementById('bankDT').rows[k].style.display != "none") {
                            var ibantxt = document.getElementById('bankDT').rows[k].cells[4];
                            if (ibantxt != undefined || ibantxt != null) {
                                if (ibantxt.innerHTML == val && gv_globalBnk.row(k).data()[10] != 'D') {
                                    ibanLn++;
                                }
                            }
                        }
                    }
                    if (ibanLn > 0) {
                        var flag = [];
                        flag.push("00338");
                        flagErrorMessage(flag);
                        $this.val("");
                    } else {
                        $this.validate(function(valid, elem, $form, errorMess) {
                            if (valid || ibanconfirm) {
                                $.ajax({ id: "BIBAN", data: { "value": val } });
                                GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                                $this.attr("data-validation-error-msg", "");
                            } else {
                                $this.attr("data-validation-error-msg", sessionStorage.getItem("00210"));
                                GV_OTABLE.fnUpdate("", GV_ROWID, key);
                                $("#BANKS" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");
                                $("#BANKA" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");
                                $("#BRNCH" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");

                                $("#SWIFT" + GV_ROWID).val("").trigger("change");
                                $("#BANKN" + GV_ROWID).val("").trigger("change");
                            }
                        });
                    }
                    break;
                case "#XEZER":
                    var val;
                    $this.prop("checked") ? val = "X" : val = "";
                    if (val == "X") val = checksq;
                    GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                    break;
                case "#POSTL":
                    if ($("#ALAND" + GV_ROWID).val() == "TR") {
                        $this.attr({ "required": "true", "data-validation": "length", "data-validation-length": "min5" });
                    } else {
                        $this.attr({ "required": "false", "data-validation": "", "data-validation-length": "" });
                        GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key);
                    }
                    $this.validate(function(valid, elem) {
                        if (valid) { GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key); } else { GV_OTABLE.fnUpdate("", GV_ROWID, key); }
                    });
                    break;
                case "#EMAIL":
                    $this.validate(function(valid, elem) {
                        if (valid) { GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key); } else { GV_OTABLE.fnUpdate("", GV_ROWID, key); }
                    });
                    break;
                case "#LINKN":
                    $this.validate(function(valid, elem) {
                        if (valid) { GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key); } else { GV_OTABLE.fnUpdate("", GV_ROWID, key); }
                    });
                    break;
                case "#CSD_AWAHR":
                    $this.validate(function(valid, elem) {
                        if (valid) { GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key); } else { GV_OTABLE.fnUpdate("", GV_ROWID, key); }
                    });
                    break;
                case "#CFI_ASEND":
                    var val;
                    $this.prop("checked") ? val = "X" : val = "";
                    if (val == "X") {
                        val = checksq;
                        $("#message").html(sessionStorage.getItem("00168")).dialog("open");
                    }
                    GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                    break;
                case "#CSD_ASEND":
                    var val;
                    $this.prop("checked") ? val = "X" : val = "";
                    if (val == "X") {
                        val = checksq;
                        $("#message").html(sessionStorage.getItem("00168")).dialog("open");
                    }
                    GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                    break;
                case "#VFI_ASEND":
                    var val;
                    $this.prop("checked") ? val = "X" : val = "";
                    if (val == "X") {
                        val = checksq;
                        $("#message").html(sessionStorage.getItem("00168")).dialog("open");
                    }
                    GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                    break;
                case "#VMM_ASEND":
                    var val;
                    $this.prop("checked") ? val = "X" : val = "";
                    if (val == "X") {
                        val = checksq;
                        $("#message").html(sessionStorage.getItem("00168")).dialog("open");
                    }
                    GV_OTABLE.fnUpdate(val, GV_ROWID, key);
                    break;
                default:
                    GV_OTABLE.fnUpdate($this.val(), GV_ROWID, key);
            }
        } else if ($this[0].tagName == "SELECT") {
            var text = $this.find('option:selected').text();
            if (!$this.val()) text = "";
            switch (name) {
                case "#CFI_ZTERM":
                    flag = fCheckZTERM("cstsd", $this, key, $("#CFI_BUKRS" + GV_ROWID).val());
                    if (flag) { GV_OTABLE.fnUpdate(text, GV_ROWID, key); } else {
                        $(name + GV_ROWID).val("").prop('selected', false).trigger('chosen:updated');
                        GV_OTABLE.fnUpdate("", GV_ROWID, key);
                    }
                    break;
                case "#CSD_ZTERM":
                    flag = fCheckZTERM("cstfi", $this, key);
                    if (flag) { GV_OTABLE.fnUpdate(text, GV_ROWID, key); } else {
                        $(name + GV_ROWID).val("").prop('selected', false).trigger('chosen:updated');
                        GV_OTABLE.fnUpdate("", GV_ROWID, key);
                    }
                    break;
                case "#CFI_ZWELS":
                case "#VFI_ZWELS":
                    // Azami 10 ödeme biçimi olanaklı
                    var countSelect = 0;
                    $(name + GV_ROWID + " option:selected").each(function(e) {
                        countSelect++;
                        if (countSelect > 11) {
                            $(this).prop('selected', false);
                            $(name + GV_ROWID).trigger('chosen:updated');
                        }
                    });
                    if (countSelect > 11) {
                        $("#errMes").html(sessionStorage.getItem("00169")).dialog("open");
                    } else {
                        $(name + GV_ROWID + " option:selected").each(function() { if ($(this).text()) flag += $(this).text() + "#"; });
                        GV_OTABLE.fnUpdate(flag, GV_ROWID, key);
                    }
                    break;
                case "#CSD_VKBUR":
                    $.ajax({ id: "SDGRD", data: { "value": $this.val() } });
                    GV_OTABLE.fnUpdate(text, GV_ROWID, key);
                    break;
                case "#BANKS":
                    if ($("#BANKS" + GV_ROWID).val() == "TR") {
                        $this.attr({ "required": "true", "data-validation": "length", "data-validation-length": "max34" });
                        $("#BIBAN" + GV_ROWID + ", #BANKA" + GV_ROWID + ", #BRNCH " + GV_ROWID).attr({ "required": "true" });
                    } else {
                        $this.attr({ "required": "false", "data-validation": "", "data-validation-length": "" });
                        $("#BIBAN" + GV_ROWID + ", #BANKA" + GV_ROWID + ", #BRNCH " + GV_ROWID).attr({ "required": "false" });
                    }
                    $.ajax({ id: "BANKS", data: { "value": $this.val() } });
                    GV_OTABLE.fnUpdate(text, GV_ROWID, key);
                    $("#BANKA" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");
                    $("#BRNCH" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");
                    break;
                case "#BANKA":
                    setTimeout(function() {
                        $('#ajxlo').show();
                        $.ajax({ id: "BANKA", data: { "value": $this.val(), "value1": $("#BANKS" + GV_ROWID).val() } });
                        GV_OTABLE.fnUpdate(text, GV_ROWID, key);
                        $("#BRNCH" + GV_ROWID).val("").trigger("change").trigger("chosen:updated");
                        var resib = sessionStorage.getItem("RESBIBAN");
                        if (resib) {
                            resib = jQuery.parseJSON(resib);
                            $("#BRNCH" + GV_ROWID).val(resib).trigger("change").trigger("chosen:updated");
                            var biban_tur = sessionStorage.getItem("RESBIBAN_STATS");
                            biban_tur = parseInt(biban_tur) - 1;
                            if (biban_tur == 0) {
                                sessionStorage.removeItem("RESBIBAN");
                                sessionStorage.removeItem("RESBIBAN_STATS");
                            }
                        } /*END:  Banka değişince inputtaki şube değişiyordu, satırdaki değişmiyordu, düzeltildi. Amesud 20170216*/
                    }, 0);
                    break;
                case "#DEPAR":
                    if ($("#" + $this[0].id).val() == "G") {
                        $("#CCURTDIV" + $this[0].id.substring(5)).show();
                    } else {
                        $("#CCURTDIV" + $this[0].id.substring(5)).hide();
                    }
                default:
                    GV_OTABLE.fnUpdate(text, GV_ROWID, key);
                    /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
                    var kullanilanParaBirimi = [];
                    if (name == "#BVTYP") {
                        /*ilk once para birimini sonu 1 se otomatik talimat*/
                        var parabirimisonu = [];
                        parabirimisonu = text.split(/(\d+)/).filter(Boolean);
                        var tik = "";
                        if (parabirimisonu[1] == "1") {
                            tik = "<i class='fa fa-check-square-o' style='font-size:20px;color:#fc7337;padding-left:50px'></i>";
                            $("#XEZER" + GV_ROWID).prop('checked', true);
                        } else {
                            $("#XEZER" + GV_ROWID).prop('checked', false);
                        }
                        GV_OTABLE.fnUpdate(tik, GV_ROWID, 9);


                        var bankCount = $("#bankDT > tbody > tr").length
                        for (var k = 0; k < bankCount; k++) {
                            if (gv_globalBnk.row(k).data() != undefined) {
                                if (gv_globalBnk.row(k).data()[10] != 'D' && gv_globalBnk.row(k).data()[7] != "") {
                                    kullanilanParaBirimi.push(gv_globalBnk.row(k).data()[7]);
                                }
                            }
                        }
                        GV_SELBNK = kullanilanParaBirimi;
                        for (var k = 0; k < bankCount; k++) {
                            if (gv_globalBnk.row(k).data() != undefined) {
                                var cmbHesapTipi = "#BVTYP" + k + " option";
                                var cmbHesapTipi2 = "#BVTYP" + k;
                                for (var index = 0; index < GV_SELBNK.length; index++) {
                                    $(cmbHesapTipi).each(function() {
                                        if (GV_SELBNK[index] != gv_globalBnk.row(k).data()[7]) {
                                            $(cmbHesapTipi2 + " option[value='" + GV_SELBNK[index] + "']").remove();
                                            //continue;
                                        }
                                    });
                                    /*  for (var index2 = 0; index2 < $(cmbHesapTipi)[0].length; index2++) {
                                          if (GV_SELBNK[index] == $(cmbHesapTipi)[0][index2].value && $(cmbHesapTipi).val() != GV_SELBNK[index]) {
                                              $(cmbHesapTipi + " option[value='" + GV_SELBNK[index] + "']").remove();
                                              continue;
                                          }
                                      }*/
                                }
                            }
                        }
                        var kullanilacakParalar = [];
                        for (var index = 0; index < GV_ALLBNK.length; index++) {
                            var x = 0;
                            for (var index2 = 0; index2 < GV_SELBNK.length; index2++) {
                                if (GV_ALLBNK[index][0] == GV_SELBNK[index2]) {
                                    x++;
                                }
                            }
                            if (x == 0) {
                                kullanilacakParalar.push(GV_ALLBNK[index][0]);
                            }
                        }

                        for (var kk = 0; kk < bankCount; kk++) {
                            if (gv_globalBnk.row(kk).data() != undefined) {
                                var cmbHesapTipi2 = "#BVTYP" + kk + " option";
                                var cmbHesapTipi = "#BVTYP" + kk;
                                for (var index3 = 0; index3 < kullanilacakParalar.length; index3++) {
                                    var x = 0;
                                    /* for (var index4 = 0; index4 < $(cmbHesapTipi)[0].length; index4++) {
                                         if (kullanilacakParalar[index3] == $(cmbHesapTipi)[0][index4].value) {
                                             x++;
                                         }
                                     }*/
                                    $(cmbHesapTipi2).each(function() {
                                        if (kullanilacakParalar[index3] == $(this).val()) {
                                            x++;
                                        }
                                    });
                                    if (x == 0) {
                                        $(cmbHesapTipi).append('<option value="' + kullanilacakParalar[index3] + '">' + kullanilacakParalar[index3] + '</option>');
                                    }
                                }
                            }
                        }
                    } else if (name == "#BRNCH") {

                        var ulke = $("#BANKS" + GV_ROWID).val();
                        var banka = $("#BANKA" + GV_ROWID).val();
                        var sube = $("#BRNCH" + GV_ROWID).val();
                        var rowid = GV_ROWID;
                        if (ulke == "TR" && (sube != null || sube != undefined)) {
                            if (ulke == "TR" && sube.length > 0) {
                                $.ajax({ id: "GETSW", data: { "value": ulke, "value1": banka, "value2": sube, "value3": rowid } });
                            }
                        }
                        if (ulke != "TR") {
                            if (banka != null) {
                                if (banka.length > 0) {
                                    $.ajax({ id: "GETSW", data: { "value": ulke, "value1": banka, "value2": sube, "value3": rowid } });
                                }
                            }
                        }
                    }
                    break;
            }
        }
    }
}
/* END: Update Table Row Column */
/* BEGIN: Change Expand Form Element */
function fUpdateRowField(arr) {
    for (var i = 0; i < arr.length; i++) {
        var tagname = $(arr[i] + GV_ROWID).prop("tagName");
        if (tagname == "INPUT") {
            if ($(arr[i] + GV_ROWID).prop("type") == "checkbox") {
                if (GV_ROW.data()[i] == checksq) {
                    $(arr[i] + GV_ROWID).prop('checked', true);
                } else {
                    $(arr[i] + GV_ROWID).prop('checked', false);
                }
            } else if (arr[i] == "#BIBAN") {
                if ((GV_PARAM == "CHANG" || (GV_PARAM == "ACTDT" && GV_ACTSYST == "ATLAS")) && (GV_ADDBNK > GV_ROWID)) {
                    $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                    $("#BIBAN" + GV_ROWID).prop('readonly', true);
                } else {
                    $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                }
            } else if (arr[i] == "#BANKN") {
                if ((GV_PARAM == "CHANG" || (GV_PARAM == "ACTDT" && GV_ACTSYST == "ATLAS")) && (GV_ADDBNK > GV_ROWID)) {
                    $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                    $("#BANKN" + GV_ROWID).prop('readonly', true);
                } else {
                    $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                }
            } else {
                if (arr[i] == "#LINKN") {
                    if (GV_ROW.data()[i] == "") {
                        $(arr[i] + GV_ROWID).val("http://");
                    } else {
                        $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                    }
                } else if (arr[i] == "#TELNO" || arr[i] == "#CEPNO" || arr[i] == "#FAXNO") {
                    if ($("#MDMNO").val()) {
                        $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]).validate(function(valid, elem, $form, errorMess) {
                            var elem = $(arr[i] + GV_ROWID).closest("div")[0].firstElementChild.firstElementChild.firstElementChild;
                            if (valid) {
                                var out = $("#phoneoutput").val();
                                out = out.split("\n")
                                for (var d = 0; d < out.length; ++d) {
                                    var e = out[d].search("Phone Number region");
                                    if (e >= 0) {
                                        e = out[d].split(": ")
                                        var p = "iti-flag " + e[1].toLowerCase();
                                        elem.className = p;
                                    }
                                }
                            } else {
                                elem.className = "iti-flag ";
                            }
                        });
                    }
                } else {
                    $(arr[i] + GV_ROWID).val(GV_ROW.data()[i]);
                }
            }
        } else if (tagname == "SELECT") {
            if (i == 2 && arr[i] == "#CSD_VKBUR") {
                $.ajax({ id: "SDGRD", data: { "value": GV_ROW.data()[i], "value1": GV_ROW.data()[1] } });
                $(arr[i] + GV_ROWID + " option").filter(function() { return $(this).text() == GV_ROW.data()[i]; }).prop('selected', true);
            } else if (i == 1 && arr[i] == "#BANKS") {
                $.ajax({ id: "BANKS", data: { "value": GV_ROW.data()[i] } });
                $(arr[i] + GV_ROWID + " option").filter(function() {
                    return $(this).text() == GV_ROW.data()[i];
                }).prop('selected', true);
                // 
                if ((GV_PARAM == "CHANG" || (GV_PARAM == "ACTDT" && GV_ACTSYST == "ATLAS")) && (GV_ADDBNK > GV_ROWID)) {
                    $("#BANKS" + GV_ROWID).prop("disabled", true).trigger("chosen:updated");
                }
            } else if (i == 2 && arr[i] == "#BANKA") {
                $.ajax({ id: "BANKA", data: { "value": GV_ROW.data()[i], "value1": $("#BANKS" + GV_ROWID).val() } });
                $(arr[i] + GV_ROWID + " option").filter(function() { return $(this).text() == GV_ROW.data()[i]; }).prop('selected', true);
                //
                if ((GV_PARAM == "CHANG" || (GV_PARAM == "ACTDT" && GV_ACTSYST == "ATLAS")) && (GV_ADDBNK > GV_ROWID)) {
                    $("#BANKA" + GV_ROWID).prop("disabled", true).trigger("chosen:updated");
                }
            } else if (i == 3 && arr[i] == "#BRNCH") {
                $(arr[i] + GV_ROWID + " option").filter(function() { return $(this).text() == GV_ROW.data()[i]; }).prop('selected', true);
                if ((GV_PARAM == "CHANG" || (GV_PARAM == "ACTDT" && GV_ACTSYST == "ATLAS")) && (GV_ADDBNK > GV_ROWID)) {
                    $("#BRNCH" + GV_ROWID).prop("disabled", true).trigger("chosen:updated");
                }
            } else if (i == 8 && arr[i] == "#CFI_ZWELS" || arr[i] == "#VFI_ZWELS") {
                var split = GV_ROW.data()[i].split('#');
                for (var a = 0; a < split.length; a++) { $(arr[i] + GV_ROWID + " option").filter(function() { return $(this).text() == split[a]; }).prop('selected', true); }
            } else {
                /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
                if (arr[i] == "#BVTYP") {
                    var bankCount = $("#bankDT > tbody > tr").length;
                    var kullanilanParaBirimi = [];
                    var k = 0;
                    for (var k = 0; k < bankCount; k++) {
                        if (gv_globalBnk.row(k).data() != undefined) {
                            if (gv_globalBnk.row(k).data()[10] != 'D' && gv_globalBnk.row(k).data()[7] != "") {
                                kullanilanParaBirimi.push(gv_globalBnk.row(k).data()[7]);
                            }
                        }
                    }
                    GV_SELBNK = kullanilanParaBirimi;
                    // silme
                    var k = 0;
                    for (k = 0; k < bankCount; k++) {
                        if (gv_globalBnk.row(k).data() != undefined) {
                            var cmbHesapTipi = "#BVTYP" + k + " option";
                            var cmbHesapTipi2 = "#BVTYP" + k;
                            var index = 0;
                            for (index = 0; index < GV_SELBNK.length; index++) {
                                $(cmbHesapTipi).each(function() {
                                    if (GV_SELBNK[index] != gv_globalBnk.row(k).data()[7]) {
                                        $(cmbHesapTipi2 + " option[value='" + GV_SELBNK[index] + "']").remove();
                                        //continue;
                                    }
                                });
                                /* for (var index2 = 0; index2 < $(cmbHesapTipi)[0].length; index2++) {
                                     if (GV_SELBNK[index] != gv_globalBnk.row(k).data()[7]) {
                                         $(cmbHesapTipi + " option[value='" + GV_SELBNK[index] + "']").remove();
                                         continue;
                                     }
                                 }*/
                            }
                        }
                    }
                    var kullanilacakParalar = [];
                    var index = 0;
                    for (index = 0; index < GV_ALLBNK.length; index++) {
                        var x = 0;
                        var index2 = 0;
                        for (index2 = 0; index2 < GV_SELBNK.length; index2++) {
                            if (GV_ALLBNK[index][0] == GV_SELBNK[index2]) {
                                x++;
                            }
                        }
                        if (x == 0) {
                            kullanilacakParalar.push(GV_ALLBNK[index][0]);
                        }
                    }
                    var k = 0;
                    for (var k = 0; k < bankCount; k++) {
                        if (gv_globalBnk.row(k).data() != undefined) {
                            var cmbHesapTipi2 = "#BVTYP" + k + " option";
                            var cmbHesapTipi = "#BVTYP" + k;
                            var index = 0;
                            for (index = 0; index < kullanilacakParalar.length; index++) {
                                var x = 0;
                                var index2 = 0;
                                $(cmbHesapTipi2).each(function() {
                                    if (kullanilacakParalar[index] == $(this).val()) {
                                        x++;
                                    }
                                });
                                if (x == 0) {
                                    $(cmbHesapTipi).append('<option value="' + kullanilacakParalar[index] + '">' + kullanilacakParalar[index] + '</option>');
                                }
                            }
                        }
                    }

                }
                $(arr[i] + GV_ROWID + " option").filter(function() { return $(this).text() == GV_ROW.data()[i]; }).prop('selected', true);
            }
        }
    };
}
/* END: Change Expand Form Element */
/* BEGIN: Check Required */
function fCheckReq(grp, flag, par) {
    var res = $.ajax({ id: "FIELD", data: { "value": grp, "value1": par, "value2": GV_PARAM } });
    res = res.responseJSON;
    for (var key in res.NECES) {
        if (grp == "CFI" || grp == "CSD" || grp == "VFI" || grp == "VMM") {
            var elem = "#" + grp + "_" + res.NECES[key][0] + GV_ROWID;
        } else {
            var elem = "#" + res.NECES[key][0] + GV_ROWID;
        }
        var text = $(elem).closest("section").find("label").html();
        /*      if ( $(elem).prop("type") == "checkbox"  && !$(elem).prop("checked") ) {
                    text = $(elem).closest("section").find("label").html();
                }else if ( $(elem).prop("type") != "checkbox" && !$(elem).val() ){
                    text = $(elem).next("label");
                } */
        flag.push(text);
    }
}
/* END: Check Required */
/* BEGIN: Set Read Only Element */
function fSetReadOnly(grp, par) {
    if (GV_ROW.child.isShown()) {
        var res = $.ajax({ id: "FIELD", data: { "value": grp, "value1": par, "value2": GV_PARAM } });
        res = res.responseJSON;
        var list = [];
        for (var key in res.DEFAU) {
            if ((grp == "CFI" || grp == "CSD" || grp == "VFI" || grp == "VMM") && (res.DEFAU[key][0] != null && res.DEFAU[key][0] != undefined && res.DEFAU[key][0] != "")) {
                switch (grp) {
                    case "CFI":
                        list = GV_FIELCFI;
                        break;
                    case "CSD":
                        list = GV_FIELDSD;
                        break;
                    case "VFI":
                        list = GV_FIELVFI;
                        break;
                    case "VMM":
                        list = GV_FIELVMM;
                }

                //* gelen datayı ucomboboxa ekledim*/
                /* şirket alanını ekledım */
                if (res.DEFAU[key][0] != "VKORG") {
                    $("#" + grp + "_" + res.DEFAU[key][0] + GV_ROWID).val(res.DEFAU[key][1]).trigger("chosen:updated");

                    var row_lank = 0;
                    $.each(list, function(i, e) {
                        if (e == "#" + grp + "_" + res.DEFAU[key][0]) {
                            row_lank = i;
                            return false;
                        }
                    });
                    // burda satıra ekliyorum
                    var txt = $("#" + grp + "_" + res.DEFAU[key][0] + GV_ROWID + " option:selected").text();
                    GV_OTABLE.fnUpdate(txt, GV_ROWID, row_lank);
                }
            }
        }
        for (var key in res.READO) {
            if (grp == "CFI" || grp == "CSD" || grp == "VFI" || grp == "VMM") {
                $("#" + grp + "_" + res.READO[key][0] + GV_ROWID).prop("disabled", true).trigger("chosen:updated");

            } else {
                $("#" + res.READO[key][0] + GV_ROWID).prop("disabled", true).trigger("chosen:updated");
            }
        }
    }
}
/* END: Set Read Only Element */
/* BEGIN: Set Default Value Element */
function fSetDefault(arr, grp) {
    var res = $.ajax({ id: "FIELD", data: { "value": grp } });
    res = res.responseJSON;
    for (var key in res.READO) {
        if (grp == "CFI" || grp == "CSD" || grp == "VFI" || grp == "VMM") {
            $("#" + grp + "_" + res.READO[key][0] + GV_ROWID).val(res.READO[key][1]).trigger("chosen:updated");
        } else {
            $("#" + res.READO[key][0] + GV_ROWID).val(res.READO[key][1]).trigger("chosen:updated");
        }

    }
}
/* END: Set Default Value Element */
/* BEGIN: Set MAPS Return Data */
function updateControls(addrMap, current) {
    var locality = level4 = sublocality = "";
    $("#ALAND" + GV_ROWID).val("");
    $("#POSTL" + GV_ROWID).val("");
    $("#SUPL1" + GV_ROWID).val("");
    $("#CITY1" + GV_ROWID).val("");
    $("#TOWN1" + GV_ROWID).val("");
    $("#DISTR" + GV_ROWID).val("");
    $("#GEOLA" + GV_ROWID).val("");
    $("#GEOLO" + GV_ROWID).val("");

    for (var key in addrMap) {
        /*Malta için düzeltme*/
        if (addrMap["country"] == "MT" && addrMap["level1"] == undefined && addrMap["locality"] == "B'Kara") {
            $("#TOWN1" + GV_ROWID).val("BIRKIRKARA");
            $("#CITY1" + GV_ROWID).val("BIRKIRKARA");
        } else if (addrMap["country"] == "MT") {

            $("#TOWN1" + GV_ROWID).val("MALTA");
            $("#CITY1" + GV_ROWID).val("MALTA");
        }
        /*MALTA düzletme bitiş */
        switch (key) {
            case "country":
                $("#ALAND" + GV_ROWID).val(addrMap[key]);
                /*singapur için il ve ilce düzeltme : SARSLAN : 20171206*/
                if (addrMap[key] == 'SG') {
                    $("#CITY1" + GV_ROWID).val("Singapur");
                    $("#TOWN1" + GV_ROWID).val("Singapur");
                } else if (addrMap[key] == 'DK') {
                    $("#CITY1" + GV_ROWID).val("Danimarka");
                    $("#TOWN1" + GV_ROWID).val("Danimarka");
                } else if (addrMap[key] == 'HU') {
                    $("#CITY1" + GV_ROWID).val("Macaristan");
                    $("#TOWN1" + GV_ROWID).val("Macaristan");
                }
                break;
            case "postalCode":
                $("#POSTL" + GV_ROWID).val(addrMap[key]);
                break;
            case "route":
                $("#SUPL1" + GV_ROWID).val(addrMap[key]);
                break;
                /*BEGIN:  İl ve ilçede Elazığ da eğer "â" var ise bunu "a" ya çeviriyor. Amesud 20170202 */
            case "level1":
                addrMap[key] = addrMap[key].replace(" Province", "");
                if (addrMap[key].toLowerCase().indexOf("elâzığ") > -1) {
                    $("#CITY1" + GV_ROWID).val(addrMap[key].replace("â", "a"));
                } else {
                    $("#CITY1" + GV_ROWID).val(addrMap[key]);
                }
                if (addrMap["country"] == "DK") {
                    $("#TOWN1" + GV_ROWID).val("Danimarka");
                    $("#CITY1" + GV_ROWID).val("Danimarka");
                }
                break;
            case "level2":
                if (addrMap[key].toLowerCase().indexOf("elâzığ") > -1) {
                    $("#TOWN1" + GV_ROWID).val(addrMap[key].replace("â", "a"));
                }

                /*Malta için düzeltme*/
                else if (addrMap["country"] == "MT" && addrMap["level1"] == "BIRKIRKARA") {
                    $("#TOWN1" + GV_ROWID).val("BIRKIRKARA");
                } else if (addrMap["country"] == "MT" && addrMap["level1"] == "") {
                    $("#TOWN1" + GV_ROWID).val("MALTA");
                    $("#CITY1" + GV_ROWID).val("MALTA");
                }
                /*MALTA düzletme bitiş */
                else {
                    $("#TOWN1" + GV_ROWID).val(addrMap[key]);
                }
                if (addrMap["country"] == "DK") {
                    $("#TOWN1" + GV_ROWID).val("Danimarka");
                    $("#CITY1" + GV_ROWID).val("Danimarka");
                }
                break;
                /*END:    İl ve ilçede  Elazığ da eğer "â" var ise bunu "a" ya çeviriyor. Amesud 20170202 */
            case "level4":
                level4 = addrMap[key];
                break;
            case "locality":
                locality = addrMap[key];
                break;
            case "sublocality":
                sublocality = addrMap[key];
                break;
        }
    }
    if ($("#ALAND" + GV_ROWID).val() != "TR") { $("#DISTR" + GV_ROWID).val(locality); } else {
        $("#DISTR" + GV_ROWID).val(level4);

        if ($("#TOWN1" + GV_ROWID).val() == "") {
            $("#TOWN1" + GV_ROWID).val("Merkez");
        }
    }
    /*BEGIN:  Kazakistanda google'dan yanlış gelen değerlerin düzeltmesi. Amesud 20170131 */
    if (((locality == "Astana Almaty District") || (locality == "Astana Yesil District") || (locality == "Astana Saryarka District")) && (($("#POSTL" + GV_ROWID).val() == "020000") || ($("#POSTL" + GV_ROWID).val() == "010000"))) {
        $("#CITY1" + GV_ROWID).val("Astana");
    } else if (($("#CITY1" + GV_ROWID).val() == "West Kazakhstan Province") && ($("#SUPL1" + GV_ROWID).val() == "На родник")) {
        $("#CITY1" + GV_ROWID).val("Aktau");
    }
    /*END:    Kazakistanda google'dan yanlış gelen değerlerin düzeltmesi. Amesud 20170131 */

    /*BEGIN:  Bulgaristanda googledan boş gelen ilçe bilgisine mahalle bilgisi kopyalanıyor. Amesud 20170202 */
    if (($("#ALAND" + GV_ROWID).val() == "BG") && ($("#TOWN1" + GV_ROWID).val() == "")) {
        $("#TOWN1" + GV_ROWID).val(locality);
    }
    /*END:  Bulgaristanda googledan boş gelen ilçe bilgisine mahalle bilgisi kopyalanıyor. Amesud 20170202 */

    $("#ALAND" + GV_ROWID).trigger("change");
    $("#POSTL" + GV_ROWID).trigger("change");
    $("#SUPL1" + GV_ROWID).trigger("change");
    $("#CITY1" + GV_ROWID).trigger("change");
    $("#TOWN1" + GV_ROWID).trigger("change");
    $("#DISTR" + GV_ROWID).trigger("change");
    $("#GEOLA" + GV_ROWID).val(current.latitude).trigger("change");
    $("#GEOLO" + GV_ROWID).val(current.longitude).trigger("change");

}
/* END: Set MAPS Return Data */
/* BEGIN: Datatable Open Row */
$('#mapCtry').on('change', function() {

});
$('#mapCtry').change(function() {

});

$('#mapCtry_chosen').change(function() {

});
$('#mapCtry_chosen').on('change', function() {

});

function adresCmbToTxt(txt, id) {

}

function openRow() {

    /* Begi adres satırılarında comboları yakalamaya kodu Başlangıç: sarslan 20170329 */
    if (GV_TABNAME == 'addrDT') {
        $("body").click(function(event) {
            if (event.target.parentElement.parentElement.id == "mapCity1_chosen") {} else if (event.target.parentElement.parentElement.id == "mapCtry1_chosen") {} else if (event.target.parentElement.parentElement.id == "mapsDist1_chosen") {}

        });
    }
    /* Begi adres satırılarında comboları yakalamaya kodu Başlangıç: sarslan 20170329 */
    var id = GV_ROWID,
        txt = GV_ROW.data();
    if (GV_TABNAME == 'addrDT') {
        var aders = "";
        mapsCountry = $("#LAND1").html();
        aders = '<fieldset id="addrFRM">' +
            '<div class="row">' +
            '<div class="col col-4" style="display:none">' +
            '<label class="label">' + sessionStorage.getItem('00070') + '</label>' +
            '<label class="select">' +
            '<select id="ATYPE' + id + '" class="chosen-select addr" disabled="true">' +
            '' + GV_ATYPE + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label"></label>' +
            '<label class="input">' +
            '<i class="icon-append fa fa-map-signs fa-1g"></i>' +
            '<input type="text" id="LOCAI' + id + '" class="addr" placeholder="' + sessionStorage.getItem('00078') + '">' +
            '</label>' +
            '<div>' +
            '<div id="gomap' + id + '" style="width: 500px; height: 300px;float:left;clear:both;"></div>' +
            '<p></p>' +
            '</div> ' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00036') + '</label>' +
            '<label class="label">' +
            '<div class ="col-12" style="padding-right: 0px;padding-left: 0px;">' +
            '<div class="col col-6" style="padding-right:10px;padding-left: 0px;">' +
            '<label class="input state-disabled">' +
            '<i class="icon-append fa-globe fa-1g"></i>' +
            '<input type="text" id="ALAND' + id + '" class="addr" disabled="disabled">' +
            '</label>' +
            '</div>';
        if (maps_harita == "1") {

            aders = aders + '<div class="col col-6 maps" style="padding-right: 0px;padding-left:10px;">' +
                '<label class="select">' +
                '<select id="mapsCtry' + id + '" class="chosen-select mapsCtry maps">' +
                mapsCountry +
                '</select>' +
                '</label>' +
                '</div>';
        }
        aders = aders + '</div>' +
            '</label>' +

            '<br><br>' +
            '<label class="label">' + sessionStorage.getItem('00072') + '</label>' +
            '<label class="label">' +
            '<div class ="col-12" style="padding-right: 0px;padding-left: 0px;">' +
            '<div class="col col-6" style="padding-right:10px;padding-left: 0px;">' +
            '<label class="input state-disabled">' +
            '<i class="icon-append fa-street-view fa-1g"></i>' +
            '<input type="text" id="CITY1' + id + '" class="addr" disabled="disabled">' +
            '</label>' +
            '</div>';
        if (maps_harita == "1") {
            aders = aders +
                '<div class="col col-6 maps" style="padding-right: 0px;padding-left:10px;">' +
                '<label class="select">' +
                '<select id="mapsCity' + id + '" class="chosen-select mapsCtiy maps">' +
                mapsCtiy +
                '</select>' +
                '</label>' +
                '</div>';
        }
        aders = aders +
            '</div>' +
            '</label>' +
            '<br><br>' +
            '<label class="label">' + sessionStorage.getItem('00073') + '</label>' +
            '<label class="label">' +
            '<div class ="col-12" style="padding-right: 0px;padding-left: 0px;">' +
            '<div class="col col-6" style="padding-right:10px;padding-left: 0px;">' +
            '<label class="input state-disabled">' +
            '<i class="icon-append fa-street-view fa-1g"></i>' +
            '<input type="text" id="TOWN1' + id + '" class="addr" disabled="disabled">' +
            '</label>' +
            '</div>';
        if (maps_harita == "1") {
            aders = aders +
                '<div class="col col-6 maps" style="padding-right: 0px;padding-left:10px;">' +
                '<label class="select">' +
                '<select id="mapsDist' + id + '" class="chosen-select mapsDist maps">' +
                mapsDistrict +
                '</select>' +
                '</label>' +
                '</div>';
        }
        aders = aders +
            '</div>' +
            '</label>' +
            // canlıya taşımada aders  acılan kutuyu kapatma işlemi
            '<br><br>' +
            '<label class="label">' + sessionStorage.getItem('00074') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-map fa-1g"></i>' +
            '<input type="text" id="DISTR' + id + '" class="addr" maxlength="40" value="">' +
            '</label>' +
            '<label class="label">' + sessionStorage.getItem('00075') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-map-o fa-1g"></i>' +
            '<input type="text" id="SUPL1' + id + '" class="addr" maxlength="40">' +
            '</label>' +
            '<label class="label">' + sessionStorage.getItem('00076') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-map-marker fa-1g"></i>' +
            '<input type="text" id="POSTL' + id + '" class="addr" maxlength="10" />' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00071') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa fa-map-signs fa-1g"></i>' +
            /* '<input type="text" id="ANAME'+id+'" class="addr" maxlength="50" value="'+txt[2]+'">'+ */
            '<input type="text" id="ANAME' + id + '" class="addr" maxlength="50" />' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row" style="display:none">' +
            '<input type="hidden" id="GEOLA' + id + '" class="addr" maxlength="50" />' +
            '<input type="hidden" id="GEOLO' + id + '" class="addr" maxlength="50" />' +
            '</div>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="addrFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '</div>' +
            '</fieldset>';
        return aders;
    } else if (GV_TABNAME == 'contDT') {
        return '<fieldset id="contFRM">' +
            '<div class="row">' +
            '<section class="col"  style="display:none">' +
            '<label class="label">İletişim tipi</label>' +
            '<label class="select">' +
            '<select id="CTYPE' + id + '" class="chosen-select cont" disabled="true">' +
            '' + GV_CTYPE + '' +
            '</select>' +
            '</label>' +
            '</section>' +
            '<section class="col" style="width:250px">' +
            '<label class="label">' + sessionStorage.getItem('00063') + '</label>' +
            '<label class="select">' +
            '<select id="LANGU' + id + '" class="chosen-select cont">' +
            '' + GV_SPRAS + '' +
            '</select>' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00455') + '</label>' +
            '<label class="input">' +
            '<input type="text" id="RELPR' + id + '"  maxlength="50" class="cont"/>' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00064') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-phone fa-1g"></i>' +
            '<input type="text" id="TELNO' + id + '" class="phone cont" maxlength="25" data-validation="phone"/>' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00065') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-fax fa-1g"></i>' +
            '<input type="text" id="FAXNO' + id + '" class="phone cont" maxlength="25" data-validation="phone"/>' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00066') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-mobile fa-1g"></i>' +
            '<input type="text" id="CEPNO' + id + '" class="phone cont" maxlength="25" data-validation="phone"/>' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00067') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-envelope fa-1g"></i>' +
            '<input type="text" id="EMAIL' + id + '" class="cont" data-validation="email" maxlength="241" placeholder="example@example.com">' +
            '</label>' +
            '</section>' +
            '<section class="col">' +
            '<label class="label">' + sessionStorage.getItem('00068') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-link fa-1g"></i>' +
            '<input type="text" id="LINKN' + id + '" class="cont" data-validation="url" maxlength="50" placeholder="http://wwww.example.com">' +
            '</label>' +
            '</section>' +
            '</div>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="contFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'bankDT') {
        var new_para = "";
        for (var index = 0; index < GV_ALLBNK.length; index++) {
            var x = 0;
            for (var index2 = 0; index2 < GV_SELBNK.length; index2++) {
                if (GV_ALLBNK[index][0] == GV_SELBNK[index2]) {
                    x++;
                }
            }
            if (x == 0) {
                new_para += '<option value="' + GV_ALLBNK[index][0] + '">' + GV_ALLBNK[index][0] + '</option>';
            }

        }
        return '<fieldset id="bankFRM">' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label"><span style="color:red">(*)</span> ' + sessionStorage.getItem('00036') + '</label>' +
            '<label class="select">' +
            '<select id="BANKS' + id + '" class="chosen-select bank">' +
            '' + GV_LAND1 + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00079') + '</label>' +
            '<label class="select">' +
            '<select id="BANKA' + id + '" class="chosen-select bank"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00080') + '</label>' +
            '<label class="select">' +
            '<select id="BRNCH' + id + '" class="chosen-select bank swift"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00081') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-cc-mastercard fa-1g"></i>' +
            '<input type="text" id="BIBAN' + id + '" class="bank" maxlength="34" data-validation="iban" >' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00082') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-credit-card fa-1g"></i>' +
            '<input type="text" id="BANKN' + id + '" class="bank" maxlength="35" >' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00083') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-cc-visa fa-1g"></i>' +
            '<input type="text" id="SWIFT' + id + '" class="bank" maxlength="11" >' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00084') + '</label>' +
            '<label class="select">' +
            '<select id="BVTYP' + id + '" class="chosen-select bank hesap_tipi">' +
            '' + GV_BVTYP + '' +
            //  '' + new_para + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            /* '<div class="col col-4">'+
               '<label class="label">'+ sessionStorage.getItem('00085') +'</label>'+
               '<label class="select">'+
                 '<select id="WAERS'+id+'" class="chosen-select bank">'+
                 ''+GV_WAERS+''+
                 '</select>'+
               '</label>'+
             '</div>'+ banka bilgilerindeki döviz tipi commente alındı. Amesud 20160726 */
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00086') + '</label>' +
            '<label class="input">' +
            '<i class="icon-append fa-user fa-1g"></i>' +
            '<input type="text" id="KOINH' + id + '" class="bank" maxlength="60" >' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="checkbox"><input type="checkbox" id="XEZER' + id + '" class="bank" ><i></i>' + sessionStorage.getItem('00087') + '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="bankFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'softPM') {
        return '<fieldset id="softFRM">' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label"> ' + sessionStorage.getItem('00300') + '</label>' +
            '<label class="select">' +
            '<select id="DEPAR' + id + '" class="chosen-select soft">' +
            '' + GV_DEPAR + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00301') + '</label>' +
            '<label class="select">' +
            '<select id="PARTS' + id + '" class="chosen-select soft">' +
            '' + GV_PARTS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-3">' +
            '<label class="label">' + sessionStorage.getItem('00302') + '</label>' +
            '<label class="input">' +
            '<input type="text" id="PTERM' + id + '" class="soft" maxlength="3" >' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label"> ' + sessionStorage.getItem('00303') + '</label>' +
            '<label class="select">' +
            '<select id="SFTCT' + id + '" class="chosen-select soft">' +
            '' + GV_SFTCT + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00304') + '</label>' +
            '<label class="select">' +
            '<select id="CURRY' + id + '" class="chosen-select soft">' +
            '' + GV_CURTY + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-3">' +
            '<label class="label">' + sessionStorage.getItem('00305') + '</label>' +
            '<label class="input">' +
            '<input type="text" id="LIMCR' + id + '" class="soft" maxlength="12" >' +
            '</label>' +
            '</div>' +
            '<div class="col col-4" id="CCURTDIV' + id + '">' +
            '<label class="label"> ' + sessionStorage.getItem('00306') + '</label>' +
            '<label class="select">' +
            '<select id="CCURT' + id + '" class="chosen-select soft">' +
            '' + GV_CURTY + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'custFI') {
        var custFI_txt = "";
        custFI_txt = '<fieldset id="cfiFRM">' +
            '<div class="row">' +
            '<div class="col col-4" style="display:none">' +
            '<label class="label">' + sessionStorage.getItem('00095') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_BUKRS' + id + '" class="chosen-select fief" disabled="true">' +
            '' + GV_BUKRS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<span style="color:red">(*) </span><label class="label" style="display: inline-block;">' + sessionStorage.getItem('00088') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_AKONT' + id + '" class="chosen-select fief"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00089') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_ZUAWA' + id + '" class="chosen-select fief">' +
            '' + GV_ZUAWA + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00090') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_FDGRV' + id + '" class="chosen-select fief">' +
            '' + GV_FDGRV + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00091') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_BUSAB' + id + '" class="chosen-select fief"></select>' +
            '</label>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00092') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_GRIDT' + id + '" class="chosen-select fief"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00258') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_GRICD' + id + '" class="chosen-select fief">' +
            '' + GV_GRICD + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00093') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_ZTERM' + id + '" class="chosen-select fief">' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00094') + '</label>' +
            '<label class="select">' +
            '<select id="CFI_ZWELS' + id + '" class="chosen-select fief" multiple>' +
            '' + GV_ZWELS + '' +
            '</select>' +
            '</label>' +
            '</div>';

        // evrim sistemi
        if (txt != undefined) {
            if (txt[1].indexOf("0019") > 0) {
                custFI_txt = custFI_txt +
                    '<div class="col col-4">' +
                    '<label class="label">' + sessionStorage.getItem('00438') + '</label>' +
                    '<label class="input">' +
                    '<input id="CFI_EVRNR' + id + '" type="text" class="fief"/></label>' +
                    '</label>' +
                    '</div>';
            } else if (txt[1].indexOf("0011") > 0) {
                custFI_txt = custFI_txt +
                    '<div class="col col-4">' +
                    '<label class="label">' + sessionStorage.getItem('00347') + '</label>' +
                    '<label class="select">' +
                    '<select id="CFI_PYMNT' + id + '"class="chosen-select fief">' +
                    '' + GV_PYMNT +
                    '</select>' +
                    '</label>' +
                    '</div>';

            }
        }
        custFI_txt = custFI_txt +
            '</div><br>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="cfiFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '<div class="saverow"><label class="checkbox"><input type="checkbox" id="CFI_ASEND' + id + '" class="fief" ><i></i>' + sessionStorage.getItem('00166') + '</label></div>' +
            '</div>' +
            '</fieldset>';
        return custFI_txt;
    } else if (GV_TABNAME == 'custSD') {
        return '<fieldset id="csdFRM">' +
            '<div class="row">' +
            '<div class="col col-4" style="display:none">' +
            '<label class="label">' + sessionStorage.getItem('00096') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_VKORG' + id + '" class="chosen-select fies" disabled="true">' +
            '' + GV_VKORG + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00100') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_VKBUR' + id + '" class="chosen-select fies"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00101') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_VKGRP' + id + '" class="chosen-select fies"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00110') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_VSBED' + id + '" class="chosen-select fies">' +
            '' + GV_VSBED + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00098') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_TAXKD' + id + '" class="chosen-select fies">' +
            '' + GV_TAXKD + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00099') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_BZIRK' + id + '" class="chosen-select fies">' +
            '' + GV_BZIRK + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00097') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_KTGRD' + id + '" class="chosen-select fies">' +
            '' + GV_KTGRD + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00102') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_KDGRP' + id + '" class="chosen-select fies">' +
            '' + GV_KDGRP + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00103') + '</label>' +
            '<label class="input"><input id="CSD_AWAHR' + id + '" type="text" tabindex="3" class="fies" maxlength="3" data-validation="number" data-validation-allowing="range[1;100]" /></label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00093') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_ZTERM' + id + '" class="chosen-select fies">' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00104') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_WAERS' + id + '" class="chosen-select fies">' +
            '' + GV_WAERS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00105') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_KONDA' + id + '" class="chosen-select fies">' +
            '' + GV_KONDA + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00106') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_KALKS' + id + '" class="chosen-select fies">' +
            '' + GV_KALKS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00107') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_PLTYP' + id + '" class="chosen-select fies">' +
            '' + GV_PLTYP + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00108') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_VERSG' + id + '" class="chosen-select fies">' +
            '' + GV_VERSG + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00109') + '</label>' +
            '<label class="select">' +
            '<select id="CSD_LPRIO' + id + '" class="chosen-select fies">' +
            '' + GV_LPRIO + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="csdFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '<div class="saverow"><label class="checkbox"><input type="checkbox" id="CSD_ASEND' + id + '" class="fies" ><i></i>' + sessionStorage.getItem('00166') + '</label></div>' +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'vendFI') {
        var vendFI_txt = "";
        vendFI_txt = '<fieldset id="vfiFRM">' +
            '<div class="row">' +
            '<div class="col col-4" style="display:none">' +
            '<label class="label">' + sessionStorage.getItem('00095') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_BUKRS' + id + '" class="chosen-select fivf" disabled="true">' +
            '' + GV_BUKRS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<span style="color:red">(*) </span><label class="label" style="display: inline-block;">' + sessionStorage.getItem('00088') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_AKONT' + id + '" class="chosen-select fivf"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00089') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_ZUAWA' + id + '" class="chosen-select fivf">' +
            '' + GV_ZUAWA + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00090') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_FDGRV' + id + '" class="chosen-select fivf">' +
            '' + GV_FDGRV + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00091') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_BUSAB' + id + '" class="chosen-select fivf"></select>' +
            '</label>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00092') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_GRIDT' + id + '" class="chosen-select fivf"></select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00093') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_ZTERM' + id + '" class="chosen-select fivf">' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00094') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_ZWELS' + id + '" class="chosen-select fivf" multiple>' +
            '' + GV_ZWELS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00140') + '</label>' +
            '<label class="input">' +
            '<input type="text" id="VFI_KVERM' + id + '" class="fivf" maxlength="30" />' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00141') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_HBKID' + id + '" class="chosen-select fivf"></select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00202') + '</label>' +
            '<label class="input">' +
            '<input type="text" id="VFI_CERDT' + id + '" class="fivf cerdt" maxlength="10" />' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00203') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_MINDK' + id + '" class="chosen-select fivf">' +
            '' + GV_MINDK + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00258') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_GRICD' + id + '" class="chosen-select fivf">' +
            '' + GV_GRICD + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00289') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_ZAHLS' + id + '" class="chosen-select fivf">' +
            '' + GV_ZAHLS + '' +
            '</select>' +
            '</label>' +
            '</div>' +








            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00290') + '</label>' +
            '<label class="select">' +
            '<select id="VFI_FRGRP' + id + '" class="chosen-select fivf">' +
            '' + GV_FRGRP + '' +
            '</select>' +
            '</label>' +
            '</div>';
        // evrim sistemi
        if (txt != undefined) {
            if (txt[1].indexOf("0019") > 0) {
                vendFI_txt = vendFI_txt +

                    '<div class="col col-4">' +
                    '<label class="label">' + sessionStorage.getItem('00438') + '</label>' +
                    '<label class="input">' +
                    '<input id="VFI_EVRNR' + id + '" type="text" class="fivf"/></label>' +
                    '</label>' +
                    '</div>';
            }
        }
        vendFI_txt = vendFI_txt +
            '</div><br>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="vfiFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '<div class="saverow"><label class="checkbox"><input type="checkbox" id="VFI_ASEND' + id + '" class="fivf" ><i></i>' + sessionStorage.getItem('00166') + '</label></div>' +
            '</div>' +
            '</fieldset>';
        return vendFI_txt;
    } else if (GV_TABNAME == 'vendMM') {
        return '<fieldset id="vmmFRM">' +
            '<div class="row">' +
            '<div class="col col-4" style="display:none">' +
            '<label class="label">' + sessionStorage.getItem('00133') + '</label>' +
            '<label class="select">' +
            '<select id="VMM_EKORG' + id + '" class="chosen-select fivm" disabled="true">' +
            '' + GV_EKORG + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00104') + '</label>' +
            '<label class="select">' +
            '<select id="VMM_WAERS' + id + '" class="chosen-select fivm">' +
            '' + GV_WAERS + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '<div class="col col-4">' +
            '<label class="label">' + sessionStorage.getItem('00093') + '</label>' +
            '<label class="select">' +
            '<select id="VMM_ZTERM' + id + '" class="chosen-select fivm">' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="row" style="float:right">' +
            '<div class="clear" data-name="vmmFRM">' +
            sessionStorage.getItem("00236") +
            '<i class="fa fa-eraser"></i>' +
            '</div>' +
            '<div class="saverow"><label class="checkbox"><input type="checkbox" id="VMM_ASEND' + id + '" class="fivm" ><i></i>' + sessionStorage.getItem('00166') + '</label></div>' +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'VadePMTim') {
        gv_txtvade = "";
        if (gv_selcetVade == "1") {
            gv_txtvade = '<div class="col col-6">' +
                '<label class="label"> ' + sessionStorage.getItem('00326') + '</label>' +
                '<label class="select">' +
                '<select id="OMSAP' + id + '" class="chosen-select sapvade" disabled>' +
                '' + GV_ZTERM + '' +
                '</select>' +
                '</label>' +
                '</div>';
        }
        return '<fieldset id="timVadeFRM">' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<label class="label"> ' + sessionStorage.getItem('00327') + '</label>' +
            '<label class="select">' +
            '<select id="NMTIM' + id + '" class="chosen-select timvade" >' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            gv_txtvade
            /*  '<div class="col col-4">' +
              '<label class="label"> ' + sessionStorage.getItem('00330') + '</label>' +
              '<label class="input">' +
              '<i class="icon-append fa fa-calendar"></i>' +
              '<input type="text" id="VTDAT' + id + '" name="TERDA" class="cerdt timvade">' +
              '</label>' +
              '</div>' +*/
            +
            '</div>' +
            '</fieldset>';
    } else if (GV_TABNAME == 'VadePMAtlas') {
        gv_txtvade = "";
        if (gv_selcetVade == "1") {
            gv_txtvade = '<div class="col col-6">' +
                '<label class="label"> ' + sessionStorage.getItem('00326') + '</label>' +
                '<label class="select">' +
                '<select id="OMSAP' + id + '" class="chosen-select sapvade" disabled>' +
                '' + GV_ZTERM + '' +
                '</select>' +
                '</label>' +
                '</div>';
        }
        return '<fieldset id="atlasVadeFRM">' +
            '<div class="row">' +
            '<div class="col col-6">' +
            '<label class="label"> ' + sessionStorage.getItem('00327') + '</label>' +
            '<label class="select">' +
            '<select id="NMATL' + id + '" class="chosen-select atlasvade">' +
            '' + GV_ZTERM + '' +
            '</select>' +
            '</label>' +
            '</div>' +
            gv_txtvade
            /* '<div class="col col-4">' +
             '<label class="label"> ' + sessionStorage.getItem('00330') + '</label>' +
             '<label class="input">' +
             '<i class="icon-append fa fa-calendar"></i>' +
             '<input type="text" id="VADAT' + id + '" name="TERDA" class="cerdt atlasvade">' +
             '</label>' +
             '</div>' +*/
            +
            '</div>' +
            '</fieldset>';
    }
}
/* END: Datatable Open Row */
/* BEGIN: Create Dynamic Table */
function fDynamicTable(name, table, p1, p2, p3, p4, p5, p6) {
    table.bDestroy = p1, table.bProcessing = p2, table.bDeferRender = p3, table.bFilter = p4, table.bJQueryUI = p5, table.bPaginate = p6;
    $(name).dataTable(table).fnAdjustColumnSizing();
}
/* END: Create Dynamic Table */
/* ------------------------------------ END: DATATABLE FUNCTIONS ----------------------------------- */
/* ------------------------------------ BEGIN: SET RETURN DATA          ------------------------------------ */
function fSetFI(dt, arr, tbn) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.BUKRS) {
            GV_DATA[2] = arr.AKONT;
            GV_DATA[3] = arr.ZUAWA;
            GV_DATA[4] = arr.FDGRV;
            GV_DATA[5] = arr.BUSAB;
            GV_DATA[6] = arr.GRIDT;
            GV_DATA[7] = arr.ZTERM;
            GV_DATA[8] = arr.ZWELS;
            GV_DATA[9] = arr.GRICD;
            GV_DATA[10] = arr.EVRNR;
            GV_DATA[11] = arr.PYMNT;
            if (tbn == "#custFI") {
                if (!arr.SPERR && !arr.LOEVM && !arr.NODEL)
                    GV_DATA[12] = checksq;
            } else {
                GV_DATA[9] = arr.KVERM;
                GV_DATA[10] = arr.HBKID;
                GV_DATA[11] = arr.CERDT;
                GV_DATA[12] = arr.MINDK;
                GV_DATA[13] = arr.GRICD;
                GV_DATA[14] = arr.ZAHLS;
                GV_DATA[15] = arr.FRGRP;

                GV_DATA[16] = arr.EVRNR;
                if (!arr.SPERR && !arr.LOEVM && !arr.NODEL) {
                    GV_DATA[17] = checksq;
                }
            }
            GV_OTABLE = $(tbn).dataTable();
            GV_OTABLE.fnUpdate(GV_DATA, this.index());
        }
    });
}

function fSetSD(dt, arr) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.VKORG) {
            GV_DATA[2] = arr.VKBUR;
            GV_DATA[3] = arr.VKGRP;
            GV_DATA[4] = arr.TAXKD;
            GV_DATA[5] = arr.BZIRK;
            GV_DATA[6] = arr.KTGRD;
            GV_DATA[7] = arr.KDGRP;
            GV_DATA[8] = arr.AWAHR;
            GV_DATA[9] = arr.ZTERM;
            GV_DATA[10] = arr.WAERS;
            GV_DATA[11] = arr.KONDA;
            GV_DATA[12] = arr.KALKS;
            GV_DATA[13] = arr.PLTYP;
            GV_DATA[14] = arr.VERSG;
            GV_DATA[15] = arr.LPRIO;
            GV_DATA[16] = arr.VSBED;
            if (!arr.AUFSD && !arr.LIFSD && !arr.FAKSD && !arr.CASSD && !arr.LOEVM)
                GV_DATA[17] = checksq;
            GV_OTABLE = $("#custSD").dataTable();
            GV_OTABLE.fnUpdate(GV_DATA, this.index());
        }
    });
}

function fSetMM(dt, arr) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.EKORG) {
            GV_DATA[2] = arr.WAERS;
            GV_DATA[3] = arr.ZTERM;
            GV_DATA[4] = checksq;
            GV_OTABLE = $("#vendMM").dataTable();
            GV_OTABLE.fnUpdate(GV_DATA, this.index());
        }
    });
}

function fSetCT(dt, arr) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.CTYPE) {
            GV_DATA[2] = arr.LANGU;
            GV_DATA[3] = arr.RELPR;
            GV_DATA[4] = arr.TELNO;
            GV_DATA[5] = arr.FAXNO;
            GV_DATA[6] = arr.CEPNO;
            GV_DATA[7] = arr.EMAIL;
            GV_DATA[8] = arr.LINKN;
            GV_OTABLE = $("#contDT").dataTable();
            GV_OTABLE.fnUpdate(GV_DATA, this.index());
        }
    });
}

function fSetAD(dt, arr) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.ATYPE) {
            GV_DATA[2] = arr.ANAME;

            GV_DATA[3] = arr.LAND1;
            GV_DATA[4] = arr.CITY1;
            GV_DATA[5] = arr.TOWN1;
            GV_DATA[6] = arr.DISTR;
            GV_DATA[7] = arr.LOCAT;
            GV_DATA[8] = arr.POSTL;
            GV_DATA[9] = arr.GEOLA;
            GV_DATA[10] = arr.GEOLO;
            GV_OTABLE = $("#addrDT").dataTable();
            GV_OTABLE.fnUpdate(GV_DATA, this.index());
        }
    });
}

function fSetPM(dt, arr, type) {
    dt.rows().every(function(rowIdx, tableLoop, rowLoop) {
        GV_DATA = this.data();
        if (GV_DATA[1] == arr.VDKEY) {
            GV_DATA[2] = arr.ZTERM;
            GV_DATA[3] = arr.OZTERM;
            if (type == "tim") {
                GV_VADETIM = $("#VadePMTim").dataTable();
                GV_VADETIM.fnUpdate(GV_DATA, this.index());
            } else if (type == "atlas") {
                GV_VADEATLAS = $("#VadePMAtlas").dataTable();
                GV_VADEATLAS.fnUpdate(GV_DATA, this.index());
            } else {}
        }
    });
}

function fSetBK(dt, arr) {
    if (arr.XEZER) arr.XEZER = checksq;
    dt.row.add(['', arr.BANKS, arr.BANKA, arr.BRNCH, arr.BIBAN, arr.BANKN, arr.SWIFT, arr.BVTYP, arr.KOINH, arr.XEZER, arr.KZ]).draw();
    GV_SELBNK.push(arr.BVTYP);
}
/* ------------------------------------ END: SET RETURN DATA            ------------------------------------ */
/* ------------------------------------ BEGIN: CREATE SUB SYSTEM            ------------------------------------ */
function fCreateSubsytem($this) {
    var tabn = $this.closest("table")[0].id;
    var table = $("#" + tabn).DataTable();
    var $thistr = $this.closest("tr");
    var data = table.row($thistr).data();
    var mdmno = data[1];
    var kunnr = data[2];
    var lifnr = data[3];
    var sysid = curty = cusve = "";
    sysid = $this.data("name");
    switch (tabn) {
        case "resultCustVKN":
            cusve = "CUST";
            curty = sessionStorage.getItem("00022") + " " + kunnr;
            break;
        case "resultVendVKN":
            cusve = "VEND";
            curty = sessionStorage.getItem("00023") + " " + lifnr;
            break;
    }
    var mess = [sessionStorage.getItem("00201"), curty, sysid, sessionStorage.getItem("00256"), "<br />", sessionStorage.getItem("00257")].join(" ");
    $("#confMod").html(mess)
        .data('clicked', "csubs")
        .data("mdmno", mdmno)
        .data("kunnr", kunnr)
        .data("lifnr", lifnr)
        .data("sysid", sysid)
        .data("cusve", cusve)
        .dialog("open");
}
/* ------------------------------------ END: CREATE SUB SYSTEM          ------------------------------------ */
/* ------------------------------------ BEGIN: DIALOG           ------------------------------------ */
//info message
$('#message').dialog({
    resizable: false,
    autoOpen: false,
    show: "highlight",
    hide: "blind",
    position: { my: "left bottom", at: "right bottom", of: window },
    open: function(event, ui) {
        setTimeout(function() {
            $('#message').dialog('close');
        }, 3000);
        //$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
    }
});
//error && save message
$("#errMes, #savemsg").dialog({
    resizable: false,
    modal: true,
    autoOpen: false,
    position: { my: "center", at: "center", of: window },
    show: "highlight",
    hide: "blind",
    width: "auto"
});
//sap customer and vendor display changes fields..
$("#display").dialog({
    resizable: true,
    modal: true,
    autoOpen: false,
    show: "highlight",
    hide: "blind",
    width: "auto",
    height: "auto",
    buttons: [{
        height: 35,
        width: 40,
        "class": 'fa fa-print fa-2x ',
        click: function() {
            var printContents = document.getElementById('a005').contentWindow.document.body.innerHTML;
            var WindowObject = window.open('', "PrintWindow", "width=0,height=0,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no");
            WindowObject.document.body.innerHTML = printContents;
            WindowObject.document.close();
            WindowObject.focus();
            WindowObject.print();
            WindowObject.close();
        }
    }]
});
//VKN Modal
$("#modalVKN").dialog({
    autoOpen: false,
    closeOnEscape: true,
    resizable: true,
    modal: true,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "clip", duration: 500 },
    /* dialogClass: "noclose", */
    height: 725,
    width: 1200
});
$("#creat, #chang, #viewx, #smail, #rfrnc,#fchan").click(function() {
    var cusve = $("#tabsVKN").tabs('option', 'active'),
        table = smail = "";
    if (cusve == 0) {
        //cusve = "CUST"; table = "#resultCustVKN"; smail = "mailto:bl_mdmmusterisorumlusu@borusan.com?subject=MDM: Müşteri Aynı VKN Girişi Hk.";
        cusve = "CUST";
        table = "#resultCustVKN";
        smail = "mailto:bl_mdmteam@borusan.com?subject=MDM: Müşteri Aynı VKN Girişi Hk.";
    } else {
        //cusve = "VEND"; table = "#resultVendVKN"; smail = "mailto:bl_mdmsaticisorumlusu@borusan.com?subject=MDM: Satıcı Aynı VKN Girişi Hk.";
        cusve = "VEND";
        table = "#resultVendVKN";
        smail = "mailto:bl_mdmteam@borusan.com?subject=MDM: Satıcı Aynı VKN Girişi Hk.";
    }
    var oTable = $(table).dataTable(),
        dtab = $(table).DataTable(),
        d = "";
    $("input:checked", oTable.fnGetNodes()).each(function() { d = dtab.row($(this).closest("tr")).data(); });
    if (this.id == "creat") {
        $("#modalVKN").dialog("close");
        sessionStorage.setItem("modalvkn", true);
        sessionStorage.setItem("mvkn", $("#STCD2").val());
        $("#tabs").tabs("enable", "#tabs-2");
        $("#tabs").tabs("option", "active", 2);
        $("#ctabs2").click();
        return;
    }
    if (!d[1]) {
        $("#errMes").html(sessionStorage.getItem("00123")).dialog("open");
        return false;
    }
    if (this.id == "chang" || this.id == "viewx") {
        $("#modalVKN").dialog("close");
        window.location.href = "a002.html?mdmno=" + d[1] + "&kunnr=" + d[2] + "&lifnr=" + d[3] + "&param=" + this.id + "&cusve=" + cusve;
    } else if (this.id == "smail") {
        location.href = smail + "&body=MDM No: " + d[1] + ", VKN: " + d[3];
    } else if (this.id == "creat" || this.id == "rfrnc") {
        $("#modalVKN").dialog("close");
        sessionStorage.setItem("modalvkn", true);
        sessionStorage.setItem("mvkn", d[4]);
        if (cusve == "CUST") {
            $("#RCUST").val(d[2]);
        } else if (cusve == "VEND") {
            $("#RVEND").val(d[3]);
        }
        var param = [this.id, cusve].join("_");
        var oldMdmNumber = newMdmNumber = "";
        if (GV_SYSID == "SAP") {
            oldMdmNumber = GV_MDMNO;
            newMdmNumber = d[1];
        }
        $.ajax({ id: "GETDT", cusve: cusve, data: { "value": d[1], "value1": param, "kunnr": d[2], "lifnr": d[3], "value2": oldMdmNumber, "value3": newMdmNumber } });
    } else if (this.id == "fchan") {
        var oldMdmNumber = newMdmNumber = "";
        if (GV_SYSID == "SAP") {
            oldMdmNumber = GV_MDMNO;
            newMdmNumber = d[1];
        }
        $.ajax({ id: "GETD2", cusve: cusve, data: { "value": d[1], "value1": 'fchan', "kunnr": d[2], "lifnr": d[3], "value3": oldMdmNumber } });
    }
});
$('#resultCustVKN, tbody').on('click', 'i', function() { fCreateSubsytem($(this)); });
$('#resultVendVKN, tbody').on('click', 'i', function() { fCreateSubsytem($(this)); });
//get Confirim
$("#confMod").dialog({
    closeOnEscape: true,
    autoOpen: false,
    show: { effect: "bounce", duration: 1000 },
    hide: { effect: "explode", duration: 1000 },
    height: "auto",
    width: "auto",
    modal: 'true',
    buttons: [{
            height: 35,
            width: 40,
            "class": 'fa fa-times-circle fa-2x',
            click: function() { $(this).dialog("close"); },
        },
        {
            height: 35,
            width: 40,
            "class": 'fa fa-check-square fa-2x ',
            click: function() {
                switch ($(this).data('clicked')) {
                    case "delro":
                        $.ajax({ id: $(this).data('clicked'), data: { "value": $("#ROLES").val() } });
                        break;
                    case "delus":
                        $.ajax({ id: $(this).data('clicked'), data: { "value": $("#UNAME").val() } });
                        break;
                    case "delbk":
                        GV_ROW.data()[10] = "D";
                        GV_ROW.node().style.display = "none";
                        GV_ROW.child.hide();
                        GV_OTABLE.fnUpdate(GV_ROW.data(), GV_ROWID);
                        /*Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/

                        var bankCount = $("#bankDT > tbody > tr").length
                        var status = true;
                        for (var k = 0; k < bankCount; k++) {
                            if (gv_globalBnk.row(k).data() != undefined) {
                                /*7 satırda hesap tipi var */
                                if (gv_globalBnk.row(k).data()[7] == 'TRY1' && gv_globalBnk.row(k).data()[10] != 'D') {
                                    status = false;
                                }
                            }
                        }
                        if (status == false) {
                            for (var k = 0; k < bankCount; k++) {
                                var cmbHesapTipi = "#BVTYP" + k;
                                if (gv_globalBnk.row(k).data() != undefined) {
                                    if (gv_globalBnk.row(k).data()[7] != 'TRY1' && gv_globalBnk.row(k).data()[10] != 'D') {
                                        $(cmbHesapTipi + " option[value='TRY1']").remove();
                                    }
                                }
                            }
                        } else {
                            for (var k = 0; k < bankCount; k++) {
                                var cmbHesapTipi = "#BVTYP" + k;
                                var stat = true;
                                var d = $(cmbHesapTipi)[0];
                                if (gv_globalBnk.row(k).data() != undefined && gv_globalBnk.row(k).data()[10] != 'D') {
                                    if (d != undefined) {
                                        for (var j = 0; j < d.length; j++) {
                                            if (d[j].value == "TRY1") {
                                                stat = false;
                                            }
                                        }
                                    } else {
                                        stat = false;
                                    }
                                } else {
                                    stat = false;
                                }
                                if (stat == true) {
                                    $(cmbHesapTipi).append('<option value="TRY1">TRY1</option>');
                                }
                                stat = true;
                            }
                        }
                        /*   Begin :  TRY1 tekilleştirme işlemi : başlangıç : sarslan : 08062017*/
                        break;
                    case "vaddt":
                        var value = $(this).data('value');
                        $('#ajxlo').show();
                        setTimeout(function() {
                            $.ajax({ id: "VADDT", data: { "value": value, "value1": 'T' } });
                        }, 0);
                        break;
                    case "vadbn":
                        var value = $(this).data('value');
                        $('#ajxlo').show();
                        setTimeout(function() {
                            $.ajax({ id: "VADBN", data: { "value": value, "value1": 'T' } });
                        }, 0);
                        break;
                    case "actdt":
                        window.location.href = "a002.html?mdmno=" + $(this).data('mdmno') + "&tmpid=" + $(this).data('tmpid') + "&param=" + $(this).data('clicked') + "&sysid=" + $(this).data('sysid');
                        break;
                    case "csubs":
                        sessionStorage.setItem("etano", $("#ETANO").val());
                        sessionStorage.setItem("softno", $("#SOFTNO").val());
                        sessionStorage.setItem("timno", $("#TIMNO").val());
                        sessionStorage.setItem("atlasno", $("#ATLASNO").val());
                        window.location.href = "a002.html?mdmno=" + $(this).data('mdmno') + "&kunnr=" + $(this).data('kunnr') + "&lifnr=" + $(this).data('lifnr') + "&param=" + $(this).data('clicked') + "&sysid=" + $(this).data('sysid') + "&cusve=" + $(this).data('cusve');
                        break;
                    case "VENFR":
                        var vednr = vadeSystemcontrol($(this).data('vednr'));
                        var proce = vadeSystemcontrol($(this).data('proce'));
                        $(this).dialog("close");
                        $('#ajxlo').show();
                        GV_TEDARIKNUM = vednr;
                        setTimeout(function() {
                            $.ajax({ id: "VENFR", data: { "value": vednr, "value1": proce } });
                        }, 0);
                        break;
                    case "actbn":
                        var sys = $(this).data('sysid');
                        var mdm = $(this).data('mdmno');
                        var cusve = GV_CUSVE;
                        setTimeout(function() {
                            $.ajax({ id: "ACTBN", data: { "value": mdm, "value1": sys, "value2": cusve } });
                        }, 0);
                        break;
                }
                $(this).dialog("close");
            }
        }
    ]
});
// vade fonksiyonları 
function fullVade(data, flag) {
    var timcu = vadeSystemcontrol(data.timcu);
    var timve = vadeSystemcontrol(data.timve);
    var atlcu = vadeSystemcontrol(data.atlcu);
    var atlve = vadeSystemcontrol(data.atlve);
    var sis = "";
    if (timcu != '*' || timve != '*') {
        sis = 'DS002';
    } else if (softc != '*' || softv != '*') {
        sis = 'DS003';
    } else if (atlcu != '*' || atlve != '*') {
        sis = 'DS005';
    }
    if (sis == "") {
        flag.push("00063");

    } else {
        var typem = vadeTypeFind(data.vtype, 'DS002');
        return typem;
    }
}

function vadeFind(txt) {
    if (txt == "") {
        return "*";
    } else {
        for (var i = 0; i < GV_ZTERM.length; i++) {
            if (GV_ZTERM[i][1] == txt && txt != "") {
                return GV_ZTERM[i][0];
                break;
                continue;
            } else if (i == GV_ZTERM.length) {
                return "*";
            }
        }
    }
}

function vadeTypeFind(txt, sys) {
    if (txt == "" || sys == "") {
        return "*";
    } else {
        for (var i = 0; i < GV_GENELVADE.length; i++) {
            if (GV_GENELVADE[i][1] == txt && txt != "" && GV_GENELVADE[i][0].split("-")[1] == sys) {
                return GV_GENELVADE[i][0];
                break;
                continue;
            } else if (i == GV_GENELVADE.length) {
                return "*";
            }
        }
    }
}

function vadeSystemcontrol(txt) {
    var data = txt;
    if (data.length == 0)
        data = '*';
    else {
        for (var i = 0; i < txt; i++) {
            if (data[0] == "0") {
                data = data.replace("0", "");
            } else
                break;
        }
    }
    if (data == undefined) {
        data = '*';
    }
    return data;
}
//Search Data
$("#modalSearch").dialog({
    autoOpen: false,
    closeOnEscape: true,
    resizable: false,
    modal: true,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "clip", duration: 500 },
    height: 650,
    width: 900,
    buttons: [{
            height: 35,
            width: 40,
            "class": 'fa fa-check-square fa-2x ',
            click: function() {
                if ($('#result tbody tr').length == 0) {
                    $("#errMes").html(sessionStorage.getItem("00274")).dialog("open");
                    return;
                }
                var param = $(this).data('clicked'),
                    d = "",
                    oTable = $('#result').dataTable(),
                    dtab = $('#result').DataTable();
                $("input:checked", oTable.fnGetNodes()).each(function() { d = dtab.row($(this).closest("tr")).data(); });
                if (d[1]) {
                    $("#MDMNO").val(d[1]);
                    switch (param) {
                        case "CHNG_REP":
                            $("#CHNGREP").val(d[1]);
                            break;
                        case "relat_office":
                            if (srctype == "VEND") {
                                $("#RELAT").val(d[4]);
                            } else if (srctype == "CUST") {
                                $("#RELAT").val(d[2]);
                            }
                            break;
                        case "center_office":
                            if (srctype == "VEND") {
                                $("#CENOF").val(d[4]);
                            } else if (srctype == "CUST") {
                                $("#CENOF").val(d[2]);
                            }
                            $("#MDMNO").val(GV_MDMNO);
                            srctype = "";
                            break;
                        case "cust_block":
                            $("#KUNNR_XD").val(d[2]).trigger("change").prop("title", d[7]);
                            $("#KUNNM").val(d[7]);
                            break;
                        case "vend_block":
                            $("#LIFNR_XK").val(d[4]).trigger("change").prop("title", d[7]);
                            break;
                        case "viewx":
                            window.location.href = "a002.html?mdmno=" + d[1] + "&kunnr=" + d[2] + "&lifnr=" + d[4] + "&param=" + param + "&cusve=" + $("#CUSVE_SH").val();
                            break;
                        case "chang":
                            window.location.href = "a002.html?mdmno=" + d[1] + "&kunnr=" + d[2] + "&lifnr=" + d[4] + "&param=" + param + "&cusve=" + $("#CUSVE_SH").val();
                            break;
                        case "histo":
                            var src = cusve = "";
                            if ($("#CUSVE_SH").val() == "CUST") {
                                src = 'a005.html?CUST=' + d[2];
                            } else {
                                src = 'a005.html?VEND=' + d[4];
                            }
                            $("#a005").attr('src', src);
                            $('#display').dialog('open');
                            break;
                    }
                    $(this).dialog("close");
                } else {
                    $("#MDMNO").val("");
                    $("#errMes").html(sessionStorage.getItem("00123")).dialog("open");
                }
            }
        },
        {
            height: 35,
            width: 40,
            "class": 'fa fa-times-circle fa-2x',
            click: function() { $(this).dialog("close"); },
        }
    ]
});
//Create Message Text
$("#modalCreatText").dialog({
    autoOpen: false,
    closeOnEscape: true,
    resizable: false,
    modal: true,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "clip", duration: 500 },
    height: 400,
    width: 900,
    buttons: [{
            height: 35,
            width: 40,
            "class": 'fa fa-check-square fa-2x ',
            click: function() {
                var index = $(this).data('index');
                if (index >= 0) {
                    GV_DATA[0] = $("#SPRAS").val();
                    GV_DATA[1] = $("#ARBGB").val();
                    GV_DATA[2] = $("#MSGNR").val();
                    GV_DATA[3] = $("#TEXTL").val();
                    GV_OTABLE = $("#textDT").dataTable();
                    GV_OTABLE.fnUpdate(GV_DATA, index);
                } else {
                    GV_TABLE.row.add([
                        $("#SPRAS").val(),
                        $("#ARBGB").val(),
                        $("#MSGNR").val(),
                        $("#TEXTL").val(),
                        '<i class="fa fa-pencil fa-2x edit" style="color:#ed8022;cursor:pointer"></i>',
                        '<i class="fa fa-minus-circle fa-2x delete" style="color:#AC193D;cursor:pointer"></i>'
                    ]).draw().node();
                    $('#textDT tr td').each(function() {
                        if (this.cellIndex == 4 || this.cellIndex == 5)
                            $(this).attr("align", "center");
                    });
                }
                $(this).dialog("close");
            }
        },
        {
            height: 35,
            width: 40,
            "class": 'fa fa-times-circle fa-2x',
            click: function() { $(this).dialog("close"); },
        }
    ]
});
$('.searchlink').click(function(e) {
    $("#search").css("display", "block");
    e.preventDefault();
    $('#modalSearch').data('clicked', $(this).data("id")).dialog("open");
});
$('.searchlink2').click(function(e) {
    e.preventDefault();
    $('#modalSearch2').data('clicked', $(this).data("id")).dialog("open");
});
//Modal Form Toogle..
$(".downtoogle").hide();
$(".toggle").click(function() {
    var $this = $(this);
    $this.next("form").slideToggle(300, function() { $this.children('i').toggle(); });
});

//search helpde entera basıldığında arama butonu tetiklensin..
$('.ui-dialog').keypress(function(e) {
    if (e.keyCode == $.ui.keyCode.ENTER) {
        $(this).find(".00008").click();
    }
});
$("#search_btn").click(function(e) {
    if ($("#CUSVE_SH").val() == "") {
        $("#errMes").html(sessionStorage.getItem("00136")).dialog("open");
    } else if (($("#BUKRS_SH").val() != "") && (($("#MDMNO_SH").val() == "") && ($("#SAPNO_SH").val() == "") && ($("#NAME1_SH").val() == "") && ($("#NAME2_SH").val() == "") && ($("#LAND1_SH").val() == "") && ($("#STCD2_SH").val() == "") && ($("#FERDA").val() == "") && ($("#TERDA").val() == ""))) {
        $("#errMes").html(sessionStorage.getItem("00286")).dialog("open");
    } else {
        /*  Begin : Hatalı sap kodunu tespiti baslangıc sarslan : 20170324 */
        var sap_no1 = $("#SAPNO_SH").val();
        /*  Begin : Hatalı sap kodunu tespiti baslangıc update sarslan : 20170413 */
        sap_no1 = sap_no1.replace(String.fromCharCode(160), '');
        /*  Begin : Hatalı sap kodunu tespiti bitis update sarslan : 20170413 */
        sap_no1 = sap_no1.replace(/ /g, '');

        $("#SAPNO_SH").val(sap_no1);
        if (sap_no1.length == 0) {
            $.ajax({ id: "SRCHD", data: $("#search").serializeArray() });
            var data = $("#search").serializeArray();
            srctype = data[3]["value"];

        } else if (sap_no1.length > 0) {
            sap_no1 = sap_no1.substr(2, (sap_no1.length - 1));
            if (!isNaN(sap_no1)) {
                $.ajax({ id: "SRCHD", data: $("#search").serializeArray() });
            } else {
                $("#errMes").html(sessionStorage.getItem("00318")).dialog("open");
            }
        }
        /*  Begin : Hatalı sap kodunu tespiti bitis sarslan : 20170324 */
        /*  Eski kod    $.ajax({ id: "SRCHD", data: $("#search").serializeArray() });*/
    }
    e.stopImmediatePropagation();
});

//arama sonuçlarında satır tıklandığında radio seçilsin
$('#result, tbody').on('click', 'tr', function() {
    //daha önce seçilen radio buttonlar temizleniyor..
    var oTable = $('#result').dataTable();
    $("input:checked", oTable.fnGetNodes()).each(function() {
        $(this).prop("checked", false);
    });
    $(this).find('td input:radio').prop('checked', true);
});
//modaldaki yaratma tarihi girişi
fSetDatePicker("#FERDA", "minDate", "#TERDA");
fSetDatePicker("#TERDA", "maxDate", "#FERDA");

$("#NAME1_SH").change(function(e) {
    this.value = fUpperCase(this.value);
    e.stopImmediatePropagation();
});
$("#NAME2_SH").change(function(e) {
    this.value = fUpperCase(this.value);
    e.stopImmediatePropagation();
});

/* ------------------------------------ END: DIALOG             ------------------------------------ */
/* ------------------------------------ BEGIN: INPUT NUMBER     ------------------------------------ */
$('.inputNumber').keypress(function(e) {
    if (e.ctrlKey == false && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});
$('.inputNumber').change(function(evt) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
/* ------------------------------------ END: INPUT NUMBER   ------------------------------------ */
/* ------------------------------------ BEGIN: REFRESH PAGE     ------------------------------------ */
function fRefreshPage(messg, mtype, page) {

    $('#errMes').position({
        my: "center",
        at: "center",
        of: window
    });
    if (messg) {
        $("#errMes").empty().html(messg);
        if (mtype == 'S') {
            $("#errMes").dialog("open");
            $('#errMes').on('dialogclose', function(event) {
                $(this).dialog("close");
                location.href = page;
            });
        } else {
            $("#errMes").dialog("open");
        }
    }
    document.getElementById("errMes").parentElement.style.top = (window.innerHeight / 2 + 'px');

    $("#errMes").css("left", "0");
    $("#errMes").css("top", "0");
}
/* ------------------------------------ END: REFRESH PAGE       ------------------------------------ */
/* ------------------------------------ BEGIN: SELECT CHOSEN    ------------------------------------ */
function fSelectChoosen() {
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: GV_SRECORD },
        '.chosen-select-width': { width: "95%" }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
    var defaultChosenOptions = { 'search_contains': true };
    // default options
    $("select").chosen(defaultChosenOptions);
}
/* ------------------------------------ END: SELECT CHOSEN      ------------------------------------ */
/* ------------------------------------ BEGIN: OTHER FUNCTIONS  ------------------------------------ */
/* --- UPPER CASE           --- */
function fUpperCase(text) {
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    text = text.replace(/(([iışğüçö]))/g, function(letter) { return letters[letter]; });
    return text.toUpperCase();
}
/* --- RESIZE CHOSEN        --- */
function resizeChosen() { $(".chosen-container").each(function() { $(this).attr('style', 'width: 100%'); }); }
/* --- UEXIT FUNCTION       --- */
$("#signOut").click(function() {
    location.href = "http://app.borusanlojistik.com.tr/MDM/login.aspx";
});
$(window).on('beforeunload', function() {
    if (href != "a012") {
        uexit("a001.html");
    }
});
//$(window).bind('unload', function(){ uexit(); });
function uexit() {
    $.ajax({ id: "UEXIT", data: { "proce": "UEXIT", "sapno": $("#SAPNO").val() } });
    //sessionStorage.clear(); 
    //window.setTimeout('document.execCommand("ClearAuthenticationCache", true)',0); 
    window.location = window.location;
}
/* --- REMOVE URL PARAM     --- */
function fRemoveURL() {
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}
/* --- REST CHARACTER       --- */
function fSetCharRest(max, answer, textarea) {
    $(answer).html(max);
    $(textarea).keyup(function() {
        var i = $(textarea).val().length;
        var rest = max - i;
        $(answer).html(rest);
    });
}
/* --- SET DATEPICKER       --- */
function fSetDatePicker(name, param, name2) {
    $(name).datepicker({ /*defaultDate: "+1w",*/ changeMonth: true, numberOfMonths: 1, dateFormat: 'dd.mm.yy', onClose: function(selectedDate) { $(name2).datepicker("option", param, selectedDate); } });
}
/* --- DASHBOARD COUNT      --- */
function fCounter() {
    $('.number').data('countToOptions', { formatter: function(value, options) { return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '.'); } });
    $('.number').each(count);
}

function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
}
/* --- DYNAMIC BACKGROUND   --- */
function fSetDynamicBg() {
    var body = $('body');
    var backgrounds = ['Cherry', 'SolidVault', 'BrightVault', 'Politics', 'Sylvia', 'Transfile', 'Tranquil', 'RedOcean', 'Alihossein', 'Ali', 'DarkSkies', 'Suzy', 'Superman', 'Nighthawk', 'Forest', 'MiamiDolphins', 'Joomla', 'Pizelex', 'Haikus', 'Purplin', 'Inbox', 'Blush', 'Poncho', 'GreenandBlue', 'LightOrange', 'Netflix', 'LittleLeaf', 'DeepPurple', 'MasterCard', 'ClearSky', 'Passion', 'Timber', 'BetweenNightandDay', 'SagePersuasion', 'DarkKnight', 'CuriosityBlue', 'GreentoDark', 'FreshTurboscent', 'VirginAmerica', 'TurquoiseFlow', 'Vine', 'Flickr', 'Instagram', 'Twitch', 'EndlessRiver', 'Predawn', 'PurpleBliss', 'TalkingToMiceElf', 'Hersheys', 'CrazyOrange', 'BetweenTheClouds', 'ServQuick', 'SoundCloud', 'FacebookMessenger', 'CheerUpEmoKid', 'Amethyst', 'ManofSteel', 'TealLove', 'RedMist', 'Starfall', 'Parklife', 'Cherryblossoms', 'ShadowNight', 'Ash', 'DirtyFog', 'TheStrain', 'Reef', 'Petrichor', 'Vasily', 'BlurryBeach', 'Namn', 'DayTripper', 'PinotNoir', 'Army', 'Shrimpy', 'Influenza', 'CalmDarya', 'Stellar', 'Mantle', 'Titanium', 'ShroomHaze', 'Moss', 'ElectricViolet', 'Kashmir', 'Mirage', 'Mojito', 'SeaWeed', 'Sunrise', 'AquaMarine', 'Aubergine', 'BloodyMary'];
    var current = 0;

    function nextBackground() {
        body.addClass(
            backgrounds[current = ++current % backgrounds.length]
        );
        setTimeout(nextBackground, 30000);
    }
    setTimeout(nextBackground, 30000);
    body.addClass(backgrounds[0]);
}
//LOADER
$(window).load(function() {
    $("#message, #errMes, #confMod,#modalSearch2, #modalSearch, #display").show();
    $('#windl').fadeOut("slow");
});
$(window).resize(function(e) {
    //$( $.fn.dataTable.tables(true) ).DataTable().responsive.recalc();
    if (innerWidth < 1600) {
        $("html").css("width", "1550px");
    } else {
        $("html").css("width", "100%");
    }
    e.stopImmediatePropagation();
});
$(".en").mouseenter(function() {
    /* $(".en").stop().animate({ "left": "0px" }, "slow");*/
});
$(".en").mouseleave(function() {
    /*  $(".en").stop().animate({ "left": "-35px" }, "normal");*/
});
/* ------------------------------------ END: OTHER FUNCTIONS    ------------------------------------ */
/* ------------------------------------ BEGIN: Global Ajax Event Handlers -------------------------- */
$.ajaxSetup({
    url: "ajax.html",
    type: "POST",
    dataType: 'json',
    async: false,
    beforeSend: function() {
        $('#ajaxl').fadeIn("fast");
        var selct = sessionStorage.getItem("selct"),
            sysid = sessionStorage.getItem("sysid");
        if (this.data) {
            if (selct)
                this.data += "&selct=" + selct;
        } else {
            if (selct)
                this.data += "selct" + selct;
        }
        if (this.data) {
            if (sysid)
                this.data += "&sysid=" + sysid;
        } else {
            if (sysid)
                this.data += "sysid" + sysid;
        }
        if (this.data)
            this.data += "&proce=" + this.id;

        if (this.id == "SAVCV")
            $('#ajxlo').fadeIn("fast");
    },
    success: function(res) {
        if (res.messnmb == "00233") {
            $("#errMes").html(res.message).dialog("open");
            $('#errMes').on('dialogclose', function(event) {
                window.location.href = "a002.html";
            });
            return;
        }
        var id = this.id.toUpperCase();
        if (id == "SAVUS" || id == "SAVRO" || id == "CROLE" || id == "DELRO" || id == "DELUS") {
            if (res.message) {
                var lv_return = "";
                for (var i = 0; i < res.message.length; i++) { lv_return += res.message[i]; };
                fRefreshPage(lv_return, res.messtyp, "a003.html");
            }
        }
        switch (this.id) {
            case "ADRES":
                var city = "",
                    dist = "";
                if (href == "a010") {
                    if (res.CITY != undefined) {
                        for (var i = 0; i < res.CITY.length; i++) {
                            city += '<option value="' + res.CITY[i][0] + '">' + res.CITY[i][1] + '</option>';
                        };
                        $("#asehr").empty().append(city).trigger('chosen:updated');
                    } else if (res.DIST != undefined) {
                        for (var i = 0; i < res.DIST.length; i++) {
                            dist += '<option value="' + res.DIST[i][0] + '">' + res.DIST[i][1] + '</option>';
                        };
                        $("#ailce").empty().append(dist).trigger('chosen:updated');
                    }
                } else {
                    if (res.CITY != undefined) {
                        for (var i = 0; i < res.CITY.length; i++) {
                            city += '<option value="' + res.CITY[i][0] + '">' + res.CITY[i][1] + '</option>';
                        };
                        $("#mapsCity" + ctryIndex).empty().append(city).trigger('chosen:updated');
                        $("#mapsDist" + ctryIndex).empty().append("<option value=''> Bir Seçenek Seçiniz </option>").trigger('chosen:updated');
                    } else if (res.DIST != undefined) {
                        for (var i = 0; i < res.DIST.length; i++) {
                            dist += '<option value="' + res.DIST[i][0] + '">' + res.DIST[i][1] + '</option>';
                        };
                        $("#mapsDist" + ctiyIndex).empty().append(dist).trigger('chosen:updated');
                    }
                }
                break;
            case "DASHB":
                $("#kunnr").data("to", res.DASHB[0]["KUNNR"]);
                $("#lifnr").data("to", res.DASHB[1]["LIFNR"]);
                $("#skunn").data("to", res.DASHB[2]["SKUNN"]);
                $("#slifn").data("to", res.DASHB[3]["SLIFN"]);
                $("#tkunn").data("to", res.DASHB[4]["TKUNN"]);
                $("#tlifn").data("to", res.DASHB[5]["TLIFN"]);
                $("#ekunn").data("to", res.DASHB[6]["EKUNN"]);
                $("#elifn").data("to", res.DASHB[7]["ELIFN"]);
                $("#akunn").data("to", res.DASHB[8]["AKUNN"]);
                $("#alifn").data("to", res.DASHB[9]["ALIFN"]);
                break;
            case "DEFEN":
                GV_SPRAS = GV_SAREA = GV_TSUPP = GV_CGUID = GV_BZIRK = GV_KDGRP = GV_KALKS = GV_LPRIO = GV_VSBED = GV_EKORG = GV_PLTYP = GV_VERSG = GV_KTGRD = GV_ZTERM = GV_KONDA = GV_BRSCH =
                    GV_VBUND = GV_WAERS = GV_ZUAWA = GV_FDGRV = GV_MINDK = GV_TAXKD = GV_DEPAR = GV_PARTS = GV_SFTCT = GV_CURTY = GV_KTOKD = GV_BVTYP = GV_TAXA1 = GV_PYMNT = "";
                var t1 = t2 = "";
                var gv_nyt = '<option value="X">NYT Grubu Boş Olanlar.</option>';;
                //vade
                var t6 = t3 = t4 = t5 = "";
                t1 = $('#addrDT').DataTable();
                GV_ATYPE = GV_CTYPE = GV_BUKRS = GV_VKORG = "";
                for (var i = 0; i < res.ATYPE.length; i++) {
                    GV_ATYPE += '<option value="' + res.ATYPE[i][0] + '">' + res.ATYPE[i][1] + '</option>';
                    if (res.ATYPE[i][1]) t1.row.add(['', res.ATYPE[i][1], '', '', '', '', '', '', '', '', '']).draw();
                };
                t1 = $('#contDT').DataTable();
                for (var i = 0; i < res.CTYPE.length; i++) {
                    GV_CTYPE += '<option value="' + res.CTYPE[i][0] + '">' + res.CTYPE[i][1] + '</option>';
                    if (res.CTYPE[i][1]) t1.row.add(['', res.CTYPE[i][1], '', '', '', '', '', '', '']).draw();
                };
                t1 = $('#custFI').DataTable();
                t2 = $('#vendFI').DataTable();
                for (var i = 0; i < res.BUKRS.length; i++) {
                    GV_BUKRS += '<option value="' + res.BUKRS[i][0] + '">' + res.BUKRS[i][1] + '</option>';
                    if (res.BUKRS[i][1])
                        t1.row.add(['', res.BUKRS[i][1], '', '', '', '', '', '', '', '', '', '', '']).draw();
                    t2.row.add(['', res.BUKRS[i][1], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']).draw();
                };
                $("#BLK_VAL").empty().append(GV_BUKRS).trigger('chosen:updated');
                $("#nyt_blk_val").empty().append(GV_BUKRS).trigger('chosen:updated');
                $("#COMP_TYPE").empty().append(GV_BUKRS).trigger('chosen:updated');

                t1 = $('#custSD').DataTable();
                if (res.VKORG != undefined) {
                    for (var i = 0; i < res.VKORG.length; i++) {
                        GV_VKORG += '<option value="' + res.VKORG[i][0] + '">' + res.VKORG[i][1] + '</option>';
                        if (res.VKORG[i][1])
                            t1.row.add(['', res.VKORG[i][1], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']).draw();
                    }
                }
                t1 = $('#vendMM').DataTable();
                for (var i = 0; i < res.EKORG.length; i++) {
                    t1.row.add(['', res.EKORG[i][1], '', '', '']).draw();
                    GV_EKORG += '<option value="' + res.EKORG[i][0] + '">' + res.EKORG[i][1] + '</option>';
                };
                for (var i = 0; i < res.SPRAS.length; i++) { GV_SPRAS += '<option value="' + res.SPRAS[i][0] + '">' + res.SPRAS[i][1] + '</option>'; };
                for (var i = 0; i < res.SAREA.length; i++) { GV_SAREA += '<option value="' + res.SAREA[i][0] + '">' + res.SAREA[i][1] + '</option>'; };
                for (var i = 0; i < res.TSUPP.length; i++) { GV_TSUPP += '<option value="' + res.TSUPP[i][0] + '">' + res.TSUPP[i][1] + '</option>'; };
                for (var i = 0; i < res.CGUID.length; i++) { GV_CGUID += '<option value="' + res.CGUID[i][0] + '">' + res.CGUID[i][1] + '</option>'; };
                for (var i = 0; i < res.BZIRK.length; i++) { GV_BZIRK += '<option value="' + res.BZIRK[i][0] + '">' + res.BZIRK[i][1] + '</option>'; };
                for (var i = 0; i < res.KDGRP.length; i++) { GV_KDGRP += '<option value="' + res.KDGRP[i][0] + '">' + res.KDGRP[i][1] + '</option>'; };
                for (var i = 0; i < res.KALKS.length; i++) { GV_KALKS += '<option value="' + res.KALKS[i][0] + '">' + res.KALKS[i][1] + '</option>'; };
                for (var i = 0; i < res.LPRIO.length; i++) { GV_LPRIO += '<option value="' + res.LPRIO[i][0] + '">' + res.LPRIO[i][1] + '</option>'; };
                for (var i = 0; i < res.VSBED.length; i++) { GV_VSBED += '<option value="' + res.VSBED[i][0] + '">' + res.VSBED[i][1] + '</option>'; };
                for (var i = 0; i < res.PLTYP.length; i++) { GV_PLTYP += '<option value="' + res.PLTYP[i][0] + '">' + res.PLTYP[i][1] + '</option>'; };
                for (var i = 0; i < res.VERSG.length; i++) { GV_VERSG += '<option value="' + res.VERSG[i][0] + '">' + res.VERSG[i][1] + '</option>'; };
                for (var i = 0; i < res.KTGRD.length; i++) { GV_KTGRD += '<option value="' + res.KTGRD[i][0] + '">' + res.KTGRD[i][1] + '</option>'; };
                for (var i = 0; i < res.ZTERM.length; i++) { GV_ZTERM += '<option value="' + res.ZTERM[i][0] + '">' + res.ZTERM[i][1] + '</option>'; };
                for (var i = 0; i < res.KONDA.length; i++) { GV_KONDA += '<option value="' + res.KONDA[i][0] + '">' + res.KONDA[i][1] + '</option>'; };
                for (var i = 0; i < res.BRSCH.length; i++) { GV_BRSCH += '<option value="' + res.BRSCH[i][0] + '">' + res.BRSCH[i][1] + '</option>'; };
                for (var i = 0; i < res.VBUND.length; i++) { GV_VBUND += '<option value="' + res.VBUND[i][0] + '">' + res.VBUND[i][1] + '</option>'; };
                for (var i = 0; i < res.WAERS.length; i++) { GV_WAERS += '<option value="' + res.WAERS[i][0] + '">' + res.WAERS[i][1] + '</option>'; };
                for (var i = 0; i < res.ZUAWA.length; i++) { GV_ZUAWA += '<option value="' + res.ZUAWA[i][0] + '">' + res.ZUAWA[i][1] + '</option>'; };
                for (var i = 0; i < res.FDGRV.length; i++) {
                    GV_FDGRV += '<option value="' + res.FDGRV[i][0] + '">' + res.FDGRV[i][1] + '</option>';
                    if (res.FDGRV[i][0] != "") {
                        gv_nyt += '<option value="' + res.FDGRV[i][0] + '">' + res.FDGRV[i][1] + '</option>';
                    }
                };
                $("#NYT_VAL").empty().append(gv_nyt).trigger('chosen:updated');
                for (var i = 0; i < res.MINDK.length; i++) { GV_MINDK += '<option value="' + res.MINDK[i][0] + '">' + res.MINDK[i][1] + '</option>'; };
                for (var i = 0; i < res.TAXKD.length; i++) { GV_TAXKD += '<option value="' + res.TAXKD[i][0] + '">' + res.TAXKD[i][1] + '</option>'; };
                for (var i = 0; i < res.DEPAR.length; i++) { GV_DEPAR += '<option value="' + res.DEPAR[i][0] + '">' + res.DEPAR[i][1] + '</option>'; };
                for (var i = 0; i < res.PARTS.length; i++) { GV_PARTS += '<option value="' + res.PARTS[i][0] + '">' + res.PARTS[i][1] + '</option>'; };
                for (var i = 0; i < res.SFTCT.length; i++) { GV_SFTCT += '<option value="' + res.SFTCT[i][0] + '">' + res.SFTCT[i][1] + '</option>'; };
                for (var i = 0; i < res.CURTY.length; i++) { GV_CURTY += '<option value="' + res.CURTY[i][0] + '">' + res.CURTY[i][1] + '</option>'; };
                for (var i = 0; i < res.KTOKD.length; i++) {
                    /*BEGIN:  Kart oluştururken Hesap Grubunda Grupiçi Müşterilerin html e basılması engellendi Amesud 20170223 */
                    if ((GV_PARAM == "ACTDT" && res.KTOKD[i][0] == "B002") || (res.KTOKD[i][0] == "B009" && GV_CUSVE == "VEND" && GV_PARAM == "CREAT")) {
                        continue;
                    } else if ((res.KTOKD[i][0] == "B002") && (GV_PARAM == "CREAT" || GV_PARAM != "CHANG") && (href != "a003") && href != "a012") {
                        var str = sysid;
                        str = str.slice(0, -1);
                        var array = str.split("_");
                        if (array.length < 3) {
                            continue;
                        }
                    }
                    /*END:  Kart oluştururken Hesap Grubunda Grupiçi Müşterilerin html e basılması engellendi Amesud 20170223 */
                    GV_KTOKD += '<option value="' + res.KTOKD[i][0] + '">' + res.KTOKD[i][1] + '</option>';
                };
                GV_ALLBNK = res.BVTYP;
                for (var i = 0; i < res.BVTYP.length; i++) { GV_BVTYP += '<option value="' + res.BVTYP[i][0] + '">' + res.BVTYP[i][1] + '</option>'; };
                //  if (GV_PARAM == "CREAT") {
                if (res.VADE.length == 0) {
                    $("#tabs").find('li:eq(5)').hide();
                } else {
                    // VADE EKRANLARI ACILDIGINI BUNU KALDIR VE ALDAKİ YORUMLARI AKTİF ET ARTI S024 ara ve yorumları kaldır.
                    $("#tabs").find('li:eq(5)').show();
                    // VADE EKRANNI KAPATTIM 
                    if (GV_PARAM == "CREAT" || GV_PARAM == "") {
                        $(".eski_vade").css("display", "none");
                    } else if (GV_PARAM == "CHANG") {

                    }
                    t5 = $('#VadePMTim').DataTable();
                    t6 = $('#VadePMAtlas').DataTable();
                    GV_VADEATLAS = '<option value="">Bir seçenek seçin</option>';
                    GV_VADETIM = '<option value="">Bir seçenek seçin</option>';
                    for (var i = 0; i < res.VADE.length; i++) {
                        if (res.VADE[i][0].split("-")[1] == "DS002") {
                            $("#timMat").css("display", "block");
                            GV_VADETIM += '<option value="' + res.VADE[i][0] + '">' + res.VADE[i][1] + '</option>';
                            t5.row.add(['', res.VADE[i][1], '', '', '']).draw();

                        } else if (res.VADE[i][0].split("-")[1] == "DS005") {
                            $("#atlasMat").css("display", "block");
                            GV_VADEATLAS += '<option value="' + res.VADE[i][0] + '">' + res.VADE[i][1] + '</option>';
                            t6.row.add(['', res.VADE[i][1], '', '', '']).draw();

                        } else {}
                    }
                }
                for (var i = 0; i < res.PYMNT.length; i++) {
                    GV_PYMNT += '<option value="' + res.PYMNT[i][0] + '">' + res.PYMNT[i][1] + '</option>';
                }
                GV_TAXA1 = res.TAXA1;
                $("#BVTYP").empty().append(GV_BVTYP);
                $("#KTOKD").empty().append(GV_KTOKD);
                $("#VBUND, #VBUND_ACC").empty().append(GV_VBUND);
                $("#BRSCH, #BRSCH_ACC").empty().append(GV_BRSCH);
                $("#TSUPP, #TSUPP_ACC").empty().append(GV_TSUPP);
                $("#CGUID, #CGUID_ACC").empty().append(GV_CGUID);
                $("#CTYPE").empty().append(GV_CTYPE);
                $("#LANGU").empty().append(GV_SPRAS);
                $("#DEPAR, #DEPAR_SOFT").empty().append(GV_DEPAR);
                $("#PARTS, #PARTS_SOFT").empty().append(GV_PARTS);
                $("#SFTCT, #SFTCT_SOFT").empty().append(GV_SFTCT);
                $("#CURTY").empty().append(GV_CURTY);
                $("#CCURT, #CURRY, #CURTY_SOFT, #CURRY_SOFT, #CCURT_SOFT, #WAERS, #WAERS_CSD, #WAERS_VMM").empty().append(GV_WAERS);
                $("#TAXKD, #TAXKD_CSD").empty().append(GV_TAXKD);
                $("#BZIRK, #BZIRK_CSD").empty().append(GV_BZIRK);
                $("#KTGRD, #KTGRD_CSD").empty().append(GV_KTGRD);
                $("#KDGRP, #KDGRP_CSD").empty().append(GV_KDGRP);
                $("#KONDA, #KONDA_CSD").empty().append(GV_KONDA);
                $("#KALKS, #KALKS_CSD").empty().append(GV_KALKS);
                $("#PLTYP, #PLTYP_CSD").empty().append(GV_PLTYP);
                $("#VERSG, #VERSG_CSD").empty().append(GV_VERSG);
                $("#LPRIO, #LPRIO_CSD").empty().append(GV_LPRIO);
                $("#VSBED, #VSBED_CSD").empty().append(GV_VSBED);
                $("#MINDK_VFI").empty().append(GV_MINDK);
                $("#EKORG_VMM").empty().append(GV_EKORG);
                var name_zterm = "#ZTERM_CFI" + ", #ZTERM_VFI, #ZTERM_CSD, #ZTERM_VMM";
                $("#ZUAWA_CFI, #ZUAWA_VFI").empty().append(GV_ZUAWA);
                $("#FDGRV_CFI, #FDGRV_VFI").empty().append(GV_FDGRV);
                $(name_zterm).empty().append(GV_ZTERM);
                $("#BVTYP2").empty().append(GV_BVTYP);
                $("#KTOKD2").empty().append(GV_KTOKD);
                $("#VBUND2, #VBUND_ACC2").empty().append(GV_VBUND);
                $("#BRSCH2, #BRSCH_ACC2").empty().append(GV_BRSCH);
                $("#TSUPP2, #TSUPP_ACC2").empty().append(GV_TSUPP);
                $("#CGUID2, #CGUID_ACC2").empty().append(GV_CGUID);
                $("#CTYPE2").empty().append(GV_CTYPE);
                $("#LANGU2").empty().append(GV_SPRAS);
                $("#DEPAR2, #DEPAR_SOFT2").empty().append(GV_DEPAR);
                $("#PARTS2, #PARTS_SOFT2").empty().append(GV_PARTS);
                $("#SFTCT2, #SFTCT_SOFT2").empty().append(GV_SFTCT);
                $("#CURTY2").empty().append(GV_CURTY);
                $("#CCURT2, #CURRY2, #CURTY_SOFT2, #CURRY_SOFT2, #CCURT_SOFT2, #WAERS2, #WAERS_CSD2, #WAERS_VMM2").empty().append(GV_WAERS);
                $("#TAXKD2, #TAXKD_CSD2").empty().append(GV_TAXKD);
                $("#BZIRK2, #BZIRK_CSD2").empty().append(GV_BZIRK);
                $("#KTGRD2, #KTGRD_CSD2").empty().append(GV_KTGRD);
                $("#KDGRP2, #KDGRP_CSD2").empty().append(GV_KDGRP);
                $("#KONDA2, #KONDA_CSD2").empty().append(GV_KONDA);
                $("#KALKS2, #KALKS_CSD2").empty().append(GV_KALKS);
                $("#PLTYP2, #PLTYP_CSD2").empty().append(GV_PLTYP);
                $("#VERSG2, #VERSG_CSD2").empty().append(GV_VERSG);
                $("#LPRIO2, #LPRIO_CSD2").empty().append(GV_LPRIO);
                $("#VSBED2, #VSBED_CSD2").empty().append(GV_VSBED);
                $("#MINDK_VFI2").empty().append(GV_MINDK);
                $("#EKORG_VMM2").empty().append(GV_EKORG);
                $(".chosen-select").trigger('chosen:updated');
                break;
            case "SAVCV":
                var buttons = "";
                if (res.message) {
                    $("#savemsg").html(res.message).css("background-color", "#098d9e").dialog("open");
                    $("#MDMNO").val(res.mdmno);
                    $("#SAPNO").val(res.sapno);
                    $("#TIMNO").val(res.timno);
                    $("#ETANO").val(res.etano);
                    $("#SOFTNO").val(res.softno);
                    var str = res.message;
                    str = str.replace(/<br\s*[\/]?>/gi, "\r\n");
                    str = str.replace(/<hr\s*[\/]?>/gi, "\r\n");
                    str = str.replace("<span><img src=img/mdm_sap_124.png style=width:50px /><i style='color:#26ff10;float:right' class='fa fa-check-circle'></i>", "SAP:");
                    str = str.replace("<span><img src=img/mdm_tim_124.png style=width:50px /><i style='color:#26ff10;float:right' class='fa fa-check-circle'></i>", "TIM:");
                    str = str.replace("<span><img src=img/mdm_eta_124.png style=width:50px /><i style='color:#26ff10;float:right' class='fa fa-check-circle'></i>", "ETA:");
                    str = str.replace("<span><img src=img/mdm_soft_124.png style=width:50px /><i style='color:#26ff10;float:right' class='fa fa-check-circle'></i>", "SOFT:");
                    str = str.replace("<span><img src=img/mdm_sap_124.png style=width:50px /><i style='color:#ffdc18;float:right' class='fa fa-exclamation-triangle'></i>", "SAP:");
                    str = str.replace("<span><img src=img/mdm_tim_124.png style=width:50px /><i style='color:#ffdc18;float:right' class='fa fa-exclamation-triangle'></i>", "TIM:");
                    str = str.replace("<span><img src=img/mdm_eta_124.png style=width:50px /><i style='color:#ffdc18;float:right' class='fa fa-exclamation-triangle'></i>", "ETA:");
                    str = str.replace("<span><img src=img/mdm_soft_124.png style=width:50px /><i style='color:#ffdc18;float:right' class='fa fa-exclamation-triangle'></i>", "SOFT:");
                    str = str.replace(/<\/?span[^>]*>/g, "");
                    buttons = [{
                        text: 'E-mail',
                        class: 'fa fa-envelope',
                        click: function() {
                            var email = "";
                            if (sessionStorage.getItem("sysid").substr(0, 4) == "CUST") {
                                //email = "bl_mdmmusterisorumlusu@borusan.com";
                                email = "bl_mdmteam@borusan.com";
                            } else if (sessionStorage.getItem("sysid").substr(0, 4) == "VEND") {
                                //email = "bl_mdmsaticisorumlusu@borusan.com";
                                email = "bl_mdmteam@borusan.com";
                            }
                            var strc = encodeURIComponent(str);
                            var smail = "mailto:" + email + "?subject=MDM: Mail Bilgilendirme";
                            smail = smail + "&body=" + strc;
                            var iframe = $('<iframe id="mailtoFrame" src="' + smail + '" width="1" height="1" border="0" frameborder="0"></iframe>');
                            $('body').append(iframe);
                            window.setTimeout(function() { iframe.remove(); }, 500);
                        }
                    }];
                    if (res.edit) {
                        if (GV_LANGU == "T") {
                            buttons["Hatayı düzelt"] = function() { $(this).dialog("close"); }
                        } else {
                            buttons["Fix the error"] = function() { $(this).dialog("close"); }
                        }
                    } else {
                        $('#savemsg').on('dialogclose', function(event) {
                            window.location.href = "a002.html";
                        });
                    }

                    $("#savemsg").dialog("option", "buttons", buttons); // setter
                }
                break;
            case "LAND1":
                GV_TAXCT = GV_REGIO = "";
                if ($("#LAND1").val() == "TR") {}
                /*BEGIN:    Kazakistan seçilince Vergi numarası 4 alanının uzunluğu 12 oluyor. Amesud 20170131 */
                if ($("#LAND1").val() == "KZ") {
                    $("#STCD4").attr('maxlength', '12');
                } else {
                    $("#STCD4").attr('maxlength', '11');
                }
                /*END:      Kazakistan seçilince Vergi numarası 4 alanının uzunluğu 12 oluyor. Amesud 20170131 */
                $("#TAXCT, #STCD1").empty().trigger('chosen:updated');
                for (var i = 0; i < res.TAXCT.length; i++) { GV_TAXCT += '<option value="' + res.TAXCT[i][0] + '">' + res.TAXCT[i][1] + '</option>'; };
                for (var i = 0; i < res.REGIO.length; i++) { GV_REGIO += '<option value="' + res.REGIO[i][0] + '">' + res.REGIO[i][1] + '</option>'; };
                $("#TAXCT").empty().append(GV_TAXCT).trigger('chosen:updated');
                $("#REGIO").empty().append(GV_REGIO).trigger('chosen:updated');


                break;
            case "STCD1":
                GV_STCD1 = "";
                if (href == "a010") {
                    for (var i = 0; i < res.STCD1.length; i++) {
                        GV_STCD1 += '<option value="' + res.STCD1[i][0] + '">' + res.STCD1[i][1] + '</option>';
                    };
                    $("#taxto").empty().append(GV_STCD1).trigger('chosen:updated');

                } else {
                    for (var i = 0; i < res.STCD1.length; i++) {
                        GV_STCD1 += '<option value="' + res.STCD1[i][0] + '">' + res.STCD1[i][1] + '</option>';
                    };
                    $("#STCD1").empty().append(GV_STCD1).trigger('chosen:updated');
                }
                break;
            case "SRCHD":
                if (res.messtyp == "S") {
                    if (src_stats == '1') {
                        fDynamicTable("#result2", res.SRCHD, true, true, true, true, true, true);
                        src_stats = "0";
                    } else {
                        fDynamicTable("#result", res.SRCHD, true, true, true, true, true, true);
                    }
                    //var val = val = $("#NAME1_SH").val() ;        
                    // trigger filter
                    $(".toggle").click();
                    //$('input[type=search]').val( val );
                    //$('input[type=search]').on('keyup', function (e) { });
                    //$('input[type=search]').trigger({type: 'keyup',which: 27});   
                    //$(".dataTables_filter").css("display", "none");

                } else {
                    $("#errMes").html(res.message).dialog("open");
                }
                break;
            case "BANKS":
                GV_BANKA = GV_BRNCH = "";
                for (var i = 0; i < res.BANKA.length; i++) {
                    GV_BANKA += '<option value="' + res.BANKA[i][0] + '">' + res.BANKA[i][1] + '</option>';
                };
                if (href == "a010") {
                    $("#bbank").empty().append(GV_BANKA).trigger('chosen:updated');
                    $("#bsube").empty().trigger('chosen:updated');
                } else {
                    $("#BANKA" + GV_ROWID).empty().append(GV_BANKA).trigger('chosen:updated');
                    $("#BRNCH" + GV_ROWID).empty().trigger('chosen:updated');
                }
                break;
            case "BANKA":
                GV_BRNCH = "";
                for (var i = 0; i < res.BRNCH.length; i++) {
                    GV_BRNCH += '<option value="' + res.BRNCH[i][0] + '">' + res.BRNCH[i][1] + '</option>';
                };
                if (href == "a010") {
                    $("#bsube").empty().append(GV_BRNCH).trigger('chosen:updated');
                } else {
                    $("#BRNCH" + GV_ROWID).empty().append(GV_BRNCH).trigger('chosen:updated');

                    var resib = sessionStorage.getItem("RESBIBAN");

                    if (resib) {
                        resib = jQuery.parseJSON(resib);
                        $("#BRNCH" + GV_ROWID).val(resib).trigger("change").trigger("chosen:updated");
                        var biban_tur = sessionStorage.getItem("RESBIBAN_STATS");
                        biban_tur = parseInt(biban_tur) - 1;
                    }
                }
                break;
            case "BIBA2":
                if (res == "404") {
                    $("#message").html(sessionStorage.getItem("00363")).dialog("open");
                    $("#BIBAN" + GV_ROWID).val("").trigger("change");
                }
                break;
            case "BIBAN":
                if (res == "404") {
                    $("#message").html(sessionStorage.getItem("00363")).dialog("open");
                    $("#BIBAN" + GV_ROWID).val("").trigger("change");;
                } else {
                    $("#BANKS" + GV_ROWID).val(res.BIBAN[0].banks).trigger("change").trigger("chosen:updated");
                    $("#BANKA" + GV_ROWID).val(res.BIBAN[0].bankl).trigger("change").trigger("chosen:updated");
                    $("#BRNCH" + GV_ROWID).val(res.BIBAN[0].brnch).trigger("change").trigger("chosen:updated");
                    $("#SWIFT" + GV_ROWID).val(res.BIBAN[0].swift).trigger("change");
                    $("#BANKN" + GV_ROWID).val(res.BIBAN[0].bankn).trigger("change");
                    $("#BIBAN" + GV_ROWID).val(res.BIBAN[0].biban);
                    //BANKA GUNCELEMEDE SUBE SILIYOR 
                    res.BIBAN[0].brnch = res.BIBAN[0].brnch.trim();
                    if (res.BIBAN[0].brnch.length > 0) {
                        sessionStorage.setItem("RESBIBAN", JSON.stringify(res.BIBAN[0].brnch));
                        sessionStorage.setItem("RESBIBAN_STATS", 4);
                    }
                }
                break;
            case "FISUB":
                GV_BUSAB = GV_AKONT = GV_GRIDT = GV_GRICD = GV_HBKID = GV_ZWELS = GV_ZAHLS = GV_FRGRP = "";
                for (var i = 0; i < res.BUSAB.length; i++) { GV_BUSAB += '<option value="' + res.BUSAB[i][0] + '">' + res.BUSAB[i][1] + '</option>'; };
                for (var i = 0; i < res.AKONT.length; i++) { GV_AKONT += '<option value="' + res.AKONT[i][0] + '">' + res.AKONT[i][1] + '</option>'; };
                for (var i = 0; i < res.GRIDT.length; i++) { GV_GRIDT += '<option value="' + res.GRIDT[i][0] + '">' + res.GRIDT[i][1] + '</option>'; };
                for (var i = 0; i < res.HBKID.length; i++) { GV_HBKID += '<option value="' + res.HBKID[i][0] + '">' + res.HBKID[i][1] + '</option>'; };
                for (var i = 0; i < res.ZWELS.length; i++) { GV_ZWELS += '<option value="' + res.ZWELS[i][0] + '">' + res.ZWELS[i][1] + '</option>'; };
                for (var i = 0; i < res.GRICD.length; i++) { GV_GRICD += '<option value="' + res.GRICD[i][0] + '">' + res.GRICD[i][1] + '</option>'; };
                for (var i = 0; i < res.ZAHLS.length; i++) { GV_ZAHLS += '<option value="' + res.ZAHLS[i][0] + '">' + res.ZAHLS[i][1] + '</option>'; };
                for (var i = 0; i < res.FRGRP.length; i++) { GV_FRGRP += '<option value="' + res.FRGRP[i][0] + '">' + res.FRGRP[i][1] + '</option>'; };
                var name_gridt = "#CFI_GRIDT" + GV_ROWID + ", #VFI_GRIDT" + GV_ROWID + ", #GRIDT_CFI, #GRIDT_VFI",
                    name_gricd = "#CFI_GRICD" + GV_ROWID + ", #VFI_GRICD" + GV_ROWID + ", #GRICD_CFI, #GRICD_VFI",
                    name_akont = "#CFI_AKONT" + GV_ROWID + ", #VFI_AKONT" + GV_ROWID + ", #AKONT_CFI, #AKONT_VFI",
                    name_busab = "#CFI_BUSAB" + GV_ROWID + ", #VFI_BUSAB" + GV_ROWID + ", #BUSAB_CFI, #BUSAB_VFI",
                    name_zwels = "#CFI_ZWELS" + GV_ROWID + ", #VFI_ZWELS" + GV_ROWID + ", #ZWELS_CFI, #ZWELS_VFI",
                    name_zahls = "#VFI_ZAHLS" + GV_ROWID + ", #ZAHLS_VFI",
                    name_frgrp = "#VFI_FRGRP" + GV_ROWID + ", #FRGRP_VFI",
                    name_hbkid = "#VFI_HBKID" + GV_ROWID + ", #HBKID_VFI";
                $(name_gridt).empty().append(GV_GRIDT).trigger('chosen:updated');
                $(name_gricd).empty().append(GV_GRICD).trigger('chosen:updated');
                $(name_akont).empty().append(GV_AKONT).trigger('chosen:updated');
                $(name_busab).empty().append(GV_BUSAB).trigger('chosen:updated');
                $(name_zwels).empty().append(GV_ZWELS).trigger('chosen:updated');
                $(name_hbkid).empty().append(GV_HBKID).trigger('chosen:updated');
                $(name_zahls).empty().append(GV_ZAHLS).trigger('chosen:updated');
                $(name_frgrp).empty().append(GV_FRGRP).trigger('chosen:updated');
                break;
            case "SDSUB":
                GV_VKBUR = GV_VKGRP = "";
                if (res.VKBUR != undefined || res.VKBUR != null) {
                    var name_vkbur = "#CSD_VKBUR" + GV_ROWID + ", #VKBUR_CSD";
                    for (var i = 0; i < res.VKBUR.length; i++) { GV_VKBUR += '<option value="' + res.VKBUR[i][0] + '">' + res.VKBUR[i][1] + '</option>'; };
                    $(name_vkbur).empty().append(GV_VKBUR).trigger('chosen:updated');
                }
                break;
            case "SDGRD":
                GV_VKGRP = "";
                if (res.VKGRP != undefined || res.VKGRP != null) {
                    var name_vkgrp = "#CSD_VKGRP" + GV_ROWID + ", #VKGRP_CSD";
                    for (var i = 0; i < res.VKGRP.length; i++) { GV_VKGRP += '<option value="' + res.VKGRP[i][0] + '">' + res.VKGRP[i][1] + '</option>'; };
                    $(name_vkgrp).empty().append(GV_VKGRP).trigger('chosen:updated');
                } else if (res.VKGRP2 != undefined || res.VKGRP2 != null) {
                    var name_vkgrp = "#CSD_VKGRP" + GV_ROWID + ", #VKGRP_CSD";
                    for (var i = 0; i < res.VKGRP2.length; i++) { GV_VKGRP += '<option value="' + res.VKGRP2[i][0] + '">' + res.VKGRP2[i][1] + '</option>'; };
                    $(name_vkgrp).empty().append(GV_VKGRP).trigger('chosen:updated');
                }
                break;
            case "SAORG":
                GV_VKORG = "";
                if (res.VKORG != undefined || res.VKORG != null) {
                    $("#VKORG, #VKORG_CSD").empty().trigger('chosen:updated');
                    for (var i = 0; i < res.VKORG.length; i++) { GV_VKORG += '<option value="' + res.VKORG[i][0] + '">' + res.VKORG[i][1] + '</option>'; };
                    $("#VKORG, #VKORG_CSD").empty().append(GV_VKORG).trigger('chosen:updated').trigger('change');
                } else if (res.VKORG2 != undefined || res.VKORG2 != null) {
                    $("#VKORG2, #VKORG_CSD2").empty().trigger('chosen:updated');
                    for (var i = 0; i < res.VKORG2.length; i++) { GV_VKORG += '<option value="' + res.VKORG2[i][0] + '">' + res.VKORG2[i][1] + '</option>'; };
                    $("#VKORG2, #VKORG_CSD2").empty().append(GV_VKORG).trigger('chosen:updated').trigger('change');
                }
                break;
            case "UNAME":
                var lv_uname = lv_roles = "";
                for (var i = 0; i < res.UNAME.length; i++) { lv_uname += '<option value="' + res.UNAME[i][0] + '">' + res.UNAME[i][0] + '</option>'; };
                for (var i = 0; i < res.ROLES.length; i++) { lv_roles += '<option value="' + res.ROLES[i][0] + '">' + res.ROLES[i][1] + '</option>'; };
                $("#UNAME").empty().append(lv_uname).trigger('chosen:updated');
                $("#RFUSR").empty().append(lv_uname).trigger('chosen:updated');
                $("#ROLES").empty().append(lv_roles).trigger('chosen:updated');

                $("#UNAME2").empty().append(lv_uname).trigger('chosen:updated');
                $("#RFUSR2").empty().append(lv_uname).trigger('chosen:updated');
                $("#ROLES2").empty().append(lv_roles).trigger('chosen:updated');
                break;
            case "UNREP":
                var lv_uname = lv_roles = lv_curnt = "";
                for (var i = 0; i < res.UNAME.length; i++) {
                    lv_uname += '<option value="' + res.UNAME[i][0] + '">' + res.UNAME[i][0] + '</option>';
                };
                for (var i = 0; i < res.ROLES.length; i++) {
                    lv_roles += '<option value="' + res.ROLES[i][0] + '">' + res.ROLES[i][1] + '</option>';
                };
                for (var i = 0; i < res.CURNT.length; i++) {
                    lv_curnt += '<option value="' + res.CURNT[i][0] + '">' + res.CURNT[i][1] + '</option>';
                };
                $("#UNAME2").empty().append(lv_uname).trigger('chosen:updated');
                $("#RFUS2").empty().append(lv_uname).trigger('chosen:updated');
                $("#ROLES2").empty().append(lv_roles).trigger('chosen:updated');
                $("#CUSVE2").empty().append(lv_curnt).trigger('chosen:updated');
                break;
            case "UNAM2":
                if (res.USER[0].admin) { $("#ADMIN").prop("checked", true); } else { $("#ADMIN").prop("checked", false); }
                if (res.USER[0].gblck) { $("#GBLCK").prop("checked", true); } else { $("#GBLCK").prop("checked", false); }
                if (res.USER[0].vhisa) { $("#VHISA").prop("checked", true); } else { $("#VHISA").prop("checked", false); }
                if (res.USER[0].purmn) { $("#PURMN").prop("checked", true); } else { $("#PURMN").prop("checked", false); }
                $("#NTEXT").val(res.USER[0].ntext);
                $("#MODBE").val(res.USER[0].modbe);
                $("#MODDA").val(res.USER[0].modda);
                $("#MODTI").val(res.USER[0].modti);
                $("#EMAIL").val(res.USER[0].email);
                $("#CLASS").val(res.USER[0].class).trigger('chosen:updated');
                var lv_objid = lv_obji2 = "";
                for (var i = 0; i < res.OBJID.length; i++) { lv_objid += '<option value="' + res.OBJID[i][1] + '" selected>' + res.OBJID[i][1] + '</option>'; };
                for (var i = 0; i < res.OBJI2.length; i++) { lv_obji2 += '<option value="' + res.OBJI2[i][1] + '">' + res.OBJI2[i][1] + '</option>'; };
                $("#OBJID").empty().append(lv_objid, lv_obji2).trigger('chosen:updated');
                break;
            case "UNA22":
                if (res.USER[0].admin) { $("#ADMIN2").prop("checked", true); } else { $("#ADMIN2").prop("checked", false); }
                if (res.USER[0].gblck) { $("#GBLCK2").prop("checked", true); } else { $("#GBLCK2").prop("checked", false); }
                if (res.USER[0].vhisa) { $("#VHISA2").prop("checked", true); } else { $("#VHISA2").prop("checked", false); }

                $("#EMAIL2").val(res.USER[0].email);
                $("#CLASS2").val(res.USER[0].class).trigger('chosen:updated');
                var lv_objid = lv_obji2 = "";
                for (var i = 0; i < res.OBJID.length; i++) { lv_objid += '<option value="' + res.OBJID[i][1] + '" selected>' + res.OBJID[i][1] + '</option>'; };
                for (var i = 0; i < res.OBJI2.length; i++) { lv_obji2 += '<option value="' + res.OBJI2[i][1] + '">' + res.OBJI2[i][1] + '</option>'; };
                $("#OBJID").empty().append(lv_objid, lv_obji2).trigger('chosen:updated');
                break;
            case "COPRO":
                var lv_objid = lv_obji2 = "";
                for (var i = 0; i < res.OBJID.length; i++) { lv_objid += '<option value="' + res.OBJID[i][1] + '" selected>' + res.OBJID[i][1] + '</option>'; };
                for (var i = 0; i < res.OBJI2.length; i++) { lv_obji2 += '<option value="' + res.OBJI2[i][1] + '">' + res.OBJI2[i][1] + '</option>'; };
                $("#OBJID").empty().append(lv_objid, lv_obji2).trigger('chosen:updated');
                break;
            case "GETRO":
                var lv_id = lv_this = "";
                for (var i = 0; i < res.ZT002.length; i++) {
                    if (res.ZT002[i][0]) {
                        lv_id = "#" + res.ZT002[i][0];
                        lv_this = $('#roles').find(lv_id);
                        if (lv_this[0] != undefined) {
                            if (lv_this[0].tagName == "INPUT") {
                                if (res.ZT002[i][1] == "X") { $(lv_id).prop("checked", true); } else { $(lv_id).prop("checked", false); };
                            } else {
                                $(lv_id).val(res.ZT002[i][1]).trigger('change');
                            }
                        }
                    }
                };
                for (var i = 0; i < res.ZT004.length; i++) {
                    if (res.ZT004[i][0]) {
                        lv_id = '"[name="' + res.ZT004[i][0] + '"]';
                        var lv_split = res.ZT004[i][1].split("_");
                        $("form input, form select").each(function() {
                            var n = this.name.search(res.ZT004[i][0]);
                            if (n >= 0) {
                                if ($(this).prop("type") == "text" || $(this).prop("tagName") == "SELECT") { $(this).val(lv_split[2]).trigger('change'); }
                                n = this.name.search("REQ");
                                if (n >= 0) {
                                    if (lv_split[1] == "X") { $(this).prop("checked", true); } else { $(this).prop("checked", false); };
                                } else {
                                    n = this.name.search("REO");
                                    if (n >= 0)
                                        if (lv_split[0] == "X") { $(this).prop("checked", true); } else { $(this).prop("checked", false); };
                                }
                            }
                        });
                    }
                };
                $(".chosen-select").trigger('chosen:updated');
                break;
            case "BLCEN":
                var lv_aufsd = lv_lifsd = lv_faksd = lv_sperq = lv_breas = "";
                for (var i = 0; i < res.AUFSD.length; i++) { lv_aufsd += '<option value="' + res.AUFSD[i][0] + '">' + res.AUFSD[i][1] + '</option>'; };
                for (var i = 0; i < res.LIFSD.length; i++) { lv_lifsd += '<option value="' + res.LIFSD[i][0] + '">' + res.LIFSD[i][1] + '</option>'; };
                for (var i = 0; i < res.FAKSD.length; i++) { lv_faksd += '<option value="' + res.FAKSD[i][0] + '">' + res.FAKSD[i][1] + '</option>'; };
                for (var i = 0; i < res.SPERQ.length; i++) { lv_sperq += '<option value="' + res.SPERQ[i][0] + '">' + res.SPERQ[i][1] + '</option>'; };
                for (var i = 0; i < res.BREAS.length; i++) { lv_breas += '<option value="' + res.BREAS[i][0] + '">' + res.BREAS[i][1] + '</option>'; };

                $("#SPERQ_XK").empty().append(lv_sperq).trigger('chosen:updated');
                $("#FAKSD_XD").empty().append(lv_faksd).trigger('chosen:updated');
                $("#AUFSD_XD").empty().append(lv_aufsd).trigger('chosen:updated');
                $("#LIFSD_XD").empty().append(lv_lifsd).trigger('chosen:updated');
                $("#BREAS_KN, #BREAS_LF").empty().append(lv_breas).trigger('chosen:updated');
                break;
            case "BLCHK":
                var lv_mess = lv_bukrs = lv_vkorg = "";
                var lv_kalite = lv_kayit = lv_satin = lv_silme = lv_silmesa = lv_neden = "";
                for (var i = 0; i < res.XBUKR.length; i++) {
                    lv_bukrs += '<option value="' + res.XBUKR[i][0] + '">' + res.XBUKR[i][1] + '</option>';
                };
                for (var i = 0; i < res.XVKOR.length; i++) {
                    lv_vkorg += '<option value="' + res.XVKOR[i][0] + '">' + res.XVKOR[i][1] + '</option>';
                };
                for (var i = 0; i < res.MESSG.length; i++) {
                    if (res.MESSG[i].mes) lv_mess += res.MESSG[i].mes + '<br />';
                };
                $("#BUKRS_XD, #BUKRS_XK").empty().append(lv_bukrs).trigger('chosen:updated');
                $("#VKORG_XD, #EKORG_XK").empty().append(lv_vkorg).trigger('chosen:updated');
                if (res.TYPE == "CUST") {
                    for (var i = 0; i < res.NEDEN.length; i++) {
                        lv_neden += '<option value="' + res.NEDEN[i][0] + '">' + res.NEDEN[i][1] + '</option>';
                    };
                    $("#BREAS_KN").empty().append(lv_neden).trigger('chosen:updated');
                    $("#BREAS_KN_chosen").css("width", "100%");
                } else if (res.TYPE == "VEND") {
                    for (var i = 0; i < res.KALIT.length; i++) {
                        lv_kalite += '<option value="' + res.KALIT[i][0] + '">' + res.KALIT[i][1] + '</option>';
                    };
                    for (var i = 0; i < res.KAYIT.length; i++) {
                        lv_kayit += '<option value="' + res.KAYIT[i][0] + '">' + res.KAYIT[i][1] + '</option>';
                    };
                    for (var i = 0; i < res.SATIN.length; i++) {
                        lv_satin += '<option value="' + res.SATIN[i][0] + '">' + res.SATIN[i][1] + '</option>';
                    };
                    for (var i = 0; i < res.SILME.length; i++) {
                        lv_silme += '<option value="' + res.SILME[i][0] + '">' + res.SILME[i][1] + '</option>';
                    };
                    for (var i = 0; i < res.SILMESA.length; i++) {
                        lv_silmesa += '<option value="' + res.SILMESA[i][0] + '">' + res.SILMESA[i][1] + '</option>';
                    };
                    $("#VDBKY_AL , #VDBKY_SL").empty().append(lv_kayit).trigger('chosen:updated');
                    $("#VDBDL_AL , #VDBDL_SL").empty().append(lv_silme).trigger('chosen:updated');
                    $("#VDSST_AL , #VDSST_SL").empty().append(lv_satin).trigger('chosen:updated');
                    $("#VDSST_KL").empty().append(lv_kalite).trigger('chosen:updated');
                    $("#VDSDL_AL , #VDSDL_SL").empty().append(lv_silmesa).trigger('chosen:updated');
                    $("#VDBKY_AL_chosen").css("width", "100%");
                    $("#VDBKY_SL_chosen").css("width", "100%");
                    $("#VDBDL_AL_chosen").css("width", "100%");
                    $("#VDBDL_SL_chosen").css("width", "100%");
                    $("#VDSST_AL_chosen").css("width", "100%");
                    $("#VDSST_SL_chosen").css("width", "100%");
                    $("#VDSST_KL_chosen").css("width", "100%");
                    $("#VDSDL_AL_chosen").css("width", "100%");
                    $("#VDSDL_SL_chosen").css("width", "100%");
                }
                if (lv_mess) {
                    $("#errMes").html(lv_mess).dialog('open');
                }
                break;
            case "SAVBL":
                if (res.message) {
                    var lv_return = "";
                    for (var i = 0; i < res.message.length; i++) {
                        lv_return += res.message[i];
                    };
                    fRefreshPage(lv_return, res.messtyp, "a015.html");
                }
                break;
            case "BLCFD":
                if (res.BLCFD) {
                    if (res.BLCFD.T001.type == "CUST") {
                        var blk_ned = blk_dec = "";
                        var ctrl = 0;
                        if (res.BLCFD.KNA1.sperr) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNA1.sperr_ky;
                                blk_dec = res.BLCFD.KNA1.sperr_text;
                                ctrl++;
                            }
                            $("#CCABK_KY").prop("checked", true);
                        } else {
                            $("#CCABK_KY").prop("checked", false);
                        }
                        if (res.BLCFD.KNA1.loevm) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNA1.loevm_ky;
                                blk_dec = res.BLCFD.KNA1.loevm_text;
                                ctrl++;
                            }
                            $("#CCABK_DL").prop("checked", true);
                        } else {
                            $("#CCABK_DL").prop("checked", false);
                        }
                        if (res.BLCFD.KNB1.loevm) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNB1.loevm_ky;
                                blk_dec = res.BLCFD.KNB1.loevm_text;
                                ctrl++;
                            }
                            $("#CCSBK_DL").prop("checked", true);
                        } else {
                            $("#CCSBK_DL").prop("checked", false);
                        }
                        if (res.BLCFD.KNB1.nodel) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNB1.nodel_ky;
                                blk_dec = res.BLCFD.KNB1.nodel_text;
                                ctrl++;
                            }
                            $("#CCASD_DL").prop("checked", true);
                        } else {
                            $("#CCASD_DL").prop("checked", false);
                        }
                        if (res.BLCFD.KNB1.sperr) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNB1.sperr_ky;
                                blk_dec = res.BLCFD.KNB1.sperr_text;
                                ctrl++;
                            }
                            $("#CCFIB_KY").prop("checked", true);
                        } else {
                            $("#CCFIB_KY").prop("checked", false);
                        }
                        if (res.BLCFD.KNVV.aufsd) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNVV.aufsd_ky;
                                blk_dec = res.BLCFD.KNVV.aufsd_text;
                                ctrl++;
                            }
                            $("#CCSBK_SD").prop("checked", true);
                        } else {
                            $("#CCSBK_SD").prop("checked", false);
                        }
                        if (res.BLCFD.KNVV.lifsd) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNVV.lifsd_ky;
                                blk_dec = res.BLCFD.KNVV.lifsd_text;
                                ctrl++;
                            }
                            $("#CCTBB_SD").prop("checked", true);
                        } else {
                            $("#CCTBB_SD").prop("checked", false);
                        }
                        if (res.BLCFD.KNVV.faksd) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNVV.faksd_ky;
                                blk_dec = res.BLCFD.KNVV.faksd_text;
                                ctrl++;
                            }
                            $("#CCFBB_SD").prop("checked", true);
                        } else {
                            $("#CCFBB_SD").prop("checked", false);
                        }
                        if (res.BLCFD.KNVV.cassd) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNVV.cassd_ky;
                                blk_dec = res.BLCFD.KNVV.cassd_text;
                                ctrl++;
                            }
                            $("#CCSDD_SD").prop("checked", true);
                        } else {
                            $("#CCSDD_SD").prop("checked", false);
                        }
                        if (res.BLCFD.KNVV.loevm) {
                            if (ctrl == 0) {
                                blk_ned = res.BLCFD.KNVV.loevm_ky;
                                blk_dec = res.BLCFD.KNVV.loevm_text;
                                ctrl++;
                            }
                            $("#CCDSD_SD").prop("checked", true);
                        } else {
                            $("#CCDSD_SD").prop("checked", false);
                        }
                        if (ctrl == 1) {
                            $("#BDESC_KN").val(blk_dec);
                            $("#BREAS_KN").val(blk_ned).trigger('chosen:updated').trigger("change");
                        }
                    } else if (res.BLCFD.T001.type == "VEND") {
                        /*Kayıt*/
                        if (res.BLCFD.LFA1.sperr) {
                            $("#VCBKY_AL").prop("checked", true);
                        } else {
                            $("#VCBKY_AL").prop("checked", false);
                        }
                        if (res.BLCFD.LFA1.sperr_ky) {
                            $("#VDBKY_AL").val(res.BLCFD.LFA1.sperr_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFA1.sperr_text) {
                            $("#VTBKY_AL").val(res.BLCFD.LFA1.sperr_text);
                        }
                        if (res.BLCFD.LFB1.sperr) {
                            $("#VCBKY_SL").prop("checked", true);
                        } else {
                            $("#VCBKY_SL").prop("checked", false);
                        }
                        if (res.BLCFD.LFB1.sperr_ky) {
                            $("#VDBKY_SL").val(res.BLCFD.LFB1.sperr_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFB1.sperr_text) {
                            $("#VTBKY_SL").val(res.BLCFD.LFB1.sperr_text);
                        }
                        /*Silme */
                        if (res.BLCFD.LFA1.loevm) {
                            $("#VCBDL_AL").prop("checked", true);
                        } else {
                            $("#VCBDL_AL").prop("checked", false);
                        }
                        if (res.BLCFD.LFA1.loevm_ky) {
                            $("#VDBDL_AL").val(res.BLCFD.LFA1.loevm_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFA1.loevm_text) {
                            $("#VTBDL_AL").val(res.BLCFD.LFA1.loevm_text);
                        }
                        if (res.BLCFD.LFB1.loevm) {
                            $("#VCBDL_SL").prop("checked", true);
                        } else {
                            $("#VCBDL_SL").prop("checked", false);
                        }
                        if (res.BLCFD.LFB1.loevm_ky) {
                            $("#VDBDL_SL").val(res.BLCFD.LFB1.loevm_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFB1.loevm_text) {
                            $("#VTBDL_SL").val(res.BLCFD.LFB1.loevm_text);
                        }
                        /*Satın alma*/
                        if (res.BLCFD.LFA1.sperm) {
                            $("#VCSST_AL").prop("checked", true);
                        } else {
                            $("#VCSST_AL").prop("checked", false);
                        }
                        if (res.BLCFD.LFA1.sperm_ky) {
                            $("#VDSST_AL").val(res.BLCFD.LFA1.sperm_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFA1.sperm_text) {
                            $("#VTSST_AL").val(res.BLCFD.LFA1.sperm_text);
                        }
                        if (res.BLCFD.LFM1.sperm) {
                            $("#VCSST_SL").prop("checked", true);
                        } else {
                            $("#VCSST_SL").prop("checked", false);
                        }
                        if (res.BLCFD.LFM1.sperm_ky) {
                            $("#VDSST_SL").val(res.BLCFD.LFM1.sperm_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFM1.sperm_text) {
                            $("#VTSST_SL").val(res.BLCFD.LFM1.sperm_text);
                        }
                        if (res.BLCFD.LFA1.sperq) {
                            $("#VCSST_KL").prop("checked", true);
                        } else {
                            $("#VCSST_KL").prop("checked", false);
                        }
                        if (res.BLCFD.LFA1.sperq_ky) {
                            $("#VDSST_KL").val(res.BLCFD.LFA1.sperq_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFA1.sperq_text) {
                            $("#VTSST_KL").val(res.BLCFD.LFA1.sperq_text);
                        }
                        /*SİLME SD*/
                        if (res.BLCFD.LFM1.loevm) {
                            $("#VCSDL_SL").prop("checked", true);
                        } else {
                            $("#VCSDL_SL").prop("checked", false);
                        }
                        if (res.BLCFD.LFM1.loevm_ky) {
                            $("#VDSDL_SL").val(res.BLCFD.LFM1.loevm_ky).trigger('chosen:updated').trigger("change");
                        }
                        if (res.BLCFD.LFM1.loevm_text) {
                            $("#VTSDL_SL").val(res.BLCFD.LFM1.loevm_text);
                        }
                    }
                }
                break;
            case "vensv":
                if (res == "404") {
                    $("#message").html(sessionStorage.getItem("00369")).dialog("open");
                } else if (res.result == 'X') {
                    var mtype = 'S';
                    $('#errMes').position({
                        my: "center",
                        at: "center",
                        of: window
                    });
                    var msg_txt_list = sessionStorage.getItem("00357").split(".");
                    var msg_txt = '<div><p>' + msg_txt_list[0] + '</BR>' + msg_txt_list[1] + '</p></div>';
                    $("#errMes").empty().html(msg_txt);
                    if (mtype == 'S') {
                        $("#errMes").dialog("open");
                        $('#errMes').on('dialogclose', function(event) {
                            $(this).dialog("close");
                            location.href = "a001.html";
                        });
                    } else {
                        $("#errMes").dialog("open");
                    }
                    document.getElementById("errMes").parentElement.style.top = (window.innerHeight / 2 + 'px');
                    $("#errMes").css("left", "0");
                    $("#errMes").css("top", "0");
                }
            case "VADLT":
                var list = res;
                for (var index = 0; index < list.aaData.length; index++) {
                    var trh = tarihDuzelt(list.aaData[index][12]);
                    list.aaData[index][12] = trh;
                }
                fDynamicTable("#mattable", list, true, true, true, true, true, true, true, true, true, true, true, );
                $(".amdmno").attr("title", sessionStorage.getItem("00138"));
                $(".ban").attr("title", sessionStorage.getItem("00316"));
                GV_ZTERM = res.ZTERM;
                GV_GENELVADE = res.VADE;

                break;
                //vade onay yapıldıktan sonra gelen sonuc   
            case "VADDT":
                fDynamicTable("#mattable", res, true, true, true, true, true, true, true, true, true, true, true, true, true);
                $(".amdmno").attr("title", sessionStorage.getItem("00138"));
                $(".ban").attr("title", sessionStorage.getItem("00316"));
                GV_ZTERM = res.ZTERM;
                GV_GENELVADE = res.VADE;
                if (res.SONUC[0] != "0" || res.SONUC[1] != "0") {

                    var basarili = res.SONUC[0];
                    var basarisiz = res.SONUC[1];
                    var mesaj = "";
                    var load = '<span><i class = "fa fa-spinner fa-pulse fa-4x fa-fw"></i></span>';
                    var end = '<i class="fa fa-hand-paper-o fa-2x" aria-hidden="true"></i>';

                    mesaj = '<div id="savemsg" data-lang="00167" style="background-color: rgb(9, 141, 158); width: 360px; min-height: 1px; max-height: none; height: auto;" class="ui-dialog-content ui-widget-content">';
                    mesaj = mesaj + '<br><hr><br>';

                    mesaj = mesaj + '<div class="row">';
                    mesaj = mesaj + '<div class="col col-1"></div>';
                    mesaj = mesaj + '<div class="col col-3" >';
                    mesaj = mesaj + '<br><span id="basarili">' + basarili + ' Adet Cari Vadesi Güncellenmiştir.</span>';
                    mesaj = mesaj + '<span style="margin-left: 25px;"><i style="color:#26ff10;" class="fa fa-check-circle fa-2x"></i></span><br>';
                    mesaj = mesaj + '</div></div>';

                    mesaj = mesaj + '<br><hr><br>';
                    mesaj = mesaj + '<div class="row">';
                    mesaj = mesaj + '<div class="col col-1"></div>';
                    mesaj = mesaj + '<div class="col col-3" >';
                    mesaj = mesaj + '<br><span id="basarisiz">' + basarisiz + ' Adet Cari Vadesi Güncellenememiştir.</span>';
                    mesaj = mesaj + '<span style="margin-left: 25px;"><i style="color:#CC1919; "class="fa fa-exclamation-triangle fa-2x"></i></span><br>';
                    mesaj = mesaj + '</div></div>';
                    mesaj = mesaj + ' <br><br>';

                    mesaj = mesaj + '<br><hr><br></div>';
                    $("#errMes").html(mesaj).dialog("open");
                } else {
                    $("#errMes").html(res.RESP).dialog("open");
                }
                break;
            case "VADBN":
                fDynamicTable("#mattable", res, true, true, true, true, true, true, true, true, true, true, true);
                $(".amdmno").attr("title", sessionStorage.getItem("00138"));
                $(".ban").attr("title", sessionStorage.getItem("00316"));

                break
            case "ACTVC":
                var t1 = $('#acttable').DataTable();
                t1.clear();
                t1.draw();
                for (var i = 0; i < res.aaData.length; i++) {
                    t1.row.add(
                        [
                            res.aaData[i][0],
                            res.aaData[i][1],
                            res.aaData[i][2],
                            res.aaData[i][3],
                            res.aaData[i][4],
                            res.aaData[i][5],
                            res.aaData[i][6],
                            res.aaData[i][7],
                            res.aaData[i][8],
                            res.aaData[i][9],
                            res.aaData[i][10],
                            res.aaData[i][11],
                            res.aaData[i][12],
                            res.aaData[i][13],
                            res.aaData[i][14],
                            res.aaData[i][15]
                        ]).draw();
                }
                break;
            case "NAME1":
                this.res(
                    $.map(res, function(item) {
                        return {
                            label: item.name1,
                            value: item.stcd2,
                            mdmno: item.mdmno,
                            sapno: item.sapno,
                            timno: item.timno,
                            etano: item.etano,
                            softno: item.softno,
                            name1: item.name1,
                            name2: item.name2,
                            stcd2: item.stcd2
                        }
                    })
                );
                break;
            case "NAMEC":
                if (res.message.message) {
                    fRefreshPage(res.message.message, res.message.messtyp, "a002.html");
                    return;
                }
                $("#tabsVKN").tabs();
                //müşteri cari bilgileri..
                if (res.CUST) {
                    fDynamicTable("#resultCustVKN", res.CUST[0], true, true, true, true, true, true);
                    $("#tabsVKN").find('li:eq(0)').show();
                } else {
                    $("#resultCustVKN").empty();
                    $("#tabsVKN").find('li:eq(0)').hide();
                }
                //satıcı cari bilgileri..
                if (res.VEND) {
                    fDynamicTable("#resultVendVKN", res.VEND[0], true, true, true, true, true, true);
                    $("#tabsVKN").find('li:eq(1)').show();
                } else {
                    $("#resultVendVKN").empty();
                    $("#tabsVKN").find('li:eq(1)').hide();
                }
                //e-fatura mükellefi ise bilgileri..
                if (res.TAXP) {
                    $("#INDAT").val(res.TAXP[0].start);
                    $("#INTAG").val(res.TAXP[0].alias);
                    if (res.TAXP[0].payer) { $("#INVOC").prop("checked", true); } else { $("#INVOC").prop("checked", false); }
                }
                //girilen vknden müşteri veya satıcı bulunmuşsa modal açılacak!!
                if ((res.VEND || res.CUST) && (GV_RFRNC2 == "")) {
                    //seçime göre ilgili tab aktif ediliyor..
                    if (sessionStorage.getItem("selct") == "custSkip") {
                        if (res.CUST) { $("#tabsVKN").tabs("option", "active", 0); } else if (res.VEND) { $("#tabsVKN").tabs("option", "active", 1); }
                    }
                    if (sessionStorage.getItem("selct") == "vendSkip") {
                        if (res.VEND) { $("#tabsVKN").tabs("option", "active", 1); } else if (res.CUST) { $("#tabsVKN").tabs("option", "active", 0); }
                    }
                    //set button
                    if (!res.BUTT[0].tprof) $("#creat").hide();
                    if (!res.BUTT[0].chang) $("#chang").hide();
                    if (!res.BUTT[0].viewx) $("#viewx").hide();
                    if (!res.BUTT[0].smail) $("#smail").hide();
                    if (!res.BUTT[0].rfrnc) $("#rfrnc").hide();
                    if (!sessionStorage.getItem("modalvkn") || sessionStorage.getItem("NAMEC")) {
                        $('#modalVKN').dialog("open");
                    }
                    GV_RFRNC2 = "X";
                }
                break;
            case "STCD2":
                if (res == "101") {
                    $("#errMes").html(sessionStorage.getItem("00367")).dialog("open");
                    flag.push("00367");
                } else {
                    if (res.message.message) {
                        fRefreshPage(res.message.message, res.message.messtyp, "a002.html");
                        return;
                    }
                }
                $("#tabsVKN").tabs();
                //müşteri cari bilgileri..
                if (res.CUST) {
                    fDynamicTable("#resultCustVKN", res.CUST[0], true, true, true, true, true, true);
                    $("#tabsVKN").find('li:eq(0)').show();
                } else {
                    $("#resultCustVKN").empty();
                    $("#tabsVKN").find('li:eq(0)').hide();
                }
                //satıcı cari bilgileri..
                if (res.VEND) {
                    fDynamicTable("#resultVendVKN", res.VEND[0], true, true, true, true, true, true);
                    $("#tabsVKN").find('li:eq(1)').show();
                } else {
                    $("#resultVendVKN").empty();
                    $("#tabsVKN").find('li:eq(1)').hide();
                }
                //e-fatura mükellefi ise bilgileri..
                if (res.TAXP) {
                    $("#INDAT").val(res.TAXP[0].start);
                    $("#INTAG").val(res.TAXP[0].alias);
                    if (res.TAXP[0].payer) { $("#INVOC").prop("checked", true); } else { $("#INVOC").prop("checked", false); }
                }
                //girilen vknden müşteri veya satıcı bulunmuşsa modal açılacak!!
                if ((res.VEND || res.CUST) && (GV_RFRNC2 == "")) {
                    //seçime göre ilgili tab aktif ediliyor..
                    if (sessionStorage.getItem("selct") == "custSkip") {
                        if (res.CUST) { $("#tabsVKN").tabs("option", "active", 0); } else if (res.VEND) { $("#tabsVKN").tabs("option", "active", 1); }
                    }
                    if (sessionStorage.getItem("selct") == "vendSkip") {
                        if (res.VEND) { $("#tabsVKN").tabs("option", "active", 1); } else if (res.CUST) { $("#tabsVKN").tabs("option", "active", 0); }
                    }
                    //set button
                    if (!res.BUTT[0].tprof) $("#creat").hide();
                    if (!res.BUTT[0].chang) $("#chang").hide();
                    if (!res.BUTT[0].viewx) $("#viewx").hide();
                    if (!res.BUTT[0].smail) $("#smail").hide();
                    if (!res.BUTT[0].rfrnc) $("#rfrnc").hide();
                    if (!sessionStorage.getItem("modalvkn") || sessionStorage.getItem("mvkn") != $("#STCD2").val()) {
                        $('#modalVKN').dialog("open");
                    }
                    GV_RFRNC2 = "X";
                }
                break;
            case "GETSY":
                if (res.SYSID == undefined) {
                    window.location.href = "a002.html";
                    return;
                }
                for (var i = 0; i < res.SYSID.length; i++) {
                    if (res.SYSID[i][0]) {
                        $(res.SYSID[i][0]).click();
                    }
                };
                if (GV_PRCUS) {
                    if (GV_PRCUS.substr(6, 4) == "CUST") { $("#custSkip").click(); } else { $("#vendSkip").click(); }
                }
                break;
            case "GETDT":
                gv_selcetVade = "1";
                var n = "";
                if (GV_PRCUS) {
                    if (GV_PRCUS.substr(6, 4) == "CUST") {
                        n = "KNA1";
                    } else if (GV_PRCUS.substr(6, 4) == "VEND") {
                        n = "LFA1";
                    } else if (this.cusve == "VEND") {
                        n = "LFA1";
                    } else if (this.cusve == "CUST") {
                        n = "KNA1";
                    }
                }
                if (res.message.message) {
                    fRefreshPage(res.message.message, res.message.messtyp, "a002.html");
                }
                for (key in res[n]) {
                    if (key == "KTOKD" || key == "KTOKK") $("#KTOKD").val(res[n][key]).trigger('change');
                    if (n == "KNA1" && key == "LIFNR") {
                        $("#RELAT").val(res[n][key])
                    } else if (n == "LFA1" && key == "KUNNR") {
                        $("#RELAT").val(res[n][key])
                    }
                    switch (key) {
                        case "LAND1":
                            $("#LAND1").val(res[n][key]).trigger('change');
                            break;
                        case "NAME1":
                            $("#NAME1").val(res[n][key]);
                            break;
                        case "NAME2":
                            $("#NAME2").val(res[n][key]);
                            break;
                        case "STCD1":
                            var taxct = "";
                            if (res[n][key])
                                taxct = res[n][key].substr(0, 2);
                            $("#TAXCT").val(taxct).trigger('change');
                            $("#STCD1").val(res[n][key]);
                            break;
                        case "STCD2":
                            $("#STCD2").val(res[n][key]).trigger('change');
                            break;
                        case "STCD3":
                            $("#STCD3").val(res[n][key]);
                            break;
                        case "STCD4":
                            $("#STCD4").val(res[n][key]);
                            break;
                        case "VBUND":
                            $("#VBUND").val(res[n][key]);
                            break;
                        case "BRSCH":
                            $("#BRSCH").val(res[n][key]);
                            break;
                        case "REGIO":
                            $("#REGIO").val(res[n][key]);
                            break;
                        case "ZZ_SOFT_DEPAR":
                            $("#DEPAR").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_PARTS":
                            $("#PARTS").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_PTERM":
                            $("#PTERM").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_SFTCT":
                            $("#SFTCT").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_CURTY":
                            $("#CURTY").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_LIMCR":
                            $("#LIMCR").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_CCURT":
                            $("#CCURT").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_CURRY":
                            $("#CURRY").val(res[n][key]).trigger('change');
                            break;
                        case "ZZ_SOFT_SAREA":
                            $("#SAREA").val(res[n][key]);
                            break;
                        case "ZZ_TIM_TSUPP":
                            $("#TSUPP").val(res[n][key]);
                            break;
                        case "ZZ_TIM_CGUID":
                            $("#CGUID").val(res[n][key]);
                            break;
                        case "ZZ_MDM_FIRCO":
                            $("#FIRCO").val(res[n][key]);
                            break;
                        case "ZZ_MDM_EORIN":
                            $("#EORIN").val(res[n][key]);
                            break;
                        case "ZZ_MDM_EXEMP":
                            if (res[n][key]) { $("#EXEMP").prop("checked", true); } else { $("#EXEMP").prop("checked", false); }
                            break;
                        case "ZZ_MDM_STRGC":
                            if (res[n][key]) { $("#STRGC").prop("checked", true); } else { $("#STRGC").prop("checked", false); }
                            break;
                        case "ZZ_MDM_SEDAT":

                            if (res[n][key].length < 8) {
                                $("#SEDAT").val("");
                            } else if (res[n][key].length == 8) {
                                var resDate = "";
                                resdate = tarihDuzelt(res[n][key]);
                                $("#SEDAT").val(resdate);
                            }
                            break;
                        case "ZZ_MDM_SSDAT":
                            if (res[n][key].length < 8) {
                                $("#SSDAT").val("");
                            } else if (res[n][key].length == 8) {
                                var resDate = "";
                                resdate = tarihDuzelt(res[n][key]);
                                $("#SSDAT").val(resdate);
                            }
                            break;
                    }
                };
                for (key in res.T001) {
                    if (key == "MDMNO") $("#MDMNO").val(res.T001[key]);
                    if (!this.cusve) {
                        if (n == "KNA1") {
                            if (key == "KUNNR") $("#SAPNO").val(res.T001[key]);
                            if (key == "SKUNN") $("#SOFTNO").val(res.T001[key]);
                            if (key == "TKUNN") $("#TIMNO").val(res.T001[key]);
                            if (key == "EKUNN") $("#ETANO").val(res.T001[key]);
                            if (key == "AKUNN") {
                                $("#ATLASNO").val(res.T001[key]);
                            }
                        } else {
                            if (key == "LIFNR") $("#SAPNO").val(res.T001[key]);
                            if (key == "SLIFN") $("#SOFTNO").val(res.T001[key]);
                            if (key == "TLIFN") $("#TIMNO").val(res.T001[key]);
                            if (key == "ELIFN") $("#ETANO").val(res.T001[key]);
                            if (key == "ALIFN") $("#ATLASNO").val(res.T001[key]);
                        }
                    }
                    if (key == "EFTR" && res.T001[key] == "X") {
                        var resdate = "";
                        resdate = tarihDuzelt(res.T001['EFTR_STR_DATE']);
                        $("#INDAT").val(resdate);
                        resdate = "";
                        resdate = tarihDuzelt(res.T001['EFTR_END_DATE']);
                        $("#INTAG").val(resdate);
                        $("#INVOC").prop("checked", true);
                    }
                    if (key == "NOTES") {
                        $("#NOTES").val(res.T001[key]);
                    }
                    if (key == "FTTYP") {
                        if (res.T001[key] == "1") {
                            $("#FUNIN_SL").prop("checked", true);
                            $("#FUNIN_AL").prop("checked", false);
                        } else if (res.T001[key] == "2") {
                            $("#FUNIN_SL").prop("checked", false);
                            $("#FUNIN_AL").prop("checked", true);
                        }
                    }
                };
                if (!this.cusve) {
                    /*banka duzenlenemsi  3 alanın display none olması*/
                    if (res.S004 != undefined) {
                        GV_ADDBNK = res.S004.length;
                    }
                    for (var i = 0; i < res.S003.length; i++) {
                        if (n == "KNA1") {
                            fSetFI(custFI, res.S003[i], "#custFI");
                        } else {
                            fSetFI(vendFI, res.S003[i], "#vendFI");
                        }
                    };
                    for (var i = 0; i < res.S004.length; i++) {
                        fSetBK(bankDT, res.S004[i]);
                    };
                    for (var i = 0; i < res.S005.length; i++) {
                        fSetSD(custSD, res.S005[i]);
                    };
                    for (var i = 0; i < res.S008.length; i++) {
                        fSetMM(vendMM, res.S008[i]);
                    };
                }
                for (var i = 0; i < res.S006.length; i++) {
                    fSetCT(contDT, res.S006[i]);
                };
                for (var i = 0; i < res.S007.length; i++) {
                    fSetAD(addrDT, res.S007[i]);
                };

                for (var i = 0; i < res.S024.length; i++) {
                    if (res.S024[i]['SYSID'] == "TIM") {
                        fSetPM(VadePMTim, res.S024[i], "tim");
                    } else if (res.S024[i]['SYSID'] == "ATLAS") {
                        fSetPM(VadePMAtlas, res.S024[i], "atlas");
                    }
                };
                ///merkez office geliyor
                for (var i = 0; i < res.S009.length; i++) {
                    $("#CENOF").val(res.S009[i]);
                };
                if (GV_PARAM == "VIEWX") {
                    $('#tabs').find('input, textarea, button, select').prop("disabled", true).parent('label').addClass('state-disabled');
                    $('.dataTables_filter').find('label').removeClass('state-disabled');
                    $('#tabs > .chosen-container').addClass('chosen-disabled');
                    $('#submit, #addbk, #delbk, #addpm, #delpm').hide();
                } else if (GV_PARAM != "CREAT") {
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'KTOKD',
                        value: $('#KTOKD').val()
                    }).appendTo('#create');
                    //10dk işlem yapılmadığında çık
                    setTimeout(uexit, 600000);
                    $('#KTOKD').prop("disabled", true);
                    $('.chosen-select').trigger('chosen:updated');
                }
                if (GV_PARAM == "VIEWX" || GV_PARAM == "CHANG")
                    for (var i = 2; i < 10; i++) {
                        var tabname = "#tabs-" + i;
                        $("#tabs").tabs("enable", tabname);
                    }

                $(".chosen-select").trigger('chosen:updated');
                //Referans alındıysa softta KTOKDyi aç
                if (this.data.indexOf("rfrnc") != -1) { //&& ( this.data.indexOf("DS003") != -1 )
                    GV_RFRNC = 'X';
                    $('#KTOKD').prop("disabled", false);
                    $('.chosen-select').trigger('chosen:updated');
                } else {
                    GV_RFRNC = '';
                }
                break;
            case "AUTHR":
                // sadece okunur
                if (res.READO != undefined || res.READO.length > 0) {
                    for (var i = 0; i < res.READO.length; i++) {
                        if (res.READO[i]['val'] == "X") {
                            $("#" + res.READO[i]['key'] + '2').prop("checked", true)
                        }
                    };
                }
                if (res.NECES != undefined || res.NECES.length > 0) {
                    for (var i = 0; i < res.NECES.length; i++) {
                        if (res.NECES[i]['val'] != "") {
                            $("#" + res.NECES[i]['key'] + '2').prop("checked", true);
                        }
                    };
                }
                for (var i = 0; i < res.DEFAU.length; i++) {
                    if (res.DEFAU[i]['key']) {
                        $("#" + res.DEFAU[i]['key'] + '2').val(res.DEFAU[i]['val']).trigger('change');
                    }
                };
                $(".chosen-select").trigger('chosen:updated');
                /* yetki alanları duzuenlenemsi*/
                break;
            case "ACTDT":
                var lv_id = lv_tabid = lv_row = "";

                switch (this.subid) {
                    case 'TIM':
                        $("#TIMNO").val(res.ITABH.TIMID);
                        break;
                    case 'SOFT':
                        $("#SOFTNO").val(res.ITABH.SFTID);
                        break;
                    case 'ETA':
                        $("#ETANO").val(res.ITABH.ETAID);
                        break;
                    case 'ATLAS':
                        if (res.ITABH.ACCTP == 1) {
                            $("#ATLASNO").val(res.ITABH.ATAIC);
                        } else {
                            $("#ATLASNO").val(res.ITABH.ATAID);
                        }

                        GV_ACTSYST = this.subid;
                        break;
                }
                if (res.ITABH.ACCTP == 1) {
                    lv_row = custFI;
                    lv_tabid = "#custFI";
                    $("#custSAP").click();
                    $("#cust" + this.subid).click();
                    $("#custSkip").click();
                } else if (res.ITABH.ACCTP == 2) {
                    lv_row = vendFI;
                    lv_tabid = "#vendFI";
                    $("#vendSAP").click();
                    $("#vend" + this.subid).click();
                    $("#vendSkip").click();
                }
                $("#MDMNO").val(res.ITABH.MDMNO);
                $("#KTOKD").val(res.ITABH.KTOKD).trigger("chosen:updated");
                $("#NAME1").val(res.ITABH.NAME1);
                $("#NAME2").val(res.ITABH.NAME2);
                $("#NAME3").val(res.ITABH.NAME3);
                $("#LAND1").val(res.ITABH.LAND1).trigger("chosen:updated").trigger("change");
                $("#BRSCH").val(res.ITABH.BRSCH).trigger("chosen:updated");
                $("#EORIN").val(res.ITABH.EORIN);
                $("#TAXCT").val(res.ITABH.TAXCT).trigger("chosen:updated").trigger("change");
                $("#STCD1").val(res.ITABH.STCD1).trigger("chosen:updated").trigger("change");
                $("#STCD2").val(res.ITABH.STCD2);
                $("#VBUND").val(res.ITABH.VBUND).trigger("chosen:updated");
                $("#SAREA").val(res.ITABH.SAREA).trigger("chosen:updated");
                $("#CGUID").val(res.ITABH.CGUID).trigger("chosen:updated");
                $("#FIRCO").val(res.ITABH.FIRCO);
                $("#TSUPP").val(res.ITABH.TSUPP).trigger("chosen:updated");

                if (res.ITABH.EXEMP) $("#EXEMP").prop("checked", true);
                if (res.S003 != undefined) {
                    for (var i = 0; i < res.S003.length; i++) {
                        fSetFI(lv_row, res.S003[i], lv_tabid);
                    };
                }
                if (res.S003 != undefined) {
                    for (var i = 0; i < res.S004.length; i++) {
                        fSetBK(bankDT, res.S004[i]);
                    };
                }
                if (res.S004 != undefined) {
                    GV_ADDBNK = res.S004.length;
                }
                if (res.S004 != undefined) {
                    for (var i = 0; i < res.S005.length; i++) {
                        fSetSD(custSD, res.S005[i]);
                    };
                }
                if (res.S005 != undefined) {
                    for (var i = 0; i < res.S008.length; i++) {
                        fSetMM(vendMM, res.S008[i]);
                    };
                }
                if (res.S006 != undefined) {
                    for (var i = 0; i < res.S006.length; i++) {
                        fSetCT(contDT, res.S006[i]);
                    };
                }
                if (res.S007 != undefined) {
                    for (var i = 0; i < res.S007.length; i++) {
                        fSetAD(addrDT, res.S007[i]);
                    };
                }
                if (res.S024 != undefined) {
                    for (var i = 0; i < res.S024.length; i++) {
                        if (res.S024[i]['SYSID'] == "TIM") {
                            fSetPM(VadePMTim, res.S024[i], "tim");
                        } else if (res.S024[i]['SYSID'] == "ATLAS") {
                            fSetPM(VadePMAtlas, res.S024[i], "atlas");
                        }
                    };
                }
                if (res.DWNLD != undefined && GV_CUSVE == "VEND") {
                    $('#download').css('display', 'block');
                    GV_RESLST = res.DWNLD;
                    tedarikci_dowload();
                } else {
                    $('#download').css('display', 'none');
                }
                break;
            case "VCHLT":

                if (res.result == "400" || res.result == "404") {
                    $('#vendor_list').css('display', 'block');
                    $('#vendor_onay').css('display', 'none');

                } else if (res.proce == 'list') {
                    for (var i = 0; i < res.aaData.length; i++) {
                        if (res.aaData[i][9] == "00000000") {
                            res.aaData[i][9] = "00.00.0000";
                        } else {
                            var update_date = tarihDuzelt(res.aaData[i][9]);
                            res.aaData[i][9] = update_date;
                        }
                    }
                    $('#vendor_list').css('display', 'block');
                    $('#vendor_onay').css('display', 'none');
                    fDynamicTable("#vendortable", res, true, true, true, true, true, true, true, true, true, true);
                    $(".amdmno").attr("title", sessionStorage.getItem("00138"));
                    $(".ban").attr("title", sessionStorage.getItem("00316"));
                }
                break;
            case "VENFR":
                if (res.proce == 'onay') {
                    var onay_grb = "";
                    for (var index = 0; index < res.onygrb.length; index++) {
                        onay_grb += '<option value="' + res.onygrb[index][0] + '">' + res.onygrb[index][1] + '</option>';
                    }
                    $("#calis").empty().append(onay_grb).trigger('chosen:updated');

                    $('#vendor_list').css('display', 'none');
                    $('#vendor_onay').css('display', 'block');
                    var data_options = "";
                    for (let i = 0; i < res.BUKRS.length; i++) {
                        data_options = data_options + '<option value="' + res.BUKRS[i][0] + '">' + res.BUKRS[i][1] + '</option>';
                    }
                    $("#BUKRS").empty().append(data_options).trigger('chosen:updated');
                    data_options = "";
                    for (let i1 = 0; i1 < res.ZTERM.length; i1++) {
                        data_options = data_options + '<option value="' + res.ZTERM[i1][0] + '">' + res.ZTERM[i1][1] + '</option>';
                    }
                    $("#ZTERM").empty().append(data_options).trigger('chosen:updated');
                    $("#ZTERM").val("BL30").trigger('chosen:updated').trigger("change");
                    data_options = "";
                    for (let i2 = 0; i2 < res.KTOKD.length; i2++) {

                        data_options = data_options + '<option value="' + res.KTOKD[i2][0] + '">' + res.KTOKD[i2][1] + '</option>';
                    }
                    $("#HGRUP").empty().append(data_options).trigger('chosen:updated');
                    $("#HGRUP").val("B003").trigger('chosen:updated').trigger("change");
                    data_options = "";
                    for (var i3 = 0; i3 < res.hzmte.length; i3++) {
                        data_options = data_options + '<option value="' + res.hzmte[i3][0] + '">' + res.hzmte[i3][1] + '</option>';
                    }
                    $("#hzmte").empty().append(data_options).trigger('chosen:updated');
                    data_options = "";
                    if (res.asehr != undefined) {
                        for (let i5 = 0; i5 < res.asehr.length; i5++) {
                            data_options = data_options + '<option value="' + res.asehr[i5][0] + '">' + res.asehr[i5][1] + '</option>';
                        }
                        $("#asehr").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.ailce != undefined) {
                        for (let i6 = 0; i6 < res.ailce.length; i6++) {
                            data_options = data_options + '<option value="' + res.ailce[i6][0] + '">' + res.ailce[i6][1] + '</option>';
                        }
                        $("#ailce").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.bbank != undefined) {
                        for (let i7 = 0; i7 < res.bbank.length; i7++) {
                            data_options = data_options + '<option value="' + res.bbank[i7][0] + '">' + res.bbank[i7][1] + '</option>';
                        }
                        $("#bbank").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.bsube != undefined) {
                        for (let i8 = 0; i8 < res.bsube.length; i8++) {
                            data_options = data_options + '<option value="' + res.bsube[i8][0] + '">' + res.bsube[i8][1] + '</option>';
                        }
                        $("#bsube").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.taxtc != undefined) {
                        for (let i9 = 0; i9 < res.taxtc.length; i9++) {
                            data_options = data_options + '<option value="' + res.taxtc[i9][0] + '">' + res.taxtc[i9][1] + '</option>';
                        }
                        $("#taxtc").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.taxto != undefined) {
                        for (let i10 = 0; i10 < res.taxto.length; i10++) {
                            data_options = data_options + '<option value="' + res.taxto[i10][0] + '">' + res.taxto[i10][1] + '</option>';
                        }
                        $("#taxto").empty().append(data_options).trigger('chosen:updated');
                    }
                    data_options = "";
                    if (res.waers != undefined) {
                        for (let i11 = 0; i11 < res.waers.length; i11++) {
                            data_options = data_options + '<option value="' + res.waers[i11][0] + '">' + res.waers[i11][1] + '</option>';
                        }
                        $("#WAERS").empty().append(data_options).trigger('chosen:updated');
                        $("#WAERS").val("TRY").trigger('chosen:updated').trigger("change");
                    }
                    for (let i11 = 0; i11 < res.data.length; i11++) {
                        if (res.data[i11][2] == "t") {
                            $("#" + res.data[i11][0]).val(res.data[i11][1]);
                        } else if (res.data[i11][2] == "s") {
                            $("#" + res.data[i11][0]).val(res.data[i11][1]).trigger("chosen:updated").trigger("change");;
                        }
                    }
                    GV_RESLST = res.resdw;
                    tedarikci_dowload();
                }
                break;
            case "VEPOR":
                var mesaj = "";
                mesaj = '<div id="savemsg" data-lang="00167" style="background-color: rgb(9, 141, 158); width: auto; min-height: 1px; max-height: none; height: auto;" class="ui-dialog-content ui-widget-content">';
                mesaj = mesaj + '<br><hr><br>';
                if (res.result == 200) {
                    mesaj = mesaj + ' <br><span><i style="color:#26ff10;padding-left:45% " class="fa fa-check-circle fa-2x"></i>';
                    mesaj = mesaj + '<br>' + res.mail + ' ' + sessionStorage.getItem("00365");
                } else if (res.result == 400) {
                    mesaj = mesaj + ' <br><span><i style="color:#CC1919;padding-left:45% " class="fa fa-exclamation-triangle fa-2x"></i>';
                    mesaj = mesaj + '<br>' + res.mail + ' ' + sessionStorage.getItem("00366");
                } else {}
                mesaj = mesaj + '<br><hr><br></div>';
                $("#errMes").html(mesaj).dialog("open");

                $("#SUPMA").val("");
                break;
            case "REPNY":
                $("#nyt_list_f").css("display", "inherit");
                var t1 = $('#nyt_list').DataTable();
                t1.clear();
                t1.draw();
                for (var i = 0; i < res.NYREP.length; i++) {
                    t1.row.add([res.NYREP[i][0], res.NYREP[i][1], res.NYREP[i][2], res.NYREP[i][3], res.NYREP[i][4]]).draw();
                }
                $("#nytlist").css("display", "inherit");

                $('#ajxlo').hide();
                break;
            case "REPCH":
                $("#chnglist").css("display", "inherit");
                var t1 = $('#chng_list').DataTable();
                t1.clear();
                t1.draw();
                for (var i = 0; i < res.REPCH.length; i++) {
                    t1.row.add([res.REPCH[i][0], res.REPCH[i][1], res.REPCH[i][2], res.REPCH[i][3], res.REPCH[i][4], res.REPCH[i][5], res.REPCH[i][6], res.REPCH[i][7], res.REPCH[i][8]]).draw();
                }
                $('#ajxlo').hide();
                break;
            case "REPBL":
                $("#blokajlist").css("display", "inherit");
                var t1 = $('#blokaj_list').DataTable();
                t1.clear();
                t1.draw();
                for (var i = 0; i < res.REPBL.length; i++) {
                    t1.row.add([res.REPBL[i][0], res.REPBL[i][1], res.REPBL[i][2], res.REPBL[i][3], res.REPBL[i][4], res.REPBL[i][5], res.REPBL[i][6], res.REPBL[i][7]]).draw();
                }
                $('#ajxlo').hide();
                break;
            case "UPNYT":
                var basarili = "0";
                var basarisiz = "0";
                var mesaj = "";
                var load = '<span><i class = "fa fa-spinner fa-pulse fa-4x fa-fw"></i></span>';
                var end = '<i class="fa fa-hand-paper-o fa-2x" aria-hidden="true"></i>';

                if (update_proces_status == 0) {
                    if (res.result == 200) {
                        basarili = res.adet;
                        $("#basarili").val(suc)
                    } else if (res.result == 400) {
                        basarisiz = res.adet;
                    }
                    update_proces_status = 1;
                    mesaj = '<div id="savemsg" data-lang="00167" style="background-color: rgb(9, 141, 158); width: 300px; min-height: 1px; max-height: none; height: auto;" class="ui-dialog-content ui-widget-content">';
                    mesaj = mesaj + '<br><hr><br>';
                    mesaj = mesaj + '<div class="row">';
                    mesaj = mesaj + '<div class="col col-1"></div>';
                    mesaj = mesaj + '<div class="col col-3" style ="text-align: center;">';
                    mesaj = mesaj + '<span><i style="color:#26ff10;" class="fa fa-check-circle fa-2x"></i></span><br>';
                    mesaj = mesaj + '<br><span id="basarili">' + basarili + '</span>';
                    mesaj = mesaj + '</div><br>';
                    mesaj = mesaj + '<div class="col col-4" style ="text-align: center;">';
                    mesaj = mesaj + '<div id="sonuc"' + load + '</div>';
                    mesaj = mesaj + '</div>';
                    mesaj = mesaj + '<div class="col col-3" style ="text-align: center;">';
                    mesaj = mesaj + ' <br><span><i style="color:#CC1919; " class="fa fa-exclamation-triangle fa-2x"></i></span><br>';
                    mesaj = mesaj + ' <br><span id="basarisiz">' + basarisiz + '</span>';
                    mesaj = mesaj + '</div>';
                    mesaj = mesaj + '<div class="col col-1"></div>';
                    mesaj = mesaj + '</div>';
                    mesaj = mesaj + '<br><hr><br></div>';
                    $("#errMes").html(mesaj).dialog("open");
                } else {
                    if (res.result == 200) {
                        var suc = $("#basarili").html();
                        suc = parseInt(suc) + parseInt(res.adet);
                        $("#basarili").html(suc)
                    } else if (res.result == 400) {
                        var er = $("#basarisiz").html();
                        er = parseInt(er) + parseInt(res.adet);
                        $("#basarisiz").html(er);
                    }
                }
                nyt_Update();
                break;
            case "GETKT":
                var GV_GETKT = "";
                if (res.KTOKD.length > 0) {
                    var item = {
                        0: "B000",
                        1: "Bütün Hesap Grupları"
                    }
                    res.KTOKD.splice(1, 0, item);
                }
                for (var i = 0; i < res.KTOKD.length; i++) {

                    GV_GETKT += '<option value="' + res.KTOKD[i][0] + '">' + res.KTOKD[i][1] + '</option>';
                };
                $("#KTOKD").empty().append(GV_GETKT).trigger("chosen:updated").trigger("change");;
                break;
            case "GETSW":
                $("#SWIFT" + res.ROW).val(res.SWIFT).trigger("change");
                GV_OTABLE.fnUpdate(res.SWIFT, res.ROW, 6);
                break;
            case "VENSS":
                var ss = "";
                for (var i = 0; i < res.SATS.length; i++) {
                    ss += '<option value="' + res.SATS[i][0] + '">' + res.SATS[i][1] + '</option>';
                }
                $("#WORMA").empty().append(ss).trigger("chosen:updated").trigger("change");
                break;
            case "CNVKN":
                if (res.count == 1) {
                    $("#CENOF").val(res.sapno);
                } else {
                    centerOfficeVknSattus = 2;
                }
                break;
        }
    },
    complete: function() {
        $('#ajaxl, #ajxlo').delay(1000).fadeOut("slow");
    },
    error: function(xhr) {
        xhr.responseText = xhr.responseText.replace(/(\r\n|\n|\r)/gm, "");
        if (xhr.responseText) {
            xhr.responseText = xhr.responseText.replace(/\#333333/g, 'white');
            xhr.responseText = xhr.responseText.replace(/\#C8E3FF/g, '#EF5350');
            $("#errMes").html(xhr.responseText).dialog("open");
        }
        var error = xhr.status;
        error = error.toString().substr(0, 2);
        if (error == 50 || error == 40) { // server error..
            $('#errMes').on('dialogclose', function() {
                $(this).dialog("close");
                window.location("a001.html");
            });
        }
    }
});

function radio_btn(tik) {
    var rdb_tr = tik.split('_');
    if (rdb_tr[1] == "SL" || rdb_tr[1] == "AL") {
        var rd_btn1 = document.getElementById(tik);
        var sonuc = true;
        if (rd_btn1.checked == true) {
            sonuc = false;
        }
        var son = "AL";
        if (rdb_tr[1] == "AL") {
            son = "SL";
        }
        var rd_btn2 = document.getElementById(rdb_tr[0] + "_" + son);
        if (sonuc == true) {
            $("#" + tik).prop('checked', false);
        } else if (sonuc == false && rd_btn2.checked == true) {
            $("#" + tik).prop('checked', true);
            $("#" + rdb_tr[0] + "_" + son).prop('checked', false);
        }
    }
}

function standartSrchOpen(txt) {
    $("#CUSVE_SH2").val(txt);
    $("#CUSVE_SH2_chosen").css("display", "none");
    $(".fa-chevron-circle-up").css("display", "block");
    $(".fa-chevron-circle-down").css("display", "none");
}

function standartSrchClose() {
    $("#CUSVE_SH2").val("");
    $("#cari_tipi_arama").css("display", "block");
    $("#CUSVE_SH2_chosen").css("display", "block");
}
$("#KUNNRS").click(function() {
    $("#search2").css("display", "block");
    $(".fa-chevron-circle-up").css("display", "block");
    $(".fa-chevron-circle-down").css("display", "none");
    standartSrchOpen("CUST")
});
$("#LIFNRS").click(function() {
    $("#search2").css("display", "block");
    $(".fa-chevron-circle-up").css("display", "block");
    $(".fa-chevron-circle-down").css("display", "none");
    standartSrchOpen("VEND")
});
$("#merkezsube_i").click(function() {
    if (centerOfficeVknSattus == 2) {
        centerOfficeVknSattus = 1;
        $("#CUSVE_SH2").val(GV_CUSVE);
        $("#STCD2_SH2").val(centerOfficeVkn);
        src_stats = "1";
        $.ajax({ id: "SRCHD", data: $("#search2").serializeArray() });
        $("#search2").css("display", "block");
        $(".fa-chevron-circle-up").css("display", "none");
        $(".fa-chevron-circle-down").css("display", "block");

    } else {
        if (GV_CUSVE == 'CUST') {
            standartSrchOpen("CUST")
        } else if (GV_CUSVE == 'VEND') {
            standartSrchOpen("VEND")
        }
        $("#search2").css("display", "block");
        $(".fa-chevron-circle-up").css("display", "block");
        $(".fa-chevron-circle-down").css("display", "none");
    }
});
$("#change_i").click(function() {
    if (GV_CUSVE == 'CUST') {
        standartSrchOpen("VEND")
    } else if (GV_CUSVE == 'VEND') {
        standartSrchOpen("CUST")
    }
    $("#search2").css("display", "block");
    $(".fa-chevron-circle-up").css("display", "block");
    $(".fa-chevron-circle-down").css("display", "none");
});
$("#modalSearch2").dialog({
    autoOpen: false,
    closeOnEscape: true,
    resizable: false,
    modal: true,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "clip", duration: 500 },
    height: 650,
    width: 900,
    buttons: [{
            height: 35,
            width: 40,
            "class": 'fa fa-check-square fa-2x ',
            click: function() {
                if ($('#result2 tbody tr').length == 0) {
                    $("#errMes").html(sessionStorage.getItem("00274")).dialog("open");
                    return;
                }
                var param = $(this).data('clicked'),
                    d = "",
                    oTable = $('#result2').dataTable(),
                    dtab = $('#result2').DataTable();

                $("input:checked", oTable.fnGetNodes()).each(function() { d = dtab.row($(this).closest("tr")).data(); });
                if (d[1]) {
                    $("#MDMNO").val(d[1]);
                    switch (param) {
                        case "CHNG_REP":
                            $("#CHNGREP").val(d[1]);
                            break;
                        case "relat_office":
                            if (srctype2 == "VEND") {
                                $("#RELAT").val(d[4]);
                            } else if (srctype2 == "CUST") {
                                $("#RELAT").val(d[2]);
                            }
                            break;
                        case "center_office":
                            if (srctype2 == "VEND") {
                                $("#CENOF").val(d[4]);
                            } else if (srctype2 == "CUST") {
                                $("#CENOF").val(d[2]);
                            }
                            $("#MDMNO").val(GV_MDMNO);
                            srctype2 = "";
                            break;
                        case "cust_block":
                            $("#KUNNR_XD").val(d[2]).trigger("change").prop("title", d[7]);
                            $("#KUNNM").val(d[7]);
                            break;
                        case "vend_block":
                            $("#LIFNR_XK").val(d[4]).trigger("change").prop("title", d[7]);
                            $("#LIFNM").val(d[7]);
                            break;
                        case "viewx":
                            window.location.href = "a002.html?mdmno=" + d[1] + "&kunnr=" + d[2] + "&lifnr=" + d[4] + "&param=" + param + "&cusve=" + $("#CUSVE_SH").val();
                            break;
                        case "chang":
                            window.location.href = "a002.html?mdmno=" + d[1] + "&kunnr=" + d[2] + "&lifnr=" + d[4] + "&param=" + param + "&cusve=" + $("#CUSVE_SH").val();
                            break;
                        case "histo":
                            var src = cusve = "";
                            if ($("#CUSVE_SH").val() == "CUST") { src = 'a005.html?CUST=' + d[2]; } else { src = 'a005.html?VEND=' + d[4]; }
                            $("#a0052").attr('src', src);
                            $('#display').dialog('open');
                            break;
                    }
                    $(this).dialog("close");
                } else {
                    $("#MDMNO").val("");
                    $("#errMes").html(sessionStorage.getItem("00123")).dialog("open");
                }
            }
        },
        {
            height: 35,
            width: 40,
            "class": 'fa fa-times-circle fa-2x',
            click: function() { $(this).dialog("close"); },
        }
    ]
});
$("#search_btn2").click(function(e) {
    if ($("#CUSVE_SH2").val() == "") {
        $("#errMes").html(sessionStorage.getItem("00136")).dialog("open");
    } else if (($("#BUKRS_SH2").val() != "") && (($("#MDMNO_SH2").val() == "") && ($("#SAPNO_SH2").val() == "") && ($("#NAME1_SH2").val() == "") && ($("#NAME2_SH2").val() == "") && ($("#LAND1_SH2").val() == "") && ($("#STCD2_SH2").val() == "") && ($("#FERDA2").val() == "") && ($("#TERDA2").val() == ""))) {
        $("#errMes").html(sessionStorage.getItem("00286")).dialog("open");
    } else {
        var sap_no1_2 = $("#SAPNO_SH2").val();
        sap_no1_2 = sap_no1_2.replace(String.fromCharCode(160), '');
        sap_no1_2 = sap_no1_2.replace(/ /g, '');
        $("#SAPNO_SH2").val(sap_no1_2);
        if (sap_no1_2.length == 0) {
            src_stats = "1";
            $.ajax({ id: "SRCHD", data: $("#search2").serializeArray() });
            var data = $("#search2").serializeArray();
            srctype2 = data[6]["value"];
        } else if (sap_no1_2.length > 0) {
            sap_no1_2 = sap_no1_2.substr(2, (sap_no1_2.length - 1));
            if (!isNaN(sap_no1_2)) {
                src_stats = "1";
                $.ajax({ id: "SRCHD", data: $("#search2").serializeArray() });
            } else {
                $("#errMes").html(sessionStorage.getItem("00318")).dialog("open");
            }
        }
    }
    e.stopImmediatePropagation();
});
//arama sonuçlarında satır tıklandığında radio seçilsin
$('#result2, tbody').on('click', 'tr', function() {
    //daha önce seçilen radio buttonlar temizleniyor..
    var oTable = $('#result2').dataTable();
    $("input:checked", oTable.fnGetNodes()).each(function() {
        $(this).prop("checked", false);
    });
    $(this).find('td input:radio').prop('checked', true);
});

function resetTimeout() {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(ShowTimeoutWarning, 300000);
}
var timeoutID;
resetTimeout();

function ShowTimeoutWarning() {
    var timeout_txt = "<div style='background-color: rgb(9, 141, 158);height = 100%;width=100%; '> </BR></BR><HR></BR></BR><p style='margin-right: 17px;margin-left: 17px;'>"
    if (GV_LANGU == 'T') {
        timeout_txt += "İşlem Yapmadığınız İçin Oturum Süreniz Dolmuştur.İşlemlerinize Devam Etmek MDM Yeniden Başlatılacaktır.";
    } else {
        timeout_txt += "Your session is not working properly. Resuming your operations MDM will be restarted.";
    }
    timeout_txt += "</p></BR></BR><HR></BR></BR></BR></div>"
    $("#timeoutdiv").html(timeout_txt);
    $("#timeoutdiv").dialog("open");
    return false;
}
$("#timeoutdiv").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    position: 'center',
    title: 'session',
    position: { my: "center", at: "center", of: window },
    draggable: false,
    width: 400,
    height: 400,
    resizable: false,
    modal: true,
    buttons: [{
        text: "OK",
        click: function() {
            ShowTimeoutWarning();
            $(this).dialog("close");
            location.href = "a001.html";
        }
    }]
});
$('#timeoutdiv').on('dialogclose', function(event) {
    $(this).dialog("close");
    location.href = "a001.html";
});
document.onkeyup = resetTimeout;
document.onkeydown = resetTimeout;
document.onclick = resetTimeout;


function tedarikci_dowload() {
    if (GV_RESLST.length > 0) {
        $('#res1').css('display', 'block');
        $('#res1_txt').text(GV_RESLST[0][1]);
    } else {
        $('#res1').css('display', 'none');
    }
    if (GV_RESLST.length > 1) {
        $('#res2').css('display', 'block');
        $('#res2_txt').text(GV_RESLST[1][1]);
    } else {
        $('#res2').css('display', 'none');
    }
    if (GV_RESLST.length > 2) {
        $('#res3').css('display', 'block');
        $('#res3_txt').text(GV_RESLST[2][1]);
    } else {
        $('#res3').css('display', 'none');
    }
    if (GV_RESLST.length > 3) {
        $('#res4').css('display', 'block');
        $('#res4_txt').text(GV_RESLST[3][1]);
    } else {
        $('#res4').css('display', 'none');
    }
    if (GV_RESLST.length > 4) {
        $('#res5').css('display', 'block');
        $('#res5_txt').text(GV_RESLST[4][1]);
    } else {
        $('#res5').css('display', 'none');
    }
    if (GV_RESLST.length > 5) {
        $('#res6').css('display', 'block');
        $('#res6_txt').text(GV_RESLST[5][1]);
    } else {
        $('#res6').css('display', 'none');
    }
    if (GV_RESLST.length > 6) {
        $('#res7').css('display', 'block');
        $('#res7_txt').text(GV_RESLST[6][1]);
    } else {
        $('#res7').css('display', 'none');
    }
    if (GV_RESLST.length > 7) {
        $('#res8').css('display', 'block');
        $('#res8_txt').text(GV_RESLST[7][1]);
    } else {
        $('#res8').css('display', 'none');
    }
    if (GV_RESLST.length > 8) {
        $('#res9').css('display', 'block');
        $('#res9_txt').text(GV_RESLST[8][1]);
    } else {
        $('#res9').css('display', 'none');
    }
    if (GV_RESLST.length > 9) {
        $('#res10').css('display', 'block');
        $('#res10_txt').text(GV_RESLST[9][1]);
    } else {
        $('#res10').css('display', 'none');
    }
}
/* ------------------------------------ END: Global Ajax Event Handlers -------------------------- */