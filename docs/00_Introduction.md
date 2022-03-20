# Introduction

`JsFusion` is a JavaScript Framework designed to work together with technologies
such as [@hotwired/turbo](https://github.com/hotwired/turbo) to seamlessly
apply client functionality to HTML templates dynamically. It is greatly
inspired on [Stimulus](https://github.com/hotwired/stimulus) (improving upon
it) and somewhat inspired in ReactJS and VueJS (borrowed some syntax
strategies and features).

## Current version

The current version is experimental and feature complete except for the
implementation of the `MutationObserver` system. The `MutationObserver` 
feature is expected to be ready by `1.0.0-beta`. Usage in production 
environments should be heavily monitored as it's prone to have a few bugs. 
Feel free to experiment with it and suggest features, fixes and improvements 
on our [issues](https://github.com/shadowc/jsfusion/issues) page.

Bug fixing pull requests are also greatly appreciated!

This section will be updated as development progresses.

## Extensibility

This framework is thought with extensibility in mind. You will be able to
easily extend the functionality of this framework by applying changes to
`Runtime` before the call to `start()`.

Some aspects that can be extended are:

- Attribute Handling: You will be able to extend the number of `data-`
  prefixed attributes so that when they are added or changed, your parsing
  method will be called.
- `data-bind` special cases: You will be able to extend the `data-bind`
  attribute parsing so that new binding strategies can be established.
