# JsFusion

JsFusion is a JavaScript Framework designed to work together with technologies
such as [@hotwired/turbo](https://github.com/hotwired/turbo) to seamlessly
apply client functionality to HTML templates dynamically. It is greatly
inspired on [Stimulus](https://github.com/hotwired/stimulus) (improving upon
it) and somewhat inspired in ReactJS and VueJS (borrowed some syntax
strategies and implementations)

## Current version

The current version is experimental and feature complete with a few
exceptions (listed below). Usage in production environments should be
heavily monitored as it's prone to have a few bugs. Feel free
to experiment with it and suggest features, fixes and improvements.

This section will be updated as development progresses.

### Missing features include:

- Mutation Observer functionality
- Plugin System for extensions (ability to parse new attributes and
  ability to react to new bind strategies)

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
