---
title: {{$pageTitle := delimit (slice ((replace (.File.Dir | strings.TrimPrefix "problems") "\\" "") | upper ) "-" .File.TranslationBaseName) ""}}{{$id := ""}}{{$venue := ""}}{{$venueDetail := ""}}{{$year := ""}}{{$team := ""}}{{$number := ""}}{{$title := ""}}{{$titlejp := ""}}{{$link := ""}}{{$solcorrection := ""}}{{$topic := ""}}{{$author := ""}}{{$category := ""}}{{$probcorrection := ""}}{{$difficulty := ""}}{{$diffeach := ""}}{{range $.Site.Data.problems}}{{$tempVenue := index . "venue"}}{{$tempYear := index . "year"}}{{$tempTeam := index . "team"}}{{$tempNumber := index . "number"}}{{if eq $pageTitle (delimit (slice $tempVenue $tempYear "-" $tempTeam $tempNumber) "")}}{{$id = index . "id"}}{{$venue = index . "venue"}}{{$venueDetail = index . "venueDetail"}}{{$year = index . "year"}}{{$team = index . "team"}}{{$number = index . "number"}}{{$title = index . "title"}}{{$titlejp = index . "titlejp"}}{{$link = index . "link"}}{{$solcorrection = index . "solcorrection"}}{{$topic = index . "topic"}}{{$author = index . "author"}}{{$category = index . "category"}}{{$probcorrection = index . "probcorrection"}}{{$difficulty = index . "difficulty"}}{{$diffeach = index . "diffeach"}}{{end}}{{end}}"{{$venue}}{{with $year}}{{.}}{{end}}-{{with $team}}{{.}}{{end}}{{$number}} {{$titlejp | default $title}}"
weight: {{with $team}}99{{end}}{{$number}}
type: docs
description: ""
---

{{% pageinfo %}}
このページは未編集です
{{% /pageinfo %}}

## 情報

{{% probcard id={{$id}} detailed=true %}}{{with $probcorrection}}

### 問題訂正

{{.}}{{end}}

### 翻訳

## 答え合わせ

## ヒント

{{% hint 1 %}}
1
{{% /hint %}}

{{% hint 2 %}}
2
{{% /hint %}}

{{% hint 3 last %}}
3
{{% /hint %}}

## 解答

[解答]({{% probdata id={{$id}} key="solution" default="link" %}}){{with $solcorrection}}

### 解答訂正

{{.}}{{end}}

## 解説

{{% collapse title="コメント" %}}
この問題はこうこう
{{% /collapse %}}

### 詳しい解説

{{% explanationLinks id={{$id}} %}}
