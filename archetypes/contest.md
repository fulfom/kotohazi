---
title: {{$path := split .File.Dir "\\"}}{{$contest := index $path 1}}{{$year := index $path 2}}{{$contest | upper}}{{$year}}
weight: {{$year}}
type: docs
pagetype: prob
description: ""
---
