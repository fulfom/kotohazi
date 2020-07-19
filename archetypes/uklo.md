---
title: {{$path := split .File.Dir "\\"}}UKLO{{index $path (sub (len $path) 2)}}
weight: {{index $path (sub (len $path) 2)}}
type: docs
pagetype: prob
description: ""
---
