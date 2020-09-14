---
title: "取説"
weight: 1
type: docs
description: "問題集の使い方．[更新情報](/blog/releases/)"
images:
- problems/about/filter-thumbnail.png
---

## 概要

「問題集」は言語学オリンピックの問題を集めたデータベースです．登録問題数は現時点で{{< probdatalen >}}問！

**一覧・検索機能**

- 色々ある大会などの問題が一か所で一覧できる
- 各問題に難易度とジャンルの情報がついている
- 難易度やジャンルで絞り込み検索できる
- 検索結果をシェアできる

**ヒントと解説**

- ヒントが見れる(鋭意執筆中)
- 解説ブログへのリンクがまとまっている
- ヒントつきの問題・解説つきの問題だけ絞り込める
- その他問題訂正や翻訳なども(鋭意翻訳中)

**{{< icon "check-square sort-utility-done" と>}}{{< icon "heart sort-utility-like" >}}**

- {{< icon "check-square sort-utility-done" "解いた問題" >}}・{{< icon "heart sort-utility-like" "解きたいorお気に入り問題" >}}に印をつけておける・絞り込める
- ブラウザキャッシュを消すと消えるので注意

## 問題情報の見方

各問題の情報は一枚のカードで表されています．例として第一回IOL個人戦第一問とサンプルを示します．

{{< blocks/row class="mx-0 mb-3">}}
{{< problems/probcard id=1 class="col-md-10 col-lg-5 p-0 mr-lg-3 mb-3 mb-lg-0">}}
{{< problems/probcard id=-1 class="col-md-10 col-lg-5 p-0" >}}
{{< /blocks/row >}}

出題元・タイトル・難易度とジャンル・問題へのリンクが縦に並んでいます．難易度とジャンルは独自基準です．

さらに便利な機能を以下でご紹介します．

### 右上のアイコン

問題によってはカードの右上にアイコンが表示されていることがあります．押すとポップアップが出ます．それぞれこんな情報を示しています↓

<!--{{< icon "icons text-muted" >}}-->
<a class="text-muted" tabindex="0" role="button" data-toggle="popover" data-trigger="focus" data-html="true" data-content="<div class=&#34;card web-card d-flex flex-row mb-3&#34;><a href=&#34;&#34; target=&#34;_blank&#34;></a><div class=&#34;thumb center&#34;><div class=&#34;icon material&#34;><i class=&#34;fas fa-icons&#34;></i></div></div><div class=&#34;card-body p-2&#34;><h5 class=&#34;card-title mb-1&#34;>追加資料を入手</h5></div></div>"><i class="fas fa-icons fa-fw"></i></a>
: 音声や動画などの**追加資料**へのリンク

{{< icon "exclamation-circle text-muted" >}}
: **問題訂正** or **解答訂正** (詳細ページに詳しく記載)

{{< iconStack "comment fa-lg text-muted|~訳" >}}
: **翻訳**や注釈がついていること (詳細ページに詳しく記載)

{{< icon "lightbulb text-muted" >}}
: 問題に**ヒント**がついていること (詳細ページに詳しく記載)

{{< icon "chalkboard-teacher text-muted" >}}
: **解説ブログ**へのリンク

### 詳細ページ

左下の「問題」の右隣の「詳細」を押すと，その問題の詳細ページに移ります．詳細ページには

翻訳
: 日本語訳です．問題文の英語が分からなくても大丈夫

ヒント
: ワンステップずつ解法をチラ見できます

解答
: 解答へのリンクはこちらから

類題
: ジャンルや難易度が近い問題を3問ランダムにピックアップ

など役立つ情報が掲載されています．

今のところまだ情報が充実していません．今後のアップデートをお待ちください．必要な情報があるときは以下の方法でお知らせくださればなるべく優先的に情報を追加したいと思います

- {{< devs "fulfom" >}}宛てにツイート/DM
- または GitHubアカウントをお持ちの方: ↓どちらかのリンクからissueを投げる
    - 共通: 各ページ一番下の「このページは役に立ちましたか？」に yes/no で答えると出てくる「改善点を教えてください」
    - PC: 各ページ右上の {{< icon " fab fa-github" "ドキュメントのissueを作成" >}}

### 便利なボタン

右下に2つのボタンがついています．ツイッターのいいね的な感じで押すとチェックすることができます．どのような意味をもたせてもよいですが，こんなイメージで使うと便利だと思います↓

{{< icon "check-square sort-utility-done" >}}
: 解いた

{{< icon "heart sort-utility-like" >}}
: いいね

表: 組み合わせたボタンの意味(想定)

|                                        | {{< icon "check-square text-muted" >}} | {{< icon "check-square sort-utility-done" >}} |
| -------------------------------------- | -------------------------------------- | --------------------------------------------- |
| {{< icon "heart text-muted" >}}        |     デフォルト                                   |                                          解いたけど普通     |
| {{< icon "heart sort-utility-like" >}} |       解きたい                                 |                                          解いて気に入った     |

チェックしておくことで後からチェックしたものだけを絞り込むことができます．次の節からこの絞り込みなどについてご紹介していきます．

## テキスト検索・絞り込み・ソート・シェア

ページ上部のテキスト検索フォーム・フィルターを使って一覧の中から解きたい問題を絞り込むことができます．

> {{< figure src=filter.png title="図: テキスト検索フォームとフィルター" >}}

最上段にあるテキスト検索フォームでカード上のテキストの全文検索ができます(正規表現可)．

> {{< figure src=filter-search.png title="図: テキスト検索フォーム" >}}

最下段にはヒットした問題数の表示と2つのボタンがあります．{{< icon "trash btnfn-danger" CLEAR >}} を押すと現在のテキスト検索・絞り込み・ソートがリセットされます．

以下，より便利なフィルターと{{< icon share SHARE >}} についてご紹介します．

### 出題元

出題元で絞り込むことができます．

> {{< figure src=filter-venue.png title="図: 出題元フィルター" >}}

IOL
: 国際言語学オリンピック

APLO
: アジア太平洋言語学オリンピック

JOL
: 日本言語学オリンピック

海外予選
: イギリスのUKLOなど

kotohazi
: 当サイトのオリジナル問題

非LO
: その他の言語学オリンピック的な問題

さらにIOL, APLO, JOL, UKLOなどを選択すると，追加で「年」や「団体戦かどうか」のフィルターが出てきます．

### 難易度

☆1～☆8までに分かれています．

> {{< figure src=filter-difficulty.png title="図: 難易度フィルター" >}}

基準は以下の通りです．

表: 難易度分けの基準

|   | 目安          | 理想解答時間 | 入門 | JOL対策 | APLO対策 | IOL対策 |
|---|----------------|-------------|------|---------|----------|---------|
| ☆1 | JOL易          | ～10分      | YES  |         |          |         |
| ☆2 | JOL中          | ～20分      | YES  | YES     |          |         |
| ☆3 | JOL難/IOL易    | ～30分      |      | YES     |          |         |
| ☆4 | IOLやや易      | ～45分      |      | YES     | YES      | YES     |
| ☆5 | IOL中          | ～60分      |      |         | YES      | YES     |
| ☆6 | IOLやや難      | ～90分      |      |         | YES      | YES     |
| ☆7 | IOL難/団体戦易 | ～150分     |      |         |          | YES     |
| ☆8 | 団体戦非易     | 150分～     |      |         |          | YES     |

数人で手分けをして決めています．難易度のところを押すと誰による判定なのか表示されます．

[統計のページ](../statistics/)にどの大会にどの難易度の問題がどのくらいの割合で出題されているのか載せてあります．

### ジャンル

ここでは典型的なジャンルのみ簡単に紹介します．

> {{< figure src=filter-category.png title="図: ジャンルフィルター" >}}

統語
: 文の構造，文法関係や一致に重点

形態
: 語の内部構造に重点

音韻
: 音に重点．形態音韻規則や音対応などを見つける問題

韻律
: 韻文のルール，強勢付与規則など，韻律構造に重点

命数
: 「じゅうに」*twelve* といった言語での数の表し方(命数表現)についての問題

文字
: 文字についての問題

意味
: 比喩や親族名称のように，音韻や形態統語だけでなく意味にも重点

デフォルトではor検索ですが，一番最初の橙の&がチェックされているとand検索になります．

### 便利

便利に使ってもらえるとうれしいです．

> {{< figure src=filter-utility.png title="図: 便利フィルター" >}}

{{< iconStack "comment fa-lg sort-utility-translation|~訳" >}}
: 翻訳つきのみ

{{< icon "lightbulb sort-utility-hint" >}}
: ヒントつきのみ

{{< icon "chalkboard-teacher sort-utility-expl" >}}
: 解説つきのみ

{{< icon "check-square sort-utility-done" >}}
: 解いた問題のみ

{{< iconStack "check-square sort-utility-done|slash" >}}
: (= {{< icon "check-square text-muted" >}}) まだ解いていない問題のみ

{{< icon "heart sort-utility-like" >}}
: 解きたいorお気に入りの問題のみ

デフォルトではor検索ですが，一番最初の橙の&がチェックされているとand検索になります．

### ソート

並び替えることができます．チェック済みのものをもう一度押すと昇順と降順が切り替わります．

{{< icon "random" を>}}押すとシャッフルされます．適当に問題を選びたいときに便利！フィルターと組み合わせるとさらに便利！

> {{< figure src=filter-sort.png title="図: ソート" >}}

### SHARE

{{< icon share SHARE >}} で検索結果を他の人にシェアすることができます．

たとえば「語用論」のジャンルを誰かに紹介したいとしましょう．自分のところで「語用論」の問題を絞り込み，{{< icon share SHARE >}} を押します．

> {{< figure src=share-push.png title="図: シェアボタンを押したところ" >}}

{{< icon clipboard Copy >}} を押すとリンクをコピーできます．このリンクにアクセスした人はすでに「語用論」で絞り込まれた問題一覧を見ることができます．[アクセスしてみてください](https://kotohazi.netlify.app/problems/?v=1&c=06-x_23)

基本的にはこのように {{< icon share SHARE >}} → リンクをコピペ で見えているページをシェアできます．

テキスト検索もシェアすることができます．

> {{< figure src=share-japanese.png title="図: 日本語で解ける問題のシェア" >}}

[↑のページへのリンク](https://kotohazi.netlify.app/problems/?v=1&t=SU9MMjAoMVs1LTldfFteMDFdXGQpfEpPTHxBUExPfOaXpeacrOiqnuiosw)

---

{{< icon "check-square sort-utility-done" >}} {{< iconStack "check-square sort-utility-done|slash" >}} {{< icon "heart sort-utility-like" >}} のいずれかで絞り込んでいる場合は特殊な動きをします．これらのフィルターが個人的なものだからです．上記の例では絞り込むのに使っている**テキストやフィルター**をシェアしますが，こちらは絞り込まれた**問題の一覧**をシェアします．

試しにオノマトペみたいな名前の言語に {{< icon "heart sort-utility-like" >}} をつけて絞り込んでみました．

> {{< figure src=share-onomatopoeic.png title="図: オノマトペみたいな名前の言語" >}}

タイトルがつけられるようになっています↓．

> {{< figure src=share-named.png title="図: タイトルをつける" >}}

このリンクに飛ぶと，こんなページが表示されます．

> {{< figure src=share-shared.png title="図: シェアされたページ" >}}

別の人が開いて {{< icon "check-square sort-utility-done" >}} {{< icon "heart sort-utility-like" >}} がその人のものになっても，ちゃんと問題一覧が表示されました．

右上の {{< icon "filter sort-utility-primary" これだけ >}} を押して解除する({{< icon "filter sort-utility-primary" >}} > {{< icon "filter" >}})と，フィルターが出てきてシェアされた問題一覧をさらに絞り込むことができます．

> {{< figure src=share-filtered.png title="図: シェアされたページをさらに絞り込み" >}}

{{< icon "filter sort-utility-primary" これだけ >}} のすぐ下の {{< icon "trash btnfn-danger" CLEAR >}} を押すとシェアされた検索結果を消すことができます．

シェア機能の説明は以上です．「おすすめの良問10選」「解けなさすぎる問題リスト」「今日の勉強会で解く問題」など便利に使えると思います．
