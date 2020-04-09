---
title: {{$level := (replace (.File.Dir | strings.TrimPrefix "docs\\lv") "\\" "")}}{{$stage := .File.TranslationBaseName}}{{$level}}-{{$stage}}
weight: {{$stage}}
author: name
level: {{$level}}
stage: {{$stage}}
pagetype: solve
catgories: 
- 未分類
problems:
- 0
description: ""
draft: true
---



## 関連記事

{{< problems/relatedarticle pageid={{.File.UniqueID}} >}}

## 類題

{{< problems/relatedprob pageid={{.File.UniqueID}} >}}
