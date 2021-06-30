$(document).ready(function()
{
    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }

        return returnArray;
    }

    function getAttributes(elem)
    {
        var dataAttr =
            {
                request : elem.attr('data-request'),
                confirm : elem.attr('data-request-confirm'),
                redirect : elem.attr('data-request-redirect'),
                update : elem.attr('data-request-update'),
                data : elem.attr('data-request-data'),
                type : elem.attr('data-request-type'),
            };
        return dataAttr;
    }

    function makeObjectFromString(data)
    {
        var properties = data.split(',');
        var obj = {};
        properties.forEach(function(property) {
            var item = property.split(':');
            obj[item[0]] = item[1];
        });
        return obj;
    }
    function clearIdString(view)
    {
        var   ob = view.replace(/['"#]/g, '');
        ob = ob.replace(/\s+/g, '');
        return ob;
    }
    $('form[data-request]').submit(function(e) {
        event.preventDefault();

        var elem = $(this);
        var isConfirm = -1 ;
        var view='';

        if (elem.attr('data-request'))
        {
            var dataAttr = getAttributes(elem);
            if (dataAttr.request)
            {
                var dataAll =  objectifyForm(elem.serializeArray());
                if (dataAttr.confirm)
                {
                    isConfirm  = confirm(dataAttr.confirm);
                }
                if (dataAttr.update)
                {
                    var viewPartial = dataAttr.update.split(':');
                    view = viewPartial[0];
                    var additionalInfo = {
                        view: view,
                    };
                    dataAll = $.extend(dataAll, additionalInfo);
                    console.log(dataAll);
                } else {
                    var viewPartial = null;
                }
                if (dataAttr.data)
                {
                    var obj = makeObjectFromString(dataAttr.data);
                    dataAll = $.extend(dataAll, obj);
                }
                if (isConfirm!==false)
                {
                    $.ajax({
                        type: dataAttr.type ?? "POST",
                        url: dataAttr.request,
                        data: dataAll,
                        success: function(data){

                            if (viewPartial && isset(viewPartial[1]))
                            {
                                var ob  = clearIdString(viewPartial[1]);
                                document.getElementById(ob).innerHTML = data;
                            }
                            if (dataAttr.redirect)
                            {
                                window.location.replace(dataAttr.redirect);
                            }
                        }
                    });
                }
            }
        }
    });

    $(document).on('click', 'a[data-request], button[data-request], input[type=button][data-request], input[type=submit][data-request]', function(event)
    {
        event.preventDefault();
        var elem = $(this);
        var isConfirm = -1 ;
        var _token = $('meta[name="csrf-token"]').attr('content');
        var view='';
        if (elem.attr('data-request'))
        {
            var dataAttr = getAttributes(elem);
            if (dataAttr.request)
            {
                if (dataAttr.confirm)
                {
                    isConfirm  = confirm(dataAttr.confirm);
                }
                if (dataAttr.update)
                {
                    var viewPartial = dataAttr.update.split(':');
                    view = viewPartial[0];
                    id = viewPartial[1];
                    console.log(view + ':' + id);
                } else {
                    var viewPartial = null;
                }
                var dataAll =
                    {
                        _token: _token,
                        view: view,
                    };
                console.log(dataAll.view)
                if (dataAttr.data)
                {
                    var obj = makeObjectFromString(dataAttr.data);
                    //dataAll.data = $.extend(dataAll, obj); // в один массив
                    dataAll.data = obj; // Отдельный массив data внутри
                }
                if (isConfirm !== false)
                {
                    $.ajax({
                        type: "POST",
                        url: dataAttr.request,
                        data: dataAll,
                        success: function(data) {
                            if (viewPartial !== null && viewPartial[1])
                            {
                                var ob  = clearIdString(viewPartial[1]);
                                document.getElementById(ob).innerHTML = data;
                                //document.getElementById(ob).insertAdjacentHTML('beforebegin', data);
                            }
                            if (dataAttr.redirect)
                            {
                                window.location.replace(dataAttr.redirect);
                            }
                        }
                    });
                }
            }
        }
    });

});
