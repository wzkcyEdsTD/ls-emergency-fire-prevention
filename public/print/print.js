(function(win,$){
    win.printReport = function(arr){
        var reportFrame = $(parent.frames['report-frame'].contentWindow.document)
        for(var i = 1;i <= arr.length;i++){
            if (!$(reportFrame).find("#param_"+i)) {
                continue
            }
            $(reportFrame).find("#param_"+i).html(arr[i-1]);
        }
        $(reportFrame).find("#WordSection1").printArea();
    }
})(window,jQuery)
