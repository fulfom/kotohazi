---
title: {{$pageTitle := delimit (slice ((replace (.File.Dir | strings.TrimPrefix "problems") "\\" "") | upper ) "-" .File.TranslationBaseName) ""}}{{$id := ""}}{{$venue := ""}}{{$venueDetail := ""}}{{$year := ""}}{{$team := ""}}{{$number := ""}}{{$title := ""}}{{$titlejp := ""}}{{$link := ""}}{{$solcorrection := ""}}{{$topic := ""}}{{$author := ""}}{{$category := ""}}{{$probcorrection := ""}}{{$difficulty := ""}}{{$diffeach := ""}}{{range $.Site.Data.problems}}{{$tempVenue := index . "venue"}}{{$tempYear := index . "year"}}{{$tempTeam := index . "team"}}{{$tempNumber := index . "number"}}{{if eq $pageTitle (delimit (slice $tempVenue $tempYear "-" $tempTeam $tempNumber) "")}}{{$id = index . "id"}}{{$venue = index . "venue"}}{{$venueDetail = index . "venueDetail"}}{{$year = index . "year"}}{{$team = index . "team"}}{{$number = index . "number"}}{{$title = index . "title"}}{{$titlejp = index . "titlejp"}}{{$link = index . "link"}}{{$solcorrection = index . "solcorrection"}}{{$topic = index . "topic"}}{{$author = index . "author"}}{{$category = index . "category"}}{{$probcorrection = index . "probcorrection"}}{{$difficulty = index . "difficulty"}}{{$diffeach = index . "diffeach"}}{{end}}{{end}}"{{$venue}}{{with $year}}{{.}}{{end}}-{{with $team}}{{.}}{{end}}{{$number}} {{$titlejp | default $title}}"
weight: {{with $team}}99{{end}}{{$number}}
type: docs
pagetype: prob
description: "翻訳・ヒント・解答・解説のまとめ"
problems: 
- {{$id}}
---

## 情報

{{% problems/probcard id={{$id}} detailed=true %}}{{% hasProbdata id={{$id}} key="probcorrection" %}}

### 問題訂正

{{% probdata id={{$id}} key="probcorrection" %}}{{% /hasProbdata %}}{{% hasProbdata id={{$id}} key="translation" %}}

### 翻訳・注釈

{{% problems/translation id={{$id}} %}}{{% /hasProbdata %}}{{% hasProbdata id={{$id}} key="hint" %}}

## ヒント

{{% problems/hint id={{$id}} %}}{{% /hasProbdata %}}

## 解答

[解答]({{% probdata id={{$id}} key="solution" default="link" %}}){{% hasProbdata id={{$id}} key="solcorrection" %}}

### 解答訂正

{{% collapse title="解答訂正" %}}
{{% probdata id={{$id}} key="solcorrection" %}}
{{% /collapse %}}{{% /hasProbdata %}}

## 解説

{{% hasProbdata id={{$id}} key="sketch" %}}
{{% problems/sketch id={{$id}} %}}
{{% /hasProbdata %}}{{% hasProbdata id={{$id}} key="explanationlinks" %}}

### 詳しい解説

{{% problems/explanationLinks id={{$id}} %}}{{% /hasProbdata %}}

## 関連記事

{{< problems/relatedarticle id={{$id}} >}}

## 類題

{{< problems/relatedprob id={{$id}} >}}
