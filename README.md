# Conflict Comment

*This project was created as an [April Fools'
Day](https://en.wikipedia.org/wiki/April_Fools'_Day) joke for April 1, 2020. It
is not a sincere proposal.*

This repository contains a proposal for extending the lexical grammar of the
ECMAScript programming language. It is currently in stage 0 of [the TC39
process](https://tc39.github.io/process-document/).

You can view [the specification
draft](https://jugglinmike.github.io/proposal-conflict-comment/) and take part
in the discussion on [the issue
tracker](https://github.com/jugglinmike/proposal-conflict-comment/issues).

## Motivation and use cases

[Git](https://git-scm.com/) is a version control system used to track changes
to software projects. In the decade since [the publication of version 5 of
ECMA-262](http://www.ecma-international.org/news/PressReleases/PR_Ecma%20approves%20major%20revision%20of%20ECMAScript.htm),
Git has been [widely adopted](https://www.openhub.net/repositories/compare)
across the software development industry and the "open source" ecosystem.

Practically speaking, this proliferation means that developers' experience of
the ECMAScript programming language is deeply entwined with their experience of
the Git version control system. The ECMAScript language is positioned (and
perhaps *expected*) to embrace Git's idioms.

This proposal specifically concerns the "conflict markers" which Git routinely
inserts into the source text of otherwise-valid ECMAScript programs.

From `git-merge(1)`:

    HOW CONFLICTS ARE PRESENTED
           During a merge, the working tree files are updated to reflect the
           result of the merge. Among the changes made to the common ancestor’s
           version, non-overlapping ones (that is, you changed an area of the
           file while the other side left that area intact, or vice versa) are
           incorporated in the final result verbatim. When both sides made
           changes to the same area, however, Git cannot randomly pick one side
           over the other, and asks you to resolve it by leaving what both
           sides did to that area.

           By default, Git uses the same style as the one used by the "merge"
           program from the RCS suite to present such a conflicted hunk, like this:

               Here are lines that are either unchanged from the common
               ancestor, or cleanly resolved because only one side changed.
               <<<<<<< yours:sample.txt
               Conflict resolution is hard;
               let's go shopping.
               =======
               Git makes conflict resolution easy.
               >>>>>>> theirs:sample.txt
               And here is another line that is cleanly resolved or unmodified.

           The area where a pair of conflicting changes happened is marked with
           markers <<<<<<<, =======, and >>>>>>>. The part before the ======= is typically
           your side, and the part afterwards is typically their side.

By extending the lexical grammar to treat these machine-generated modifications
as "comment" elements, this proposal allows programs so modified to parse
without error.

## Example

Consider the following code excerpt:

```js
    default:
      break;
  }
  return potentiallyADomElement ||document.createElement('blink')
}

function onRequest() {
  var screen = document.getElementsByClassName('screen7')[0];

  // Use inline styling because all the appropriate class names are in use
  screen.style.display = 'block';
  screen.style.zIndex = 99999999999 + 1;
  screen.style.msFilter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
```

During routine maintenance, a code owner may make the following modification:

```diff
-var screen = document.getElementsByClassName('screen7')[0];
+var screen = document.querySelector('.screen7');
```

Meanwhile, another developer implementing a new feature modifies the same line
of code in a different way:

```diff
-var screen = document.getElementsByClassName('screen7')[0];
+var screen = document.getElementsByClassName('screen8')[0];
```

When the second developer uses Git to merge their work with the first's, the
version control system will fail to mediate the conflicting changes. Instead,
it will save *both* versions of the disputed line to the file, along with
"conflict markers" that communicate the extend of the discrepancy:

```js
    default:
      break;
  }
  return potentiallyADomElement ||document.createElement('blink')
}

function onRequest() {
<<<<<<< HEAD
  var screen = document.querySelector('.screen7');
=======
  var screen = document.getElementsByClassName('screen8')[0];
>>>>>>> refactor-overlay

  // Use inline styling because all the appropriate class names are in use
  screen.style.display = 'block';
  screen.style.zIndex = 99999999999 + 1;
  screen.style.msFilter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
```

Developers are expected to detect this problem, manually resolve the conflict,
and remove the conflict markers. Unfortunately, in today's workaday world, it's
easy to overlook minor details like this. It's not uncommon for Git users to
mistakenly accept the conflicted file "as is," and contribute it to their team
in its unresolved state.

Today, ECMAScript engines are unable to parse source code that contain these
markers. They will report a syntax error for such input before executing
anything at all. This could have dramatic results ranging from loss of revenue
to loss of reputation.

If this proposal is accepted into the ECMAScript language, engines will
tolerate mistakes like this by ignoring the lines between the first two
conflict markers and ignoring the line containing the third marker. This will
save countless developers from the shame of a harmless mistake.

## Status

- Stage: 0
- Tests: see the `test262/` directory in this repository
- Spec PR: TODO
- Implementations shipping: (none)
