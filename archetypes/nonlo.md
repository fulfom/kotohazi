---
title: {{$path := split .File.Dir "\\"}}{{$cvenue := index $path 2}}{{$cyear := index $path (sub (len $path) 2)}}{{$cteamnum := .File.TranslationBaseName}}{{$prob := false}}{{range where $.Site.Data.problems "venue" "非LO"}}{{if eq (.venuedetail | urlize) $cvenue}}{{if eq $cvenue $cyear}}{{$tteamnum := slice "" }}{{if .team}}{{$tteamnum = slice .team (.number | string)}}{{else}}{{$tteamnum = slice (.number | string)}}{{end}}{{if eq ((delimit $tteamnum "-") | urlize) $cteamnum}}{{$prob = .}}{{end}}{{else}}{{$tnamedyear := (index $.Site.Params.namedyear .year) | default .year}}{{if eq ($tnamedyear | urlize) $cyear}}{{$tteamnum := slice "" }}{{if .team}}{{$tteamnum = slice .team (.number | string)}}{{else}}{{$tteamnum = slice (.number | string)}}{{end}}{{if eq ((delimit $tteamnum "-") | urlize) $cteamnum}}{{$prob = .}}{{end}}{{end}}{{end}}{{end}}{{end}}{{$id := index $prob "id"}}{{$venue := index $prob "venue"}}{{$venuedetail := index $prob "venuedetail"}}{{$namedyear := (index $.Site.Params.namedyear $prob.year) | default $prob.year}}{{$team := index $prob "team"}}{{$number := index $prob "number"}}{{$teamnum := slice }}{{with $team}}{{$teamnum = slice $team }}{{end}}{{$teamnum = $teamnum | append $number}}{{$title := index $prob "title"}}{{$titlejp := index $prob "titlejp"}}"{{$venuedetail | default $venue}}{{$namedyear}}-{{delimit $teamnum "-"}} {{$titlejp | default $title}}"
weight: {{$id}}
type: docs
pagetype: prob
description: "翻訳・ヒント・解答・解説のまとめ"
problems: 
- {{$id}}
---

{{% hasProbdata id={{$id}} key="introduction" %}}

## 紹介

{{% problems/introduction id={{$id}} %}}{{% /hasProbdata %}}

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
