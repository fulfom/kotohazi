---
title: {{$path := split .File.Dir "\\"}}{{$level := index $path 1}}{{$stage := index $path 2}}{{$stage}}
weight: {{$stage}}
author: name
level: {{$level}}
stage: {{$stage}}
pagetype: stage
description: ""
draft: true
---



## 関連記事

{{< problems/relatedarticle pageid={{.File.Path}} >}}

## 類題

{{< problems/relatedprob pageid={{.File.Path}} >}}
