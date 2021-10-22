//The options are on the bottom

(function ($) {
    $.fn.krishSelect = function (options) {
        return this.each(function () {
            var settings = $.extend({
                search: false,
                buttons: false,
                placeholder: 'Select item',
                selectColor: '#414c52',
                placeholderColor: '#838383',
                itemTitle: 'Selected items',
                showEachItem: false,
                width: '100%',
                dropdownMaxHeight: 'auto',
                totalShowCont: '2'
            }, options);

            var $this = $(this),

                numberOfOptions = $(this).children('option').length;

            $this.addClass('s-hidden');

            $this.wrap('<div class="krishSelect"></div>');
            var $main = $this.closest('.krishSelect').css('width', settings.width);

            $this.after('<div class="styledSelect"></div>');

            var $styledSelect = $this.next('div.styledSelect');

            $styledSelect.text(settings.placeholder).css('color', settings.placeholderColor);

            var MaxAllowed = $this.data("max");
            var MaxCount = (($this.data("count") === "" || $this.data("count") == undefined || $this.data("count") == null) ? "4" : $this.data("count"));

            var clear = $('<span/>', {
                'class': 'clearSelectfromDiv',
                html: '&times;',
                'style': 'display: none',
            }).prependTo($main);

            var $list = $('<ul />', {
                'class': 'options'
            }).insertAfter($styledSelect);

            var $divSearch = $('<div/> ', {
                'class': 'divSearchkrishSelect',
            }).appendTo($list)
            if (settings.search == false) {
                $divSearch.hide();
            }


            var $divoptions = $('<div/> ', {
                'class': 'divOptionsesySelect',
            }).appendTo($divSearch);
            if (settings.buttons == false) {
                $divoptions.hide();
            }

            var $clearSpan = $('<p />', {
                'class': 'optionRow ',
                text: 'Clear all',
                'id': 'clearAllkrishSelect',
            }).appendTo($divoptions);

            var $clear = $('<span />', {
                'class': 'allkrishSelect',
                html: '&times;'
            }).appendTo($clearSpan);

            var $selectAllspan = $('<p />', {
                'class': 'optionRow',
                'id': 'selectAllkrishSelect',
                text: 'Select all'
            }).appendTo($divoptions);

            var $selectAll = $('<span />', {
                'class': 'allkrishSelect',
                html: '&check;'
            }).appendTo($selectAllspan);

            var $message = $('<p />', {
                'class': 'messageMaxallowedSelections',
                style: 'display:none',
                text: 'You can select max ' + MaxAllowed + ' items '
            }).appendTo($divoptions);

            var $searchInput = $('<input/> ', {
                'type': 'text',
                'class': 'searchInputkrishSelect',
                'placeholder': 'Search',
            }).appendTo($divSearch)

            var $maindiv = $('<div/> ', {
                'class': 'scrolableDiv',
            }).appendTo($list);
            $maindiv.css('max-height', settings.dropdownMaxHeight);

            var $hiddenli = $('<li/> ', {
                text: 'You can select only ' + MaxAllowed + ' items',
                'class': 'hiddenLikrishSelect',
                style: 'display: none'
            }).appendTo($list);


            for (var i = 0; i < numberOfOptions; i++) {
                var $li = $('<li/> ').appendTo($maindiv);

                var $label = $('<label/> ', {
                    'class': 'container-item',
                    text: $this.children('option').eq(i).text(),
                }).appendTo($li)

                var $checkbox = $('<input> ', {
                    'class': 'mulpitply_checkbox_style',
                    'type': 'checkbox',
                    value: $this.children('option').eq(i).val(),
                }).appendTo($label)

                $('<span /> ', {
                    'class': 'checkmark',
                }).appendTo($label)
            }

            var $listItems = $list.find('li');
            var checkItem = $list.find('.mulpitply_checkbox_style');

            $styledSelect.click(function (e) {
                e.stopPropagation();
                $('div.styledSelect.active').each(function () {
                    $(this).removeClass('active').next('ul.options').hide();
                });
                $(this).toggleClass('active').next('ul.options').toggle();
            });

            function eachItem() {

                var $checked_items = checkItem.filter(":checked").length;

                arrText = [];
                $.each($list.find('.mulpitply_checkbox_style:checked'), function () {

                    if (MaxCount === "" || MaxCount == undefined || MaxCount == null) {
                        arrText.push($(this).parent().text());
                    }
                    else if ($checked_items > MaxCount && MaxCount !== "") {
                        arrText = [];
                        arrText.push($checked_items + ' Selected');
                    }
                    else {

                        arrText.push($(this).parent().text());
                    }

                });
            }

            function eachItemoutput() {

                if (settings.showEachItem == true) {
                    $styledSelect.text(arrText.join(", ")).removeClass('active').css('color', settings.selectColor);

                } else {
                    var $checked_items = checkItem.filter(":checked").length;
                    $styledSelect.text($checked_items + ' ' + settings.itemTitle).removeClass('active').css('color', settings.selectColor);

                }
            }


            $listItems.click(function (e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('val'));
                clear.show();

                val = [];
                $('.mulpitply_checkbox_style:checked').each(function () {
                    val.push($(this).val());
                })
                $this.closest('select').val(val);

                $($this.closest('select').children('option:selected')).each(function () {
                    $(this).attr('selected', 'selected');
                });

                arrVal = [];
                var getVal = $.each($('.mulpitply_checkbox_style:checked'), function () {
                    arrVal.push($(this).val());
                });
                /*--===============================*/
                eachItem();
                eachItemoutput();

                var $checked_items = checkItem.filter(":checked").length;
                if ($checked_items == 0) {
                    $styledSelect.text(settings.placeholder).removeClass('active').css('color', settings.placeholderColor);
                    clear.hide();
                }

                var MaxAllowed = $this.data("max");
                if ($checked_items >= MaxAllowed && MaxAllowed !== "") {
                    checkItem.not(":checked").attr("disabled", "disabled");
                    // $maindiv.hide();
                    $divSearch.hide();
                    $hiddenli.show();
                } else {
                    // Enable the inputs again when he unchecks one
                    checkItem.removeAttr("disabled");
                }
            });

            var $optionRow = $list.find('.optionRow');

            $optionRow.click(function (e) {
                e.stopPropagation();
            });
            var $clearAll = $list.find('#clearAllkrishSelect');
            var $selectAll = $list.find('#selectAllkrishSelect');

            /*--================================*/
            function unselectAll() {
                checkItem.prop('checked', false);
                $styledSelect.text(settings.placeholder).removeClass('active').css('color', settings.placeholderColor);
                $this.closest('select').val('');
                $maindiv.show();
                $hiddenli.hide();
            }
            $clearAll.click(function () {
                clear.hide();
                unselectAll()
            })
            clear.click(function () {
                $(this).hide();

                unselectAll()
            })
            /*--================================*/
            allValue = [];
            $selectAll.click(function () {
                if (MaxAllowed == "" || typeof MaxAllowed == typeof undefined) {
                    checkItem.prop('checked', true);
                    $('.mulpitply_checkbox_style:checked').each(function () {
                        allValue.push($(this).val());
                    })
                    $this.closest('select').val(allValue);
                    clear.show();
                    eachItem();
                    eachItemoutput();
                } else {
                    $message.css('display', 'inline-block');
                    setTimeout(function () {
                        $message.hide()
                    }, 2000);
                }
            })

            $(document).on('click', function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });

            var $block = $('<li/> ', {
                'class': 'no_results',
                text: 'No results found..',
            }).appendTo($list)
            $block.hide();
            var $input = $divSearch.find('input[type="text"]');
            $input.on('click', function (e) {
                e.stopPropagation();
            });
            $input.on('keyuo', function () {
                var val = $(this).val();
                var isMatch = false;
                $listItems.find('.container-item').each(function (i) {
                    var content = $(this).html();
                    if (content.toLowerCase().indexOf(val) == -1) {
                        $(this).hide();
                    } else {
                        isMatch = true;
                        $(this).show();
                    }
                });
                $block.toggle(!isMatch);
            });
        });
    }

    $.fn.GetMultiSelectString=function(ddlids, IsControlID, IsIdString) {
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
}(jQuery));





///////////// Option Demo

//<select id="demo" data-max="5" data-count="2" multiple="multiple" style="">
//</select>

//$("#demo").krishSelect({
//    buttons: false,
//    search: false,
//    placeholder: 'Choose Country',
//    placeholderColor: '#524781',
//    selectColor: '#524781',
//    itemTitle: 'Countrys selected',
//    showEachItem: true,
//    width: '100%',
//    dropdownMaxHeight: '450px',
//})
