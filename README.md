## How to Use

Enter the name of a method in the old bindings, and get the equivalent name in the new bindings.

```
> node mclookup.js getFront
byIndex
```

If the method was unchanged or removed, this tool will output whatever name you gave it.

## Changing bindings

URLs to csv files are currently hard-coded for Minecraft 1.12 `snapshot 1.12 1003` and `stable 39`.
This is easy to change in the source code, but a PR to make this configurable is a welcome addition.
