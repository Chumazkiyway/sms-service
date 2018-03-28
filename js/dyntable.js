var t =  document.getElementById("dyntab");
var tds = t.getElementsByTagName("td");
for (var i=0; i<tds.length; i++){

    tds[i].addEventListener('click',editRow);
}


function editRow(e) {
      //ловим элемент, по которому кликнули
      let t = e.target || e.srcElement;
      //получаем название тега
      let elm_name = t.tagName.toLowerCase();
      //если это инпут - ничего не делаем
      if(elm_name == 'input') {return false;}
      let val = $(this).html();
      let code = '<input type="text" id="edit" value="'+val+'" />';
      $(this).empty().append(code);
      $('#edit').focus();
      $('#edit').blur(function()  {
        let val = $(this).val();
        $(this).parent().empty().html(val);
      });
  }


$(window).keydown(function(event){
  //ловим событие нажатия клавиши
  if(event.keyCode == 13) { //если это Enter
    $('#edit').blur();  //снимаем фокус с поля ввода
  }
});

function addRow()
{

    document.getElementById("dyntab").insertRow(-1).innerHTML = '<td>QQ</td><td>qq</td><td>Qq</td>';

    t =  document.getElementById("dyntab");
    tds = t.getElementsByTagName("td");
    for (var i=0; i<tds.length; i++){

        tds[i].addEventListener('click',editRow);
    }
}

