# Human readable regular expressions

Regular expressions builder to make your RegExp code readable.

> ### Make RegExp readable ~_~~again~~_~

## Motivation

Look at this (one of many) regular expression pattern for an _email_

`
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
`

Can you understand what it says?

> ### Hope, you'll never gonna need to fix a bug in it :)

So well, let's now look at this regular expression pattern for an _email_ — it's exactly the same:

```js
const EMAIL_REGEX = re.fullMatch()
        .capturingGroup( // What for?
          re.alternation(
            // .quantity(..., 0, 1)
            re.oneOrMore(
              re.anyCharacterExcept('<>()[]\\.,;:\s@"')
              // re.notOneOf('...')
            ).zeroOrMore(
              re.literally('.')
              .mayBe(re.anyCharacterExcept('<>()[]\\.,;:\s@"'))
            ),
            re.OR
            .capturingGroup(
              re.literally('"')
              .oneOrMore(re.anyCharacter())
              .literally('"')
            )
          )
        )
        .literally('@')
        .capturingGroup(
          re.alternation(
            re.capturingGroup(
              re.literally('[')
              .quantity(re.inTheRangeBetween('0', '9'), 1, 3)
              .literally('.')
              .quantity(re.inTheRangeBetween('0', '9'), 1, 3)
              .literally('.')
              .quantity(re.inTheRangeBetween('0', '9'), 1, 3)
              .literally('.')
              .quantity(re.inTheRangeBetween('0', '9'), 1, 3)
              .literally(']')
            ),
            re.OR
            .capturingGroup(
              re.capturingGroup(
                re.oneOf(['a', 'z'], ['A', 'Z'], re.literally('-'), [0, 9])
                .oneOrMore(re.anyCharacter())
                .literally('"')
                // TODO write further
              )
            )
          )
        )
        .getFullMatch()
```