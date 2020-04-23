---
title: "Stage1"
weight: 1
pagetype: stage
description: >
  言語学オリンピックの基礎
---

## 例題1

{{% ex/main id=271 min=10 lead="以下にカンカプ語の語句とその日本語訳が別々の順番で並んでいます．" %}}
{{% ex/chaos %}}

1. kan
1. kanekunpi
1. kap
1. kap turto
1. turto turto

---

1. おいしい，味
1. 米
1. 寿司
1. 珍味
1. とても珍しい

{{% /ex/chaos %}}

<div class="answer-form" id="pf271">

(a) どれがどれに対応するか明らかにしてください

(b) 'kan kap' の意味は何でしょう？

<label for="input271a0">kan kap</label>
<input type="text" class="form-control" id="input271a0" data-answer="おいしい米" name="input271">

<label for="input271a1">kan kap</label>
<input type="text" class="form-control" id="input271a1" data-answers='["おいしい米"]' name="input271">

(c) 「魚」「珍しい魚」「とてもおいしい」をカンカプ語に訳してください

<input id="mark-button" class="input-markbtn" type="button" hidden onclick="return mark(271)">
<label for="mark-button" class="markbtn">丸つけ</label>
</div>

注：**カンカプ語は人工言語です

{{% /ex/main %}}

<script>
  
const mark = function(id){
  const $inputs = document.getElementsByName('input'+id);
    for(let i=0;i < $inputs.length;i++){
      const $input = $('#input'+id+'a'+i);
      const inputval = $input.val();
      let flag = false;
      if($input.attr('data-answer')){
        if(inputval == $input.data('answer')){
          flag = true;
        }
      }
      else if($input.attr('data-answers')){
        if($input.data('answers').includes(inputval)){
          flag = true;
        }
      }
      if(flag){
        $input.removeClass('is-invalid');
        $input.addClass('is-valid');
      }
      else{
        $input.removeClass('is-valid');
        $input.addClass('is-invalid');
      }
    }
  return 0;
}

</script>

## 例題2

{{% ex/main id=1 min=30 lead="以下は架空の言語Xでかかれた例文とその日本語訳です．" %}}

| X                     | 日   |
| --------------------- | --- |
| kinafi dekarba zan mi |    |
| dirtonas tede sone    | 表の表示テスト   |
|                     | サンプル   |

{{% /ex/main %}}
