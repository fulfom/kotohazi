# サイト

## 道具

Hugo というフレームワークと，Docsy というテーマを使っている．

content/ja の中の md, html ファイルをマークダウン(htmlもマークダウンでOK)で書いていけば，あとは Hugo と Docsy がいい感じのウェブページにしてくれる．GitHub に push すると勝手に netlify がビルドとデプロイをしてくれる．

なのでやることは マークダウンで記事を書く → ローカルで add, commit, push → おしまい．branch 切ったりは今後考える．

## 内容

[About のページ](https://kotohazi.netlify.com/about/) を読んでください．

## ディレクトリ

サイト開いたときに表示されるページは content/ja/_index.html で，content/ja トップにあるフォルダが nav のメニューになる．

たとえば About に飛ぶと，content/ja/about/_index.html が表示される．
入門講座 に飛ぶと，content/ja/docs/_index.md が表示される．

各フォルダのトップにある _index.html, _index.md の一番上に設定欄があって，リンクの文字列は linkTitle で設定できる．nav 内の順序は weight の値が小さい順に並ぶ．

以上がホームと nav から飛べる各ページだが，入門講座とか問題集とかはさらに下に階層が作れる．これもホームと各ページの関係と一緒で，今度は content/ja/docs/_index.md がホームにあたるものになり，content/ja/docs/FILE1/_index.md とか，もっと下にcontent/ja/docs/FILE1/FILE2/_index.md とか深くしていける．入門講座はレベル1, 2, 3... みたいな感じで分けるので，docs/Lv1/Stage1/_index.md みたいな感じになる．

## ショートコード

```{{%  %}}``` とか ```{{<  >}}``` はショートコードというものだそう．```{{% XXX %}}``` で終わるものと，```{{% YYY %}}何とか{{% /YYY %}}```のように挟むタイプのと二つある．

```{{% pageinfo %}}ほにゃらら{{% /pageinfo %}}```

は

```<div class="pageinfo">ほにゃらら</div>```

になる．マークダウン内に生の html がなくてうれしい．

---

引数を取れる: ```{{% XXX 引数1 引数2... %}}```

Font awesome の icon を表示するのに使っている．

```{{% icon XXX %}}```

は

```<i class="fas fa-XXX"></i>```

になる

```{{% icon XXX YYY%}}```

は

```<i class="fas fa-XXX fa-fw"></i>YYY```

になる (説明上省いたがほんとはさらに全体がspanで囲ってある．途中で改行しなくなるような class が指定してある)．

---

layouts/shortcodes, themes/docsy/layouts/shortcodes 内に定義されている．

## CSS

SCSS で書かれている．普通に css のつもりで書いて良いっぽい．変数が使えたりして嬉しいらしい．```$XXX``` が変数．

themes/docsy/assets/scss 内に色々ある．ただし書き換えたいとき，これをいじっても反映されない．代わりに assets/scss 内を編集する．_variables_project.scss に書くか，テーマのと同名のファイルを置けばこっちを優先的に参照してくれる．上述の shortcode も一緒．

## その他

詳しくは [Docsy のドキュメンテーション](https://www.docsy.dev/docs/) を参照

---

# Docsy Example

[Docsy](https://github.com/google/docsy) is a Hugo theme for technical documentation sites, providing easy site navigation, structure, and more. This **Docsy Example Project** uses the Docsy theme, as well as providing a skeleton documentation structure for you to use. You can either copy this project and edit it with your own content, or use the theme in your projects like any other [Hugo theme](https://gohugo.io/themes/installing-and-using-themes/).

This Docsy Example Project is hosted at [https://example.docsy.dev/](https://example.docsy.dev/).

You can find detailed theme instructions in the Docsy user guide: https://docsy.dev/docs/

This is not an officially supported Google product. This project is currently maintained.

## Cloning the Docsy Example Project

The following will give you a project that is set up and ready to use (don't forget to use `--recurse-submodules` or you won't pull down some of the code you need to generate a working site). The `hugo server` command builds and serves the site. If you just want to build the site, run `hugo` instead.

```bash
git clone --recurse-submodules --depth 1 https://github.com/google/docsy-example.git
cd docsy-example
hugo server
```

The theme is included as a Git submodule:

```bash
▶ git submodule
 a053131a4ebf6a59e4e8834a42368e248d98c01d themes/docsy (heads/master)
```

If you want to do SCSS edits and want to publish these, you need to install `PostCSS` (not needed for `hugo server`):

```bash
npm install
```

<!--### Cloning the Example from the Theme Project


```bash
git clone --recurse-submodules --depth 1 https://github.com/docsy.git
cd tech-doc-hugo-theme/exampleSite
HUGO_THEMESDIR="../.." hugo server
```


Note that the Hugo Theme Site requires the `exampleSite` to live in a subfolder of the theme itself. To avoid recursive duplication, the example site is added as a Git subtree:

```bash
git subtree add --prefix exampleSite https://github.com/google/docsy.git  master --squash
```

To pull in changes, see `pull-deps.sh` script in the theme.-->

## Running the website locally

Once you've cloned the site repo, from the repo root folder, run:

```
hugo server
```
