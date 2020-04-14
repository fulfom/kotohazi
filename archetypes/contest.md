---
title: {{$path := split .File.Dir "\\"}}{{((((delimit $path "")| strings.TrimPrefix "problems") | strings.TrimPrefix "oversea") | strings.TrimPrefix "nonlo") | upper}}
weight: {{index $path (sub (len $path) 2)}}
type: docs
pagetype: prob
description: ""
---
