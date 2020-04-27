const mark = function(id){
  let correctNum = 0;
  let allNum = 0;
  const $inputs = document.getElementsByName('p'+id+'t');
    for(let i=0;i < $inputs.length;i++){
      allNum++;
      const $input = $('#p'+id+'t'+i);
      const inputval = sha256($input.val().trim());
      let flag = false;
      console.log(inputval,$input.attr('data-answer'));
      if($input.attr('data-answer')){
        if(inputval == unescapeHTML($input.attr('data-answer'))){
          flag = true;
        }
      }
      else if($input.attr('data-answers')){
        if(JSON.parse(unescapeHTML($input.attr('data-answers'))).includes(inputval)){
          flag = true;
        }
      }
      if(flag){
        correctNum++;
        $input.removeClass('is-invalid');
        $input.addClass('is-valid');
      }
      else{
        $input.removeClass('is-valid');
        $input.addClass('is-invalid');
      }
    }
    //以下chaos
  const $chaoses = document.getElementsByName('p'+id+'ch');
    for(let i=0;i < $chaoses.length;i++){
      const $chaos = $('#p'+id+'ch'+i);
      const ans = $chaos.attr('data-answer').split('|');
      const $li = $chaos.find('ol').eq(1).children('li');

      for(let j=0;j<$li.length;j++){
        allNum++;
        const $thisli = $li.eq(j);
        if(sha256(String($thisli.attr('data-num'))) == ans[j]){
          correctNum++;
          $thisli.removeClass('is-invalid');
          $thisli.addClass('is-valid');
        }
        else{
          $thisli.removeClass('is-valid');
          $thisli.addClass('is-invalid');
        }
      }
    }

    //以下radio

    const $radios = document.getElementsByName('p'+id+'r');
    for(let i=0;i<$radios.length;i++){
      allNum++;
      const $this = $('#p'+id+'r'+i);
      const $radio = $('[name="p'+id+'r'+i+'i"]:checked');
      let flag = false;
      if($radio){
        if(sha256(String(i)) == $radio.attr('data-answer')){
          correctNum++;
          flag = true;
        }
      }
      if(flag){
        $this.removeClass('is-invalid');
        $this.addClass('is-valid');
      }
      else{
        $this.removeClass('is-valid');
        $this.addClass('is-invalid');
      }
    }

  document.getElementById('p'+id+'correct').innerHTML = correctNum+'問正解！（'+allNum+'問中）';
  return 0;
}

function unescapeHTML(escapedHtml) {
  const doc = new DOMParser().parseFromString(escapedHtml, 'text/html');
  return doc.documentElement.textContent;
}