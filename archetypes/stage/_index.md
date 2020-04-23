---
title: {{$path := split .File.Dir "\\"}}{{$len := len $path}}{{$level := (index $path (sub $len 3)) | strings.TrimPrefix "lv"}}{{$stage := (index $path (sub $len 2)) | strings.TrimPrefix "stage"}}Stage{{$stage}}
weight: {{$stage}}
level: {{$level}}
stage: {{$stage}}
pagetype: stage
description: ""
draft: true
---

## 例題

例題のテンプレート
