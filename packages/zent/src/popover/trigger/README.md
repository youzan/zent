# Trigger design

`Trigger` is the base class for all triggers. There are two builtin triggers: `Click` and `Hover`.

## Override methods

`getTriggerProps: () => Object`, returns additional props for the trigger node, these props are usually
event handlers.

You can do whatever a valid React component can.

## Additional props for triggers

You can add custom props for custom triggers.

**Note**, props on the base `Trigger` class is private, never expose them to your public props.
